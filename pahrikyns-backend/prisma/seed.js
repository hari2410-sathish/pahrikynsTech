const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const prisma = new PrismaClient();


async function main() {
const hashed = await bcrypt.hash('Admin@123', 10);


const existing = await prisma.admin.findUnique({ where: { email: 'harisathish0698@gmail.com' } });
if (!existing) {
await prisma.admin.create({
data: {
email: 'harisathish0698@gmail.com',
password: hashed,
role: 'admin',
}
});
console.log('Admin created: harisathish0698@gmail.com / Admin@123');
} else {
console.log('Admin already exists');
}
}


main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect();
});