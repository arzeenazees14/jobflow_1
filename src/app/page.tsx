"use client";

import { useState, useEffect, useMemo } from "react";
import { Job, JobStatus, STATUSES, STATUS_CONFIG } from "@/types/job";
import { loadJobs, saveJobs } from "@/lib/storage";
import StatsCards from "@/components/StatsCards";
import JobCard from "@/components/JobCard";
import JobFormModal from "@/components/JobFormModal";

type ViewMode = "board" | "list";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<JobStatus | "all">("all");
  const [view, setView] = useState<ViewMode>("board");

  // Load from localStorage
  useEffect(() => {
    setJobs(loadJobs());
    setLoaded(true);
  }, []);

  // Persist
  useEffect(() => {
    if (loaded) saveJobs(jobs);
  }, [jobs, loaded]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        !search ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.role.toLowerCase().includes(search.toLowerCase()) ||
        j.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === "all" || j.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, filterStatus]);

  const handleSave = (job: Job) => {
    setJobs((prev) => {
      const exists = prev.find((j) => j.id === job.id);
      if (exists) {
        return prev.map((j) => (j.id === job.id ? job : j));
      }
      return [job, ...prev];
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this application?")) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? { ...j, status, updatedAt: new Date().toISOString() }
          : j
      )
    );
  };

  const openAdd = () => {
    setEditingJob(null);
    setModalOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  // Seed demo data for first-time users
  const addDemoData = () => {
    const demo: Job[] = [
      {
        id: "demo-1",
        company: "Google",
        role: "Software Engineer",
        location: "Bangalore / Hybrid",
        status: "interview",
        salary: "25-35 LPA",
        link: "https://careers.google.com",
        notes: "Phone screen done. Onsite next week.",
        appliedDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "demo-2",
        company: "Stripe",
        role: "Frontend Engineer",
        location: "Remote",
        status: "applied",
        salary: "30-40 LPA",
        notes: "Applied via LinkedIn referral",
        appliedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "demo-3",
        company: "Razorpay",
        role: "Backend Engineer",
        location: "Bangalore",
        status: "wishlist",
        notes: "Waiting for referral",
        appliedDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "demo-4",
        company: "Microsoft",
        role: "SDE-1",
        location: "Hyderabad",
        status: "offer",
        salary: "22 LPA + stocks",
        notes: "Offer received! Negotiating.",
        appliedDate: new Date(Date.now() - 86400000 * 20).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "demo-5",
        company: "Amazon",
        role: "Software Development Engineer",
        location: "Bangalore",
        status: "rejected",
        notes: "Rejected after OA",
        appliedDate: new Date(Date.now() - 86400000 * 15).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setJobs(demo);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white font-bold text-sm shadow-sm">
                JF
              </div>
              <div>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  JobFlow
                </h1>
                <p className="text-xs text-zinc-500 hidden sm:block">
                  Track every application
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {jobs.length === 0 && loaded && (
                <button
                  onClick={addDemoData}
                  className="hidden sm:inline-flex items-center rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Load Demo Data
                </button>
              )}
              <button
                onClick={openAdd}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors"
              >
                <span className="text-lg leading-none">+</span>
                Add Job
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <StatsCards jobs={jobs} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="search"
                placeholder="Search company, role, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                🔍
              </span>
            </div>

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as JobStatus | "all")
              }
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_CONFIG[s].label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden">
            <button
              onClick={() => setView("board")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === "board"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Empty state */}
        {loaded && jobs.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-3xl">
              📋
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              No applications yet
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Start tracking your job search. Add your first application or load
              demo data to explore the app.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={openAdd}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-medium"
              >
                + Add First Job
              </button>
              <button
                onClick={addDemoData}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Load Demo Data
              </button>
            </div>
          </div>
        )}

        {/* Board View */}
        {view === "board" && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {STATUSES.map((status) => {
              const columnJobs = filtered.filter((j) => j.status === status);
              return (
                <div key={status} className="flex flex-col">
                  <div
                    className={`mb-3 flex items-center justify-between rounded-xl px-3 py-2 ${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].border} border`}
                  >
                    <span
                      className={`text-sm font-semibold ${STATUS_CONFIG[status].color}`}
                    >
                      {STATUS_CONFIG[status].label}
                    </span>
                    <span
                      className={`text-xs font-medium rounded-full px-2 py-0.5 ${STATUS_CONFIG[status].color} bg-white/50 dark:bg-black/20`}
                    >
                      {columnJobs.length}
                    </span>
                  </div>
                  <div className="space-y-3 min-h-[120px]">
                    {columnJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {view === "list" && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={openEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 && jobs.length > 0 && (
          <div className="text-center py-12 text-zinc-500">
            No applications match your filters.
          </div>
        )}
      </main>

      <JobFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editingJob}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-400">
        Built with Next.js · JobFlow — Your personal job application tracker
      </footer>
    </div>
  );
}
