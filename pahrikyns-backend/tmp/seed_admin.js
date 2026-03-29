const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function seedAdmin() {
  const email = "pahrikyns@gmail.com";
  const password = "admin123"; // You can change this
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        isActive: true,
      },
    });
    console.log("✅ Admin seeded successfully:", admin.email);
    console.log("👉 Password is:", password);
  } catch (err) {
    if (err.code === "P2002") {
      console.log("⚠️ Admin already exists.");
    } else {
      console.error("❌ Seeding error:", err);
    }
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
