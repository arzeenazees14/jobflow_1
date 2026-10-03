"use client";

import { Job, JobStatus, STATUS_CONFIG } from "@/types/job";

interface StatsCardsProps {
  jobs: Job[];
}

export default function StatsCards({ jobs }: StatsCardsProps) {
  const counts: Record<JobStatus, number> = {
    wishlist: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  };

  jobs.forEach((j) => {
    counts[j.status]++;
  });

  const total = jobs.length;
  const active = counts.applied + counts.interview + counts.offer;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
          Total
        </p>
        <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {total}
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
          Active
        </p>
        <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
          {active}
        </p>
      </div>
      {(Object.keys(counts) as JobStatus[]).map((status) => (
        <div
          key={status}
          className={`rounded-2xl border p-4 shadow-sm ${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].border}`}
        >
          <p
            className={`text-xs font-medium uppercase tracking-wide ${STATUS_CONFIG[status].color}`}
          >
            {STATUS_CONFIG[status].label}
          </p>
          <p className={`mt-1 text-2xl font-bold ${STATUS_CONFIG[status].color}`}>
            {counts[status]}
          </p>
        </div>
      ))}
    </div>
  );
}
