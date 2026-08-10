const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = "pahrikyns@gmail.com";
  let admin = await prisma.admin.findUnique({ where: { email } });
  
  if (!admin) {
    console.log(`Admin ${email} not found. Creating...`);
    const hashedPassword = await bcrypt.hash("admin123", 10);
    admin = await prisma.admin.create({
      data: {
        email: email,
        password: hashedPassword,
        role: "admin",
        isActive: true
      }
    });
    console.log(`Successfully created admin! Email: ${email}, Password: admin123`);
  } else {
    console.log(`Admin ${email} already exists! Setting password to admin123...`);
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword, isActive: true }
    });
    console.log(`Successfully updated admin! Email: ${email}, Password: admin123`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
