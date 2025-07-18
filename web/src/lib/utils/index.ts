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
  [JobStatus.CREATING]: 'Đang tạo...',
  [JobStatus.CREATE_FAILED]: 'Tạo thất bại...',
};

export const StatusBadgeColor: Record<JobStatus, string> = {
  [JobStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-700',
  [JobStatus.COMPLETED]: 'bg-green-100 text-green-700',
  [JobStatus.REVIEWED]: 'bg-indigo-100 text-indigo-700',
  [JobStatus.CANCELLED]: 'bg-red-100 text-red-700',
  [JobStatus.NOT_STARTED]: 'bg-gray-100 text-gray-700',
  [JobStatus.CREATING]: 'bg-yellow-100 text-yellow-700',
  [JobStatus.CREATE_FAILED]: 'bg-red-100 text-red-700',
};

export const StatusBgColor: Record<JobStatus, string> = {
  [JobStatus.IN_PROGRESS]: 'bg-yellow-500',
  [JobStatus.COMPLETED]: 'bg-green-500',
  [JobStatus.REVIEWED]: 'bg-indigo-500',
  [JobStatus.CANCELLED]: 'bg-red-500',
  [JobStatus.NOT_STARTED]: 'bg-gray-500',
  [JobStatus.CREATING]: 'bg-yellow-500',
  [JobStatus.CREATE_FAILED]: 'bg-red-500',
};

export function getScoreColor(score: number): string {
  if (score >= 9) return "text-emerald-500";
  if (score >= 8) return "text-blue-500";
  if (score >= 7) return "text-violet-500";
  if (score >= 6) return "text-yellow-500";
  return "text-red-500";
}

export function isPermission(data: string[], permission: string | string[]) {
  if (Array.isArray(permission)) {
    return permission.some(p => data.includes(p));
  } else {
    return data.includes(permission);
  }
}