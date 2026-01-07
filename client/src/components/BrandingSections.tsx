import { ShieldCheck, HeadphonesIcon, Globe2, Sparkles, Star, Zap, CreditCard, Quote } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export const MarketingBanner = () => {
    return (
        <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 text-white py-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="container mx-auto px-4 flex justify-between items-center text-xs md:text-sm font-bold tracking-wide">
                <div className="flex items-center gap-2 animate-pulse">
                    <Zap className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                    <span>FLASH SALE: 20% OFF ALL TRIPS WITH CODE <span className="text-yellow-300 border-b border-yellow-300">GENZ20</span></span>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <span>🔥 452 people booked today</span>
                    <span className="h-1 w-1 rounded-full bg-white/50" />
                    <span>⏳ Ends in 04:23:12</span>
                </div>
            </div>
        </div>
    );
};

export const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                        <Sparkles className="h-3 w-3" /> The Vibe Check
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
                        Why Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Different?</span>
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed font-light">
                        Forget boring tours. We craft aesthetic, adrenaline-fueled, and soul-searching experiences that actually make you feel something.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Globe2, title: "Unreal Places", desc: "Access to 500+ hidden spots that aren't on every influencer's feed yet.", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                        { icon: Sparkles, title: "Curated Vibez", desc: "Trips designed by locals who know the cool spots, not just the tourist traps.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                        { icon: ShieldCheck, title: "100% Secure", desc: "Verified agencies only. Your money is safe with our escrow protection.", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" }
                    ].map((item, idx) => (
                        <div key={idx} className={`p-8 rounded-3xl bg-white/5 border ${item.border} backdrop-blur-sm hover:transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 group`}>
                            <div className={`h-14 w-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <item.icon className={`h-7 w-7 ${item.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2">
                            Wall of <span className="text-pink-500">Love</span>
                        </h2>
                        <p className="text-slate-400 text-lg">Don't just take our word for it.</p>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="font-bold text-white">4.9/5</span>
                        <span className="text-slate-400 text-sm">from 15k+ reviews</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "Aria Z.", role: "Solo Traveler", quote: "The AI suggestions were insanely accurate. Found my dream trip to Bali in seconds!", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
                        { name: "Marcus L.", role: "Adventure Junkie", quote: "Skydiving over Dubai booked through Travelzy was the smoothest experience ever. Zero stress.", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
                        { name: "Priya & Raj", role: "Honeymooners", quote: "We wanted something unique for our honeymoon. The 'Hidden Gems' filter is a game changer.", image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop" }
                    ].map((t, i) => (
                        <Card key={i} className="p-8 bg-white/5 border-white/10 border backdrop-blur-md hover:bg-white/10 transition-colors">
                            <Quote className="h-8 w-8 text-white/20 mb-6" />
                            <p className="text-lg text-slate-200 font-medium mb-8 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20" />
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <span className="text-sm text-cyan-400 font-medium">{t.role}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const VerifiedBadge = () => {
    return (
        <section className="py-16 bg-black text-white relative overflow-hidden border-y border-white/10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-cyan-500/20 rounded-2xl border border-cyan-500/30">
                            <ShieldCheck className="h-8 w-8 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">100% Verified Partners</h3>
                            <p className="text-slate-400 text-sm">Every agency is vetted. No scams, just vibes.</p>
                        </div>
                    </div>
                    <div className="h-12 w-px bg-white/10 hidden md:block" />
                    <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 items-center">
                        <CreditCard className="h-6 w-6 text-white" />
                        <span className="text-lg font-bold">VISA</span>
                        <span className="text-lg font-bold">Mastercard</span>
                        <span className="text-lg font-bold italic">UPI</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const SupportBanner = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-8 backdrop-blur-md border border-white/20 shadow-lg animate-bounce">
                    <HeadphonesIcon className="h-4 w-4 text-green-400" /> 24/7 Human Support
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                    Never Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Alone.</span>
                </h2>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-12 font-light">
                    Real humans. Real help. No bots. We've got your back from takeoff to touchdown.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" className="h-14 px-8 rounded-full bg-white text-indigo-900 hover:bg-slate-100 font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
                        Chat With Us
                    </Button>
                </div>
            </div>
        </section>
    );
};
