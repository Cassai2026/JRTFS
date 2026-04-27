import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const disbursementSchema = z.object({
  caseId: z.string(),
  vendor: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().positive(),
  actualCost: z.number().positive(),
  receiptRef: z.string().optional(),
});

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = (session.user as any)?.role;
  if (!["ADMIN", "DIRECTOR"].includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const disbursements = await prisma.disbursement.findMany({
    include: { case: { select: { caseNumber: true, deceasedName: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(disbursements);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = (session.user as any)?.role;
  if (!["ADMIN", "DIRECTOR"].includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = disbursementSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { caseId, vendor, description, amount, actualCost, receiptRef } = parsed.data;
  const markup = amount - actualCost;

  const disbursement = await prisma.disbursement.create({
    data: { caseId, vendor, description, amount, actualCost, markup, receiptRef },
  });

  await prisma.auditLedger.create({
    data: {
      caseId,
      disbursementId: disbursement.id,
      userId: (session.user as any)?.id,
      action: "DISBURSEMENT_CREATED",
      details: `Disbursement to ${vendor}: quoted £${amount}, actual £${actualCost}, markup £${markup.toFixed(2)}`,
      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
    },
  });

  return NextResponse.json(disbursement, { status: 201 });
}
