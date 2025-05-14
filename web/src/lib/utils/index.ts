import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { JobStatus } from "../api/Types/job";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const StatusText: Record<JobStatus, string> = {
  [JobStatus.IN_PROGRESS]: 'Đang tiến hành',
  [JobStatus.COMPLETED]: 'Đã hoàn thành',
  [JobStatus.REVIEWED]: 'Đã đánh giá',
  [JobStatus.CANCELLED]: 'Đã hủy',
  [JobStatus.NOT_STARTED]: 'Chưa bắt đầu',
};

export const StatusBadgeColor: Record<JobStatus, string> = {
  [JobStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-700',
  [JobStatus.COMPLETED]: 'bg-green-100 text-green-700',
  [JobStatus.REVIEWED]: 'bg-indigo-100 text-indigo-700',
  [JobStatus.CANCELLED]: 'bg-red-100 text-red-700',
  [JobStatus.NOT_STARTED]: 'bg-gray-100 text-gray-700',
};

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-emerald-500";
  if (score >= 80) return "text-blue-500";
  if (score >= 70) return "text-violet-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
}