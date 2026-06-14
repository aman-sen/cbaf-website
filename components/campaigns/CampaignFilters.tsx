"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "EDUCATION", label: "Education" },
  { value: "WOMEN_EMPOWERMENT", label: "Women Empowerment" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "ENVIRONMENT", label: "Environment" },
  { value: "EMERGENCY_RELIEF", label: "Emergency Relief" },
  { value: "CHILD_WELFARE", label: "Child Welfare" },
  { value: "LIVELIHOOD", label: "Livelihood" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "endingSoon", label: "Ending Soon" },
  { value: "mostFunded", label: "Most Funded" },
  { value: "mostDonors", label: "Most Donors" },
];

interface Props {
  onSearch: (q: string) => void;
  onCategory: (cat: string) => void;
  onSort: (sort: string) => void;
  onFilter: (filter: string) => void;
}

export function CampaignFilters({ onSearch, onCategory, onSort, onFilter }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");

  const quickFilters = [
    { key: "all", label: "All" },
    { key: "featured", label: "⭐ Featured" },
    { key: "urgent", label: "🚨 Urgent" },
    { key: "trending", label: "🔥 Trending" },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>
        <select
          onChange={(e) => onCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-green-500 bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <select
          onChange={(e) => onSort(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-green-500 bg-white"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => { setActiveFilter(f.key); onFilter(f.key); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
