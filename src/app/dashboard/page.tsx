import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getCases() {
  return await prisma.case.findMany({
    include: {
      director: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function DashboardPage() {
  const cases = await getCases();

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold tracking-tighter">DIRECTOR DASHBOARD</h1>
        <p className="text-zinc-500 mt-2 italic">Sovereign Funeral Management System</p>
      </header>
      
      <div className="grid gap-6">
        {cases.map((c) => (
          <div key={c.id} className="border border-zinc-800 bg-zinc-950 p-6 rounded-lg shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight">{c.deceasedName}</h2>
                <p className="text-zinc-500 text-sm font-mono mt-1">ID: {c.caseNumber}</p>
              </div>
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded text-[10px] font-black tracking-[0.2em] uppercase text-zinc-300">
                {c.stage}
              </span>
            </div>
            
            <div className="mt-8 flex justify-between items-center pt-4 border-t border-zinc-900">
              <div className="text-xs text-zinc-500">
                <span className="block uppercase text-[10px] text-zinc-700 font-bold mb-1">Assigned Director</span>
                {c.director?.name}
              </div>
              <button className="text-xs bg-white text-black px-4 py-2 font-bold hover:bg-zinc-200 transition-colors">
                OPEN FILE
              </button>
            </div>
          </div>
        ))}

        {cases.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-lg">
            <p className="text-zinc-600 italic">No case records found in the local ledger.</p>
          </div>
        )}
      </div>
    </div>
  );
}