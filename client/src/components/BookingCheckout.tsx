import { useState } from 'react';
import { ArrowLeft, CreditCard, ShieldCheck, Ticket, Calendar, Zap, Wallet, Smartphone, Landmark, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useAppState } from '../hooks/useAppState';
import { Label } from './ui/label';

export const BookingCheckout = () => {
    const { bookingData, navigateToCustomerHome, trips, navigateToBookingConfirmation } = useAppState();
    const [step, setStep] = useState(1);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
    const [selectedPayment, setSelectedPayment] = useState('upi');

    // Find trip based on booking data or use the first one as fallback for preview sanity if bookingData is missing
    const selectedTrip = trips.find(t => t.id === bookingData?.tripId) || trips[0];

    // Safety check - if no booking data and no default trip, return null (or handle gracefully)
    if (!selectedTrip) return <div className="text-white text-center pt-20">Loading Checkout...</div>;

    // Price Logic
    // If bookingData exists, use its price, otherwise mock it for preview
    const basePrice = bookingData ? bookingData.totalPrice : selectedTrip.price;
    const taxes = Math.round(basePrice * 0.18);
    const platformFee = 199;

    // Final Calculation with Discount
    const finalPrice = Math.max(0, basePrice + taxes + platformFee - discount);

    // Calculate total guests safely
    const guestCount = bookingData ? (bookingData.guests.adults + bookingData.guests.children) : 1;

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === 'GENZ20') {
            const disc = Math.round(basePrice * 0.20);
            setDiscount(disc);
            setCouponMessage({ type: 'success', text: `Woohoo! You saved ₹${disc.toLocaleString()}` });
        } else {
            setDiscount(0);
            setCouponMessage({ type: 'error', text: 'Invalid code. Try "GENZ20" 😉' });
        }
    };

    const handlePayment = () => {
        // Simulate payment processing
        setTimeout(() => {
            const mockBookingId = `BK${Math.floor(Math.random() * 1000000)}`;
            navigateToBookingConfirmation(mockBookingId);
        }, 1500);
    };

    const paymentMethods = [
        { id: 'upi', icon: Smartphone, label: 'UPI', desc: 'GPay, PhonePe, Paytm' },
        { id: 'card', icon: CreditCard, label: 'Card', desc: 'Credit & Debit Cards' },
        { id: 'wallet', icon: Wallet, label: 'Wallet', desc: 'Amazon, Paytm' },
        { id: 'netbanking', icon: Landmark, label: 'NetBanking', desc: 'All Indian Banks' }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
            <div className="container mx-auto px-6 py-8">
                <Button
                    variant="ghost"
                    onClick={navigateToCustomerHome}
                    className="mb-8 pl-0 hover:bg-transparent text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back to Explore
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Form & Payment */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Steps Indicator */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 1 ? 'bg-cyan-600 text-white' : 'bg-white/10 text-slate-500'}`}>1</div>
                            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-cyan-600' : 'bg-white/10'}`} />
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 2 ? 'bg-cyan-600 text-white' : 'bg-white/10 text-slate-500'}`}>2</div>
                        </div>

                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                                <h2 className="text-3xl font-bold tracking-tight">Who's Travelling?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-400">First Name</Label>
                                        <Input className="bg-white/5 border-white/10 h-12 text-white focus-visible:ring-cyan-500" placeholder="e.g. Aryan" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-400">Last Name</Label>
                                        <Input className="bg-white/5 border-white/10 h-12 text-white focus-visible:ring-cyan-500" placeholder="e.g. Sharma" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-400">Email Address</Label>
                                        <Input className="bg-white/5 border-white/10 h-12 text-white focus-visible:ring-cyan-500" placeholder="aryan@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-400">Phone Number</Label>
                                        <Input className="bg-white/5 border-white/10 h-12 text-white focus-visible:ring-cyan-500" placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                                <Button size="lg" className="w-full h-14 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-lg mt-4" onClick={() => setStep(2)}>
                                    Continue to Payment
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight mb-6">Payment Method</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {paymentMethods.map((pm) => (
                                            <div
                                                key={pm.id}
                                                onClick={() => setSelectedPayment(pm.id)}
                                                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${selectedPayment === pm.id ? 'bg-cyan-500/20 border-cyan-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${selectedPayment === pm.id ? 'bg-cyan-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                                                    <pm.icon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold ${selectedPayment === pm.id ? 'text-white' : 'text-slate-300'}`}>{pm.label}</h4>
                                                    <p className="text-xs text-slate-500">{pm.desc}</p>
                                                </div>
                                                {selectedPayment === pm.id && <CheckCircle2 className="ml-auto h-5 w-5 text-cyan-400" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bank Offers */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Ticket className="h-5 w-5 text-yellow-400" /> Bank Offers</h3>
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {['HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((bank, i) => (
                                            <div key={i} className="min-w-[200px] p-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl whitespace-nowrap">
                                                <p className="text-xs text-cyan-400 font-bold mb-1">10% INSTANT DISCOUNT</p>
                                                <p className="font-bold text-sm">on {bank} Cards</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full h-14 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(22,163,74,0.4)] transition-transform active:scale-95"
                                    onClick={handlePayment}
                                >
                                    Pay ₹{finalPrice.toLocaleString()} & Book Now
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Trip Card */}
                            <Card className="bg-white/5 border-white/10 overflow-hidden backdrop-blur-md">
                                <img src={selectedTrip.images[0]} alt={selectedTrip.title} className="w-full h-48 object-cover opacity-80" />
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold leading-tight mb-2">{selectedTrip.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Calendar className="h-4 w-4" /> {selectedTrip.duration || '5 Days'}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full w-fit animate-pulse">
                                        <Zap className="h-3 w-3" /> 12 people viewing this
                                    </div>
                                </div>
                            </Card>

                            {/* Coupon Section */}
                            <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-md">
                                <h3 className="font-bold mb-4">Have a Coupon?</h3>
                                <div className="flex gap-2">
                                    <Input
                                        className="bg-black/30 border-white/10 text-white uppercase placeholder:normal-case font-mono tracking-wider focus-visible:ring-cyan-500"
                                        placeholder="Enter code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <Button onClick={handleApplyCoupon} variant="secondary" className="font-bold bg-white text-black hover:bg-slate-200">Apply</Button>
                                </div>
                                {couponMessage.text && (
                                    <p className={`text-sm mt-3 font-medium ${couponMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {couponMessage.text}
                                    </p>
                                )}
                            </Card>

                            {/* Price Breakdown */}
                            <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-md">
                                <h3 className="font-bold mb-4 text-lg">Price Details</h3>
                                <div className="space-y-3 text-sm text-slate-300">
                                    <div className="flex justify-between">
                                        <span>Base Price ({guestCount} Guests)</span>
                                        <span>₹{basePrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxes & GST (18%)</span>
                                        <span>+ ₹{taxes.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Platform Fee</span>
                                        <span>+ ₹{platformFee}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-400 font-bold">
                                            <span>Coupon Discount</span>
                                            <span>- ₹{discount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="h-px bg-white/10 my-4" />
                                    <div className="flex justify-between text-xl font-bold text-white">
                                        <span>Total Amount</span>
                                        <span>₹{finalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </Card>

                            <div className="flex items-start gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <h4 className="font-bold text-sm text-cyan-400">Free Cancellation</h4>
                                    <p className="text-xs text-slate-400">Cancel up to 24 hours before trip start for a full refund.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

