"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Users, Globe } from "lucide-react";

const stats = [
  { value: "48", label: "Active Projects" },
  { value: "18", label: "States Covered" },
  { value: "12K+", label: "Lives Impacted" },
  { value: "9+", label: "Years of Service" },
];

export function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden h-80 bg-gradient-to-br from-green-50 to-blue-50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.15),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-4">🌱</div>
                  <div className="font-display text-2xl font-bold text-green-700">Est. 2015</div>
                  <div className="text-sm text-gray-500 mt-1">Serving Communities</div>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-gray-700">80G Certified</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-gray-700">Pan-India NGO</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Built on Belief,<br />
              <span className="text-green-600">Driven by Purpose</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Community Base Advancement Foundation was created from a simple yet powerful belief:
              that truly strong communities are built when people are equipped, connected, and supported.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We take a holistic approach — we don't focus on a single issue. Instead, we listen to
              what communities need most and respond with flexible, scalable programs that make a real difference.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="font-display text-2xl font-bold text-green-600">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-green-700 font-semibold border-2 border-green-600 px-5 py-2.5 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200"
            >
              Read Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
