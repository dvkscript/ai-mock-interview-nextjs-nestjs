import React from 'react';

interface DetailedFeedbackProps {
  feedback: string;
}

const DetailedFeedback: React.FC<DetailedFeedbackProps> = ({ feedback }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        Nhận xét chung
      </h2>
      
      <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
        {feedback.split('\n\n').map((paragraph, index) => (
          <p key={index} className="first-letter:text-xl first-letter:font-semibold">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailedFeedback; 