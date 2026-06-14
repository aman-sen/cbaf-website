export interface PredictorInputs {
  activeDonors: number;
  avgDonation: number;
  campaignCount: number;
  socialReach: number;
  volunteerCount: number;
  eventParticipation: number;
  prevYearFunding: number;
  monthlyVisitors: number;
  emailSubscribers: number;
}

export interface PredictorOutput {
  predictedMonthly: number;
  predictedAnnual: number;
  growthRate: number;
  fundingHealthScore: number;
  sustainabilityScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  breakdown: {
    donorContribution: number;
    campaignContribution: number;
    viralContribution: number;
    retentionContribution: number;
  };
  monthlyForecast: { month: string; predicted: number; conservative: number; optimistic: number }[];
}

export function calculateFundPrediction(inputs: PredictorInputs): PredictorOutput {
  const {
    activeDonors, avgDonation, campaignCount, socialReach,
    volunteerCount, eventParticipation, prevYearFunding,
    monthlyVisitors, emailSubscribers,
  } = inputs;

  const baseMonthly = activeDonors * avgDonation;
  const campaignMult = 1 + campaignCount * 0.12;
  const socialMult   = 1 + Math.log10(Math.max(socialReach, 1)) * 0.08;
  const volunteerMult = 1 + volunteerCount * 0.005;
  const emailMult    = 1 + emailSubscribers * 0.002;
  const eventMult    = 1 + eventParticipation * 0.01;

  const predictedMonthly = Math.round(
    baseMonthly * campaignMult * socialMult * volunteerMult * emailMult * eventMult
  );
  const predictedAnnual = predictedMonthly * 12;
  const growthRate = prevYearFunding > 0
    ? Math.round(((predictedAnnual - prevYearFunding) / prevYearFunding) * 1000) / 10
    : 0;

  const convRate = monthlyVisitors > 0 ? activeDonors / monthlyVisitors : 0;

  let health = 0;
  health += Math.min(25, (convRate / 0.02) * 25);
  health += Math.min(20, (campaignCount / 5) * 20);
  health += Math.min(15, (volunteerCount / 50) * 15);
  health += Math.min(20, (emailSubscribers / 1000) * 20);
  health += growthRate >= 10 ? 20 : growthRate >= 0 ? 10 : 0;
  const fundingHealthScore = Math.round(health);

  const sustainabilityScore = Math.min(100, Math.round(
    (activeDonors / 100 * 30) + (emailSubscribers / 2000 * 40) + (volunteerCount / 100 * 30)
  ));

  const riskLevel: PredictorOutput["riskLevel"] =
    fundingHealthScore >= 75 ? "LOW" :
    fundingHealthScore >= 50 ? "MEDIUM" :
    fundingHealthScore >= 25 ? "HIGH" : "CRITICAL";

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const monthlyForecast = months.map((m, i) => {
    const idx = (now.getMonth() + i) % 12;
    const seasonality = [0.85, 0.88, 0.95, 1.0, 1.05, 1.0, 0.9, 0.95, 1.05, 1.15, 1.2, 1.35][idx];
    return {
      month: months[idx],
      predicted: Math.round(predictedMonthly * seasonality),
      conservative: Math.round(predictedMonthly * seasonality * 0.75),
      optimistic: Math.round(predictedMonthly * seasonality * 1.3),
    };
  });

  return {
    predictedMonthly,
    predictedAnnual,
    growthRate,
    fundingHealthScore,
    sustainabilityScore,
    riskLevel,
    breakdown: {
      donorContribution: Math.round(baseMonthly),
      campaignContribution: Math.round(baseMonthly * (campaignMult - 1)),
      viralContribution: Math.round(baseMonthly * (socialMult - 1)),
      retentionContribution: Math.round(baseMonthly * (emailMult - 1)),
    },
    monthlyForecast,
  };
}
