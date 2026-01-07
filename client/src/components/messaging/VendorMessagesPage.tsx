import React, { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button'; // Keeping Button/Input as they are commonly used and likely fine
import { Input } from '../ui/input';
import { Search, Send, MoreVertical, ArrowLeft, MessageCircle } from 'lucide-react';

export const VendorMessagesPage: React.FC = () => {
    const { conversations, messages, sendMessage, navigateToVendorDashboard } = useAppState();
    const state = { conversations, messages }; // Shim for existing code
    const setView = navigateToVendorDashboard; // Shim for existing code
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const currentVendorId = 'v1';
    const vendorConversations = state.conversations.filter(c => c.vendorId === currentVendorId);

    const filteredConversations = vendorConversations.filter(c =>
        c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.tripTitle || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedConversation = vendorConversations.find(c => c.id === selectedConversationId);

    const currentMessages = selectedConversation
        ? state.messages.filter(m =>
            (m.tripId === selectedConversation.tripId) &&
            (m.senderId === selectedConversation.customerId && m.receiverId === currentVendorId ||
                m.senderId === currentVendorId && m.receiverId === selectedConversation.customerId)
        ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        : [];

    const handleSendReply = () => {
        if (!replyText.trim() || !selectedConversation) return;

        sendMessage(
            replyText,
            selectedConversation.tripId || '',
            currentVendorId,
            'vendor'
        );
        setReplyText('');
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-80 md:w-96 bg-white border-r flex flex-col h-full">
                <div className="p-4 border-b">
                    <Button variant="ghost" className="mb-2 pl-0 hover:bg-transparent" onClick={() => setView()}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                    </Button>
                    <h1 className="text-xl font-bold text-slate-800">Messages</h1>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search travelers..."
                            className="pl-9 bg-slate-50 border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            <p>No messages found</p>
                        </div>
                    ) : (
                        filteredConversations.map(conv => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConversationId(conv.id)}
                                className={`p-4 border-b hover:bg-slate-50 cursor-pointer transition-colors ${selectedConversationId === conv.id ? 'bg-cyan-50 border-l-4 border-l-cyan-500' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-slate-800">{conv.customerName}</h3>
                                    {conv.unreadCount > 0 && (
                                        <span className="bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full">{conv.unreadCount}</span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 font-medium truncate mb-1">{conv.tripTitle}</p>
                                <p className="text-sm text-slate-600 truncate">{conv.lastMessage}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-full bg-slate-100/50">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                                    {selectedConversation.customerName.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-800">{selectedConversation.customerName}</h2>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span>Inquiry for: <span className="font-medium text-cyan-600">{selectedConversation.tripTitle}</span></span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5 text-slate-500" />
                            </Button>
                        </div>

                        {/* Messages Feed */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {currentMessages.map((msg) => {
                                const isMe = msg.senderRole === 'vendor';
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${isMe
                                            ? 'bg-cyan-600 text-white rounded-br-none'
                                            : 'bg-white text-slate-800 border rounded-bl-none'
                                            }`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <span className={`text-[10px] block mt-1 ${isMe ? 'text-cyan-100' : 'text-slate-400'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t mt-auto">
                            <div className="flex gap-2">
                                <Input
                                    className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-cyan-500"
                                    placeholder="Type your reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                                />
                                <Button onClick={handleSendReply} className="bg-cyan-600 hover:bg-cyan-700">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <MessageCircle className="h-16 w-16 mb-4 opacity-20" />
                        <p className="text-lg font-medium">Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};
