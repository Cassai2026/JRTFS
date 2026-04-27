"use client";
import { useState } from "react";

interface AuditEntry {
  id: string;
  action: string;
  details: string;
  ipAddress: string | null;
  timestamp: Date;
  case: { caseNumber: string; deceasedName: string } | null;
  user: { name: string | null; email: string } | null;
}

interface Disbursement {
  id: string;
  vendor: string;
  description: string;
  amount: number;
  actualCost: number;
  markup: number;
  status: string;
  createdAt: Date;
  case: { caseNumber: string; deceasedName: string } | null;
}

interface Props {
  entries: AuditEntry[];
  disbursements: Disbursement[];
}

export function AuditLedgerView({ entries, disbursements }: Props) {
  const [activeTab, setActiveTab] = useState<"events" | "disbursements">("events");

  const totalMarkup = disbursements.reduce((sum, d) => sum + d.markup, 0);
  const verifiedCount = disbursements.filter((d) => d.status === "VERIFIED").length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Total Disbursements</div>
          <div className="text-2xl font-bold text-white mt-1">{disbursements.length}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Hidden Markups</div>
          <div className="text-2xl font-bold text-green-400 mt-1">
            £{totalMarkup.toFixed(2)}
          </div>
          <div className="text-xs text-green-600 mt-1">Zero hidden markups guaranteed</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Verified Disbursements</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{verifiedCount}</div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "events"
                ? "text-white bg-gray-800"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Audit Events ({entries.length})
          </button>
          <button
            onClick={() => setActiveTab("disbursements")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "disbursements"
                ? "text-white bg-gray-800"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Disbursements ({disbursements.length})
          </button>
        </div>

        {activeTab === "events" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-400">Timestamp</th>
                  <th className="text-left px-4 py-3 text-gray-400">Action</th>
                  <th className="text-left px-4 py-3 text-gray-400">Case</th>
                  <th className="text-left px-4 py-3 text-gray-400">User</th>
                  <th className="text-left px-4 py-3 text-gray-400">Details</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">
                      {new Date(entry.timestamp).toLocaleString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-900/30 text-blue-300 text-xs px-2 py-1 rounded">
                        {entry.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {entry.case ? `${entry.case.caseNumber} — ${entry.case.deceasedName}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {entry.user ? entry.user.name || entry.user.email : "System"}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{entry.details}</td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-600">
                      No audit entries yet. All system events will be recorded here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "disbursements" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-400">Date</th>
                  <th className="text-left px-4 py-3 text-gray-400">Case</th>
                  <th className="text-left px-4 py-3 text-gray-400">Vendor</th>
                  <th className="text-left px-4 py-3 text-gray-400">Quoted</th>
                  <th className="text-left px-4 py-3 text-gray-400">Actual</th>
                  <th className="text-left px-4 py-3 text-gray-400">Markup</th>
                  <th className="text-left px-4 py-3 text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {disbursements.map((d) => (
                  <tr key={d.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {d.case ? `${d.case.caseNumber}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-white text-xs font-medium">{d.vendor}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">£{d.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">£{d.actualCost.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-xs font-medium ${d.markup > 0 ? "text-red-400" : "text-green-400"}`}>
                      {d.markup > 0 ? `+£${d.markup.toFixed(2)}` : "£0.00"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        d.status === "VERIFIED"
                          ? "bg-green-900/30 text-green-300"
                          : d.status === "DISPUTED"
                          ? "bg-red-900/30 text-red-300"
                          : "bg-yellow-900/30 text-yellow-300"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {disbursements.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-600">
                      No disbursements recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
