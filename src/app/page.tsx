import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 mb-6">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Sovereign Funeral SaaS
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Reducing Administrative Burden. Ending Hidden Charges.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A transparent, secure, and dignified platform for funeral directors and grieving families.
            Zero hidden markups. Zero data extraction. Full compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-semibold mb-2">Case Management</h3>
            <p className="text-gray-400 text-sm">
              Kanban-style tracking through Intake, Preparation, and Service stages with immutable timestamping.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">👨‍👩‍👧</div>
            <h3 className="text-lg font-semibold mb-2">Family Portal</h3>
            <p className="text-gray-400 text-sm">
              High-contrast, low-cognitive-load interface with transparent pricing and secure document upload.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">🔏</div>
            <h3 className="text-lg font-semibold mb-2">Audit Ledger</h3>
            <p className="text-gray-400 text-sm">
              Private ledger tracking every third-party disbursement with zero hidden markups guaranteed.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Staff Login
          </Link>
          <Link
            href="/family"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-gray-700"
          >
            Family Portal
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">🔒</div>
              <div className="text-xs text-gray-500 mt-1">Data Protection</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-xs text-gray-500 mt-1">FCA Compliant</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">⚡</div>
              <div className="text-xs text-gray-500 mt-1">Access Control</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">📊</div>
              <div className="text-xs text-gray-500 mt-1">Transparent Pricing</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
