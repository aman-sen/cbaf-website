import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Media",
  description: "Latest news, press releases, and updates from Community Base Advancement Foundation.",
};

const newsItems = [
  { date: "December 2024", title: "CBAF Reaches 12,000 Beneficiaries Milestone", excerpt: "We are proud to announce that our programs have now impacted over 12,000 individuals across 18 states in India.", tag: "Milestone" },
  { date: "November 2024", title: "Green Plantation Drive Plants 8,500 Trees in Jharkhand", excerpt: "Our latest plantation campaign in Jharkhand resulted in 8,500 native trees planted across 34 villages, supported by 200+ volunteers.", tag: "Environment" },
  { date: "October 2024", title: "Emergency Relief Fund Responds to Assam Floods", excerpt: "CBAF deployed rapid relief to 2,800 flood-affected families within 48 hours of the Assam floods, distributing food kits, medicines, and tarpaulins.", tag: "Relief" },
  { date: "September 2024", title: "Women's Skill Development Program Graduates 320 Women", excerpt: "Our flagship skill development program completed its fifth batch, graduating 320 women with vocational skills in tailoring, handicrafts, and digital literacy.", tag: "Empowerment" },
  { date: "August 2024", title: "CBAF Launches Digital Classrooms in 12 Bihar Schools", excerpt: "We inaugurated smart classrooms in 12 government schools across Gaya and Nalanda districts, benefiting 1,800+ students.", tag: "Education" },
  { date: "July 2024", title: "Youth Leadership Program Expands to Odisha", excerpt: "Our Youth Leadership Program has expanded to tribal communities in Koraput and Rayagada, empowering 420 young adults with leadership and entrepreneurship skills.", tag: "Youth" },
];

const TAG_COLORS: Record<string, string> = {
  Milestone:    "bg-purple-100 text-purple-700",
  Environment:  "bg-green-100 text-green-700",
  Relief:       "bg-red-100 text-red-700",
  Empowerment:  "bg-pink-100 text-pink-700",
  Education:    "bg-blue-100 text-blue-700",
  Youth:        "bg-amber-100 text-amber-700",
};

export default function NewsPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-16 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-3">News & Media</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Latest updates, announcements, and stories from the field.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-5">
          {newsItems.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${TAG_COLORS[item.tag] || "bg-gray-100 text-gray-600"}`}>
                  {item.tag}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0">{item.date}</span>
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{item.excerpt}</p>
              <button className="mt-3 text-green-600 font-semibold text-sm hover:underline">Read More →</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
