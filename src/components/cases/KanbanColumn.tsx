import { KanbanCase } from "@/types";
import { CaseCard } from "./CaseCard";

interface KanbanColumnProps {
  stage: string;
  title: string;
  color: string;
  cases: KanbanCase[];
}

const colorMap: Record<string, string> = {
  yellow: "border-yellow-800 bg-yellow-900/10",
  blue: "border-blue-800 bg-blue-900/10",
  purple: "border-purple-800 bg-purple-900/10",
  green: "border-green-800 bg-green-900/10",
};

const headerColorMap: Record<string, string> = {
  yellow: "text-yellow-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
  green: "text-green-400",
};

export function KanbanColumn({ title, color, cases }: KanbanColumnProps) {
  return (
    <div className={`rounded-xl border ${colorMap[color]} p-4 min-h-96`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold ${headerColorMap[color]}`}>{title}</h3>
        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
          {cases.length}
        </span>
      </div>
      <div className="space-y-3">
        {cases.map((c) => (
          <CaseCard key={c.id} case={c} />
        ))}
        {cases.length === 0 && (
          <div className="text-center py-8 text-gray-600 text-sm">
            No cases in {title.toLowerCase()}
          </div>
        )}
      </div>
    </div>
  );
}
