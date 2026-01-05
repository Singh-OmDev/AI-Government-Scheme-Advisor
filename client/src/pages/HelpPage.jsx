import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HelpPage() {
    const [openIndex, setOpenIndex] = useState(null);
    const [language, setLanguage] = useState('en'); // Manage own state for simplicity in this standalone page

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const isHindi = language === 'hi';

    const faqs = [
        {
            question: isHindi ? 'क्या मुझे आधार कार्ड की आवश्यकता है?' : 'Do I need an Aadhaar Card?',
            answer: isHindi
                ? 'नहीं, इस वेबसाइट पर योजनाओं को खोजने या ब्राउज़ करने के लिए आपको आधार की आवश्यकता नहीं है। केवल जब आप आधिकारिक सरकारी पोर्टल पर आवेदन करने जाएंगे, तब आपको इसकी आवश्यकता हो सकती है।'
                : 'No, you do not need Aadhaar to search or browse schemes on this website. You will only need it when you proceed to apply on the official government portal.'
        },
        {
            question: isHindi ? 'क्या मेरी जानकारी सुरक्षित है?' : 'Is my data safe?',
            answer: isHindi
                ? 'हाँ! हम आपकी जानकारी को संग्रहीत नहीं करते हैं। आपका डेटा केवल योजनाओं को खोजने के लिए उपयोग किया जाता है और सत्र के बाद हटा दिया जाता है।'
                : 'Yes! We do not store your personal profile data. It is processed anonymously solely to find relevant schemes and is discarded after your session.'
        },
        {
            question: isHindi ? 'क्या यह जानकारी सटीक है?' : 'Is this information accurate?',
            answer: isHindi
                ? 'हमारा एआई नवीनतम सरकारी दिशानिर्देशों के आधार पर जानकारी प्रदान करता है। हालांकि, सरकारी नीतियां बदल सकती हैं, इसलिए हम हमेशा आवेदन करने से पहले आधिकारिक वेबसाइट की जांच करने की सलाह देते हैं।'
                : 'Our AI provides information based on the latest government guidelines. However, policies verify, so we always recommend checking the official source link provided before applying.'
        },
        {
            question: isHindi ? 'दस्तावेज़ सत्यापन कैसे करें?' : 'How do I verify my documents?',
            answer: isHindi
                ? 'आप अपने निकटतम कॉमन सर्विस सेंटर (CSC) पर जाकर अपने दस्तावेजों का सत्यापन करवा सकते हैं। हमने मुख्य पृष्ठ पर CSC लोकेटर का लिंक प्रदान किया है।'
                : 'You can verify your documents by visiting your nearest Common Service Center (CSC). We have provided a CSC Locator link on the home page results.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-100 font-sans selection:bg-blue-500/30 flex flex-col">
            <Header language={language} setLanguage={setLanguage} />

            <main className="flex-grow container mx-auto px-4 py-12 mt-20 max-w-3xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl mb-6">
                        <HelpCircle className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {isHindi ? 'सहायता और अक्सर पूछे जाने वाले प्रश्न' : 'Help & Frequently Asked Questions'}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {isHindi ? 'सरकारी योजनाओं और पात्रता से संबंधित अपने सभी उत्तर यहाँ प्राप्त करें।' : 'Get answers to common doubts about eligibility, documents, and compliance.'}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-slate-900/50 border ${openIndex === index ? 'border-blue-500/50 bg-slate-900' : 'border-white/10'} rounded-2xl overflow-hidden transition-all duration-300`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-medium ${openIndex === index ? 'text-blue-400' : 'text-gray-200'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-blue-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex gap-4 items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-yellow-500 font-semibold mb-2">
                            {isHindi ? 'एआई अस्वीकरण' : 'AI Accuracy Disclaimer'}
                        </h3>
                        <p className="text-sm text-yellow-200/80 leading-relaxed">
                            {isHindi
                                ? 'यह उपकरण योजनाओं की सिफारिश करने के लिए कृत्रिम बुद्धिमत्ता (AI) का उपयोग करता है। हालांकि हम सटीकता का प्रयास करते हैं, कृपया किसी भी लाभ के लिए आवेदन करने से पहले आधिकारिक सरकारी अधिसूचनाओं को सत्यापित करें।'
                                : 'This tool uses Artificial Intelligence (AI) to recommend schemes. While we strive for accuracy, please verify official government notifications before applying for any benefits.'}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default HelpPage;
