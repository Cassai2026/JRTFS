import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sovereign.local' },
    update: {},
    create: {
      email: 'admin@sovereign.local',
      name: 'System Administrator',
      passwordHash: 'change-me-later',
      role: 'ADMIN',
    },
  })
  console.log('Database seeded successfully.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { 
    console.error(e); 
    await prisma.$disconnect(); 
    process.exit(1); 
  })