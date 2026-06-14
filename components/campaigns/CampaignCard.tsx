"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Tag } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface CampaignCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  endDate?: Date | string | null;
  coverImage?: string | null;
  isFeatured?: boolean;
  isUrgent?: boolean;
  isTrending?: boolean;
  index?: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  EDUCATION: "Education",
  WOMEN_EMPOWERMENT: "Women Empowerment",
  HEALTHCARE: "Healthcare",
  ENVIRONMENT: "Environment",
  EMERGENCY_RELIEF: "Emergency Relief",
  CHILD_WELFARE: "Child Welfare",
  LIVELIHOOD: "Livelihood",
  OTHER: "Other",
};

export function CampaignCard({
  id, title, slug, description, category,
  goalAmount, raisedAmount, donorCount,
  endDate, coverImage, isUrgent, isTrending,
  index = 0,
}: CampaignCardProps) {
  const percentage = Math.round((raisedAmount / goalAmount) * 100);
  const daysLeft = endDate
    ? Math.max(0, Math.ceil((new Date(endDate).getTime() - Date.now()) / 86400000))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden flex-shrink-0">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-40">🌱</div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {isUrgent && (
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">Urgent</span>
          )}
          {isTrending && (
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">Trending</span>
          )}
          {percentage >= 100 && (
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">
              {percentage}% Funded ✓
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{description}</p>

        <ProgressBar raised={raisedAmount} goal={goalAmount} />

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 my-3">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" /> {donorCount.toLocaleString("en-IN")} donors
          </span>
          {daysLeft !== null && (
            <span className={`flex items-center gap-1 ${daysLeft <= 7 ? "text-red-500 font-semibold" : ""}`}>
              <Clock className="w-3 h-3" />
              {daysLeft === 0 ? "Ending today" : `${daysLeft} days left`}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {CATEGORY_LABELS[category] || category}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/donate?campaign=${id}`}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2.5 rounded-xl text-center transition-colors"
          >
            ❤ Donate Now
          </Link>
          <Link
            href={`/campaigns/${slug}`}
            className="flex-1 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded-xl text-center transition-colors"
          >
            View Campaign
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
