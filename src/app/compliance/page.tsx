import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { FCAComplianceView } from "@/components/compliance/FCAComplianceView";

export default async function CompliancePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNav user={session.user} />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">FCA Compliance Layer</h1>
          <p className="text-gray-400 mt-1">
            Financial Conduct Authority — Demands and Needs Statements for Funeral Plans
          </p>
        </div>
        <FCAComplianceView />
      </main>
    </div>
  );
}
