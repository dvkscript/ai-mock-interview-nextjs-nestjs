"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const Page = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="space-y-10">
          <div className="relative h-40 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-32 h-32 rounded-full border-[3px] border-red-500 border-t-transparent" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full border-[3px] border-red-400 border-t-transparent" />
            </motion.div>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-semibold text-gray-900">
              Đã xảy ra lỗi
            </h1>
            <p className="text-gray-600">
              Hệ thống đang gặp một số vấn đề. Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 gap-2 border-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <Button 
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
            >
              <Home className="h-4 w-4" />
              Trang chủ
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;