"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react"
import ChatSection from "./_components/ChatSection";
import { JobStatus, JobWithQuestion } from "@/lib/api/Types/job";
import { Mic, MicOff, Sparkles, CheckCircle2, Home, Trophy } from "lucide-react";
import { Message } from "./types";
import { audioPlayerManager } from "./_components/AudioPlayer/AudioPlayerManager";
import { createAnswer, feedback } from "@/actions/job.action";
import { toast } from "sonner";
import VoiceBtn from "./_components/VoiceBtn";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next-nprogress-bar";

interface Interviewer {
    name: string;
    avatar: string;
    title: string;
}


const interviewers: Record<string, Interviewer> = {
    "software-dev": {
        name: "Joanna",
        avatar: "/avatars/joanna.jpg",
        title: "Senior Software Engineer"
    },
    "data-science": {
        name: "Michael",
        avatar: "/avatars/michael.jpg",
        title: "Data Science Lead"
    },
    "design": {
        name: "Sarah",
        avatar: "/avatars/sarah.jpg",
        title: "UX/UI Design Director"
    },
    "marketing": {
        name: "David",
        avatar: "/avatars/david.jpg",
        title: "Marketing Manager"
    },
    "default": {
        name: "Joanna",
        avatar: "/avatars/joanna.jpg",
        title: "Professional Interviewer"
    }
};


const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

interface RoomDetailClientProps {
    jobs: JobWithQuestion
}

const RoomDetailClient: React.FC<RoomDetailClientProps> = ({
    jobs
}) => {
    const router = useRouter();

    // Interview states
    const [interviewStatus, setInterviewStatus] = useState<"waiting" | "in-progress" | "completed">("waiting");
    const [interviewer, setInterviewer] = useState<Interviewer>(interviewers["default"]);
    const [isStarted, setStarted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Media states
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isUserSpeaking, setIsUserSpeaking] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Feedback states
    const [isLoading, setIsLoading] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackId, setFeedbackId] = useState<string | null>(null);

    // Chat states
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentAudioId, setCurrentAudioId] = useState<string | null>(null);
    const [speechToText, setSpeechToText] = useState<string[]>([]);

    const sendMessage = useCallback(async ({ text }: { text: string }) => {
        const newMessages = [...messages];
        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage.role !== "assistant") return;

        const currentIndex = lastMessage.index || 1;
        const newItem = jobs.questions.find((item) => item.index === currentIndex + 1);
        if (!newItem) return setMessages(newMessages);

        const sentMessage = await createAnswer({
            answer: text,
            questionId: lastMessage.id,
        });

        if (!sentMessage.ok || !sentMessage.data) {
            return toast.error(sentMessage.message)
        }

        newMessages.push({
            createdAt: sentMessage.data.createdAt,
            updatedAt: sentMessage.data.updatedAt,
            sending: false,
            role: "user",
            text: sentMessage.data.content
        })

        newMessages.push({
            id: newItem.id,
            index: newItem.index,
            audioUrl: newItem.audioUrl,
            required: newItem.required,
            role: "assistant",
            text: newItem.question,
            sending: false,
        });

        setCurrentAudioId(newItem.id);

        setMessages(newMessages);
    }, [jobs.questions, messages])

    useEffect(() => {
        if (jobs.progressAnswer === 0 || jobs.status !== JobStatus.IN_PROGRESS) return;

        const newMessages: Message[] = [];

        for (let index = 1; index <= jobs.progressAnswer; index++) {
            const question = jobs.questions.find((item) => item.index === index);
            if (!question) return;
            newMessages.push({
                id: question.id,
                index: question.index,
                audioUrl: question.audioUrl,
                required: question.required,
                role: "assistant",
                text: question.question,
                sending: false,
            });
            if (question.answer) {
                newMessages.push({
                    createdAt: question.answer.createdAt,
                    updatedAt: question.answer.updatedAt,
                    sending: false,
                    role: "user",
                    text: question.answer.content,
                });
            }
            if (jobs.progressAnswer === index && !!question.answer) {
                const question = jobs.questions.find((item) => item.index === index + 1);
                if (!question) return;
                newMessages.push({
                    id: question.id,
                    index: question.index,
                    audioUrl: question.audioUrl,
                    required: question.required,
                    role: "assistant",
                    text: question.question,
                    sending: false,
                });
            }
        }
        setMessages(newMessages);
    }, [jobs.progressAnswer, jobs.questions, jobs.status])

    useEffect(() => {
        if (!isStarted || (isStarted && isProcessing)) return;

        const messageLast = messages[messages.length - 1];

        const shouldAddNext =
            messages.length === 0 ||
            (messageLast.role === "assistant" && !messageLast.required);

        if (!shouldAddNext) return;

        const index = messageLast?.role === "assistant" ? messageLast.index : 0;
        const newMessage = jobs.questions.find((item) => item.index === index + 1);
        if (!newMessage) return;

        (async () => {
            setIsProcessing(true);
            const id = newMessage.id;
            setMessages([
                ...messages,
                {
                    id: newMessage.id,
                    index: newMessage.index,
                    audioUrl: newMessage.audioUrl,
                    required: newMessage.required,
                    role: "assistant",
                    sending: false,
                    text: newMessage.question,
                }
            ]);
            await audioPlayerManager.waitUntilReady(id);
            audioPlayerManager.playOnlyById(id);

            if (!newMessage.required) {
                await audioPlayerManager.waitUntilEnded(id);
            }
            setIsProcessing(false);
        })();
    }, [messages, jobs.questions, sendMessage, isStarted, isProcessing]);

    useEffect(() => {
        if (!currentAudioId) return;

        (async () => {
            await audioPlayerManager.waitUntilReady(currentAudioId);
            audioPlayerManager.playOnlyById(currentAudioId);
            await audioPlayerManager.waitUntilEnded(currentAudioId);
            setCurrentAudioId(null);
        })();
    }, [currentAudioId]);

    useEffect(() => {
        const messageLast = messages[messages.length - 1];
        if (!messageLast || jobs.status !== JobStatus.IN_PROGRESS) return;
        const maxIndex = Math.max(...jobs.questions.map(obj => obj.index));
        if (messageLast.role !== "assistant" || messageLast.index < maxIndex) return;
        
        (async () => {
            try {
                setIsLoading(true);
                const res = await feedback(jobs.id);
                
                if (!res.data?.id) {
                    return toast.error(res.message);
                }
                
                setFeedbackId(res.data.id);
                setShowFeedbackModal(true);
            } catch {
                toast.error("Có lỗi xảy ra khi tạo feedback");
            } finally {
                setIsLoading(false);
            }
        })()
    }, [messages, jobs.questions, jobs.id, jobs.status])

    const handleGoToFeedback = () => {
        if (feedbackId) {
            router.push(`/interview/${feedbackId}/feedback`);
        }
    };

    const handleGoToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="text-lg font-medium">Đang tạo feedback...</p>
                    </div>
                </div>
            )}

            <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
                <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
                    <div className="relative">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-gray-900"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-100/50 via-transparent to-transparent dark:from-green-900/20 animate-[pulse_8s_ease-in-out_infinite]"></div>
                        
                        {/* Content */}
                        <div className="relative px-6 pt-8 pb-6">
                            <DialogHeader className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-ping rounded-full bg-green-400/20"></div>
                                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                                            <Trophy className="w-10 h-10 text-white animate-bounce" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-gradient">
                                            Chúc mừng bạn!
                                        </DialogTitle>
                                        <DialogDescription className="text-base text-gray-600 dark:text-gray-400">
                                            Bạn đã hoàn thành xuất sắc buổi phỏng vấn
                                        </DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="mt-8 space-y-6">
                                <div className="grid gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 animate-fade-in">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="font-medium text-green-700 dark:text-green-300">Phản hồi chi tiết đã sẵn sàng</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 animate-fade-in delay-100">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="font-medium text-blue-700 dark:text-blue-300">Nhận đánh giá chuyên sâu</span>
                                    </div>
                                </div>
                                <p className="text-center text-gray-600 dark:text-gray-400 animate-fade-in delay-200">
                                    Hãy xem feedback chi tiết để cải thiện kỹ năng của mình và chuẩn bị cho những cơ hội tiếp theo nhé!
                                </p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 w-full">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                onClick={handleGoToDashboard}
                            >
                                <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                Quay lại Dashboard
                            </Button>
                            <Button
                                variant="primary"
                                className="w-full sm:w-auto group hover:scale-105 transition-all"
                                onClick={handleGoToFeedback}
                            >
                                <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                                Xem Feedback
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <style jsx global>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s linear infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                .delay-100 {
                    animation-delay: 100ms;
                }
                .delay-200 {
                    animation-delay: 200ms;
                }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 flex-1 h-fit">
                <div className="lg:col-span-5 h-fit">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="relative aspect-video bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-800 dark:to-gray-750 flex items-center justify-center overflow-hidden">
                            {/* Background animation */}
                            <div className="absolute inset-0">
                                {/* Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-blue-100/30 dark:from-gray-800/30 dark:to-gray-750/30">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/10 via-transparent to-transparent dark:from-blue-900/10 animate-[pulse_8s_ease-in-out_infinite]"></div>
                                </div>

                                {/* Floating orbs */}
                                <div className="absolute inset-0">
                                    <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite]"></div>
                                    <div className="absolute w-[400px] h-[400px] top-1/2 -right-40 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 dark:from-indigo-600/10 dark:to-blue-600/10 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite]"></div>
                                    <div className="absolute w-[300px] h-[300px] -bottom-36 left-1/3 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite]"></div>
                                </div>

                                {/* Subtle grid overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                            </div>
                            {/* Interviewer video placeholder */}
                            <div className={cn(
                                "w-48 h-48 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center mx-auto shadow-2xl border-4 border-white dark:border-gray-600 animate-[fadeIn_0.5s_ease-in-out]",
                                isSpeaking && "animate-pulse transition-all duration-300 scale-105",
                            )}>
                                {interviewer.avatar.startsWith('/') ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400">
                                        <div className="text-center">
                                            <div className="h-full w-full rounded-full overflow-hidden">
                                                <div className="flex items-center justify-center h-full">
                                                    <span className={cn(
                                                        "text-5xl font-bold",
                                                        isSpeaking && "animate-bounce"
                                                    )}>{interviewer.name.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div
                                                className={cn(
                                                    "absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700 text-center min-w-40",
                                                    !isSpeaking && "hidden"
                                                )}
                                            >
                                                <p className="font-medium text-gray-900 dark:text-white">{interviewer.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{interviewer.title}</p>
                                                {isSpeaking && (
                                                    <div className="absolute right-3.5 -top-2 bg-green-500 text-white text-[10px] px-1 py-0.5 rounded-full animate-pulse">
                                                        Đang nói
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={interviewer.avatar}
                                            alt={interviewer.name}
                                            width={192}
                                            height={192}
                                            className={cn(
                                                "object-cover w-full h-full",
                                                isSpeaking && "animate-pulse"
                                            )}
                                        />
                                        {isSpeaking && (
                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-75"></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* User video placeholder - bottom right corner */}
                            <div className="absolute bottom-6 right-6 w-32 h-32 rounded-2xl overflow-hidden border-2 border-white dark:border-gray-700 shadow-lg transition-all hover:scale-105">
                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                    {isVideoOff ? (
                                        <span className="text-lg font-bold text-gray-500">
                                            Camera Off
                                        </span>
                                    ) : (
                                        <Avatar className="w-20 h-20 border-2 border-white dark:border-gray-600">
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xl font-bold">
                                                You
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                                {/* Status indicators */}
                                <div className="absolute bottom-2 right-2 flex space-x-2">
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center shadow-md",
                                        !isMuted ? 'bg-red-500' : 'bg-green-500'
                                    )}>
                                        <span className="text-white">
                                            {
                                                isMuted ? (
                                                    <Mic size={12} />
                                                ) : (
                                                    <MicOff size={12} />
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center shadow-md",
                                        isVideoOff ? 'bg-red-500' : 'bg-green-500'
                                    )}>
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Time indicator */}
                            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 shadow-md border border-gray-200 dark:border-gray-700 flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
                            </div>

                            {/* Interview status */}
                            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 shadow-md border border-gray-200 dark:border-gray-700">
                                <span className="text-sm font-medium flex items-center">
                                    <span className={cn(
                                        "w-3 h-3 rounded-full mr-2",
                                        interviewStatus === "waiting" ? "bg-yellow-500" :
                                            interviewStatus === "in-progress" ? "bg-green-500" :
                                                "bg-blue-500"
                                    )}></span>
                                    {interviewStatus === "waiting" ? "Đang chuẩn bị" :
                                        interviewStatus === "in-progress" ? "Đang phỏng vấn" :
                                            "Hoàn thành"}
                                </span>
                            </div>
                        </div>

                        {/* Video controls */}
                        <div className="flex items-center justify-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-850 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
                            <VoiceBtn setSpeechToText={setSpeechToText} isMuted={isMuted} setIsMuted={setIsMuted} isStarted={isStarted} isProcessing={isProcessing} isUserSpeaking={isUserSpeaking} setIsUserSpeaking={setIsUserSpeaking} />

                            <Button
                                variant={isVideoOff ? "destructive" : "outline"}
                                size="lg"
                                className={cn(
                                    "rounded-full transition-all hover:scale-110",
                                    isVideoOff && "shadow-md"
                                )}
                                onClick={() => setIsVideoOff(!isVideoOff)}
                            >
                                {isVideoOff ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
                                        </svg>
                                        <span>Tắt camera</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                        </svg>
                                        <span>Bật camera</span>
                                    </>
                                )}
                            </Button>

                            {
                                !isStarted ? (
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="rounded-full transition-all hover:scale-110 shadow-md"
                                        onClick={() => setStarted(true)}
                                    >
                                        <Sparkles />
                                        <span>Bắt đầu</span>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="destructive"
                                        size="lg"
                                        className="rounded-full transition-all hover:scale-110 shadow-md"
                                        onClick={() => setStarted(false)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        <span>Kết thúc</span>
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <ChatSection
                        interviewStatus={interviewStatus}
                        setInterviewStatus={setInterviewStatus}
                        setIsSpeaking={setIsSpeaking}
                        messages={messages}
                        sendMessage={sendMessage}
                        questions={jobs.questions}
                        isProcessing={isProcessing}
                        isStarted={isStarted}
                        setSpeechToText={setSpeechToText}
                        speechToText={speechToText}
                    />
                </div>
            </div>
        </>
    );
};

export default RoomDetailClient;