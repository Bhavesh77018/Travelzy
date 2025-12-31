import React from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Search, Mail, Phone, Users } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from "../ui/avatar";

export const CustomerManagement: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="pl-64">
                <header className="bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Customers</h1>
                        <p className="text-gray-500">Manage relationships and history.</p>
                    </div>
                    <Button>
                        <Mail className="mr-2 h-4 w-4" /> Message All
                    </Button>
                </header>

                <main className="p-8 space-y-8">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <Search className="h-5 w-5 text-gray-400" />
                        <Input placeholder="Search customers by name or email..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="group hover:shadow-lg transition-shadow border-none shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">JD</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold text-lg">John Doe {i}</h3>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Users className="h-3 w-3" /> Recurring Customer
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-400" /> user{i}@example.com
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-gray-400" /> +91 98765 4321{i}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t flex justify-between items-center text-sm">
                                        <div>
                                            <span className="font-bold text-gray-900">₹45k</span>
                                            <span className="text-gray-400 ml-1">Spent</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};
