import Link from "next/link";

export default function about() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-shadow-green-600">About Page </h1>
      <p className="mt-2 text-lg">I am learning Next.js step by step.</p>
      <p className="mt-2 text-gray-600">This is the about page.</p>
      <Link href="/team" className="text-blue-500 hover:underline">
        Team
      </Link>
    </main>
  );
}
