"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import { UpgradeModal } from "./_components/UpgradeModal";
import { GetJobAndCountAll } from "@/actions/job.action";
import Container from "@/components/common/Container";
import AddInterviewModal from "./_components/AddInterviewModal";
import { Play, Plus } from "lucide-react";
import Link from "next/link";
import { JobStatus } from "@/lib/api/Types/job";
import { Badge } from "@/components/ui/badge";
import { StatusBadgeColor, StatusText } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";

interface FreeUserDashboardProps {
  jobs: GetJobAndCountAll["rows"];
  count: number;
}

// Component Hero Section
const HeroSection = ({ remainingInterviews, onUpgrade }: { remainingInterviews: number; onUpgrade: () => void }) => (
  <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
    <Hero>
      <Container className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <span className="text-white/90 text-sm font-medium">
                Bạn còn {remainingInterviews} buổi phỏng vấn miễn phí
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Luyện tập phỏng vấn với
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
                AI Mock Interview
              </span>
            </h1>
            <p className="text-base text-blue-100 max-w-xl">
              Nâng cấp lên Pro để mở khóa tất cả tính năng và tối ưu hóa quá trình luyện tập của bạn
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onUpgrade}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Nâng cấp Pro
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-blue-600 hover:text-white hover:bg-white/10 px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </Container>
    </Hero>
  </div>
);

// Component Create Interview
const CreateInterviewSection = ({ remainingInterviews }: { remainingInterviews: number }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
    <Card className="relative overflow-hidden border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tạo phỏng vấn mới
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Bạn còn {remainingInterviews} buổi phỏng vấn miễn phí
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        <AddInterviewModal
          trigger={
            <Button
              size={"lg"}
              variant={"primary"}
            >
              <Plus />
              Phỏng vấn mới
            </Button>
          }
        />
      </CardContent>
    </Card>
  </div>
);

// Component Pro Features
const ProFeaturesSection = ({ onUpgrade }: { onUpgrade: () => void }) => {
  const features = [
    {
      title: "Tạo không giới hạn",
      description: "Tạo bao nhiêu buổi phỏng vấn tùy thích",
      icon: "📊"
    },
    {
      title: "Phân tích chi tiết",
      description: "Nhận phản hồi chi tiết về câu trả lời",
      icon: "📈"
    },
    {
      title: "Tùy chỉnh câu hỏi",
      description: "Tạo bộ câu hỏi phù hợp với vị trí",
      icon: "⚙️"
    }
  ];

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
      <Card className="relative overflow-hidden border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Nâng cấp lên Pro
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Mở khóa tất cả tính năng và tối ưu hóa quá trình luyện tập
              </p>
            </div>
            <Button
              onClick={onUpgrade}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Nâng cấp ngay
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="group/item p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <div className="text-xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{feature.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component Recent Interviews
const RecentInterviewsSection = ({ jobs }: { jobs: FreeUserDashboardProps["jobs"] }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
    <Card className="relative overflow-hidden border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-0">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Phỏng vấn gần đây
          </h2>
        </div>
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((interview) => (
              <div key={interview.id} className="group/item p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center w-full">
                  <Badge
                    variant="outline"
                    className={`bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-2`}
                  >
                    {interview.yearsOfExperience} năm kinh nghiệm
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${StatusBadgeColor[interview.status]} mb-2`}
                  >
                    {StatusText[interview.status]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-200">{interview.position}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{interview.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(interview.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(interview.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-y-3 flex-col h-full">
                    {
                      interview.status === JobStatus.COMPLETED && interview.feedback && (
                        <Link
                          href={`/interview/${interview.feedback!.id}/feedback`}
                          className="flex-1 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Feedback
                        </Link>
                      )
                    }

                    {
                      interview.status === JobStatus.IN_PROGRESS && (
                        <Link
                          href={`/interview/${interview.id}/room`}
                          className="flex-1 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm"
                        >
                          <Play size={16} className="mr-1.5" />
                          Tiếp tục
                        </Link>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Bạn chưa có buổi phỏng vấn nào</p>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

// Component Tips
const TipsSection = () => {
  const tips = [
    {
      title: "Chuẩn bị kỹ",
      description: "Nghiên cứu kỹ về công ty và vị trí ứng tuyển",
      icon: "🎯"
    },
    {
      title: "Luyện tập",
      description: "Luyện tập trả lời các câu hỏi phổ biến",
      icon: "📝"
    },
    {
      title: "Chuẩn bị câu hỏi",
      description: "Chuẩn bị các câu hỏi cho nhà tuyển dụng",
      icon: "❓"
    }
  ];

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
      <Card className="relative overflow-hidden border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-0">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Mẹo phỏng vấn
          </h3>
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="group/item p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 transition-all duration-200">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{tip.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component Free Trial Status
const FreeTrialStatus = ({ jobs, remainingInterviews }: { jobs: FreeUserDashboardProps["jobs"]; remainingInterviews: number }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
    <Card className="relative overflow-hidden border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-0">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Gói dùng thử miễn phí
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Bạn còn {remainingInterviews} buổi phỏng vấn miễn phí
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Đã sử dụng</span>
            <span className="font-semibold text-gray-900 dark:text-white">{jobs.length}/1</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(jobs.length / 1) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export function FreeUserDashboard({ jobs, count }: FreeUserDashboardProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const remainingInterviews = Math.max(0, 1 - count);
  const canCreateInterview = remainingInterviews > 0;
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <HeroSection remainingInterviews={remainingInterviews} onUpgrade={() => setShowUpgradeModal(!showUpgradeModal)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {canCreateInterview && (
              <CreateInterviewSection remainingInterviews={remainingInterviews} />
            )}
            <ProFeaturesSection onUpgrade={() => setShowUpgradeModal(!showUpgradeModal)} />
            <RecentInterviewsSection jobs={jobs} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <FreeTrialStatus jobs={jobs} remainingInterviews={remainingInterviews} />
            <TipsSection />
          </div>
        </div>
      </div>
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={(planId) => {
          router.push(`/billing?period=${planId}`);
          setShowUpgradeModal(false);
        }}
      />
    </div>
  );
} 