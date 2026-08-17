import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegistry, readAppletMetadata } from "@/src/lib/applets";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getRegistry()
    .filter((applet) => applet.active)
    .map((applet) => ({ slug: applet.slug }));
}

export default async function AppletPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const metadata = readAppletMetadata(slug);
  if (!metadata) notFound();

  let AppletComponent: React.ComponentType | null = null;
  try {
    const module = await import(`../../../../applets/${slug}/applet`);
    AppletComponent = module.default ?? null;
  } catch {
    AppletComponent = null;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <nav className="mb-8">
        <Link
          href="/"
          className="text-sm text-stone-500 underline-offset-4 hover:underline dark:text-stone-400"
        >
          &larr; Back to all applets
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{metadata.title}</h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          Built by {metadata.creator} &middot; last updated{" "}
          {new Date(metadata.lastModified).toLocaleDateString()}
        </p>
      </header>

      {AppletComponent ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <AppletComponent />
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500 dark:border-stone-700">
          This applet doesn&apos;t have a page built yet. Ask your AI agent to
          create it.
        </p>
      )}
    </main>
  );
}
