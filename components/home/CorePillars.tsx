"use client";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: "🏗️",
    title: "Building Capacity",
    description: "We empower people — especially women and youths — with the skills and networks they need to lead, grow, and build their communities.",
    color: "from-blue-50 to-blue-100",
    border: "border-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🚪",
    title: "Advancing Opportunity",
    description: "We open doors to better education for children, livelihoods for women, and local partnerships that create a brighter future.",
    color: "from-blue-50 to-blue-100",
    border: "border-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🛡️",
    title: "Supporting Well-Being",
    description: "We provide a safety net with services like emergency aid, plantation drives, and community support for the most vulnerable.",
    color: "from-amber-50 to-amber-100",
    border: "border-amber-100",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    icon: "⭐",
    title: "Empowering Leaders",
    description: "We encourage individuals to take the lead on projects and initiatives that champion their own community development.",
    color: "from-purple-50 to-purple-100",
    border: "border-purple-100",
    badge: "bg-purple-100 text-purple-700",
  },
];

export function CorePillars() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4">
            Our Approach
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Four Core Pillars
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every program we run is rooted in one of these foundational commitments to lasting community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${pillar.color} rounded-2xl p-6 border ${pillar.border} cursor-default`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${pillar.badge} rounded-xl text-2xl mb-4`}>
                {pillar.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
