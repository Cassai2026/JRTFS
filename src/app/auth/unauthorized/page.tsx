import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-6">🚫</div>
        <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Sovereign Shield has blocked this access. You do not have the required permissions to view this resource.
        </p>
        <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
