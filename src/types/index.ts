export type CaseStage = "INTAKE" | "PREPARATION" | "SERVICE" | "COMPLETED";
export type UserRole = "ADMIN" | "DIRECTOR" | "STAFF" | "FAMILY";
export type DisbursementStatus = "PENDING" | "VERIFIED" | "DISPUTED" | "SETTLED";

export interface KanbanCase {
  id: string;
  caseNumber: string;
  deceasedName: string;
  deceasedDod: Date;
  stage: CaseStage;
  intakeAt: Date;
  preparationAt: Date | null;
  serviceAt: Date | null;
  completedAt: Date | null;
  director: { id: string; name: string | null; email: string } | null;
}

export interface AuditEntry {
  id: string;
  caseId: string | null;
  userId: string | null;
  action: string;
  details: string;
  ipAddress: string | null;
  timestamp: Date;
}

export interface DisbursementEntry {
  id: string;
  caseId: string;
  vendor: string;
  description: string;
  amount: number;
  actualCost: number;
  markup: number;
  status: DisbursementStatus;
  createdAt: Date;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
}

export interface FCAStatement {
  id: string;
  title: string;
  content: string;
  version: string;
  effectiveDate: string;
}
