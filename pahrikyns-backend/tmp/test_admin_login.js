const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function testLogin() {
  const email = "pahrikyns@gmail.com";
  const password = "admin123";

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      console.log("❌ Admin not found");
      return;
    }

    const match = await bcrypt.compare(password, admin.password);
    console.log("Match result:", match);
  } catch (err) {
    console.error("Error testing login:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
