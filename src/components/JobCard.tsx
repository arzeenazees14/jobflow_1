"use client";

import { Job, STATUS_CONFIG } from "@/types/job";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Job["status"]) => void;
}

export default function JobCard({
  job,
  onEdit,
  onDelete,
  onStatusChange,
}: JobCardProps) {
  const config = STATUS_CONFIG[job.status];

  return (
    <div
      className={`group relative rounded-xl border p-4 transition-all hover:shadow-md ${config.bg} ${config.border}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">
            {job.role}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
            {job.company}
          </p>
          {job.location && (
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              📍 {job.location}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color} ${config.bg} border ${config.border}`}
        >
          {config.label}
        </span>
      </div>

      {job.salary && (
        <p className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          💰 {job.salary}
        </p>
      )}

      {job.notes && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {job.notes}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-xs text-zinc-400">
          {new Date(job.appliedDate).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {job.link && (
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
              title="Open job link"
            >
              🔗
            </a>
          )}
          <button
            onClick={() => onEdit(job)}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Quick status change */}
      <div className="mt-3 flex flex-wrap gap-1">
        {(
          ["wishlist", "applied", "interview", "offer", "rejected"] as const
        ).map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(job.id, s)}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
              job.status === s
                ? `${STATUS_CONFIG[s].color} ${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].border} font-semibold`
                : "border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-300"
            }`}
          >
            {STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>
    </div>
  );
}
