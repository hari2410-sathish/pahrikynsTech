const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function resetAdmin() {
  const email = "pahrikyns@gmail.com";
  const password = "admin123"; // I'll stick to admin123 but re-hash it to be sure
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword },
    });
    console.log("✅ Admin password reset successfully to: admin123");
  } catch (err) {
    console.error("❌ Reset error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();
