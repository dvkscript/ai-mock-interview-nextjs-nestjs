"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GenerateQuestionSchema, TGenerateQuestion } from '@/lib/validators/generate-question.validator'
import { Sparkles, Briefcase, Clock, FileText } from 'lucide-react'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { GenerateQuestion } from '@/actions/job.action'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { useRouter } from 'next-nprogress-bar'

interface AddInterviewModalProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const AddInterviewModal: React.FC<AddInterviewModalProps> = ({
    trigger,
    open,
    onOpenChange
}) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const form = useForm<TGenerateQuestion>({
        resolver: zodResolver(GenerateQuestionSchema),
        defaultValues: {
            position: "",
            description: "",
            yearsOfExperience: 0,
        }
    });

    const onSubmit = async (data: TGenerateQuestion) => {
        startTransition(async () => {
            const res = await GenerateQuestion(data);
            if (!res.ok) {
                toast.error(res.message)
            } else {
                router.push(`/interview/${res.data.id}/room`)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]" aria-describedby='dialog-description'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Thêm phỏng vấn mới
                                </DialogTitle>
                            </motion.div>
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <DialogDescription className="text-base">
                                    Hãy cho chúng tôi thông tin về công việc bạn muốn phỏng vấn.
                                </DialogDescription>
                            </motion.div>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-blue-500" />
                                                Vị trí công việc
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Full Stack Developer, Backend Developer, etc."
                                                    className="col-span-3"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-500" />
                                                Mô tả công việc/công nghệ sử dụng
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="ReactJS, NodeJS,..."
                                                    className="col-span-3 min-h-[100px] max-h-[200px] resize-none"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="yearsOfExperience"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-blue-500" />
                                                Số năm kinh nghiệm
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    min={0}
                                                    max={50}
                                                    className="col-span-3"
                                                    placeholder='Nếu chưa có kinh nghiệm thì nhập "0" hoặc bỏ trống'
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        </div>
                        <DialogFooter>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-full"
                            >
                                <Button 
                                    type="submit" 
                                    variant={"primary"}
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Đang tạo...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Tạo phòng phỏng vấn
                                        </div>
                                    )}
                                </Button>
                            </motion.div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddInterviewModal 