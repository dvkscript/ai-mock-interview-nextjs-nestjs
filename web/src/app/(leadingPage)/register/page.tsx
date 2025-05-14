'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    
    setIsLoading(true);
    
    // Mô phỏng xử lý đăng ký
    setTimeout(() => {
      setIsLoading(false);
      // Trong thực tế, sẽ có code xử lý đăng ký và điều hướng tại đây
      console.log('Đăng ký với:', { fullName, email, password, agreeTerms });
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center md:flex-row md:px-8">
        {/* Left side - content */}
        <div className="hidden md:block md:w-1/2 p-8">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full filter blur-3xl"></div>
            
            {/* Content */}
            <div className="relative max-w-md mx-auto">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Nâng cao cơ hội chinh phục nhà tuyển dụng
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Tham gia cùng hàng nghìn ứng viên khác đã cải thiện kỹ năng phỏng vấn và tự tin hơn với AI Mock Interview.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg">
                      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                      Phỏng vấn không giới hạn
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thực hành phỏng vấn bao nhiêu lần tùy thích, với nhiều ngành nghề và cấp độ kinh nghiệm khác nhau.
                  </p>
                </div>
                
                <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-lg">
                      <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                      Phản hồi chi tiết
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nhận phân tích chi tiết về hiệu suất, điểm mạnh và các lĩnh vực cần cải thiện sau mỗi buổi phỏng vấn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - form */}
        <div className="w-full max-w-md px-4 md:w-1/2">
          <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tạo tài khoản mới
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Bắt đầu hành trình luyện tập phỏng vấn cùng AI
              </p>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="inline-flex justify-center items-center w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.615 11.615 0 006.29 1.84" />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  Hoặc đăng ký với
                </span>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Họ và tên
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-300"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-300"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mật khẩu
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Xác nhận mật khẩu
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600 dark:text-gray-300">
                    Tôi đồng ý với{' '}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                      Điều khoản dịch vụ
                    </a>{' '}
                    và{' '}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                      Chính sách bảo mật
                    </a>
                  </label>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading || !agreeTerms}
                  className={`group relative w-full flex justify-center py-3 px-4 rounded-xl text-sm font-medium text-white transition-all duration-200 ${
                    isLoading || !agreeTerms 
                      ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Đã có tài khoản?{' '}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 