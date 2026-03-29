const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkAdmins() {
  try {
    const admins = await prisma.admin.findMany();
    console.log("Admins in database:", admins.map(a => ({ email: a.email, isActive: a.isActive })));
  } catch (err) {
    console.error("Error fetching admins:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmins();
