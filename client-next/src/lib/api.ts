const getApiUrl = () => {
    if (typeof window === 'undefined') {
        // Server-side calls should hit the backend directly if possible, or use localhost
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';
    }
    // Client-side calls go through the Next.js rewrite
    return '/api';
};

export const API_URL = getApiUrl();

export const recommendSchemes = async (userProfile: any, token: string) => {
    try {
        const url = `${API_URL}/recommend-schemes`;
        // console.log("Fetching URL:", url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userProfile),
        });

        if (!response.ok) {
            let errorMessage = `API Error: ${response.status}`;
            try {
                const errorData = await response.json();
                console.error("Full API Error Details:", errorData);
                errorMessage += ` - ${errorData.details || errorData.error || JSON.stringify(errorData)}`;
            } catch (e) {
                const errorText = await response.text();
                // console.error(`API Error (${response.status}) Raw Text:`, errorText);
                errorMessage += ` - ${errorText.substring(0, 100)}`;
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("API Error Warning:", error);
        throw error;
    }
};

export const chatWithScheme = async (scheme: any, question: string, language: string) => {
    try {
        const response = await fetch(`${API_URL}/chat-scheme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scheme, question, language }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error("Chat API Error:", error);
        throw error;
    }
};

export const searchSchemes = async (query: string, language: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/search-schemes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query, language }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to search schemes');
        }

        return await response.json();
    } catch (error) {
        console.error("Search Schemes API Error:", error);
        throw error;
    }
};

export const saveScheme = async (userId: string, scheme: any, token: string) => {
    const response = await fetch(`${API_URL}/save-scheme`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            schemeName: scheme.name,
            schemeData: scheme
        }),
    });
    if (!response.ok) {
        if (response.status === 400) throw new Error("Already saved");
        throw new Error("Failed to save");
    }
    return await response.json();
};

export const getSavedSchemes = async (userId: string) => {
    const response = await fetch(`${API_URL}/saved-schemes/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
};

export const removeSavedScheme = async (id: string) => {
    const response = await fetch(`${API_URL}/saved-schemes/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error("Failed to delete");
    return await response.json();
};

export const getAnalytics = async () => {
    try {
        const response = await fetch(`${API_URL}/analytics`);
        if (!response.ok) throw new Error("Failed to fetch analytics");
        return await response.json();
    } catch (error) {
        console.error("Error fetching analytics:", error);
        throw error;
    }
};

export const getUserHistory = async (userId: string) => {
    try {
        const response = await fetch(`${API_URL}/history/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user history");
        return await response.json();
    } catch (error) {
        console.error("Error fetching user history:", error);
        throw error;
    }
};
