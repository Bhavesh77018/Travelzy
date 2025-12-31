import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, User, Bot, ArrowLeft } from 'lucide-react';

export const ChatSupportPage: React.FC = () => {
    const { navigateToCustomerHome } = useAppState();
    const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'bot' }[]>([
        { id: '1', text: 'Hello! How can I help you regarding your travel plans today?', sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = { id: Date.now().toString(), text: inputText, sender: 'user' as const };
        setMessages(prev => [...prev, newMessage]);
        setInputText('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: (Date.now() + 1).toString(),
                text: "Thanks for reaching out! Our support team is currently offline, but we've logged your query. Expect a reply within 24 hours.",
                sender: 'bot' as const
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-muted/30 p-4 md:p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl flex flex-col h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden border">
                {/* Header */}
                <div className="bg-primary p-4 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={navigateToCustomerHome}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h2 className="font-bold text-lg">Travelzy Support</h2>
                            <p className="text-xs text-blue-100">Usually replies in minutes</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border rounded-tl-none text-gray-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t flex gap-2">
                    <Input
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        className="rounded-full"
                    />
                    <Button size="icon" className="rounded-full" onClick={handleSend}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
