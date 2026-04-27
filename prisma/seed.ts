import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPasswordHash = await bcrypt.hash("sovereign-admin-2024!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@sovereign-funeral.com" },
    update: {},
    create: {
      email: "admin@sovereign-funeral.com",
      name: "System Administrator",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  // Create a director
  const directorPasswordHash = await bcrypt.hash("director-2024!", 12);
  const director = await prisma.user.upsert({
    where: { email: "director@sovereign-funeral.com" },
    update: {},
    create: {
      email: "director@sovereign-funeral.com",
      name: "John Director",
      passwordHash: directorPasswordHash,
      role: "DIRECTOR",
    },
  });

  // Create sample cases
  const case1 = await prisma.case.upsert({
    where: { caseNumber: "SFS-2401-0001" },
    update: {},
    create: {
      caseNumber: "SFS-2401-0001",
      deceasedName: "Margaret Smith",
      deceasedDod: new Date("2024-01-10"),
      stage: "INTAKE",
      directorId: director.id,
      stageHistory: {
        create: {
          stage: "INTAKE",
          changedBy: "admin@sovereign-funeral.com",
          notes: "Case intake created",
        },
      },
    },
  });

  const case2 = await prisma.case.upsert({
    where: { caseNumber: "SFS-2401-0002" },
    update: {},
    create: {
      caseNumber: "SFS-2401-0002",
      deceasedName: "Robert Johnson",
      deceasedDod: new Date("2024-01-08"),
      stage: "PREPARATION",
      preparationAt: new Date("2024-01-09"),
      directorId: director.id,
      stageHistory: {
        create: [
          {
            stage: "INTAKE",
            changedBy: "admin@sovereign-funeral.com",
            notes: "Case intake created",
            timestamp: new Date("2024-01-08T10:00:00Z"),
          },
          {
            stage: "PREPARATION",
            changedBy: "director@sovereign-funeral.com",
            notes: "Moved to preparation",
            timestamp: new Date("2024-01-09T09:00:00Z"),
          },
        ],
      },
    },
  });

  // Sample disbursement
  await prisma.disbursement.upsert({
    where: { id: "sample-disb-001" },
    update: {},
    create: {
      id: "sample-disb-001",
      caseId: case2.id,
      vendor: "Sovereign Crematorium Ltd",
      description: "Cremation fee",
      amount: 850,
      actualCost: 850,
      markup: 0,
      status: "VERIFIED",
      verifiedAt: new Date(),
      verifiedBy: "admin@sovereign-funeral.com",
    },
  });

  // FCA compliance statements
  await prisma.complianceStatement.upsert({
    where: { id: "fca-stmt-001" },
    update: {},
    create: {
      id: "fca-stmt-001",
      type: "DEMANDS_AND_NEEDS",
      version: "v1.0",
      content: "PLACEHOLDER — FCA Demands and Needs Statement. Requires compliance officer review.",
      isActive: true,
      effectiveDate: new Date("2022-07-29"),
    },
  });

  console.log("✅ Seed data created:", { admin: admin.email, director: director.email, case1: case1.caseNumber, case2: case2.caseNumber });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
