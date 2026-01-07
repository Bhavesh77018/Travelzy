import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Send, X, Bot, Sparkles, MapPin, Loader2 } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import type { Trip } from '../types';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    trips?: Trip[];
    isTyping?: boolean;
}

export const AiTravelAssistant: React.FC = () => {
    const { trips, navigateToTripDetail } = useAppState();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'ai', text: 'Hi! I\'m your AI Travel Planner. Tell me what kind of trip you are looking for? (e.g., "Beach trip under 50k", "Adventure in Himalayas")' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsThinking(true);

        // Simulate AI processing delay
        setTimeout(() => {
            const response = generateAiResponse(userMsg.text);
            setIsThinking(false);
            setMessages(prev => [...prev, response]);
        }, 1500);
    };

    const generateAiResponse = (userInput: string): Message => {
        const lowerInput = userInput.toLowerCase();
        let matchedTrips: Trip[] = [];
        let replyText = '';

        // 1. Keyword Extraction & Filtering
        if (lowerInput.includes('beach') || lowerInput.includes('sea') || lowerInput.includes('ocean') || lowerInput.includes('goa')) {
            matchedTrips = trips.filter(t => t.destination.toLowerCase().includes('goa') || t.destination.toLowerCase().includes('kerala') || t.category === 'Relaxation' || t.title.toLowerCase().includes('beach'));
        } else if (lowerInput.includes('mountain') || lowerInput.includes('himalaya') || lowerInput.includes('snow') || lowerInput.includes('trek') || lowerInput.includes('ladakh')) {
            matchedTrips = trips.filter(t => t.destination.toLowerCase().includes('ladakh') || t.destination.toLowerCase().includes('kashmir') || t.destination.toLowerCase().includes('manali') || t.category === 'Adventure');
        } else if (lowerInput.includes('spiritual') || lowerInput.includes('temple') || lowerInput.includes('yoga') || lowerInput.includes('peace') || lowerInput.includes('meditation') || lowerInput.includes('varanasi') || lowerInput.includes('rishikesh')) {
            matchedTrips = trips.filter(t => t.category === 'Spiritual' || t.destination.toLowerCase().includes('varanasi') || t.destination.toLowerCase().includes('rishikesh'));
        } else if (lowerInput.includes('honeymoon') || lowerInput.includes('couple') || lowerInput.includes('romantic') || lowerInput.includes('love')) {
            matchedTrips = trips.filter(t => t.category === 'Honeymoon' || t.type === 'romantic' || t.destination.toLowerCase().includes('maldives') || t.destination.toLowerCase().includes('swiss'));
        } else if (lowerInput.includes('family') || lowerInput.includes('kids')) {
            matchedTrips = trips.filter(t => t.type === 'family' || t.category === 'Cultural');
        } else if (lowerInput.includes('luxury') || lowerInput.includes('premium') || lowerInput.includes('expensive')) {
            matchedTrips = trips.filter(t => t.category === 'Luxury' || t.price > 80000);
        } else if (lowerInput.includes('kerala') || lowerInput.includes('south')) {
            matchedTrips = trips.filter(t => t.destination.toLowerCase().includes('kerala'));
        } else {
            // Generic search if no specific category detected
            matchedTrips = trips.filter(t => t.title.toLowerCase().includes(lowerInput) || t.destination.toLowerCase().includes(lowerInput));
        }

        // 2. Budget Filtering
        const budgetMatch = lowerInput.match(/under (\d+)k?/);
        if (budgetMatch) {
            const numbers = lowerInput.match(/(\d+)(?:k|000)?/);
            if (numbers) {
                // If it's just "under 15", assume 15k. If "15000", take as is.
                let amount = parseInt(numbers[1]);
                if (amount < 1000) amount *= 1000;

                if (matchedTrips.length === 0) matchedTrips = trips; // Reset if only filtering by budget
                matchedTrips = matchedTrips.filter(t => t.price <= amount);
            }
        }

        // 3. Construct Response
        if (matchedTrips.length > 0) {
            const places = Array.from(new Set(matchedTrips.map(t => t.destination))).join(', ');
            const randomResponses = [
                `I found ${matchedTrips.length} amazing trips for you, featuring destinations like ${places}. Check these out:`,
                `Ooh, great choice! Here are some top-rated options for ${lowerInput} that you'll love:`,
                `Spot on! These trips match your vibe perfectly (` + places + `):`,
            ];
            replyText = randomResponses[Math.floor(Math.random() * randomResponses.length)];
        } else {
            replyText = "I couldn't find exact matches for that right now 😅. Try asking for 'Spiritual trips', 'Beaches under 20k', or 'Luxury Honeymoon'. Here are some popular ones instead:";
            matchedTrips = trips.slice(0, 2); // Fallback
        }

        return {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: replyText,
            trips: matchedTrips.slice(0, 3) // Limit to top 3
        };
    };

    return (
        <>
            {/* FAB Trigger */}
            <div className="fixed bottom-6 right-6 z-50">
                {!isOpen && (
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center gap-1"
                    >
                        <Sparkles className="h-6 w-6 text-white animate-pulse" />
                        <span className="text-[10px] font-bold text-white">AI Plan</span>
                    </Button>
                )}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[600px] animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <Card className="h-full flex flex-col shadow-2xl border-0 overflow-hidden rounded-3xl">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-full">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">Travelzy AI</h3>
                                    <p className="text-xs text-purple-200 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Online
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                            ? 'bg-purple-600 text-white rounded-br-none'
                                            : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.text}</p>

                                        {/* Trip Suggestions Cards */}
                                        {msg.trips && msg.trips.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {msg.trips.map(trip => (
                                                    <div
                                                        key={trip.id}
                                                        onClick={() => navigateToTripDetail(trip.id)}
                                                        className="bg-white/10 (msg.sender === 'user' ? '' : 'bg-slate-50') border border-black/5 rounded-xl p-2 flex gap-3 cursor-pointer hover:bg-black/5 transition-colors"
                                                    >
                                                        <img src={trip.images[0]} alt="trip" className="w-12 h-12 rounded-lg object-cover" />
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-xs truncate">{trip.title}</h4>
                                                            <div className="flex justify-between items-center mt-1">
                                                                <span className="text-[10px] opacity-70 flex items-center gap-0.5">
                                                                    <MapPin className="w-3 h-3" /> {trip.destination}
                                                                </span>
                                                                <span className="font-bold text-xs">₹{trip.price.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                                        <span className="text-xs text-gray-400">Thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2 items-center"
                            >
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask for a trip..."
                                    className="rounded-full bg-slate-100 border-0 focus-visible:ring-1 focus-visible:ring-purple-600"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="rounded-full bg-purple-600 hover:bg-purple-700 w-10 h-10 shrink-0 shadow-md"
                                    disabled={!inputValue.trim() || isThinking}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};
