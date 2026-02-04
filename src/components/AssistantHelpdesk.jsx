import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles, Calendar } from 'lucide-react';

const GEMINI_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY_2
].filter(Boolean);

const AssistantHelpdesk = ({ onBook }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: "Welcome to Dr. Vaibbhav Guray's elite chiropractic concierge. I am here to assist you with your journey towards spinal excellence. How may I serve you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const currentKeyIndex = useRef(0);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const systemPrompt = `
        You are a highly professional, sophisticated AI assistant for Dr. Vaibbhav Guray's Chiropractic Clinics.
        
        Key Information:
        - Doctor Name: Dr. Vaibbhav Guray.
        - Qualifications: IPHM (International Practitioners of Holistic Medicine) Certified.
        - Expertise: Master of human bio-mechanics, specializing in standard and advanced chiropractic adjustments.
        - Locations: 
            1. South Mumbai Center: 534, Bombay Mutual Terrace, 2nd Floor, Opera House Sandhurst Bridge, Above Canto Restaurant, Opp Standard Chartered Bank, Mumbai-400007.
            2. Andheri West Center: A101, Sunrise Building, Above Bank of Maharashtra, Next to Mc Donalds Lokandwala Market, Andheri West, Mumbai-400053.
        - Availability: Weekdays (Monday to Friday).
        
        Knowledge Base for Explanation (General Information Only):
        1. What is Chiropractic? It's a healthcare profession focused on the diagnosis and treatment of neuromuscular disorders, with an emphasis on treatment through manual adjustment and/or manipulation of the spine.
        2. Diversified Technique: The most common manual adjustment technique. It involves a high-velocity, low-amplitude thrust to restore proper movement and alignment. It's known for the "popping" sound (joint cavitation).
        3. Gonstead Technique: A precise method that emphasizes hands-on adjustment without rotation. It uses thorough spinal analysis (often including X-ray and instrumentation) to detect vertebral subluxation and restore biomechanical function.
        4. Benefits: Aims to reduce pain, improve spinal motion, and enhance the body's physical function.
        
        How to Respond:
        - Tone: Professional, elegant, and quietly confident.
        - Answering condition queries: If someone asks about a specific pain (like L4 back pain), you can say: "Chiropractic care generally focuses on restoring spinal alignment to relieve pressure on nerves. Techniques like Gonstead or Diversified are often used to address spinal mechanical issues. However, since I am an AI, I cannot provide a diagnosis. Dr. Vaibbhav Guray would need to assess your specific condition during a consultation to determine the best protocol."
        - Avoid flowery language. Focus on clinical precision.
        - Always emphasize that a professional consultation is required.
        - Encourage using the "Book Appointment" button.
    `;

    const fetchGeminResponse = async (userContent, chatHistory, keyIdx = 0) => {
        if (keyIdx >= GEMINI_KEYS.length) {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }

        const apiKey = GEMINI_KEYS[keyIdx];
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: systemPrompt }] },
                    ...chatHistory,
                    { role: 'user', parts: [{ text: userContent }] }
                ],
                generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
            })
        });

        const data = await response.json();

        if (response.status === 429 && keyIdx < GEMINI_KEYS.length - 1) {
            console.log(`Key ${keyIdx + 1} rate limited, rotating to next key...`);
            return fetchGeminResponse(userContent, chatHistory, keyIdx + 1);
        }

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to connect to the assistant.");
        }

        if (!data.candidates || data.candidates.length === 0) {
            throw new Error("I apologize, but I couldn't process that request. Please try rephrasing.");
        }

        return data.candidates[0].content.parts[0].text;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

            const botContent = await fetchGeminResponse(userMessage.content, history, 0);

            setMessages(prev => [...prev, {
                role: 'bot',
                content: botContent,
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            let errorMessage = "I apologize, but I'm experiencing a temporary connection issue. Please feel free to call our concierge directly at +91 99203 27166 or email vaibbhavguray@gmail.com for immediate assistance.";

            if (error.message === "RATE_LIMIT_EXCEEDED") {
                errorMessage = "Our elite concierge is handling high volume. Please wait a moment before your next query.";
            }

            setMessages(prev => [...prev, {
                role: 'bot',
                content: errorMessage,
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] font-sans flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-[#F6F8F5] rounded-2xl shadow-2xl w-[380px] sm:w-[400px] h-[600px] flex flex-col overflow-hidden border border-brand-slate/10 mb-4"
                    >
                        {/* Header */}
                        <div className="bg-brand-primary p-4 text-white flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-accent p-2 rounded-full">
                                    <Sparkles size={20} className="text-brand-primary" />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-lg m-0">Elite Concierge</h4>
                                    <p className="text-xs text-brand-accent m-0 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                                        Dr. Vaibbhav Guray's Assistant
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/70 hover:text-white transition-colors border-0 bg-transparent"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F6F8F5]">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`mt-1 p-1 rounded-full h-fit ${msg.role === 'user' ? 'bg-brand-accent' : 'bg-brand-primary'}`}>
                                            {msg.role === 'user' ? <User size={14} className="text-brand-primary" /> : <Bot size={14} className="text-white" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl shadow-sm ${msg.role === 'user'
                                            ? 'bg-brand-slate text-brand-offwhite rounded-tr-none'
                                            : 'bg-brand-sand text-brand-slate rounded-tl-none border border-brand-slate/5'
                                            }`}>
                                            <div className="text-sm m-0 leading-relaxed space-y-2">
                                                {msg.content.split('\n').map((line, i) => (
                                                    <p key={i} className="m-0">
                                                        {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                                return <strong key={j} className="font-bold text-brand-primary">{part.slice(2, -2)}</strong>;
                                                            }
                                                            return part;
                                                        })}
                                                    </p>
                                                ))}
                                            </div>
                                            {msg.role === 'bot' && (
                                                <button
                                                    onClick={onBook}
                                                    className="mt-4 w-full py-2 px-4 bg-brand-accent text-brand-primary font-bold text-[10px] uppercase tracking-[0.1em] rounded-xl hover:bg-brand-accent/90 transition-all flex items-center justify-center gap-2 border-0 shadow-sm"
                                                >
                                                    <Calendar size={12} />
                                                    Schedule Consultation
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 items-center bg-brand-sand border border-brand-slate/5 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                        <Loader2 size={16} className="animate-spin text-brand-accent" />
                                        <p className="text-xs text-brand-slate/50 m-0 italic">Tailoring your response...</p>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-brand-slate/10 bg-[#F6F8F5]">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your query here..."
                                    className="flex-1 bg-brand-sand/30 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-accent transition-all outline-none text-brand-slate"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="bg-brand-primary text-brand-offwhite p-2 rounded-xl hover:bg-brand-forest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                            <p className="text-[10px] text-center text-brand-slate/40 mt-2">
                                Powered by Dr. Vaibbhav Guray's Chiropractic Excellence
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-brand-primary text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 border-0 group relative overflow-hidden h-14 min-w-[3.5rem]"
            >
                <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10"></div>
                <MessageSquare className="group-hover:text-brand-primary transition-colors flex-shrink-0" size={24} />
                {isOpen ? (
                    <span className="font-bold text-sm group-hover:text-brand-primary transition-colors">Close Assistant</span>
                ) : (
                    <span className="font-bold text-sm group-hover:text-brand-primary transition-colors">Elite Support</span>
                )}
                <div className="absolute top-1 right-2 w-3 h-3 bg-brand-accent rounded-full border-2 border-brand-primary animate-pulse"></div>
            </motion.button>
        </div>
    );
};

export default AssistantHelpdesk;
