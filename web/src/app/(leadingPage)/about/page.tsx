import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Giới thiệu về AI Mock Interview
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Nền tảng phỏng vấn ảo tiên tiến giúp bạn chuẩn bị tốt nhất cho các cuộc phỏng vấn công việc
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            AI Mock Interview được tạo ra với mục đích giúp mọi người tự tin hơn trong các cuộc phỏng vấn việc làm. Chúng tôi tin rằng việc thực hành là chìa khóa để thành công, và công nghệ AI có thể cung cấp môi trường an toàn để bạn phát triển kỹ năng phỏng vấn.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Nền tảng của chúng tôi sử dụng công nghệ AI tiên tiến để mô phỏng các cuộc phỏng vấn thực tế, cung cấp phản hồi cá nhân hóa, và giúp bạn xác định các lĩnh vực cần cải thiện. Chúng tôi cam kết cung cấp trải nghiệm phỏng vấn thực tế nhất có thể.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Lợi ích chính
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex">
              <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Phỏng vấn thực tế với AI mô phỏng người phỏng vấn</span>
            </li>
            <li className="flex">
              <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Phản hồi chi tiết và cá nhân hóa sau mỗi phiên</span>
            </li>
            <li className="flex">
              <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Hỗ trợ nhiều ngành nghề và cấp độ kinh nghiệm</span>
            </li>
            <li className="flex">
              <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Luyện tập không giới hạn, bất cứ lúc nào, bất cứ nơi đâu</span>
            </li>
            <li className="flex">
              <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Phân tích xu hướng để theo dõi sự tiến bộ của bạn</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Công nghệ của chúng tôi
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          AI Mock Interview được xây dựng trên nền tảng trí tuệ nhân tạo tiên tiến, với mô hình ngôn ngữ lớn được đào tạo trên hàng nghìn cuộc phỏng vấn thực tế. Hệ thống của chúng tôi có thể:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Mô phỏng phỏng vấn viên</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tạo ra các câu hỏi phỏng vấn cá nhân hóa dựa trên vị trí và kinh nghiệm của bạn.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Phân tích câu trả lời</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Đánh giá câu trả lời của bạn dựa trên nội dung, độ rõ ràng và sự phù hợp.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Đề xuất cải thiện</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cung cấp phản hồi chi tiết và đề xuất cụ thể để cải thiện hiệu suất phỏng vấn.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sẵn sàng để bắt đầu?
        </h2>
        <Link
          href="/interview/new"
          className="inline-block px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Bắt đầu phỏng vấn
        </Link>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <p className="text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} AI Mock Interview. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
} 