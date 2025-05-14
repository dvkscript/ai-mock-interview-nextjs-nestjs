import React from 'react';

interface StrengthsWeaknessesCardProps {
  strengths: string[];
  weaknesses: string[];
}

const StrengthsWeaknessesCard: React.FC<StrengthsWeaknessesCardProps> = ({ strengths, weaknesses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Điểm mạnh
        </h2>
        <ul className="space-y-3">
          {strengths.map((text, index) => (
            <li key={index} className="flex p-2 rounded-lg transition-colors duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/10">
              <div className="mr-3 flex-shrink-0 text-emerald-500">•</div>
              <span className="text-gray-600 dark:text-gray-300">{text}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Điểm cần cải thiện
        </h2>
        <ul className="space-y-3">
          {weaknesses.map((text, index) => (
            <li key={index} className="flex p-2 rounded-lg transition-colors duration-200 hover:bg-amber-50 dark:hover:bg-amber-900/10">
              <div className="mr-3 flex-shrink-0 text-amber-500">•</div>
              <span className="text-gray-600 dark:text-gray-300">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StrengthsWeaknessesCard; 