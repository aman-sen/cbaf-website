import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  icon: LucideIcon;
  color: "green" | "blue" | "purple" | "amber" | "red";
  change?: string;
}

const COLORS = {
  green:  "bg-green-50  text-green-600",
  blue:   "bg-blue-50   text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  amber:  "bg-amber-50  text-amber-600",
  red:    "bg-red-50    text-red-500",
};

export function AdminStatsCard({ label, value, icon: Icon, color, change }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${COLORS[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">{change}</span>}
      </div>
      <div className="font-display text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}
