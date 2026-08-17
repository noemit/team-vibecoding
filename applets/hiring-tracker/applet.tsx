"use client";

import { useMemo, useState } from "react";
import { PIPELINES, REPORT_DATE, type Candidate } from "./data";

type StatusFilter = "All" | Candidate["status"];

const STATUS_STYLES: Record<Candidate["status"], string> = {
  Active: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  Offer: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Rejected: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  Withdrawn: "bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
};

const STATUS_LABELS: Record<StatusFilter, string> = {
  All: "All candidates",
  Active: "In play",
  Offer: "Offers out",
  Rejected: "Rejected",
  Withdrawn: "Withdrawn",
};

const CARD_STYLES: Record<Candidate["status"], string> = {
  Active: "bg-sky-50 dark:bg-sky-900/20",
  Offer: "bg-emerald-50 dark:bg-emerald-900/20",
  Rejected: "bg-rose-50 dark:bg-rose-900/20",
  Withdrawn: "bg-stone-100 dark:bg-stone-800/60",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FilterChip({
  label,
  selected,
  count,
  onClick,
}: {
  label: string;
  selected: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
        selected
          ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
          : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
      }`}
    >
      {label}
      {count !== undefined && <span className="ml-1.5 opacity-70">{count}</span>}
    </button>
  );
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="text-base font-semibold">{candidate.name}</h4>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[candidate.status]}`}
        >
          {candidate.status}
        </span>
        <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {candidate.stage}
        </span>
      </div>

      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{candidate.feedback}</p>

      {candidate.nextStep && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm dark:bg-amber-900/20">
          <span className="font-medium text-amber-800 dark:text-amber-300">Next:</span>
          <span className="text-amber-900 dark:text-amber-100">{candidate.nextStep}</span>
          {candidate.nextStepOwner && (
            <span className="text-amber-700 dark:text-amber-400">· {candidate.nextStepOwner}</span>
          )}
          {candidate.nextStepDue && (
            <span className="text-amber-700 dark:text-amber-400">
              · due {formatDate(candidate.nextStepDue)}
            </span>
          )}
        </div>
      )}

      {candidate.notes.length > 0 && (
        <ul className="mt-3 space-y-2 border-t border-stone-100 pt-3 dark:border-stone-800">
          {candidate.notes.map((note, i) => (
            <li key={i} className="text-sm">
              <p className="text-stone-700 dark:text-stone-300">{note.text}</p>
              <p className="mt-0.5 text-xs text-stone-400">
                {note.author} · {formatDate(note.date)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HiringTracker() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [ownerFilter, setOwnerFilter] = useState("All");

  const allCandidates = useMemo(() => PIPELINES.flatMap((p) => p.candidates), []);

  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      All: allCandidates.length,
      Active: 0,
      Offer: 0,
      Rejected: 0,
      Withdrawn: 0,
    };
    for (const candidate of allCandidates) c[candidate.status]++;
    return c;
  }, [allCandidates]);

  const owners = useMemo(() => {
    const set = new Set<string>();
    for (const candidate of allCandidates) {
      if (candidate.nextStepOwner) set.add(candidate.nextStepOwner);
    }
    return ["All", ...Array.from(set).sort()];
  }, [allCandidates]);

  const ownerCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const candidate of allCandidates) {
      if (candidate.nextStepOwner) {
        c[candidate.nextStepOwner] = (c[candidate.nextStepOwner] ?? 0) + 1;
      }
    }
    return c;
  }, [allCandidates]);

  const normalized = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    const result = PIPELINES.map((p) => ({
      ...p,
      candidates: p.candidates.filter((candidate) => {
        if (statusFilter !== "All" && candidate.status !== statusFilter) return false;
        if (ownerFilter !== "All" && candidate.nextStepOwner !== ownerFilter) return false;
        if (
          normalized &&
          ![candidate.name, candidate.stage, candidate.feedback, p.name, p.hiringManager]
            .join(" ")
            .toLowerCase()
            .includes(normalized)
        ) {
          return false;
        }
        return true;
      }),
    })).filter((p) => p.candidates.length > 0);
    return result;
  }, [normalized, statusFilter, ownerFilter]);

  const filteredCount = filtered.reduce((sum, p) => sum + p.candidates.length, 0);
  const filtering = statusFilter !== "All" || ownerFilter !== "All" || normalized !== "";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Company hiring pipelines · data as of {formatDate(REPORT_DATE)} · confidential
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["Active", "Offer", "Rejected", "Withdrawn"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                setStatusFilter(statusFilter === status ? "All" : status)
              }
              aria-pressed={statusFilter === status}
              className={`rounded-xl p-3 text-left transition ${CARD_STYLES[status]} ${
                statusFilter === status
                  ? "ring-2 ring-stone-900 ring-offset-2 dark:ring-stone-100"
                  : "hover:ring-2 hover:ring-stone-300 hover:ring-offset-2 dark:hover:ring-stone-600"
              }`}
            >
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {counts[status]}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{STATUS_LABELS[status]}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Status:</span>
        {(["All", "Active", "Offer", "Rejected", "Withdrawn"] as const).map((status) => (
          <FilterChip
            key={status}
            label={STATUS_LABELS[status]}
            selected={statusFilter === status}
            count={counts[status]}
            onClick={() => setStatusFilter(status)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-stone-500 dark:text-stone-400">
          Who do you talk to next:
        </span>
        {owners.map((owner) => (
          <FilterChip
            key={owner}
            label={owner}
            selected={ownerFilter === owner}
            count={owner === "All" ? undefined : ownerCounts[owner]}
            onClick={() => setOwnerFilter(owner)}
          />
        ))}
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search candidates, stages, notes..."
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-stone-400 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
      />

      {filtering && (
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Showing {filteredCount} of {counts.All} candidates.
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatusFilter("All");
              setOwnerFilter("All");
            }}
            className="ml-2 text-amber-700 underline-offset-2 hover:underline dark:text-amber-400"
          >
            Clear filters
          </button>
        </p>
      )}

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500 dark:border-stone-700">
          No candidates match your filters. Try clearing a filter or two.
        </p>
      )}

      {filtered.map((pipeline) => (
        <section key={pipeline.name}>
          <header className="mb-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-semibold">{pipeline.name}</h3>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {pipeline.candidates.length} candidate{pipeline.candidates.length === 1 ? "" : "s"}
              </span>
            </div>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Hiring manager: {pipeline.hiringManager} · Focus: {pipeline.focus}
            </p>
          </header>
          <div className="grid gap-3 lg:grid-cols-2">
            {pipeline.candidates.map((candidate) => (
              <CandidateCard key={candidate.name} candidate={candidate} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
