const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const courses = [
    {
      title: "Database Engineering Mastery",
      description: "A comprehensive 200-day journey from SQL basics to distributed NoSQL architectures. Practical labs on MySQL, PostgreSQL, and MongoDB.",
      category: "Database",
      level: "Professional",
      lessons: 200,
      price: 4999,
      status: "Published",
    },
    {
      title: "Microsoft Azure: Solutions Architect",
      description: "Master Azure cloud services from foundations to architect level. Includes 200 days of interactive roadmaps and deployment labs.",
      category: "Azure",
      level: "Intermediate",
      lessons: 200,
      price: 5999,
      status: "Published",
    },
    {
      title: "Google Cloud (GCP) Specialist",
      description: "Accelerate your career with Google Cloud. 200-day deep dive into Compute Engine, GKE, and serverless engineering.",
      category: "GCP",
      level: "Advanced",
      lessons: 200,
      price: 5999,
      status: "Published",
    },
  ];

  console.log("Seeding courses...");
  for (const c of courses) {
    const created = await prisma.course.create({ data: c });
    console.log(`Created: ${created.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
