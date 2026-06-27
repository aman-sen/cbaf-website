"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, ArrowRight, Play } from "lucide-react";

const slides = [
  {
    heading: "Building Stronger Communities, Together",
    subheading: "We equip, connect, and support people across India — from women empowerment and rural education to emergency relief and environmental action.",
    cta: "Donate Now",
    ctaHref: "/donate",
    bg: "from-slate-900 via-green-950 to-slate-900",
  },
  {
    heading: "Every Rupee You Give Changes a Life",
    subheading: "₹500 provides an educational kit. ₹1000 feeds 10 children for a month. Your generosity, amplified by our programs, creates real change on the ground.",
    cta: "See Campaigns",
    ctaHref: "/campaigns",
    bg: "from-slate-900 via-blue-950 to-slate-900",
  },
  {
    heading: "Join 320+ Volunteers Making a Difference",
    subheading: "From teaching rural children to planting trees, our volunteers are the backbone of everything we do. Your time and skills matter.",
    cta: "Become a Volunteer",
    ctaHref: "/volunteer",
    bg: "from-gray-900 via-emerald-950 to-gray-900",
  },
];

const heroStats = [
  { value: "₹2.8Cr+", label: "Funds Raised" },
  { value: "6,200+", label: "Beneficiaries" },
  { value: "48", label: "Active Campaigns" },
  { value: "100+", label: "Volunteers" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className={`relative min-h-[560px] bg-gradient-to-br ${slide.bg} flex items-center overflow-hidden transition-all duration-1000`}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Registered NGO — India
          </motion.div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
            >
              {slide.heading.split(" ").map((word, i) =>
                word === "Stronger" || word === "Rupee" || word === "320+" ? (
                  <span key={i} className="text-green-400">{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </motion.h1>
          </AnimatePresence>

          {/* Subheading */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {slide.subheading}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/50"
            >
              <Heart className="w-4 h-4" /> {slide.cta}
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4" /> Become Volunteer
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium px-4 py-3 transition-colors"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-green-400" : "w-4 bg-white/30"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
