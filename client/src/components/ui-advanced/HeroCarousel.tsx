import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlide {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    cta: string;
}

const HERO_SLIDES: HeroSlide[] = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop',
        title: 'TRAVEL BEYOND',
        subtitle: 'Curated journeys for the modern wanderer.',
        cta: 'Start Exploring'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670', // Mountain
        title: 'PEAKS & VALLEYS',
        subtitle: 'Discover the serenity of the high mountains.',
        cta: 'View Adventures'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2670', // Beach
        title: 'OCEAN BREEZE',
        subtitle: 'Unwind on the world\'s most pristine beaches.',
        cta: 'Plan Getaway'
    }
];

export const HeroCarousel: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 7000); // 7s for longer viewing
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-slate-950 -mt-20"> {/* Standard viewport height */}
            <AnimatePresence mode="wait">
                {HERO_SLIDES.map((slide, index) => index === current && (
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 z-0"
                    >
                        {/* Parallax Image Effect */}
                        <motion.img
                            src={slide.image}
                            alt={slide.title}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, ease: "linear" }}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-slate-900/90" />
                    </motion.div>
                ))}
            </AnimatePresence>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4 pt-20 pb-32"> {/* Added pb-32 to shift text up */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`text-${current}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            className="h-1 bg-cyan-500 mb-8 mx-auto"
                        />
                        <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
                            {HERO_SLIDES[current].title}
                        </h1>
                        <p className="text-xl md:text-3xl font-light mb-12 max-w-2xl mx-auto text-slate-200 leading-relaxed font-sans tracking-wide">
                            {HERO_SLIDES[current].subtitle}
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button
                                size="lg"
                                className="rounded-full h-16 px-10 text-lg bg-white text-black hover:bg-cyan-50 transition-all hover:scale-105 font-bold tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                onClick={onCtaClick}
                            >
                                {HERO_SLIDES[current].cta} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full h-16 w-16 p-0 border-white/30 text-white hover:bg-white/10 hover:border-white transition-all hover:scale-105"
                            >
                                <Play className="h-6 w-6 fill-current" />
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Side Controls (Arrows) */}
            <div className="absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-6">
                <button onClick={prevSlide} className="pointer-events-auto p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all group backdrop-blur-sm">
                    <ChevronLeft className="h-8 w-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button onClick={nextSlide} className="pointer-events-auto p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all group backdrop-blur-sm">
                    <ChevronRight className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Bottom Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500 shadow-lg",
                            current === idx ? "w-16 bg-cyan-500" : "w-8 bg-white/40 hover:bg-white/60"
                        )}
                    />
                ))}
            </div>
        </section>
    );
};
