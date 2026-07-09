// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding database...");

//   // ── Admin user ──────────────────────────────────────────────────────────────
//   const hashedPassword = await bcrypt.hash("admin@cbaf2025", 10);
//   await prisma.user.upsert({
//     where:  { email: "admin@communityfoundation.in" },
//     update: {},
//     create: {
//       name:     "CBAF Admin",
//       email:    "admin@communityfoundation.in",
//       password: hashedPassword,
//       role:     "SUPER_ADMIN",
//     },
//   });
//   console.log("  ✓ Admin user created");

//   // ── Campaigns ───────────────────────────────────────────────────────────────
//   const campaigns = [
//     {
//       title:        "Hunger-Free Classrooms",
//       slug:         "hunger-free-classrooms",
//       description:  "Providing nutritious mid-day meals to underprivileged students in rural government schools across Bihar.",
//       story:        "<p>Every child deserves to learn on a full stomach. Our Hunger-Free Classrooms initiative ensures that no child misses out on education due to hunger.</p><p>We work with local SHGs and anganwadi workers to prepare and distribute nutritious meals to 500+ students daily across 12 government schools in Gaya district, Bihar.</p>",
//       category:     "EDUCATION" as const,
//       goalAmount:   10000,
//       raisedAmount: 11603,
//       donorCount:   45,
//       endDate:      new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//       isFeatured:   true,
//       isUrgent:     false,
//       isTrending:   false,
//       coverImage:   "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
//     },
//     {
//       title:        "Women's Skill Development Program",
//       slug:         "womens-skill-development",
//       description:  "Vocational training in tailoring, handicrafts, and digital literacy empowering rural women with sustainable livelihoods.",
//       story:        "<p>Economic independence is the cornerstone of women's empowerment. Our skill development program equips rural women with marketable skills that translate directly into income.</p>",
//       category:     "WOMEN_EMPOWERMENT" as const,
//       goalAmount:   150000,
//       raisedAmount: 87500,
//       donorCount:   312,
//       endDate:      new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
//       isFeatured:   true,
//       isUrgent:     false,
//       isTrending:   true,
//       coverImage:   "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
//     },
//     {
//       title:        "Green Plantation Drive 2025",
//       slug:         "green-plantation-drive-2025",
//       description:  "Planting 10,000 native trees across degraded forest lands in Jharkhand and Odisha to restore biodiversity.",
//       story:        "<p>Climate action starts at the grassroots. Our plantation drives mobilize communities to restore their local ecosystems with native species.</p>",
//       category:     "ENVIRONMENT" as const,
//       goalAmount:   80000,
//       raisedAmount: 62000,
//       donorCount:   189,
//       endDate:      new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//       isFeatured:   true,
//       isUrgent:     false,
//       isTrending:   false,
//       coverImage:   "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
//     },
//     {
//       title:        "Emergency Relief Fund — Flood Victims",
//       slug:         "emergency-relief-flood-2025",
//       description:  "Immediate relief — food, water, shelter, and medicines — for families displaced by floods in Assam.",
//       story:        "<p>Thousands of families have been displaced by devastating floods. They need our help NOW — food packets, clean water, tarpaulins, and medicines.</p>",
//       category:     "EMERGENCY_RELIEF" as const,
//       goalAmount:   300000,
//       raisedAmount: 230000,
//       donorCount:   847,
//       endDate:      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
//       isFeatured:   true,
//       isUrgent:     true,
//       isTrending:   true,
//       coverImage:   "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80",
//     },
//     {
//       title:        "Rural Education Initiative — Bihar",
//       slug:         "rural-education-bihar",
//       description:  "Building digital classrooms and providing study materials to 500 children in underserved schools of Bihar.",
//       story:        "<p>Quality education should not be a privilege of the few. We are transforming 20 government schools in rural Bihar with smart classrooms and trained teachers.</p>",
//       category:     "EDUCATION" as const,
//       goalAmount:   120000,
//       raisedAmount: 45000,
//       donorCount:   156,
//       endDate:      new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
//       isFeatured:   false,
//       isUrgent:     false,
//       isTrending:   false,
//       coverImage:   "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
//     },
//     {
//       title:        "Youth Leadership Program",
//       slug:         "youth-leadership-program",
//       description:  "Mentorship and leadership workshops empowering 200 young adults aged 18-25 in tribal communities of Odisha.",
//       story:        "<p>Today's youth are tomorrow's change-makers. Our leadership program nurtures young voices from tribal communities, giving them the tools and confidence to lead.</p>",
//       category:     "CHILD_WELFARE" as const,
//       goalAmount:   60000,
//       raisedAmount: 38000,
//       donorCount:   98,
//       endDate:      new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
//       isFeatured:   false,
//       isUrgent:     false,
//       isTrending:   false,
//       coverImage:   "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
//     },
//   ];

//   for (const campaign of campaigns) {
//     await prisma.campaign.upsert({
//       where:  { slug: campaign.slug },
//       update: { raisedAmount: campaign.raisedAmount, donorCount: campaign.donorCount },
//       create: campaign,
//     });
//   }
//   console.log(`  ✓ ${campaigns.length} campaigns seeded`);

//   // ── Projects ────────────────────────────────────────────────────────────────
//   // const projects = [
//   //   {
//   //     title:         "Women's Skill Development Program",
//   //     slug:          "womens-skill-development-project",
//   //     description:   "A comprehensive vocational training program providing tailoring, handicraft, and digital literacy skills to rural women in Bihar and Jharkhand.",
//   //     category:      "Women Empowerment",
//   //     status:        "ONGOING" as const,
//   //     budget:        500000,
//   //     spent:         320000,
//   //     beneficiaries: 450,
//   //     location:      "Bihar, Jharkhand",
//   //     isFeatured:    true,
//   //     impactMetrics: { womenTrained: 320, businessesStarted: 48, avgIncomeIncrease: "65%" },
//   //   },
//   //   {
//   //     title:         "Rural Education Initiative",
//   //     slug:          "rural-education-initiative",
//   //     description:   "Establishing digital learning centers and training teachers in 20 government schools across rural Bihar.",
//   //     category:      "Education",
//   //     status:        "ONGOING" as const,
//   //     budget:        800000,
//   //     spent:         560000,
//   //     beneficiaries: 2400,
//   //     location:      "Gaya, Nalanda, Bihar",
//   //     isFeatured:    true,
//   //     impactMetrics: { schoolsTransformed: 12, studentsEnrolled: 1800, teachersTrained: 45 },
//   //   },
//   //   {
//   //     title:         "Green Plantation Drive",
//   //     slug:          "green-plantation-drive",
//   //     description:   "Community-led tree plantation drives restoring degraded forest lands across Jharkhand and Odisha.",
//   //     category:      "Environment",
//   //     status:        "ONGOING" as const,
//   //     budget:        200000,
//   //     spent:         140000,
//   //     beneficiaries: 5000,
//   //     location:      "Jharkhand, Odisha",
//   //     isFeatured:    false,
//   //     impactMetrics: { treesPlanted: 8500, villagesInvolved: 34, hectaresRestored: 120 },
//   //   },
//   //   {
//   //     title:         "Youth Leadership Program",
//   //     slug:          "youth-leadership-program-project",
//   //     description:   "Leadership development workshops and mentorship for tribal youth aged 18-25 in Odisha.",
//   //     category:      "Youth Development",
//   //     status:        "ONGOING" as const,
//   //     budget:        300000,
//   //     spent:         180000,
//   //     beneficiaries: 600,
//   //     location:      "Koraput, Rayagada, Odisha",
//   //     isFeatured:    true,
//   //     impactMetrics: { youthTrained: 420, projectsLed: 28, communitiesImpacted: 15 },
//   //   },
//   //   {
//   //     title:         "Emergency Relief Campaign",
//   //     slug:          "emergency-relief-campaign",
//   //     description:   "Rapid response infrastructure for natural disaster relief — food kits, shelter materials, and medical support.",
//   //     category:      "Emergency Relief",
//   //     status:        "ONGOING" as const,
//   //     budget:        1000000,
//   //     spent:         750000,
//   //     beneficiaries: 3200,
//   //     location:      "Pan-India (Assam, Bihar, Odisha)",
//   //     isFeatured:    false,
//   //     impactMetrics: { familiesHelped: 2800, reliefKitsDistributed: 4500, medicalCampsConducted: 12 },
//   //   },
//   // ];

//   const projects = [
//   {
//     title:         "Shanti Vidya Setu",
//     slug:          "shanti-vidya-setu",
//     description:   "Connecting marginalized communities to digital literacy, life skills, and livelihood pathways.",
//     story:         "In rapidly urbanizing and displaced communities, youth and young adults often find themselves cut off from the modern economy due to systemic gaps in digital literacy, functional life skills, and vocational guidance. Without these critical competencies, generational cycles of underemployment and financial instability persist. The Community Base Advancement Foundation's Shanti Vidya Setu (Bridge of Knowledge) initiative establishes hyper-local, technology-enabled learning centers that equip youth with the practical skills, digital fluency, and socioeconomic confidence needed to transition successfully into higher education or formal employment.",
//     category:      "Education",
//     status:        "ONGOING" as const,
//     budget:        500000,
//     spent:         320000,
//     beneficiaries: 450,
//     location:      "Delhi, India",
//     isFeatured:    true,
//     coverImage:    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
//     impactMetrics: { youthTrained: 320, centersEstablished: 5, employmentRate: "68%" },
//   },
//   {
//     title:         "Hariyali: Clean & Green Communities",
//     slug:          "hariyali-clean-green-communities",
//     description:   "Planting trees, protecting nature, and promoting healthy spaces.",
//     story:         "Clean surroundings and green spaces are essential for healthy, sustainable communities. Yet, many neighborhoods in India struggle with waste mismanagement, lack of greenery, and rising pollution. Hariyali, an initiative by the Community Base Advancement Foundation, drives community-led cleanliness campaigns and tree plantation drives to create cleaner, greener, and healthier living spaces.",
//     category:      "Environment",
//     status:        "ONGOING" as const,
//     budget:        200000,
//     spent:         140000,
//     beneficiaries: 5000,
//     location:      "Pan-India",
//     isFeatured:    true,
//     coverImage:    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop",
//     impactMetrics: { treesPlanted: 8500, cleanupDrives: 34, volunteersInvolved: 420 },
//   },
//   {
//     title:         "Skill Shakti: Powering Youth Potential",
//     slug:          "skill-shakti-powering-youth-potential",
//     description:   "Turning skills into opportunities, and opportunities into futures.",
//     story:         "In today's competitive world, education alone is not enough to secure employment. Millions of young Indians—especially those from underserved communities—struggle to convert their potential into real opportunities. Skill Shakti, an initiative of the Community Base Advancement Foundation, bridges this gap by equipping youth and women with market-relevant skills, life skills, and career pathways. Our mission: to turn raw talent into employability, self-reliance, and social change.",
//     category:      "Women Empowerment",
//     status:        "ONGOING" as const,
//     budget:        800000,
//     spent:         560000,
//     beneficiaries: 2400,
//     location:      "Delhi, Bihar, Jharkhand",
//     isFeatured:    true,
//     coverImage:    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop",
//     impactMetrics: { womenTrained: 1200, jobPlacements: 480, skillCenters: 8 },
//   },
//   {
//     title:         "Pragati Path: Pathways to Brighter Futures",
//     slug:          "pragati-path-brighter-futures",
//     description:   "From slums to schools, from survival to success.",
//     story:         "Millions of children in India's underserved communities grow up without access to safety, nutrition, or quality education. Pragati Path, an initiative by the Community Base Advancement Foundation, provides a nurturing environment where children receive nutritious meals, academic support, emotional care, and life skills. We aim to empower children not just to survive—but to thrive, learn, and dream of brighter futures.",
//     category:      "Child Welfare",
//     status:        "ONGOING" as const,
//     budget:        600000,
//     spent:         420000,
//     beneficiaries: 1800,
//     location:      "Delhi, Uttar Pradesh",
//     isFeatured:    true,
//     coverImage:    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
//     impactMetrics: { childrenSupported: 1200, mealsProvided: 85000, schoolEnrollment: "94%" },
//   },
// ];

//   for (const project of projects) {
//     // await prisma.project.upsert({
//     //   where:  { slug: project.slug },
//     //   update: {},
//     //   create: project,
//     // });
//     await prisma.project.upsert({
//   where:  { slug: project.slug },
//   update: {
//     title:         project.title,
//     description:   project.description,
//     category:      project.category,
//     coverImage:    project.coverImage,
//     impactMetrics: project.impactMetrics,
//     beneficiaries: project.beneficiaries,
//     location:      project.location,
//   },
//   create: project,
// });
//   }
//   console.log(`  ✓ ${projects.length} projects seeded`);

//   // ── Impact Metrics ──────────────────────────────────────────────────────────
//   const metrics = [
//     { label: "Total Funds Raised",   value: 28000000, unit: "INR",       icon: "💰", category: "financial"    },
//     { label: "Lives Impacted",       value: 6200,    unit: "people",    icon: "👥", category: "beneficiaries" },
//     { label: "Trees Planted",        value: 5000,     unit: "trees",     icon: "🌳", category: "environment"   },
//     { label: "Women Empowered",      value: 1000,     unit: "women",     icon: "👩", category: "empowerment"   },
//     { label: "Students Educated",    value: 1100,     unit: "students",  icon: "📚", category: "education"     },
//     { label: "Active Volunteers",    value: 100,      unit: "volunteers",icon: "🤝", category: "volunteers"    },
//     { label: "Campaigns Completed",  value: 50,      unit: "campaigns", icon: "🏕️", category: "campaigns"    },
//     { label: "Districts Reached",    value: 6,       unit: "districts", icon: "🗺️", category: "reach"        },
//   ];

//   for (const metric of metrics) {
//     const existing = await prisma.impactMetric.findFirst({
//       where: { label: metric.label },
//     });
//     if (existing) {
//       await prisma.impactMetric.update({
//         where: { id: existing.id },
//         data:  { value: metric.value },
//       });
//     } else {
//       await prisma.impactMetric.create({ data: metric });
//     }
//   }
//   console.log(`  ✓ ${metrics.length} impact metrics seeded`);

//   console.log("");
//   console.log("✅ Database seeded successfully!");
//   console.log("");
//   console.log("Admin credentials:");
//   console.log("  Email:    admin@communityfoundation.in");
//   console.log("  Password: admin@cbaf2025");
// }

// main()
//   .catch((e) => { console.error(e); process.exit(1); })
//   .finally(() => prisma.$disconnect());



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
      story:        "<p>Every child deserves to learn on a full stomach.</p>",
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
      description:  "Vocational training in tailoring, handicrafts, and digital literacy empowering rural women.",
      story:        "<p>Economic independence is the cornerstone of women's empowerment.</p>",
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
      description:  "Planting 10,000 native trees across degraded forest lands in Jharkhand and Odisha.",
      story:        "<p>Climate action starts at the grassroots.</p>",
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
      description:  "Immediate relief — food, water, shelter, and medicines — for families displaced by floods.",
      story:        "<p>Thousands of families have been displaced by devastating floods.</p>",
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
      description:  "Building digital classrooms and providing study materials to 500 children in Bihar.",
      story:        "<p>Quality education should not be a privilege of the few.</p>",
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
      description:  "Mentorship and leadership workshops empowering 200 young adults in tribal communities.",
      story:        "<p>Today's youth are tomorrow's change-makers.</p>",
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

  // ── Projects — delete old ones first then create new ───────────────────────
  await prisma.project.deleteMany({});
  console.log("  ✓ Old projects cleared");

  const projects = [
    {
      title:         "Shanti Vidya Setu",
      slug:          "shanti-vidya-setu",
      description:   "Connecting marginalized communities to digital literacy, life skills, and livelihood pathways. The Shanti Vidya Setu (Bridge of Knowledge) initiative establishes hyper-local, technology-enabled learning centers that equip youth with practical skills and digital fluency needed to transition into higher education or formal employment.",
      category:      "Education",
      status:        "ONGOING" as const,
      budget:        500000,
      spent:         320000,
      beneficiaries: 450,
      location:      "Pan-India",
      isFeatured:    true,
      coverImage: "/projects/shanti-vidya-setu.jpg",
      // coverImage:    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      impactMetrics: { beneficiariesCount: "800+", centersEstablished: "5+", reEnrollment: "85%" },
    },
    {
      title:         "Hariyali: Clean & Green Communities",
      slug:          "hariyali-clean-green-communities",
      description:   "Planting trees, protecting nature, and promoting healthy spaces. Hariyali drives community-led cleanliness campaigns and tree plantation drives to create cleaner, greener, and healthier living spaces across India.",
      category:      "Environment",
      status:        "ONGOING" as const,
      budget:        200000,
      spent:         140000,
      beneficiaries: 5000,
      location:      "Pan-India",
      isFeatured:    true,
      coverImage: "/projects/hariyali.jpg",
      // coverImage:    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop",
      impactMetrics: { treesPlanted: "6000+", cleanupDrives: "50+", volunteersInvolved: "400+" },
    },
    {
      title:         "Skill Shakti: Powering Youth Potential",
      slug:          "skill-shakti-powering-youth-potential",
      description:   "Turning skills into opportunities, and opportunities into futures. Skill Shakti bridges the gap by equipping youth and women with market-relevant skills, life skills, and career pathways — turning raw talent into employability, self-reliance, and social change.",
      category:      "Skill Development",
      status:        "ONGOING" as const,
      budget:        800000,
      spent:         560000,
      beneficiaries: 2400,
      location:      "Pan-India",
      isFeatured:    true,
      coverImage: "/projects/skill-shakti.jpg",
      // coverImage:    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop",
      impactMetrics: { trained: "1200+", jobPlacements: "80%", skillCenters: "5+" },
    },
    {
      title:         "Pragati Path: Pathways to Brighter Futures",
      slug:          "pragati-path-brighter-futures",
      description:   "From slums to schools, from survival to success. Pragati Path provides a nurturing environment where children receive nutritious meals, academic support, emotional care, and life skills — empowering children not just to survive, but to thrive, learn, and dream.",
      category:      "Child Welfare",
      status:        "ONGOING" as const,
      budget:        600000,
      spent:         420000,
      beneficiaries: 1800,
      location:      "Pan-India",
      isFeatured:    true,
      coverImage: "/projects/pragati-path.jpg",
      // coverImage:    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
      impactMetrics: { childrenSupported: "850+", mealsProvided: "85000+", schoolEnrollment: "82%" },
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`  ✓ ${projects.length} projects seeded`);

  // ── Impact Metrics ──────────────────────────────────────────────────────────
  const metrics = [
    { label: "Total Funds Raised",  value: 28000000, unit: "INR",        icon: "💰", category: "financial"     },
    { label: "Lives Impacted",      value: 6200,     unit: "people",     icon: "👥", category: "beneficiaries" },
    { label: "Trees Planted",       value: 5000,     unit: "trees",      icon: "🌳", category: "environment"   },
    { label: "Women Empowered",     value: 1000,     unit: "women",      icon: "👩", category: "empowerment"   },
    { label: "Students Educated",   value: 1100,     unit: "students",   icon: "📚", category: "education"     },
    { label: "Active Volunteers",   value: 100,      unit: "volunteers", icon: "🤝", category: "volunteers"    },
    { label: "Campaigns Completed", value: 50,       unit: "campaigns",  icon: "🏕️", category: "campaigns"    },
    { label: "Districts Reached",   value: 6,        unit: "districts",  icon: "🗺️", category: "reach"        },
  ];

  for (const metric of metrics) {
    const existing = await prisma.impactMetric.findFirst({ where: { label: metric.label } });
    if (existing) {
      await prisma.impactMetric.update({ where: { id: existing.id }, data: { value: metric.value } });
    } else {
      await prisma.impactMetric.create({ data: metric });
    }
  }
  console.log(`  ✓ ${metrics.length} impact metrics seeded`);

  console.log("");
  console.log("✅ Database seeded successfully!");
  console.log("   Email:    admin@communityfoundation.in");
  console.log("   Password: admin@cbaf2025");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());