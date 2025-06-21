'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to Job Importer 🚀</h1>
        <p className="text-gray-600 mb-8">
          View the latest imported job feeds and track import history.
        </p>
        <Link
          href="/import-logs"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200 inline-block"
        >
          📦 View Import History
        </Link>
      </div>
    </main>
  );
}
