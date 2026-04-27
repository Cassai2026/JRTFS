"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Case Management", icon: "📋" },
  { href: "/audit", label: "Audit Ledger", icon: "🔏" },
  { href: "/compliance", label: "FCA Compliance", icon: "⚖️" },
  { href: "/family", label: "Family Portal", icon: "👨‍👩‍👧" },
];

export function DashboardNav({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">⚖️</div>
          <div>
            <div className="text-sm font-bold text-white">SFS</div>
            <div className="text-xs text-gray-500">Sovereign Funeral SaaS</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="mb-3 px-4">
          <div className="text-sm text-white font-medium">{user?.name || user?.email}</div>
          <div className="text-xs text-gray-500">{(user as any)?.role || "STAFF"}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm transition-colors"
        >
          🚪 Sign Out
        </button>
      </div>

      <div className="p-4 pt-0">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-500">🔒 Sovereign Shield Active</p>
          <p className="text-xs text-gray-500">Zero-Extraction Policy</p>
        </div>
      </div>
    </div>
  );
}
