// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart, Users, ArrowRight, Play } from "lucide-react";

// const slides = [
//   {
//     heading: "Building Stronger Communities, Together",
//     subheading: "We equip, connect, and support people across India — from women empowerment and rural education to emergency relief and environmental action.",
//     cta: "Donate Now",
//     ctaHref: "/donate",
//     // bg: "from-slate-900 via-blue-950 to-slate-900",
//     highlight: "Stronger",
//     image:"/hero/slide1.jpg",
//   },
//   {
//     heading: "Every Rupee You Give Changes a Life",
//     subheading: "₹500 provides an educational kit. ₹1000 feeds 10 children for a month. Your generosity, amplified by our programs, creates real change on the ground.",
//     cta: "See Campaigns",
//     ctaHref: "/campaigns",
//     // bg: "from-slate-900 via-blue-950 to-slate-900",
//      highlight: "Rupee",
//     image: "/hero/slide2.jpg",
//   },
//   {
//     heading: "Join 320+ Volunteers Making a Difference",
//     subheading: "From teaching rural children to planting trees, our volunteers are the backbone of everything we do. Your time and skills matter.",
//     cta: "Become a Volunteer",
//     ctaHref: "/volunteer",
//     // bg: "from-slate-900 via-blue-950 to-slate-900",
//      highlight: "320+",
//     image: "/hero/slide3.jpg",
//   },
// ];

// const heroStats = [
//   { value: "₹2.8Cr+", label: "Funds Raised" },
//   { value: "6,200+", label: "Beneficiaries" },
//   { value: "48", label: "Active Campaigns" },
//   { value: "100+", label: "Volunteers" },
// ];

// export function HeroSection() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const slide = slides[current];

// return (
//     // <section className={`relative min-h-[560px] bg-gradient-to-br ${slide.bg} flex items-center overflow-hidden transition-colors duration-1000`}>
//     <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
//     {/* <section className={`relative min-h-[560px] bg-gradient-to-br ${slide.bg} flex items-center overflow-hidden transition-all duration-1000`}> */}
//       {/* Background decorations */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//   <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
//   <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
// </div>
//       {/* <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
//         <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
//         <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-5" />
//       </div> */}

//       {/* <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full"> */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
//         <div className="max-w-2xl">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
//           >
//             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//             Registered NGO — India
//           </motion.div>

//           {/* Heading */}
//           <AnimatePresence mode="wait">
//             <motion.h1
//               key={current}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
//             >
//               {slide.heading.split(" ").map((word, i) =>
//                 word === "Stronger" || word === "Rupee" || word === "320+" ? (
//                   <span key={i} className="text-blue-400">{word} </span>
//                 ) : (
//                   <span key={i}>{word} </span>
//                 )
//               )}
//             </motion.h1>
//           </AnimatePresence>

//           {/* Subheading */}
//           <AnimatePresence mode="wait">
//             <motion.p
//               key={`sub-${current}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl"
//             >
//               {slide.subheading}
//             </motion.p>
//           </AnimatePresence>

//           {/* CTAs */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="flex flex-wrap gap-3"
//           >
//             <Link
//               href={slide.ctaHref}
//               className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/50"
//             >
//               <Heart className="w-4 h-4" /> {slide.cta}
//             </Link>
//             <Link
//               href="/volunteer"
//               className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
//             >
//               <Users className="w-4 h-4" /> Become Volunteer
//             </Link>
//             <Link
//               href="/projects"
//               className="inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium px-4 py-3 transition-colors"
//             >
//               View Projects <ArrowRight className="w-4 h-4" />
//             </Link>
//           </motion.div>
//         </div>

//         {/* Slide indicators */}
//         <div className="flex gap-2 mt-10">
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrent(i)}
//               className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-blue-400" : "w-4 bg-white/30"}`}
//               aria-label={`Go to slide ${i + 1}`}
//             />
//           ))}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 w-full">
//         {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 w-full"> */}
//           {heroStats.map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 + i * 0.1 }}
//             >
//               <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
//               <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, ArrowRight } from "lucide-react";

const slides = [
  {
    heading: "Building Stronger Communities, Together",
    subheading: "We equip, connect, and support people across India — from women empowerment and rural education to emergency relief and environmental action.",
    cta: "Donate Now",
    ctaHref: "/donate",
    highlight: "Stronger",
    image: "/hero/slide1.jpg",
  },
  {
    heading: "Every Rupee You Give Changes a Life",
    subheading: "₹500 provides an educational kit. ₹1000 feeds 10 children for a month. Your generosity, amplified by our programs, creates real change on the ground.",
    cta: "Donate Now",
    ctaHref: "/donate",
    highlight: "Rupee",
    image: "/hero/slide2.jpg",
  },
  {
    heading: "Join 400+ Volunteers Making a Difference",
    subheading: "From teaching rural children to planting trees, our volunteers are the backbone of everything we do. Your time and skills matter.",
    cta: "Become a Volunteer",
    ctaHref: "/volunteer",
    highlight: "400+",
    image: "/hero/slide3.jpg",
  },
];

const heroStats = [
  { value: "6,000+", label: "Trees Planted" },
  { value: "6,200+",  label: "Beneficiaries" },
  { value: "Pan India",      label: "Presence" },
  { value: "400+",    label: "Volunteers" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden min-h-[600px] flex flex-col">

      {/* Background image with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </AnimatePresence>

      {/* Dark overlay — keeps text readable */}
      <div className="absolute inset-0 z-10 bg-slate-900/65" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-center py-16">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Registered NGO — India
          </motion.div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`heading-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
            >
              {slide.heading.split(" ").map((word, i) =>
                word === slide.highlight ? (
                  <span key={i} className="text-blue-400">{word} </span>
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
              className="text-gray-200 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {slide.subheading}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${current}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Heart className="w-4 h-4" /> {slide.cta}
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium px-6 py-3 rounded-xl border border-white/30 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
              >
                <Users className="w-4 h-4" /> Become Volunteer
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-gray-200 hover:text-white font-medium px-4 py-3 transition-colors"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-blue-400" : "w-4 bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-20 w-full border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}