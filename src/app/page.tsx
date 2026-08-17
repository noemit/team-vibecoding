import Link from "next/link";
import { getRegistry } from "@/src/lib/applets";

export const dynamic = "force-static";

export default function Home() {
  const applets = getRegistry();
  const active = applets.filter((a) => a.active);
  const inactive = applets.filter((a) => !a.active);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Applet Hub</h1>
        <p className="mt-3 text-lg text-stone-600 dark:text-stone-400">
          Small, useful tools built with your AI agent. Pick one to open it.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Live applets
        </h2>
        {active.length === 0 ? (
          <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500 dark:border-stone-700">
            No applets yet. Ask your AI agent to build one!
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {active.map((applet) => (
              <li key={applet.slug}>
                <Link
                  href={`/applets/${applet.slug}`}
                  className="block h-full rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-stone-400 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600"
                >
                  <h3 className="text-lg font-semibold">{applet.title}</h3>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    Built by {applet.creator}
                  </p>
                  <p className="mt-3 text-xs text-stone-400 dark:text-stone-500">
                    {applet.daysRemaining !== null
                      ? `${applet.daysRemaining} day${applet.daysRemaining === 1 ? "" : "s"} left before it pauses`
                      : "Always on"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {inactive.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Paused applets
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {inactive.map((applet) => (
              <li
                key={applet.slug}
                className="rounded-2xl border border-dashed border-stone-300 bg-stone-100 p-6 opacity-60 dark:border-stone-700 dark:bg-stone-900"
              >
                <h3 className="text-lg font-semibold text-stone-500 dark:text-stone-400">
                  {applet.title}
                </h3>
                <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
                  {applet.inactiveReason}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
