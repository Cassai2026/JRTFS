import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AuditLedgerView } from "@/components/audit/AuditLedgerView";

async function getAuditData() {
  const [entries, disbursements] = await Promise.all([
    prisma.auditLedger.findMany({
      include: {
        case: { select: { caseNumber: true, deceasedName: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { timestamp: "desc" },
      take: 100,
    }),
    prisma.disbursement.findMany({
      include: {
        case: { select: { caseNumber: true, deceasedName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  return { entries, disbursements };
}

export default async function AuditPage() {
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as any)?.role;

  if (userRole !== "ADMIN" && userRole !== "DIRECTOR") {
    return (
      <div className="text-center py-16">
        <p className="text-red-400">Access denied. Director or Admin role required.</p>
      </div>
    );
  }

  const { entries, disbursements } = await getAuditData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Sovereign Audit Ledger</h1>
        <p className="text-gray-400 mt-1">
          Immutable record of all transactions and system events. Zero hidden markups.
        </p>
      </div>
      <AuditLedgerView entries={entries as any} disbursements={disbursements as any} />
    </div>
  );
}
