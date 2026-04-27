import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const disbursements = await prisma.disbursement.findMany({
      include: { 
        case: { select: { deceasedName: true, caseNumber: true } } 
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: disbursements });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Database Error' }, { status: 500 });
  }
}