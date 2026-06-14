import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin user ──────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin@cbaf2025", 10);
  await prisma.user.upsert({
    where:  { email: "admin@communityfoundation.in" },
    update: {},
    create: {
      name:     "CBAF Admin",
      email:    "admin@communityfoundation.in",
      password: hashedPassword,
      role:     "SUPER_ADMIN",
    },
  });
  console.log("  ✓ Admin user created");

  // ── Campaigns ───────────────────────────────────────────────────────────────
  const campaigns = [
    {
      title:        "Hunger-Free Classrooms",
      slug:         "hunger-free-classrooms",
      description:  "Providing nutritious mid-day meals to underprivileged students in rural government schools across Bihar.",
      story:        "<p>Every child deserves to learn on a full stomach. Our Hunger-Free Classrooms initiative ensures that no child misses out on education due to hunger.</p><p>We work with local SHGs and anganwadi workers to prepare and distribute nutritious meals to 500+ students daily across 12 government schools in Gaya district, Bihar.</p>",
      category:     "EDUCATION" as const,
      goalAmount:   10000,
      raisedAmount: 11603,
      donorCount:   45,
      endDate:      new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      isFeatured:   true,
      isUrgent:     false,
      isTrending:   false,
      coverImage:   "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    },
    {
      title:        "Women's Skill Development Program",
      slug:         "womens-skill-development",
      description:  "Vocational training in tailoring, handicrafts, and digital literacy empowering rural women with sustainable livelihoods.",
      story:        "<p>Economic independence is the cornerstone of women's empowerment. Our skill development program equips rural women with marketable skills that translate directly into income.</p>",
      category:     "WOMEN_EMPOWERMENT" as const,
      goalAmount:   150000,
      raisedAmount: 87500,
      donorCount:   312,
      endDate:      new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      isFeatured:   true,
      isUrgent:     false,
      isTrending:   true,
      coverImage:   "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    },
    {
      title:        "Green Plantation Drive 2025",
      slug:         "green-plantation-drive-2025",
      description:  "Planting 10,000 native trees across degraded forest lands in Jharkhand and Odisha to restore biodiversity.",
      story:        "<p>Climate action starts at the grassroots. Our plantation drives mobilize communities to restore their local ecosystems with native species.</p>",
      category:     "ENVIRONMENT" as const,
      goalAmount:   80000,
      raisedAmount: 62000,
      donorCount:   189,
      endDate:      new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      isFeatured:   true,
      isUrgent:     false,
      isTrending:   false,
      coverImage:   "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    },
    {
      title:        "Emergency Relief Fund — Flood Victims",
      slug:         "emergency-relief-flood-2025",
      description:  "Immediate relief — food, water, shelter, and medicines — for families displaced by floods in Assam.",
      story:        "<p>Thousands of families have been displaced by devastating floods. They need our help NOW — food packets, clean water, tarpaulins, and medicines.</p>",
      category:     "EMERGENCY_RELIEF" as const,
      goalAmount:   300000,
      raisedAmount: 230000,
      donorCount:   847,
      endDate:      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      isFeatured:   true,
      isUrgent:     true,
      isTrending:   true,
      coverImage:   "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80",
    },
    {
      title:        "Rural Education Initiative — Bihar",
      slug:         "rural-education-bihar",
      description:  "Building digital classrooms and providing study materials to 500 children in underserved schools of Bihar.",
      story:        "<p>Quality education should not be a privilege of the few. We are transforming 20 government schools in rural Bihar with smart classrooms and trained teachers.</p>",
      category:     "EDUCATION" as const,
      goalAmount:   120000,
      raisedAmount: 45000,
      donorCount:   156,
      endDate:      new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      isFeatured:   false,
      isUrgent:     false,
      isTrending:   false,
      coverImage:   "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    },
    {
      title:        "Youth Leadership Program",
      slug:         "youth-leadership-program",
      description:  "Mentorship and leadership workshops empowering 200 young adults aged 18-25 in tribal communities of Odisha.",
      story:        "<p>Today's youth are tomorrow's change-makers. Our leadership program nurtures young voices from tribal communities, giving them the tools and confidence to lead.</p>",
      category:     "CHILD_WELFARE" as const,
      goalAmount:   60000,
      raisedAmount: 38000,
      donorCount:   98,
      endDate:      new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      isFeatured:   false,
      isUrgent:     false,
      isTrending:   false,
      coverImage:   "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    },
  ];

  for (const campaign of campaigns) {
    await prisma.campaign.upsert({
      where:  { slug: campaign.slug },
      update: { raisedAmount: campaign.raisedAmount, donorCount: campaign.donorCount },
      create: campaign,
    });
  }
  console.log(`  ✓ ${campaigns.length} campaigns seeded`);

  // ── Projects ────────────────────────────────────────────────────────────────
  const projects = [
    {
      title:         "Women's Skill Development Program",
      slug:          "womens-skill-development-project",
      description:   "A comprehensive vocational training program providing tailoring, handicraft, and digital literacy skills to rural women in Bihar and Jharkhand.",
      category:      "Women Empowerment",
      status:        "ONGOING" as const,
      budget:        500000,
      spent:         320000,
      beneficiaries: 450,
      location:      "Bihar, Jharkhand",
      isFeatured:    true,
      impactMetrics: { womenTrained: 320, businessesStarted: 48, avgIncomeIncrease: "65%" },
    },
    {
      title:         "Rural Education Initiative",
      slug:          "rural-education-initiative",
      description:   "Establishing digital learning centers and training teachers in 20 government schools across rural Bihar.",
      category:      "Education",
      status:        "ONGOING" as const,
      budget:        800000,
      spent:         560000,
      beneficiaries: 2400,
      location:      "Gaya, Nalanda, Bihar",
      isFeatured:    true,
      impactMetrics: { schoolsTransformed: 12, studentsEnrolled: 1800, teachersTrained: 45 },
    },
    {
      title:         "Green Plantation Drive",
      slug:          "green-plantation-drive",
      description:   "Community-led tree plantation drives restoring degraded forest lands across Jharkhand and Odisha.",
      category:      "Environment",
      status:        "ONGOING" as const,
      budget:        200000,
      spent:         140000,
      beneficiaries: 5000,
      location:      "Jharkhand, Odisha",
      isFeatured:    false,
      impactMetrics: { treesPlanted: 8500, villagesInvolved: 34, hectaresRestored: 120 },
    },
    {
      title:         "Youth Leadership Program",
      slug:          "youth-leadership-program-project",
      description:   "Leadership development workshops and mentorship for tribal youth aged 18-25 in Odisha.",
      category:      "Youth Development",
      status:        "ONGOING" as const,
      budget:        300000,
      spent:         180000,
      beneficiaries: 600,
      location:      "Koraput, Rayagada, Odisha",
      isFeatured:    true,
      impactMetrics: { youthTrained: 420, projectsLed: 28, communitiesImpacted: 15 },
    },
    {
      title:         "Emergency Relief Campaign",
      slug:          "emergency-relief-campaign",
      description:   "Rapid response infrastructure for natural disaster relief — food kits, shelter materials, and medical support.",
      category:      "Emergency Relief",
      status:        "ONGOING" as const,
      budget:        1000000,
      spent:         750000,
      beneficiaries: 3200,
      location:      "Pan-India (Assam, Bihar, Odisha)",
      isFeatured:    false,
      impactMetrics: { familiesHelped: 2800, reliefKitsDistributed: 4500, medicalCampsConducted: 12 },
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where:  { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log(`  ✓ ${projects.length} projects seeded`);

  // ── Impact Metrics ──────────────────────────────────────────────────────────
  const metrics = [
    { label: "Total Funds Raised",   value: 28000000, unit: "INR",       icon: "💰", category: "financial"    },
    { label: "Lives Impacted",       value: 12400,    unit: "people",    icon: "👥", category: "beneficiaries" },
    { label: "Trees Planted",        value: 8500,     unit: "trees",     icon: "🌳", category: "environment"   },
    { label: "Women Empowered",      value: 3200,     unit: "women",     icon: "👩", category: "empowerment"   },
    { label: "Students Educated",    value: 5800,     unit: "students",  icon: "📚", category: "education"     },
    { label: "Active Volunteers",    value: 320,      unit: "volunteers",icon: "🤝", category: "volunteers"    },
    { label: "Campaigns Completed",  value: 124,      unit: "campaigns", icon: "🏕️", category: "campaigns"    },
    { label: "Districts Reached",    value: 48,       unit: "districts", icon: "🗺️", category: "reach"        },
  ];

  for (const metric of metrics) {
    const existing = await prisma.impactMetric.findFirst({
      where: { label: metric.label },
    });
    if (existing) {
      await prisma.impactMetric.update({
        where: { id: existing.id },
        data:  { value: metric.value },
      });
    } else {
      await prisma.impactMetric.create({ data: metric });
    }
  }
  console.log(`  ✓ ${metrics.length} impact metrics seeded`);

  console.log("");
  console.log("✅ Database seeded successfully!");
  console.log("");
  console.log("Admin credentials:");
  console.log("  Email:    admin@communityfoundation.in");
  console.log("  Password: admin@cbaf2025");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
