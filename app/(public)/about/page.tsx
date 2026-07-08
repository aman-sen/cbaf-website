import type { Metadata } from "next";
import { Award, Users, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Community Base Advancement Foundation — our story, team, and mission to build stronger communities across India.",
};


export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4 border border-blue-500/30">
            About Us
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Built on Belief, Driven by Purpose
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Since 2022, we have been working at the intersection of community development,
            education, and empowerment to create lasting change in India.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              The Community Base Advancement Foundation was created from a simple yet powerful belief:
              that truly strong communities are built when people are equipped, connected, and supported.
            </p>
            <p>
              Founded in 2022 by a group of development professionals and social entrepreneurs, CBAF
              started with a single women&apos;s skill development program in Shyam Vihar Kakrola, South West Delhi, Delhi. What began
              as a small vocational training initiative quickly grew into a comprehensive community
              development platform as we listened closely to what communities actually needed.
            </p>
            <p>
              We take a holistic approach — we don&apos;t focus on a single issue. Instead, we listen
              to what communities need most and respond with flexible, scalable programs that make a
              real difference. From rural education and women&apos;s empowerment to environmental
              restoration and emergency relief, our work spans the full spectrum of community needs.
            </p>
            <p>
              Today, CBAF operates across 18 states, has impacted 6,200+ lives, and manages 48
              active projects. We remain committed to our founding vision: communities that are
              self-reliant, equitable, and resilient.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Heart className="w-6 h-6 text-red-500" />, title: "Compassion", desc: "We lead with empathy and genuine care for every community we serve." },
              { icon: <Award className="w-6 h-6 text-amber-500" />, title: "Integrity", desc: "Transparent in our finances, honest in our communication, accountable in our actions." },
              { icon: <Users className="w-6 h-6 text-blue-500" />, title: "Inclusion", desc: "Every voice matters. We design programs that reach the most marginalized." },
              { icon: <Globe className="w-6 h-6 text-blue-600" />, title: "Sustainability", desc: "We build programs that communities can own, maintain, and scale on their own." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      
    </div>
  );
}
