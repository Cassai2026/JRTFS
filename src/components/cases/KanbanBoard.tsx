"use client";
import { KanbanCase } from "@/types";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
  cases: KanbanCase[];
}

export function KanbanBoard({ cases }: KanbanBoardProps) {
  const columns = [
    {
      stage: "INTAKE" as const,
      title: "Intake",
      color: "yellow",
      cases: cases.filter((c) => c.stage === "INTAKE"),
    },
    {
      stage: "PREPARATION" as const,
      title: "Preparation",
      color: "blue",
      cases: cases.filter((c) => c.stage === "PREPARATION"),
    },
    {
      stage: "SERVICE" as const,
      title: "Service",
      color: "purple",
      cases: cases.filter((c) => c.stage === "SERVICE"),
    },
    {
      stage: "COMPLETED" as const,
      title: "Completed",
      color: "green",
      cases: cases.filter((c) => c.stage === "COMPLETED"),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => (
        <KanbanColumn key={col.stage} {...col} />
      ))}
    </div>
  );
}
