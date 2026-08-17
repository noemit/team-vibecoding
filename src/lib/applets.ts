import fs from "fs";
import path from "path";

export type ExpiryOverride = "standard" | "90days" | "permalive";

export interface AppletMetadata {
  title: string;
  creator: string;
  lastModified: string;
  lastModifiedBy: string;
  expiryOverride: ExpiryOverride;
}

export interface AppletEntry extends AppletMetadata {
  slug: string;
  active: boolean;
  daysRemaining: number | null;
  inactiveReason: string | null;
}

export const DAYS = 30;
export const DAYS_90 = 90;

export const APPLETS_DIR = path.join(process.cwd(), "applets");

export function getAppletSlugs(): string[] {
  if (!fs.existsSync(APPLETS_DIR)) return [];
  return fs
    .readdirSync(APPLETS_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && !entry.name.startsWith("_") && !entry.name.startsWith("."),
    )
    .map((entry) => entry.name)
    .sort();
}

export function readAppletMetadata(slug: string): AppletMetadata | null {
  const metadataPath = path.join(APPLETS_DIR, slug, "metadata.json");
  if (!fs.existsSync(metadataPath)) return null;
  try {
    const raw = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
    return {
      title: String(raw.title ?? slug),
      creator: String(raw.creator ?? "Unknown"),
      lastModified: String(raw.lastModified ?? new Date().toISOString()),
      lastModifiedBy: String(raw.lastModifiedBy ?? "Unknown"),
      expiryOverride:
        raw.expiryOverride === "90days" || raw.expiryOverride === "permalive"
          ? raw.expiryOverride
          : "standard",
    };
  } catch {
    return null;
  }
}

export function isAppletActive(metadata: AppletMetadata, now = Date.now()): boolean {
  if (metadata.expiryOverride === "permalive") return true;

  const lastModified = new Date(metadata.lastModified).getTime();
  if (Number.isNaN(lastModified)) return false;

  const limitDays =
    metadata.expiryOverride === "90days" ? DAYS_90 : DAYS;
  return now - lastModified <= limitDays * 24 * 60 * 60 * 1000;
}

export function daysRemaining(metadata: AppletMetadata, now = Date.now()): number | null {
  if (metadata.expiryOverride === "permalive") return null;
  const lastModified = new Date(metadata.lastModified).getTime();
  if (Number.isNaN(lastModified)) return 0;
  const limitDays =
    metadata.expiryOverride === "90days" ? DAYS_90 : DAYS;
  return Math.max(0, Math.floor((limitDays * 24 * 60 * 60 * 1000 - (now - lastModified)) / (24 * 60 * 60 * 1000)));
}

export function getRegistry(now = Date.now()): AppletEntry[] {
  return getAppletSlugs()
    .map((slug) => {
      const metadata = readAppletMetadata(slug);
      if (!metadata) return null;
      const active = isAppletActive(metadata, now);
      const days = daysRemaining(metadata, now);
      return {
        ...metadata,
        slug,
        active,
        daysRemaining: days,
        inactiveReason: active
          ? null
          : "Applet inactive (not modified in 30 days). Ask your AI agent to enable it.",
      };
    })
    .filter((entry): entry is AppletEntry => entry !== null);
}
