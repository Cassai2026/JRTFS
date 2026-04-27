'use server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function submitFirstCall(data: { fullName: string; location: string; phone: string }) {
  try {
    let director = await prisma.user.findFirst();
    
    // Fallback if no user exists in the DB yet
    if (!director) {
      director = await prisma.user.create({
        data: {
          email: 'admin@sovereign.local',
          name: 'Sovereign Director',
          role: 'DIRECTOR',
          passwordHash: 'temp'
        }
      });
    }

    const newCase = await prisma.case.create({
      data: {
        deceasedName: data.fullName,
        locationOfTransition: data.location,
        directorId: director.id,
        stage: 'FIRST_CALL',
      }
    });

    return { success: true, caseId: newCase.id };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}