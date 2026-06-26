"use client";
import Link          from "next/link";
import { useState }  from "react";
import {
  Phone, Mail,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  CheckCircle,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "About Us",         href: "/about" },
  { label: "Vision & Mission", href: "/vision-mission" },
  { label: "Our Projects",     href: "/projects" },
  { label: "Campaigns",        href: "/campaigns" },
  { label: "Impact Dashboard", href: "/impact" },
  { label: "News & Media",     href: "/news" },
  { label: "Gallery",          href: "/gallery" },
];

const GET_INVOLVED = [
  { label: "Donate Now",         href: "/donate" },
  { label: "Become a Volunteer", href: "/volunteer" },
  // { label: "Fund Predictor",     href: "/fund-predictor" },
  { label: "Corporate CSR",      href: "/contact" },
  { label: "Contact Us",         href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy",              href: "/privacy-policy" },
  { label: "Terms & Conditions",          href: "/terms-and-conditions" },
  { label: "Cancellation & Refund Policy",href: "/refund-policy" },
  { label: "Shipping & Delivery Policy",  href: "/shipping-policy" },
];

function NewsletterMini() {
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading,    setLoading]    = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribers", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source: "footer" }),
      });
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  }

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 text-green-400 text-xs">
        <CheckCircle className="w-4 h-4" />
        Subscribed! Thank you.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email" required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="flex-1 bg-gray-700 text-white text-xs px-3 py-2 rounded-lg placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:border-green-500"
      />
      <button
        type="submit" disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
      >
        {loading ? "..." : "Join"}
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold font-display text-lg">C</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">Community Base Advancement</div>
                <div className="text-xs text-gray-500">Foundation</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-gray-500">
              Equipping, connecting, and supporting communities across India since 2015.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                <a href="tel:+918529716474" className="hover:text-white transition-colors">+91 85297 16474</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                <a href="mailto:info@communityfoundation.in" className="hover:text-white transition-colors text-xs">
                  info@communityfoundation.in
                </a>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-white hover:pl-1 transition-all duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get Involved</h4>
            <ul className="space-y-2">
              {GET_INVOLVED.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-white hover:pl-1 transition-all duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 mb-6">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-white hover:pl-1 transition-all duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2">Subscribe for impact updates</p>
              <NewsletterMini />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Community Base Advancement Foundation. All rights reserved.</p>
          <p>Registered NGO | 80G Tax Exemption Available</p>
        </div>
      </div>
    </footer>
  );
}
