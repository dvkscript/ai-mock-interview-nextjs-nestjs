import React from 'react';
import { Feedback } from '@/actions/job.action';
import { categories } from '../utils';

interface OverallScoreCardProps {
  overallScore: number;
  feedbackScores: Feedback["evaluationByCriteria"];
  getGradeLabel: (score: number) => string;
  getGradeColor: (score: number) => string;
}

const maxScore = 10;

const OverallScoreCard: React.FC<OverallScoreCardProps> = ({
  overallScore,
  feedbackScores,
  getGradeLabel,
  getGradeColor
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8 overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-md">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Điểm phỏng vấn tổng thể</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mb-4 md:mb-0">
              Điểm số này phản ánh hiệu suất tổng thể của bạn trong cuộc phỏng vấn dựa trên nhiều yếu tố.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className={`text-7xl font-bold mb-1 transition-colors duration-300 ease-in-out transform hover:scale-110 ${getGradeColor(overallScore)}`}>
              {overallScore}
            </div>
            <div className={`text-lg font-medium ${getGradeColor(overallScore)}`}>
              {getGradeLabel(overallScore)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-750 px-6 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {
            feedbackScores.map((item, index) => {
              return <div key={index} className="text-center p-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className={`text-2xl font-bold mb-2 transition-colors duration-300 ease-in-out ${getGradeColor(item.score * 10)}`}>
                  {item.score}/{maxScore}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {categories[item.type]}
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default OverallScoreCard; 