"use client";

import React, { useState, useEffect } from "react";
import { FreeUserDashboard } from "./_components/FreeUserDashboard";
import { UpgradeModal } from "./_components/UpgradeModal";
import { getUserSubscription } from "@/services/subscription.service";
import { getJobs } from "@/services/job.service";
import { Job } from "@/types/job";
import Container from "@/components/common/Container";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isPro, setIsPro] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [subscriptionRes, jobsRes] = await Promise.all([
          getUserSubscription(),
          getJobs({ page: 1, limit: 10 })
        ]);

        if (subscriptionRes.data) {
          setIsPro(subscriptionRes.data.tier === 'pro');
        }

        if (jobsRes.data) {
          setJobs(jobsRes.data.rows);
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Lỗi</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Container className="max-w-full">
      {!isPro ? (
        <FreeUserDashboard 
          jobs={jobs}
          onUpgrade={() => setShowUpgradeModal(true)}
        />
      ) : (
        <div>Pro Dashboard</div>
      )}

      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={(planId) => {
          console.log('Selected plan:', planId);
          setShowUpgradeModal(false);
        }}
      />
    </Container>
  );
}