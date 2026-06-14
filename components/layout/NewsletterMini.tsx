"use client";
import { useState } from "react";

export function NewsletterMini() {
  const [email, setEmail]       = useState("");
  const [done, setDone]         = useState(false);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribers", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source: "footer" }),
      });
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="text-green-400 text-xs font-medium">
        ✓ Subscribed! Thank you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 bg-gray-700 text-white text-xs px-3 py-2 rounded-lg placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:border-green-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
      >
        {loading ? "…" : "Join"}
      </button>
    </form>
  );
}
