"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import Icons from "@/components/common/Icons"
import { AuthProvider } from "@/enums/provider"
import { useRouter } from "next-nprogress-bar"
import { loginSocial } from "@/actions/auth.action"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleLogin = async (provider: AuthProvider) => {
    setIsLoading(true);
    const url = await loginSocial(provider);
    router.push(url)
  }

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
          {/* <div className="absolute inset-0 bg-red bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" /> */}
        </div>
        <Link href={"/"} className="relative z-20 flex items-center text-lg font-medium">
          <div className="bg-white rounded-full p-2 mr-2">
            <Icons.logo className="h-6 w-6" />
          </div>
          AI Mock Interview
        </Link>
        <div className="relative z-20 mt-auto">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">
                Chuẩn bị cho sự nghiệp của bạn
              </h2>
              <p className="text-xl text-white/80">
                Nền tảng phỏng vấn thông minh giúp bạn tự tin hơn trong các buổi phỏng vấn thực tế
              </p>
            </div>
            <div className="grid gap-6">
              <div className="flex items-center space-x-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="rounded-full bg-white p-3">
                  <Icons.logo className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phỏng vấn thông minh</h3>
                  <p className="text-sm text-white/70">AI phân tích và đánh giá câu trả lời của bạn</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="rounded-full bg-white p-3">
                  <Icons.logo className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phản hồi chi tiết</h3>
                  <p className="text-sm text-white/70">Nhận gợi ý cải thiện sau mỗi buổi phỏng vấn</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="rounded-full bg-white p-3">
                  <Icons.logo className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Luyện tập không giới hạn</h3>
                  <p className="text-sm text-white/70">Thực hành bất kỳ lúc nào, bất kỳ nơi đâu</p>
                </div>
              </div>
            </div>
            <blockquote className="space-y-2 rounded-lg border-l-4 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-lg italic">
                &ldquo;AI Mock Interview đã giúp tôi chuẩn bị tốt hơn và tự tin hơn trong các buổi phỏng vấn thực tế. Tôi đã nhận được công việc mơ ước!&rdquo;
              </p>
              <footer className="text-sm font-medium">— Nguyễn Văn A, Software Engineer</footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-2 text-center"
          >
            <div className="mx-auto rounded-full bg-primary/10 p-4">
              <Icons.logo className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Chào mừng trở lại
            </h1>
            <p className="text-base text-muted-foreground">
              Đăng nhập để tiếp tục với AI Mock Interview
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-xl">
              <CardHeader className="space-y-4 text-center">
                <CardTitle className="text-2xl">
                  Đăng nhập / Đăng ký
                </CardTitle>
                <CardDescription className="text-base">
                  Chọn phương thức đăng nhập của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Button
                  variant="outline"
                  disabled={isLoading}
                  className="h-14 bg-white border-2 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white transition-all duration-300"
                  onClick={() => handleLogin(AuthProvider.google)}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
                  ) : (
                    <Icons.google className="mr-3 h-6 w-6" />
                  )}
                  <span className="text-lg font-medium">Đăng nhập với Google</span>
                </Button>
                <Button
                  variant="outline"
                  disabled={isLoading}
                  className="h-14 bg-white border-2 border-[#24292E] text-[#24292E] hover:bg-[#24292E] hover:text-white transition-all duration-300"
                  onClick={() => handleLogin(AuthProvider.github)}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
                  ) : (
                    <Icons.gitHub className="mr-3 h-6 w-6" />
                  )}
                  <span className="text-lg font-medium">Đăng nhập với Github</span>
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-background px-4 text-muted-foreground">
                      Hoặc
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  className="h-14 bg-white border-2 border-[#00A67E] text-[#00A67E] hover:bg-[#00A67E] hover:text-white transition-all duration-300"
                  onClick={() => handleLogin(AuthProvider.google)}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
                  ) : (
                    <Icons.mail className="mr-3 h-6 w-6" />
                  )}
                  <span className="text-lg font-medium">Đăng nhập với Email</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-8 text-center text-sm text-muted-foreground"
          >
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Chính sách bảo mật
            </a>
            .
          </motion.p>
        </div>
      </div>
    </div>
  )
} 