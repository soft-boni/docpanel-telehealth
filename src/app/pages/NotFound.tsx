import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-[var(--text-main)]" style={{ fontSize: "3rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
        404
      </h1>
      <p className="mt-2 text-[var(--text-muted)]" style={{ fontSize: "0.9rem" }}>
        Page not found.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 rounded-lg bg-[var(--color-info)] text-white transition-opacity hover:opacity-90"
        style={{ fontSize: "0.9rem", fontWeight: 500 }}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
