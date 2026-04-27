"use client";
import { KanbanCase } from "@/types";
import Link from "next/link";

interface CaseCardProps {
  case: KanbanCase;
}

export function CaseCard({ case: c }: CaseCardProps) {
  const intakeDate = new Date(c.intakeAt);
  const dodDate = new Date(c.deceasedDod);

  return (
    <Link href={`/cases/${c.id}`}>
      <div className="bg-gray-900 border border-gray-700 hover:border-gray-600 rounded-lg p-4 cursor-pointer transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-mono">{c.caseNumber}</span>
          <span className="text-xs text-gray-600">
            {dodDate.toLocaleDateString("en-GB")}
          </span>
        </div>
        <h4 className="text-white font-medium text-sm mb-2">{c.deceasedName}</h4>
        {c.director && (
          <div className="text-xs text-gray-500">
            Dir: {c.director.name || c.director.email}
          </div>
        )}
        <div className="mt-3 pt-3 border-t border-gray-800">
          <div className="text-xs text-gray-600">
            Intake: {intakeDate.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}
          </div>
        </div>
      </div>
    </Link>
  );
}
