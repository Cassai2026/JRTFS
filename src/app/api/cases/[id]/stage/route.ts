import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    const updatedCase = await prisma.case.update({
      where: { id: params.id },
      data: { 
        status: status,
        stage: status 
      },
      include: { director: true }
    });
    return NextResponse.json({ success: true, data: updatedCase });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database Error' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const caseData = await prisma.case.findUnique({
      where: { id: params.id },
      include: { director: true }
    });
    return NextResponse.json({ success: true, data: caseData });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Not Found' }, { status: 404 });
  }
}