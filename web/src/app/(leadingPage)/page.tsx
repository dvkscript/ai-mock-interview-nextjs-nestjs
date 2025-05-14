import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800">
          {/* Background abstract elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-400/30 dark:bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
            <div className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
            
            {/* AI network grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] dark:bg-[radial-gradient(#3b82f680_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.15]"></div>
            
            {/* Animated lines */}
            <div className="absolute inset-0">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,100" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="0.2" className="animate-[dash_5s_linear_infinite]"></path>
                <path d="M100,0 L0,100" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="0.2" className="animate-[dash_7s_linear_infinite]"></path>
                <path d="M50,0 L50,100" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="0.2" className="animate-[dash_6s_linear_infinite]"></path>
                <path d="M0,50 L100,50" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="0.2" className="animate-[dash_8s_linear_infinite]"></path>
                
                <defs>
                  <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Floating particles */}
            <div className="absolute left-[10%] top-[20%] h-3 w-3 rounded-full bg-blue-500/60 dark:bg-blue-400/60 animate-float"></div>
            <div className="absolute left-[15%] top-[60%] h-2 w-2 rounded-full bg-purple-500/60 dark:bg-purple-400/60 animate-float" style={{ animationDelay: '1s', animationDuration: '10s' }}></div>
            <div className="absolute left-[80%] top-[40%] h-2.5 w-2.5 rounded-full bg-cyan-500/60 dark:bg-cyan-400/60 animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
            <div className="absolute left-[60%] top-[70%] h-2 w-2 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60 animate-float" style={{ animationDelay: '1.5s', animationDuration: '12s' }}></div>
            <div className="absolute left-[35%] top-[25%] h-1.5 w-1.5 rounded-full bg-blue-500/60 dark:bg-blue-400/60 animate-float" style={{ animationDelay: '3s', animationDuration: '15s' }}></div>
            <div className="absolute left-[85%] top-[75%] h-1.5 w-1.5 rounded-full bg-purple-500/60 dark:bg-purple-400/60 animate-float" style={{ animationDelay: '3.5s', animationDuration: '9s' }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left content */}
            <div className="w-full lg:w-1/2 animate-[fadeIn_0.8s_ease-in-out]">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm text-blue-800 dark:text-blue-300 font-medium shadow-sm mb-6 border border-blue-200/50 dark:border-blue-800/50 transform origin-left animate-[scaleIn_0.5s_ease-out]">
                <span className="flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Công nghệ AI tiên tiến
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                <span className="block text-gray-900 dark:text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.1)] animate-[slideRight_0.5s_ease-out]">Luyện phỏng vấn cùng</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 [text-shadow:0_2px_10px_rgba(104,117,245,0.3)] animate-[slideRight_0.5s_ease-out_0.1s_both]">
                  AI thông minh
                </span>
                <div className="absolute -ml-2 h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-[scaleIn_0.5s_ease-out_0.6s_both]"></div>
              </h1>
              
              <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed animate-[fadeIn_1s_ease-in-out_0.3s_both]">
                Cải thiện kỹ năng phỏng vấn với trợ lý AI thông minh. Nhận phản hồi chuyên sâu và luyện tập không giới hạn - giúp bạn <span className="font-medium text-blue-700 dark:text-blue-400">tự tin chinh phục</span> mọi cuộc phỏng vấn.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-start gap-4 mb-12 animate-[fadeIn_1s_ease-in-out_0.5s_both]">
                <Link 
                  href="/interview/setup" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-[0_8px_16px_-6px_rgba(79,108,245,0.5)] dark:shadow-[0_8px_16px_-6px_rgba(79,108,245,0.3)] hover:shadow-[0_8px_20px_-6px_rgba(79,108,245,0.6)] dark:hover:shadow-[0_8px_20px_-6px_rgba(79,108,245,0.4)] transition-all duration-300 flex items-center justify-center group transform hover:-translate-y-0.5"
                >
                  <span className="z-10 relative">Bắt đầu ngay</span>
                  <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 animate-[pulse_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-70 transition-opacity blur-xl"></span>
                </Link>
                
                <Link 
                  href="/about" 
                  className="relative w-full sm:w-auto px-8 py-4 text-lg font-medium text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800/60 rounded-xl shadow-md hover:shadow-lg hover:bg-white dark:hover:bg-gray-750 transition-all duration-300 flex items-center justify-center group transform hover:-translate-y-0.5"
                >
                  <span>Tìm hiểu thêm</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 animate-[fadeIn_1s_ease-in-out_0.7s_both]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Độ hài lòng</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">10k+</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Người dùng</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">50+</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Ngành nghề</span>
                </div>
              </div>
            </div>
            
            {/* Right content - 3D Interview Visualization */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 animate-[fadeIn_1s_ease-in-out_0.3s_both]">
              <div className="relative">
                {/* Glowing effect around the card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
                
                {/* Main card */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform perspective-1000 hover:rotate-y-1 hover:-rotate-x-2 transition-transform duration-500">
                  {/* Card header with tabs */}
                  <div className="bg-gray-50 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">AI Mock Interview</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Đang hoạt động</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interview simulation content */}
                  <div className="p-6">
                    <div className="flex flex-col space-y-6">
                      {/* Interviewer */}
                      <div className="flex items-start space-x-4">
                        <div className="relative flex-shrink-0">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-40 animate-pulse"></div>
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
                            <ImageWithFallback
                              src="/avatars/ai-interviewer.jpg" 
                              alt="AI Interviewer"
                              width={48}
                              height={48}
                              className="object-cover"
                              fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%233B82F6'%3E%3Cpath fill-rule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clip-rule='evenodd' /%3E%3C/svg%3E"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl rounded-tl-none p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-blue-800 dark:text-blue-300">AI Interviewer</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">1 phút trước</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              Chào bạn! Tôi là trợ lý phỏng vấn AI. Hôm nay chúng ta sẽ thực hiện một buổi phỏng vấn cho vị trí mà bạn quan tâm. Bạn đã sẵn sàng bắt đầu chưa?
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* User */}
                      <div className="flex items-start space-x-4">
                        <div className="relative flex-shrink-0">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
                            <ImageWithFallback 
                              src="/avatars/user.jpg" 
                              alt="Người dùng"
                              width={48}
                              height={48}
                              className="object-cover"
                              fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236D28D9'%3E%3Cpath fill-rule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clip-rule='evenodd' /%3E%3C/svg%3E"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl rounded-tl-none p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-indigo-800 dark:text-indigo-300">Bạn</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Bây giờ</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              Vâng, tôi đã sẵn sàng. Rất vui được gặp bạn!
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Typing indicator */}
                      <div className="flex items-start space-x-4">
                        <div className="relative flex-shrink-0">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-40 animate-pulse"></div>
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
                            <ImageWithFallback 
                              src="/avatars/ai-interviewer.jpg" 
                              alt="AI Interviewer"
                              width={48}
                              height={48}
                              className="object-cover"
                              fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%233B82F6'%3E%3Cpath fill-rule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clip-rule='evenodd' /%3E%3C/svg%3E"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl rounded-tl-none p-4 shadow-sm">
                            <div className="flex space-x-1 items-center h-6">
                              <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card footer with input */}
                  <div className="bg-gray-50 dark:bg-gray-850 border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="Nhập câu trả lời của bạn..." 
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-300"
                        />
                      </div>
                      <button className="ml-2 flex-none w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trusted by */}
          <div className="mt-20 text-center animate-[fadeIn_1s_ease-in-out_0.7s_both]">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
              ĐƯỢC TIN DÙNG BỞI NHIỀU ỨNG VIÊN THÀNH CÔNG
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <div className="h-10 flex items-center">
                <ImageWithFallback
                  src="/logos/company1.svg"
                  alt="Company 1"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 50' fill='%23d1d5db'%3E%3Crect x='10' y='10' width='130' height='30' rx='5' /%3E%3C/svg%3E"
                />
              </div>
              <div className="h-10 flex items-center">
                <ImageWithFallback
                  src="/logos/company2.svg"
                  alt="Company 2"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 50' fill='%23d1d5db'%3E%3Ccircle cx='25' cy='25' r='15' /%3E%3Crect x='50' y='10' width='90' height='30' rx='5' /%3E%3C/svg%3E"
                />
              </div>
              <div className="h-10 flex items-center">
                <ImageWithFallback
                  src="/logos/company3.svg"
                  alt="Company 3"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 50' fill='%23d1d5db'%3E%3Cpolygon points='25,10 40,40 10,40' /%3E%3Crect x='50' y='10' width='90' height='30' rx='5' /%3E%3C/svg%3E"
                />
              </div>
              <div className="h-10 flex items-center">
                <ImageWithFallback
                  src="/logos/company4.svg"
                  alt="Company 4"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 50' fill='%23d1d5db'%3E%3Crect x='10' y='10' width='30' height='30' rx='15' /%3E%3Crect x='50' y='10' width='90' height='30' rx='5' /%3E%3C/svg%3E"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-gray-900">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-bl-[100px] opacity-60 blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-tr-[100px] opacity-60 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-[fadeIn_0.8s_ease-in-out]">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
              Tính năng nổi bật
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Nền tảng phỏng vấn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">thông minh</span> cho mọi ngành nghề
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-16">
              Chúng tôi kết hợp công nghệ AI tiên tiến với kinh nghiệm phỏng vấn thực tế để mang đến trải nghiệm luyện tập chân thực và hiệu quả nhất.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] animate-[fadeIn_0.8s_ease-in-out]" style={{ animationDelay: '200ms' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Phỏng vấn thực tế</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Trải nghiệm các cuộc phỏng vấn chân thực với AI được huấn luyện bởi các nhà tuyển dụng chuyên nghiệp. Câu hỏi phỏng vấn luôn cập nhật theo xu hướng thị trường.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Mô phỏng phỏng vấn thực tế
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Các câu hỏi phù hợp từng ngành nghề
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Thích ứng với trình độ ứng viên
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] animate-[fadeIn_0.8s_ease-in-out]" style={{ animationDelay: '400ms' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Đánh giá chi tiết</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Nhận phản hồi chi tiết và toàn diện về hiệu suất của bạn trong cuộc phỏng vấn. Xác định điểm mạnh và các lĩnh vực cần cải thiện.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Phân tích chuyên sâu câu trả lời
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Xác định điểm mạnh, điểm yếu
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gợi ý cải thiện cụ thể
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] animate-[fadeIn_0.8s_ease-in-out]" style={{ animationDelay: '600ms' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Luyện tập không giới hạn</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Thực hành bất cứ lúc nào, ở bất cứ đâu. Không có giới hạn số lần phỏng vấn, giúp bạn hoàn thiện kỹ năng đến khi tự tin.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Phỏng vấn không giới hạn
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Khả dụng 24/7
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Theo dõi tiến độ cải thiện
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          {/* AI Brain pattern */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <svg viewBox="0 0 800 600" className="w-full h-auto opacity-[0.07] dark:opacity-[0.05]">
                <path d="M400,50 Q550,150 400,250 T400,450 T400,650" stroke="url(#grad1)" strokeWidth="8" fill="none" />
                <path d="M50,300 Q250,150 400,250 T550,300 T800,400" stroke="url(#grad1)" strokeWidth="8" fill="none" />
                <path d="M300,50 Q350,150 250,250 T300,450 T200,600" stroke="url(#grad1)" strokeWidth="8" fill="none" />
                <path d="M400,50 C550,150 250,350 400,450 C550,550 250,550 400,650" stroke="url(#grad1)" strokeWidth="8" fill="none" />
                
                <circle cx="400" cy="150" r="10" fill="url(#grad2)" />
                <circle cx="250" cy="250" r="15" fill="url(#grad2)" />
                <circle cx="400" cy="350" r="8" fill="url(#grad2)" />
                <circle cx="550" cy="250" r="12" fill="url(#grad2)" />
                <circle cx="400" cy="450" r="10" fill="url(#grad2)" />
                <circle cx="200" cy="350" r="14" fill="url(#grad2)" />
                <circle cx="600" cy="350" r="11" fill="url(#grad2)" />
                
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* AI Visualization */}
          <div className="w-full md:w-1/2 animate-[fadeIn_0.8s_ease-in-out]">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-square w-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-850 flex items-center justify-center p-8">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* AI Brain Visualization */}
                      <div className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-blue-500/10 dark:bg-blue-500/20 rounded-full animate-pulse"></div>
                      <div className="absolute w-28 h-28 sm:w-40 sm:h-40 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className="relative z-10">
                        <div className="rounded-full w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                          <div className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Circles animation */}
                      <div className="absolute inset-0">
                        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-indigo-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-cyan-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-850 dark:to-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">AI đang hoạt động</div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Powered by advanced neural networks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 animate-[fadeIn_0.8s_ease-in-out]" style={{ animationDelay: '200ms' }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm text-blue-800 dark:text-blue-300 font-medium shadow-sm mb-6 border border-blue-200/50 dark:border-blue-800/50">
              Công nghệ AI tiên tiến
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Trí tuệ nhân tạo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">thấu hiểu nhu cầu</span> của bạn
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              Hệ thống AI của chúng tôi không chỉ đơn thuần là một bot hỏi đáp, mà là trợ lý phỏng vấn thông minh được huấn luyện từ hàng nghìn cuộc phỏng vấn thực tế.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">Natural Language Processing</h3>
                  <p className="text-gray-600 dark:text-gray-300">Hiểu và phản hồi chính xác với các câu trả lời phức tạp, không bị giới hạn bởi kịch bản cứng nhắc.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">Thích ứng với cá nhân</h3>
                  <p className="text-gray-600 dark:text-gray-300">Điều chỉnh câu hỏi và phản hồi dựa trên trình độ, ngành nghề và kinh nghiệm của bạn.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">Phân tích dữ liệu thông minh</h3>
                  <p className="text-gray-600 dark:text-gray-300">Đánh giá hiệu suất dựa trên nhiều tiêu chí, cung cấp phản hồi chi tiết và hướng dẫn cải thiện.</p>
                </div>
              </li>
            </ul>
            <Link 
              href="/interview/setup" 
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Trải nghiệm ngay
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-[0.03] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white opacity-[0.03] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl">
            <svg viewBox="0 0 800 800" className="w-full h-auto opacity-[0.05]">
              <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="400" cy="400" r="380" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-[fadeIn_0.8s_ease-in-out]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Nâng cao cơ hội thành công trong <span className="relative">
              phỏng vấn
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-50"></span>
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Hãy bắt đầu hành trình chinh phục nhà tuyển dụng với AI Mock Interview. Chúng tôi cam kết giúp bạn đạt được sự tự tin và kỹ năng cần thiết.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/interview/setup"
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-blue-800 dark:text-blue-200 bg-white dark:bg-white/90 hover:bg-blue-50 dark:hover:bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Bắt đầu miễn phí
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white border-2 border-white/50 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                AI Mock Interview
              </span>
            </div>
            <div className="flex space-x-8">
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Về chúng tôi
              </Link>
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Tính năng
              </Link>
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Bảng giá
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Liên hệ
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AI Mock Interview. Đã đăng ký bản quyền.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
