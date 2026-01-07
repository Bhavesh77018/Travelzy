
import type { Message, Conversation } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MessageServiceName {
    private messages: Message[] = [];
    private conversations: Conversation[] = [];

    async sendMessage(message: Message): Promise<Message> {
        await delay(300);
        this.messages.push(message);
        return message;
    }

    async getConversations(_userId: string, _role: 'customer' | 'vendor'): Promise<Conversation[]> {
        await delay(400);
        // Filter logic would go here in a real backend. 
        // For now, we return simulated data managed in memory or local storage if we wanted persistence.
        return [...this.conversations];
    }

    // Helper to sync simulated state if needed, though typically StateContext manages this in frontend-only apps.
    // In this architecture, this service simulates the API calls.
}

export const MessageService = new MessageServiceName();
