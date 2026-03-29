const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const c = {
    title: "System Design for Scale",
    description: "Master the art of building distributed systems. Covers Load Balancing, Caching, Microservices, and more.",
    category: "SystemDesign",
    level: "Advanced",
    lessons: 200,
    price: 6999,
    status: "Published",
  };

  console.log("Seeding System Design course...");
  const created = await prisma.course.create({ data: c });
  console.log(`Created: ${created.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
