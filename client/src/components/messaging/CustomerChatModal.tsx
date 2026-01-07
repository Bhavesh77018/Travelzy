import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { useAppState } from '../../hooks/useAppState';
import { toast } from 'sonner';

interface CustomerChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripId: string;
    tripTitle: string;
    vendorId: string;
    vendorName: string;
}

export const CustomerChatModal: React.FC<CustomerChatModalProps> = ({
    isOpen,
    onClose,
    tripId,
    tripTitle,
    vendorId,
    vendorName
}) => {
    const [message, setMessage] = useState('');
    const { sendMessage } = useAppState();

    const handleSend = () => {
        if (!message.trim()) return;

        // Convert tripId and vendorId to strings if they aren't already (just in case)
        const vId = String(vendorId);
        const tId = String(tripId);

        sendMessage(message, tId, vId, 'customer');
        toast.success('Message sent to agency!');
        setMessage('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-slate-900">
                        <MessageCircle className="h-5 w-5 text-cyan-600" />
                        Contact {vendorName}
                    </DialogTitle>
                    <p className="text-sm text-slate-500 mt-1">
                        Inquiring about: <span className="font-semibold text-slate-700">{tripTitle}</span>
                    </p>
                </DialogHeader>

                <div className="py-4">
                    <Textarea
                        placeholder={`Hi, I'm interested in this trip. Is it available for...`}
                        className="min-h-[120px] resize-none focus-visible:ring-cyan-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <p className="text-xs text-slate-400 mt-2">
                        Typically replies within 24 hours.
                    </p>
                </div>

                <DialogFooter className="sm:justify-between flex gap-2">
                    <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                        Cancel
                    </Button>
                    <Button onClick={handleSend} className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
