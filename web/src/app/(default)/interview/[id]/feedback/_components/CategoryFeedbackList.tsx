"use client"
import React, { useState, useEffect } from 'react';
import { categories, getCategoryIcon, getFeedbackCategoryColor } from '../utils';
import { QuestionType } from '@/lib/api/Types/job';

interface CategoryFeedbackListProps {
  categoryFeedbacks: {
    type: QuestionType;
    score: number;
    summary: string;
    improvementSuggestions: string[];
  }[];
}

const CategoryFeedbackList: React.FC<CategoryFeedbackListProps> = ({ categoryFeedbacks }) => {
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(true);

  // Khi categoryFeedbacks thay đổi, mở tất cả các mục
  useEffect(() => {
    if (categoryFeedbacks.length > 0) {
      const initialOpenState: Record<number, boolean> = {};
      // Mặc định mở tất cả các mục
      categoryFeedbacks.forEach((_, index) => {
        initialOpenState[index] = true;
      });
      setOpenCategories(initialOpenState);
    }
  }, [categoryFeedbacks]);

  // Hàm để mở/đóng một mục
  const toggleCategory = (index: number) => {
    setOpenCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Hàm để mở/đóng tất cả các mục
  const toggleAllCategories = () => {
    const newState = !allCategoriesOpen;
    setAllCategoriesOpen(newState);

    const updatedOpenState: Record<number, boolean> = {};
    categoryFeedbacks.forEach((_, index) => {
      updatedOpenState[index] = newState;
    });
    setOpenCategories(updatedOpenState);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Đánh giá theo tiêu chí
        </h2>
        <button
          onClick={toggleAllCategories}
          className="px-4 py-2 text-sm font-medium rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 border border-blue-200 dark:border-blue-800"
        >
          {allCategoriesOpen ? "Thu gọn tất cả" : "Mở rộng tất cả"}
        </button>
      </div>

      <div className="space-y-4">
        {categoryFeedbacks.map((category, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-md">
            <button
              onClick={() => toggleCategory(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors focus:outline-none border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getFeedbackCategoryColor(category.type)}`}>
                  {getCategoryIcon(category.type)}
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {categories[category.type]}
                </h2>
              </div>
              <span className="flex-shrink-0 ml-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${openCategories[index] ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {openCategories[index] && (
              <div className="p-6">
                <div className="mb-5">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Đánh giá
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {category.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Gợi ý cải thiện
                  </h3>
                  <ul className="space-y-3">
                    {category.improvementSuggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex p-2 rounded-lg transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/10">
                        <div className="flex-shrink-0 mr-3 text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                          </svg>
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">
                          {suggestion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFeedbackList; 