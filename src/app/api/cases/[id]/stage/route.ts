import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { type CaseStage } from "@/types";

const stageSchema = z.object({
  stage: z.enum(["INTAKE", "PREPARATION", "SERVICE", "COMPLETED"]),
  notes: z.string().optional(),
});

const STAGE_ORDER: CaseStage[] = ["INTAKE", "PREPARATION", "SERVICE", "COMPLETED"];

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = stageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid stage" }, { status: 400 });
  }

  const { stage, notes } = parsed.data;
  const existingCase = await prisma.case.findUnique({ where: { id: params.id } });
  if (!existingCase) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  const currentIndex = STAGE_ORDER.indexOf(existingCase.stage as CaseStage);
  const newIndex = STAGE_ORDER.indexOf(stage);
  if (newIndex <= currentIndex) {
    return NextResponse.json({ error: "Cannot move to a previous or same stage — immutable stage progression" }, { status: 400 });
  }

  const updateData: Record<string, unknown> = { stage };
  if (stage === "PREPARATION") updateData.preparationAt = new Date();
  if (stage === "SERVICE") updateData.serviceAt = new Date();
  if (stage === "COMPLETED") updateData.completedAt = new Date();

  const updatedCase = await prisma.case.update({
    where: { id: params.id },
    data: {
      ...updateData,
      stageHistory: {
        create: {
          stage,
          changedBy: session.user?.email || "system",
          notes,
          timestamp: new Date(),
        },
      },
    },
  });

  // Audit log
  await prisma.auditLedger.create({
    data: {
      caseId: params.id,
      userId: (session.user as any)?.id,
      action: "STAGE_UPDATED",
      details: `Case ${existingCase.caseNumber} moved from ${existingCase.stage} to ${stage}`,
      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
    },
  });

  return NextResponse.json(updatedCase);
}
