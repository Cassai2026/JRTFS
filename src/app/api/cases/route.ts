import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const cases = await prisma.case.findMany({
      include: { director: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: cases });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Database Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let director = await prisma.user.findFirst();
    if (!director) {
      director = await prisma.user.create({
        data: { email: 'admin@sovereign.local', name: 'Admin', role: 'ADMIN', passwordHash: 'temp' }
      });
    }
    const newCase = await prisma.case.create({
      data: {
        deceasedName: body.deceasedName || "New Case",
        caseNumber: Math.random().toString(36).substring(7),
        directorId: director.id,
        stage: 'FIRST_CALL',
      },
    });
    return NextResponse.json({ success: true, data: newCase });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'POST Error' }, { status: 500 });
  }
}