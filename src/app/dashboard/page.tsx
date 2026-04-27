import { prisma } from "@/lib/prisma";
import { KanbanBoard } from "@/components/cases/KanbanBoard";

async function getCases() {
  return prisma.case.findMany({
    include: {
      director: {
        select: { id: true, name: true, email: true },
      },
      stageHistory: {
        orderBy: { timestamp: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function DashboardPage() {
  const cases = await getCases();

  const intakeCases = cases.filter((c) => c.stage === "INTAKE");
  const prepCases = cases.filter((c) => c.stage === "PREPARATION");
  const serviceCases = cases.filter((c) => c.stage === "SERVICE");
  const completedCases = cases.filter((c) => c.stage === "COMPLETED");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Case Management Engine</h1>
          <p className="text-gray-400 mt-1">
            Sovereign Funeral SaaS — Active Cases Overview
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/cases/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            + New Case
          </a>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-900/30 border border-yellow-800 rounded-xl p-4">
          <div className="text-yellow-400 text-sm font-medium">Intake</div>
          <div className="text-3xl font-bold text-white mt-1">{intakeCases.length}</div>
        </div>
        <div className="bg-blue-900/30 border border-blue-800 rounded-xl p-4">
          <div className="text-blue-400 text-sm font-medium">Preparation</div>
          <div className="text-3xl font-bold text-white mt-1">{prepCases.length}</div>
        </div>
        <div className="bg-purple-900/30 border border-purple-800 rounded-xl p-4">
          <div className="text-purple-400 text-sm font-medium">Service</div>
          <div className="text-3xl font-bold text-white mt-1">{serviceCases.length}</div>
        </div>
        <div className="bg-green-900/30 border border-green-800 rounded-xl p-4">
          <div className="text-green-400 text-sm font-medium">Completed</div>
          <div className="text-3xl font-bold text-white mt-1">{completedCases.length}</div>
        </div>
      </div>

      <KanbanBoard cases={cases as any} />
    </div>
  );
}
