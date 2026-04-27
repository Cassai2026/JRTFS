import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createCaseSchema = z.object({
  deceasedName: z.string().min(1),
  deceasedDob: z.string().optional(),
  deceasedDod: z.string().min(1),
  directorEmail: z.string().email().optional().or(z.literal("")),
});

function generateCaseNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `SFS-${year}${month}-${random}`;
}

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cases = await prisma.case.findMany({
    include: {
      director: { select: { id: true, name: true, email: true } },
      stageHistory: { orderBy: { timestamp: "desc" } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(cases);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createCaseSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { deceasedName, deceasedDob, deceasedDod, directorEmail } = parsed.data;

  let directorId: string | undefined;
  if (directorEmail) {
    const director = await prisma.user.findUnique({ where: { email: directorEmail } });
    if (director) directorId = director.id;
  }

  const newCase = await prisma.case.create({
    data: {
      caseNumber: generateCaseNumber(),
      deceasedName,
      deceasedDob: deceasedDob ? new Date(deceasedDob) : undefined,
      deceasedDod: new Date(deceasedDod),
      stage: "INTAKE",
      directorId,
      stageHistory: {
        create: {
          stage: "INTAKE",
          changedBy: session.user?.email || "system",
          notes: "Case intake created",
        },
      },
    },
  });

  // Audit log
  await prisma.auditLedger.create({
    data: {
      caseId: newCase.id,
      userId: (session.user as any)?.id,
      action: "CASE_CREATED",
      details: `Case ${newCase.caseNumber} created for ${deceasedName}`,
      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
    },
  });

  return NextResponse.json(newCase, { status: 201 });
}
