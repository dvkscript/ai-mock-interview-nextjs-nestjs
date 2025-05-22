import { getFeedback } from "@/actions/job.action";
import React from "react"
import OverallScoreCard from "./_components/OverallScoreCard";
import { getGradeColor, getGradeLabel } from "./utils";
import StrengthsWeaknessesCard from "./_components/StrengthsWeaknessesCard";
import CategoryFeedbackList from "./_components/CategoryFeedbackList";
import DetailedFeedback from "./_components/DetailedFeedback";
import ActionButtons from "./_components/ActionButtons";

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

const Page: React.FC<PageProps> = async ({
    params
}) => {
    const { id } = await params;

    const feedbackRes = await getFeedback(id);

    const feedback = feedbackRes.data;

    if (!feedbackRes.ok || !feedback) {
        throw new Error(feedbackRes.status.toString())
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Kết quả phỏng vấn
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {feedback.position} - {feedback.yearsOfExperience} năm kinh nghiệm
                    </p>
                </header>

                {/* Overall Score Card */}
                <OverallScoreCard
                    overallScore={feedback.averageScore}
                    feedbackScores={feedback.evaluationByCriteria}
                    getGradeLabel={getGradeLabel}
                    getGradeColor={getGradeColor}
                />

                {/* Strengths & Weaknesses */}
                <StrengthsWeaknessesCard strengths={feedback.strengths} weaknesses={feedback.weaknesses} />

                {/* Category Feedback List */}
                <CategoryFeedbackList categoryFeedbacks={feedback.evaluationByCriteria} />

                {/* Detailed Feedback */}
                <DetailedFeedback feedback={feedback.overallComment} />

                {/* Action Buttons */}
                <ActionButtons />
            </div>
        </div>
    );
};

export default Page;