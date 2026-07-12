import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "Our vision and mission at Community Base Advancement Foundation — building equity, opportunity, and resilience across India.",
};

export default function VisionMissionPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-20 px-4 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Vision & Mission</h1>
        <p className="text-gray-300 max-w-xl mx-auto">The north star that guides every program, partnership, and decision we make.</p>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Vision */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 sm:p-12 border border-blue-200">
            <div className="text-5xl mb-5">🌟</div>
            <h2 className="font-display text-3xl font-bold text-blue-900 mb-4">Our Vision</h2>
            <p className="text-blue-800 text-lg leading-relaxed">
              A world where every community — regardless of geography, gender, or economic status —
              has access to the resources, knowledge, and opportunities needed to thrive with dignity
              and self-determination.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 sm:p-12 border border-blue-200">
            <div className="text-5xl mb-5">🎯</div>
            <h2 className="font-display text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-blue-800 text-lg leading-relaxed">
              To build stronger, more equitable communities by equipping individuals with skills,
              expanding access to education and healthcare, fostering environmental stewardship,
              and providing rapid, compassionate relief in times of crisis.
            </p>
          </div>

          {/* Strategic Goals */}
          {/* <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Strategic Goals 2025–2030</h2>
            <div className="space-y-4">
              {[
                { num: "01", goal: "Impact 50,000 lives across 25 states by 2030." },
                { num: "02", goal: "Empower 10,000 women with sustainable livelihoods." },
                { num: "03", goal: "Plant 1 million trees through community-led plantation drives." },
                { num: "04", goal: "Establish 100 digital learning centers in rural government schools." },
                { num: "05", goal: "Build a rapid-response emergency relief network reaching every district within 72 hours." },
              ].map((g) => (
                <div key={g.num} className="flex gap-5 items-start p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="font-display text-2xl font-black text-green-200 flex-shrink-0">{g.num}</span>
                  <p className="text-gray-700 font-medium">{g.goal}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
