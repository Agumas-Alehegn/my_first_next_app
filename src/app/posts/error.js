"use client";
export default function Error({ error, reset }) {
  return (
    <main className="p-10">
      <h2 className="text-2xl font-bold text-red-600">Something Went Wrong!</h2>
      <p className="mt-2 text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 bg-gray-900 px-4 py-2 text-white"
      >
        Try again
      </button>
    </main>
  );
}
