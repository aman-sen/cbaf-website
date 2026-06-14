import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { calculateFundPrediction } from "@/lib/fund-predictor";
import { calculateFundPrediction, PredictorInputs } from "@/lib/fund-predictor";
import { z } from "zod";

const InputSchema = z.object({
  activeDonors:       z.coerce.number().min(0),
  avgDonation:        z.coerce.number().min(0),
  campaignCount:      z.coerce.number().min(0),
  socialReach:        z.coerce.number().min(0),
  volunteerCount:     z.coerce.number().min(0),
  eventParticipation: z.coerce.number().min(0),
  prevYearFunding:    z.coerce.number().min(0),
  monthlyVisitors:    z.coerce.number().min(0),
  emailSubscribers:   z.coerce.number().min(0),
});

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json();
    const result = InputSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
    }

    // const prediction = calculateFundPrediction(result.data);
    const prediction = calculateFundPrediction(result.data as PredictorInputs);

    // Try ML service if configured
    if (process.env.ML_SERVICE_URL) {
      try {
        const mlRes = await fetch(`${process.env.ML_SERVICE_URL}/predict`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            active_donors:       result.data.activeDonors,
            avg_donation:        result.data.avgDonation,
            campaign_count:      result.data.campaignCount,
            social_reach:        result.data.socialReach,
            volunteer_count:     result.data.volunteerCount,
            event_participation: result.data.eventParticipation,
            prev_year_funding:   result.data.prevYearFunding,
            monthly_visitors:    result.data.monthlyVisitors,
            email_subscribers:   result.data.emailSubscribers,
          }),
        });
        if (mlRes.ok) {
          const mlResult = await mlRes.json();
          prediction.predictedMonthly = mlResult.predicted_monthly;
          prediction.predictedAnnual  = mlResult.predicted_annual;
        }
      } catch {
        // Fall back to heuristic — no action needed
      }
    }

    // Save to DB (exclude computed monthlyForecast array)
    const { monthlyForecast, breakdown, ...dbData } = prediction;
    prisma.fundPrediction
      // .create({ data: { ...result.data, ...dbData } })
      .create({ data: { ...result.data, ...dbData } as any })
      .catch(() => {});  // fire-and-forget

    return NextResponse.json(prediction);
  } catch (err) {
    console.error("fund-predictor error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
