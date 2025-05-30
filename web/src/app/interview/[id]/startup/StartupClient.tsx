"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

type StartupClientProps = object

const StartupClient: React.FC<StartupClientProps> = ({ }) => {
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh();
        }, 3000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [router]);

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
                            <div className="w-32 h-32 rounded-full border-[3px] border-blue-500 border-t-transparent animate-spin" />
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
                            <div className="w-20 h-20 rounded-full border-[3px] border-blue-400 border-t-transparent animate-spin" style={{ animationDirection: 'reverse' }} />
                        </motion.div>
                    </div>
                    
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Đang khởi tạo bộ câu hỏi...
                        </h1>
                        <p className="text-gray-600">
                            Hệ thống đang tạo bộ câu hỏi! Vui lòng chờ trong giây lát.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Button 
                            variant="outline" 
                            onClick={() => router.back()}
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 gap-2 border-gray-200"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Quay lại
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StartupClient;