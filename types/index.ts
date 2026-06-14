export interface CampaignWithProgress {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  endDate: Date | null;
  coverImage: string | null;
  isFeatured: boolean;
  isUrgent: boolean;
  isTrending: boolean;
  percentage: number;
  daysLeft: number | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  budget: number | null;
  spent: number;
  beneficiaries: number | null;
  location: string | null;
  coverImage: string | null;
  isFeatured: boolean;
  impactMetrics: Record<string, any> | null;
  startDate: Date | null;
  endDate: Date | null;
}

export interface ImpactStat {
  icon: string;
  value: number;
  label: string;
  format: (v: number) => string;
}

export type DonationFrequency = "once" | "monthly";

export interface AdminStats {
  totalRaised: number;
  activeCampaigns: number;
  totalVolunteers: number;
  totalSubscribers: number;
  recentDonations: number;
  monthlyGrowth: number;
}
