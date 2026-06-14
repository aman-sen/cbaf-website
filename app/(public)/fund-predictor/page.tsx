"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle, Loader2, Brain } from "lucide-react";

const schema = z.object({
  activeDonors:       z.number({ coerce: true }).min(0),
  avgDonation:        z.number({ coerce: true }).min(0),
  campaignCount:      z.number({ coerce: true }).min(0),
  socialReach:        z.number({ coerce: true }).min(0),
  volunteerCount:     z.number({ coerce: true }).min(0),
  eventParticipation: z.number({ coerce: true }).min(0),
  prevYearFunding:    z.number({ coerce: true }).min(0),
  monthlyVisitors:    z.number({ coerce: true }).min(0),
  emailSubscribers:   z.number({ coerce: true }).min(0),
});

type FormData = z.infer<typeof schema>;

const RISK_CONFIG = {
  LOW:      { color: "text-green-600",  bg: "bg-green-50  border-green-200",  icon: CheckCircle,    label: "Low Risk" },
  MEDIUM:   { color: "text-amber-600",  bg: "bg-amber-50  border-amber-200",  icon: AlertTriangle,  label: "Medium Risk" },
  HIGH:     { color: "text-orange-600", bg: "bg-orange-50 border-orange-200", icon: AlertTriangle,  label: "High Risk" },
  CRITICAL: { color: "text-red-600",    bg: "bg-red-50    border-red-200",    icon: AlertTriangle,  label: "Critical Risk" },
};

const fields = [
  { key: "activeDonors",       label: "Active Donors",           placeholder: "e.g. 150",    tip: "Unique donors who gave in the last 12 months" },
  { key: "avgDonation",        label: "Average Donation (₹)",    placeholder: "e.g. 1500",   tip: "Average donation amount per donor" },
  { key: "campaignCount",      label: "Active Campaigns",        placeholder: "e.g. 5",      tip: "Number of live fundraising campaigns" },
  { key: "socialReach",        label: "Social Media Followers",  placeholder: "e.g. 5000",   tip: "Total followers across all platforms" },
  { key: "volunteerCount",     label: "Active Volunteers",       placeholder: "e.g. 50",     tip: "Volunteers active in the last 3 months" },
  { key: "eventParticipation", label: "Event Participants/Month",placeholder: "e.g. 20",     tip: "Average attendees at your monthly events" },
  { key: "prevYearFunding",    label: "Previous Year Total (₹)", placeholder: "e.g. 500000", tip: "Total donations collected last financial year" },
  { key: "monthlyVisitors",    label: "Monthly Website Visitors",placeholder: "e.g. 2000",   tip: "Average monthly visitors to your website" },
  { key: "emailSubscribers",   label: "Email Subscribers",       placeholder: "e.g. 800",    tip: "Total active email list subscribers" },
];

export default function FundPredictorPage() {
  const [result, setResult] = useState<any>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { activeDonors: 150, avgDonation: 1500, campaignCount: 5, socialReach: 5000, volunteerCount: 50, eventParticipation: 20, prevYearFunding: 500000, monthlyVisitors: 2000, emailSubscribers: 800 },
  });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/fund-predictor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const prediction = await res.json();
    setResult(prediction);
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  const formatINR = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-16 px-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500/20 rounded-2xl mb-5">
          <Brain className="w-7 h-7 text-blue-400" />
        </div>
        <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4 border border-blue-500/30">
          AI-Powered Tool
        </span>
        <h1 className="font-display text-4xl font-bold text-white mb-3">NGO Fund Predictor</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Enter your organisation&apos;s data and get AI-driven predictions for monthly and annual funding,
          growth rates, health scores, and risk indicators.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Input Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6">Organisation Data</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    {...register(field.key as keyof FormData)}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-1">{field.tip}</p>
                </div>
              ))}
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Calculating...</> : <><Brain className="w-4 h-4" /> Generate Prediction</>}
            </button>
          </form>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div id="results" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Predicted Monthly", value: formatINR(result.predictedMonthly), color: "bg-green-50 border-green-200", valueColor: "text-green-700" },
                  { label: "Predicted Annual", value: formatINR(result.predictedAnnual), color: "bg-blue-50 border-blue-200", valueColor: "text-blue-700" },
                  { label: "Growth Rate", value: `${result.growthRate > 0 ? "+" : ""}${result.growthRate}%`, color: result.growthRate >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200", valueColor: result.growthRate >= 0 ? "text-emerald-700" : "text-red-700" },
                  { label: "Health Score", value: `${result.fundingHealthScore}/100`, color: "bg-purple-50 border-purple-200", valueColor: "text-purple-700" },
                ].map((kpi) => (
                  <div key={kpi.label} className={`${kpi.color} rounded-2xl p-5 border`}>
                    <div className="text-xs text-gray-500 font-medium mb-2">{kpi.label}</div>
                    <div className={`font-display text-2xl font-bold ${kpi.valueColor}`}>{kpi.value}</div>
                  </div>
                ))}
              </div>

              {/* Scores + Risk */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="text-xs text-gray-400 mb-2">Sustainability Score</div>
                  <div className="font-display text-3xl font-bold text-gray-800 mb-2">{result.sustainabilityScore}<span className="text-lg text-gray-400">/100</span></div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${result.sustainabilityScore}%` }} />
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="text-xs text-gray-400 mb-2">Funding Health Score</div>
                  <div className="font-display text-3xl font-bold text-gray-800 mb-2">{result.fundingHealthScore}<span className="text-lg text-gray-400">/100</span></div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${result.fundingHealthScore}%` }} />
                  </div>
                </div>
                {(() => {
                  const rc = RISK_CONFIG[result.riskLevel as keyof typeof RISK_CONFIG];
                  const RiskIcon = rc.icon;
                  return (
                    <div className={`rounded-2xl border p-5 ${rc.bg}`}>
                      <div className="text-xs text-gray-400 mb-2">Risk Indicator</div>
                      <div className={`flex items-center gap-2 font-display text-xl font-bold ${rc.color}`}>
                        <RiskIcon className="w-5 h-5" /> {rc.label}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Based on diversification, growth, and sustainability metrics</p>
                    </div>
                  );
                })()}
              </div>

              {/* Monthly Forecast Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-5">12-Month Funding Forecast</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={result.monthlyForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: any) => formatINR(v)} />
                    <Legend />
                    <Line type="monotone" dataKey="predicted" name="Predicted" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="conservative" name="Conservative" stroke="#93c5fd" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                    <Line type="monotone" dataKey="optimistic" name="Optimistic" stroke="#6ee7b7" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Breakdown Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-5">Revenue Contribution Breakdown</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={[
                    { name: "Donors", value: result.breakdown.donorContribution },
                    { name: "Campaigns", value: result.breakdown.campaignContribution },
                    { name: "Viral/Social", value: result.breakdown.viralContribution },
                    { name: "Retention", value: result.breakdown.retentionContribution },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: any) => formatINR(v)} />
                    <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* AI Upgrade Notice */}
              <div className="mt-5 bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">AI/ML Upgrade Available</p>
                  <p className="text-xs text-blue-700">
                    This prediction uses our v1 heuristic model. Connect your historical donation data to enable
                    our Random Forest + XGBoost ensemble model for significantly higher accuracy predictions.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
