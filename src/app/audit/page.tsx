import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getAuditData() {
  const [entries, disbursements] = await Promise.all([
    prisma.auditLedger.findMany({
      include: {
        case: { select: { caseNumber: true, deceasedName: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.disbursement.findMany({
      include: {
        case: { select: { caseNumber: true, deceasedName: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  ]);
  return { entries, disbursements };
}

export default async function AuditPage() {
  const data = await getAuditData();
  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 tracking-tighter">FINANCIAL AUDIT</h1>
      <div className="grid gap-4">
        {data.entries.map((item: any) => (
          <div key={item.id} className="border border-zinc-800 bg-zinc-950 p-4 rounded-md">
            <div className="flex justify-between">
              <span className="font-bold">{item.action}</span>
              <span>{item.amount ? '£' + item.amount : ''}</span>
            </div>
            <p className="text-zinc-500 text-sm mt-1">
              Case: {item.case?.deceasedName} | User: {item.user?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}