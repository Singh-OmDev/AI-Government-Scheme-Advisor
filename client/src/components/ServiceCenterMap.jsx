import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { Navigation } from 'lucide-react';

// Fix for default marker icons in Leaflet with Vite/Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const ServiceCenterMap = ({ city, state, t }) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);

    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize Icon defaults once
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIconRetina,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
        });
    }, []);

    // Fetch Data
    useEffect(() => {
        const fetchLocations = async () => {
            if (!city && !state) return;

            setLoading(true);
            try {
                const locationQuery = `${city}, ${state}`;
                const centerRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=1`);
                const centerData = await centerRes.json();

                if (centerData.length > 0) {
                    const newCenterLat = parseFloat(centerData[0].lat);
                    const newCenterLon = parseFloat(centerData[0].lon);

                    // Update Map View if initialized
                    if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView([newCenterLat, newCenterLon], 13);
                    }

                    // 2. Search for Service Centers nearby with multiple variations
                    // We search for multiple terms because they are tagged differently in India
                    const searchTerms = [
                        `Common Service Centre near ${locationQuery}`,
                        `CSC near ${locationQuery}`,
                        `Jan Seva Kendra near ${locationQuery}`,
                        `Digital Seva near ${locationQuery}`
                    ];

                    try {
                        // Fetch all queries in parallel
                        const responses = await Promise.all(
                            searchTerms.map(term =>
                                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(term)}&limit=5`)
                                    .then(res => res.json())
                                    .catch(e => []) // specific query fail shouldn't break all
                            )
                        );

                        // Flatten and deduplicate by place_id
                        const allResults = responses.flat();
                        const uniqueResults = Array.from(new Map(allResults.map(item => [item.place_id, item])).values());

                        if (uniqueResults.length > 0) {
                            setCenters(uniqueResults.map(c => ({
                                id: c.place_id,
                                lat: parseFloat(c.lat),
                                lon: parseFloat(c.lon),
                                name: c.display_name.split(',')[0]
                            })));
                        } else {
                            // Fallback: If no specific CSCs found, just show the city marker
                            setCenters([{
                                id: 'city-center',
                                lat: newCenterLat,
                                lon: newCenterLon,
                                name: `${city} City Center`
                            }]);
                        }
                    } catch (err) {
                        console.error("Error fetching distinct CSCs", err);
                        // Fallback on error
                        setCenters([{
                            id: 'city-center',
                            lat: newCenterLat,
                            lon: newCenterLon,
                            name: `${city} City Center`
                        }]);
                    }
                } else {
                    setError("Could not locate this city.");
                }

            } catch (err) {
                console.error("Map Data Error:", err);
                setError("Failed to load map data.");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [city, state]);

    // Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current) return;
        if (mapInstanceRef.current) return; // Already initialized

        // Remove the MapContainerComponent error potential by manually initializing
        const map = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);

        // Initialize Satellite Map (using Esri World Imagery for free satellite view)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }).addTo(map);

        mapInstanceRef.current = map;

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Update Markers
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        centers.forEach(center => {
            const popupContent = `
                <div class="text-slate-900 text-sm font-medium font-sans p-1">
                    <div class="mb-1">${center.name}</div>
                    <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lon}" 
                        target="_blank" 
                        rel="noreferrer" 
                        style="display: flex; align-items: center; gap: 4px; color: #2563eb; text-decoration: underline; margin-top: 4px;"
                    >
                        <span>📍 Get Directions</span>
                    </a>
                </div>
            `;

            const marker = L.marker([center.lat, center.lon])
                .addTo(mapInstanceRef.current)
                .bindPopup(popupContent);

            markersRef.current.push(marker);
        });

    }, [centers]);


    if (!city || !state) return null;

    return (
        <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-slate-800 relative z-0">
            {loading && (
                <div className="absolute inset-0 bg-slate-900/80 z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-300 text-sm">Locating Centers...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 bg-slate-900/90 z-10 flex items-center justify-center p-4 text-center">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />

            <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur p-2 rounded-lg border border-white/5 z-[400] text-xs text-gray-400 text-center">
                Showing locations near <b>{city}, {state}</b>
            </div>
        </div>
    );
};

export default ServiceCenterMap;
