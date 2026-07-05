"use client";
import { useState }    from "react";
import { motion }      from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading,    setLoading]    = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribers", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source: "homepage" }),
      });
      setSubscribed(true);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-5">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Stay Connected, Stay Inspired
            </h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Monthly impact stories, campaign highlights, and ways to get involved — straight to your inbox.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 bg-white/20 rounded-2xl py-4 px-6 max-w-sm mx-auto"
              >
                <CheckCircle className="w-5 h-5 text-blue-300" />
                <span className="text-white font-semibold text-sm">
                  Thank you! You are now part of our mission.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email" required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit" disabled={loading}
                  className="bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
                >
                  {loading ? "Subscribing..." : "Subscribe →"}
                </button>
              </form>
            )}
            <p className="text-white/40 text-xs mt-4">Join 2,400+ subscribers. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
