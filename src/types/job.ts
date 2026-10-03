export type JobStatus = "wishlist" | "applied" | "interview" | "offer" | "rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  status: JobStatus;
  salary?: string;
  link?: string;
  notes?: string;
  appliedDate: string; // ISO string
  updatedAt: string;
}

export const STATUS_CONFIG: Record<
  JobStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  wishlist: {
    label: "Wishlist",
    color: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-200 dark:border-violet-800",
  },
  applied: {
    label: "Applied",
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
  },
  interview: {
    label: "Interview",
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
  },
  offer: {
    label: "Offer",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  rejected: {
    label: "Rejected",
    color: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800",
  },
};

export const STATUSES: JobStatus[] = [
  "wishlist",
  "applied",
  "interview",
  "offer",
  "rejected",
];
