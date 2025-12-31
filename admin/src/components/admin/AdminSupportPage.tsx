import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AdminSidebar } from './AdminSidebar';

export const AdminSupportPage: React.FC = () => {
    const { tickets, resolveTicket } = useAppState();

    return (
        <div className="min-h-screen bg-muted/30 flex">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
                        <p className="text-muted-foreground">Manage user inquiries and issues.</p>
                    </div>

                    <div className="grid gap-6">
                        {tickets.map((ticket) => (
                            <Card key={ticket.id}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-primary" />
                                        {ticket.subject}
                                    </CardTitle>
                                    {ticket.status === 'OPEN' ? (
                                        <Badge variant="destructive">Open</Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>User: {ticket.user}</span>
                                            <span>ID: {ticket.id}</span>
                                        </div>
                                        <div className="bg-muted p-4 rounded-lg text-sm">
                                            {ticket.messages[0].text}
                                        </div>

                                        {ticket.status === 'OPEN' && (
                                            <div className="flex justify-end">
                                                <Button size="sm" onClick={() => resolveTicket(ticket.id)} className="gap-2">
                                                    <CheckCircle className="h-4 w-4" /> Mark as Resolved
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
