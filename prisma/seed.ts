import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('change-me-later', 10)
  await prisma.user.upsert({
    where: { email: 'admin@sovereign.local' },
    update: { role: 'DIRECTOR', passwordHash: passwordHash },
    create: {
      email: 'admin@sovereign.local',
      name: 'System Administrator',
      passwordHash: passwordHash,
      role: 'DIRECTOR',
    },
  })
  console.log('User role updated to DIRECTOR.')
}
main().then(() => prisma.$disconnect())