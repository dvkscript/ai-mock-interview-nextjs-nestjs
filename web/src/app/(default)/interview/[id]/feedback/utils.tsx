import { QuestionType } from '@/lib/api/enum/question-type';
import React from 'react';

export const categories = {
  [`${QuestionType.TECHNICAL}`]: "Chuyên môn kỹ thuật",
  [`${QuestionType.MINDSET}`]: "Giải quyết vấn đề",
  [`${QuestionType.CULTURAL}`]: "Phù hợp văn hóa, định hướng",
  [`${QuestionType.SITUATION}`]: "Kinh nghiệm thực tế",
  [`${QuestionType.CONVERSATIONAL}`]: "Kỹ năng giao tiếp",
}


export function getGradeLabel(score: number): string {
  if (score >= 90) return "Xuất sắc";
  if (score >= 80) return "Tốt";
  if (score >= 70) return "Khá";
  if (score >= 60) return "Trung bình";
  return "Cần cải thiện";
}

export function getGradeColor(score: number): string {
  if (score >= 90) return "text-emerald-500";
  if (score >= 80) return "text-blue-500";
  if (score >= 70) return "text-violet-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
}

// Hàm trả về màu nền cho từng loại tiêu chí
export function getFeedbackCategoryColor(category: string): string {
  switch (category) {
    case QuestionType.TECHNICAL:
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
    case QuestionType.CONVERSATIONAL:
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
    case QuestionType.MINDSET:
      return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    case QuestionType.SITUATION:
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
    case QuestionType.CULTURAL:
      return "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400";
    default:
      return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
  }
}

// Hàm trả về icon cho từng loại tiêu chí
export function getCategoryIcon(category: string): React.ReactNode {
  switch (category) {
    case QuestionType.TECHNICAL:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    case QuestionType.CONVERSATIONAL:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
        </svg>
      );
    case QuestionType.MINDSET:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
          <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
          <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
        </svg>
      );
    case QuestionType.SITUATION:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      );
    case QuestionType.CULTURAL:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
  }
} 