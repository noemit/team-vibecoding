"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        router.replace(next);
        router.refresh();
      } else {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "That password is not right. Try again.");
        setBusy(false);
      }
    } catch {
      setError("Something went wrong. Try again in a moment.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <label htmlFor="password" className="block text-sm font-medium">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter the site password"
        autoFocus
        className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none focus:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
      />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={busy || !password}
        className="mt-4 w-full rounded-xl bg-stone-900 px-4 py-3 font-medium text-white transition hover:bg-stone-700 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
      >
        {busy ? "Checking..." : "Open the site"}
      </button>
    </form>
  );
}

export default function PasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight">This site is locked</h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Enter the password to keep browsing.
        </p>
        <div className="mt-8 flex justify-center">
          <Suspense>
            <PasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
