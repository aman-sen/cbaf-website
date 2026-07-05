import type { Metadata } from "next";
import { DonationWidget } from "@/components/donation/DonationWidget";
import { Heart, Shield, Award, Zap } from "lucide-react";

export const metadata: Metadata = {
  title:       "Donate",
  description: "Make a donation to Community Base Advancement Foundation.",
};

async function getActiveCampaigns() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.campaign.findMany({
      where:   { status: "ACTIVE" },
      select:  { id: true, title: true, category: true, raisedAmount: true, goalAmount: true },
      orderBy: [{ isUrgent: "desc" }, { isFeatured: "desc" }],
      take:    10,
    });
  } catch {
    return [];
  }
}

// Fallback campaign id for demo when DB not connected
const DEMO_CAMPAIGN_ID = "demo-campaign-id";

export default async function DonatePage() {
  const activeCampaigns = await getActiveCampaigns();
  const generalCampaign = activeCampaigns[0] || null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-5">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Make a Donation</h1>
          <p className="text-green-100 text-lg">
            Your generosity fuels real change. Every rupee goes directly to communities that need it most.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeCampaigns.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Choose a Campaign</h2>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {activeCampaigns.map((c) => {
                    const pct = Math.round((c.raisedAmount / c.goalAmount) * 100);
                    return (
                      <label
                        key={c.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                      >
                        <input
                          type="radio"
                          name="campaign"
                          value={c.id}
                          defaultChecked={c.id === generalCampaign?.id}
                          className="accent-blue-600"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 text-sm truncate">{c.title}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {c.category.replace("_", " ")} · {pct}% funded
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-display text-lg font-bold text-gray-900 mb-5">Donation Details</h2>
              <DonationWidget
                campaignId={generalCampaign?.id || DEMO_CAMPAIGN_ID}
                campaignTitle={generalCampaign?.title || "Community Base Advancement Foundation"}
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-display font-bold text-gray-900 mb-4">Your Impact</h3>
              <div className="space-y-3">
                {[
                  { amount: 500,   impact: "📚 Educational kit for 1 child" },
                  { amount: 1000,  impact: "🍱 Meals for 10 children (1 month)" },
                  { amount: 2500,  impact: "🧵 Skill development for 1 woman" },
                  { amount: 5000,  impact: "🏘️ Community development fund" },
                  { amount: 10000, impact: "⭐ Sponsor a full program" },
                ].map((item) => (
                  <div
                    key={item.amount}
                    className="flex gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100"
                  >
                    <span className="text-blue-700 font-bold text-sm whitespace-nowrap">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-blue-800 text-sm">{item.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-display font-bold text-gray-900 mb-4">Why Donate with Us</h3>
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "100% secure payments via Razorpay",  color: "text-blue-600" },
                  { icon: Award,  text: "80G tax exemption certificate",        color: "text-blue-600"  },
                  { icon: Zap,    text: "Direct impact — no middlemen",         color: "text-amber-600" },
                  { icon: Heart,  text: "Instant receipt sent to your email",   color: "text-red-500"   },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                    <span className="text-sm text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
