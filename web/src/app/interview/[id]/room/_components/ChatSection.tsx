"use client"
import { Send } from "lucide-react";
import React, { useCallback, useEffect, useOptimistic, useRef, useTransition } from "react"
import { JobQuestion } from "@/lib/api/Types/job";
import { Textarea } from "@/components/ui/textarea";
import AudioPlayer from "./AudioPlayer";
import { Message } from "../types";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SpeechRecognition from 'react-speech-recognition';

interface ChatSectionProps {
    interviewStatus: "waiting" | "in-progress" | "completed";
    setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
    setInterviewStatus: React.Dispatch<React.SetStateAction<"waiting" | "in-progress" | "completed">>;
    messages: Message[];
    sendMessage: ({ text }: { text: string }) => Promise<any>;
    questions: JobQuestion[];
    isProcessing: boolean;
    isStarted: boolean;
    setSpeechToText: (text: string[]) => void;
    speechToText: string[];
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
    isMuted: boolean;
}

const ChatSection: React.FC<ChatSectionProps> = ({
    messages,
    sendMessage,
    questions,
    isProcessing,
    isStarted,
    setIsSpeaking,
    setSpeechToText,
    speechToText,
    setIsMuted,
    isMuted,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const profile = useUserStore(s => s.profile)
    
    const [, startTransition] = useTransition()
    const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
        messages,
        (state, newMessage) => {
            return [
                ...state,
                {
                    text: newMessage,
                    sending: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    role: "user",
                },
                {
                    text: "",
                    sending: true,
                    role: "assistant",
                    audioUrl: "",
                    required: false,
                    index: questions.length,
                    id: "",
                }
            ]
        }
    );

    const formAction = useCallback(async () => {
        if (!formRef.current || !textareaRef.current) return;

        const text = textareaRef.current.value.trim();
        if (!text) return;

        // Dừng ghi âm chỉ khi mic đang bật
        if (isMuted) {
            try {
                await SpeechRecognition.stopListening();
            } catch (e) {
                console.error('Error stopping speech recognition:', e);
            }
            startTransition(() => {
                setIsMuted(false);
                setSpeechToText([]);
            });
        }

        // Reset form và speech to text
        formRef.current.reset();

        // Gửi message
        startTransition(() => {
            addOptimisticMessage(text);
        });
        await sendMessage({ text });
    }, [addOptimisticMessage, sendMessage, setSpeechToText, setIsMuted, isMuted, startTransition]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        formAction();
    }, [formAction]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formAction();
        }
    }, [formAction]);

    useEffect(() => {
        const container = messagesRef.current?.parentElement;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [
        messages.length,
        optimisticMessages.length
    ])

    useEffect(() => {
        const textareaEl = textareaRef.current;
        if (textareaEl && speechToText.length > 0) {
            const newText = speechToText[speechToText.length - 1];
            textareaEl.value = textareaEl.value.trimEnd() + ' ' + newText;
        }
    }, [speechToText])

    const renderMessageContent = (msg: Message) => {
        if (msg.sending) {
            return (
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-750 text-gray-800 dark:text-gray-200 max-w-[75%] rounded-2xl p-4 rounded-tl-none shadow-sm">
                    <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            );
        }

        
        return (
            <div
                className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-750 text-gray-800 dark:text-gray-200 rounded-tl-none"
                    }`}
            >
                <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
                {
                    msg.role === "assistant" && msg.audioUrl && (
                        <AudioPlayer
                            data={msg}
                            className="mt-1"
                            onPlayChange={(isPlay) => setIsSpeaking(isPlay)}
                            text={msg.text}
                        />
                    )
                }
                {
                    msg.role === "user" && (
                        <div className={`text-xs mt-1 text-right ${msg.role === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                            }`}>
                            {(new Date(msg.createdAt)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    )
                }
            </div>
        );
    };

    const renderAvatar = (role: "user" | "assistant") => {
        if (role === "assistant") {
            return (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 flex-shrink-0 border border-blue-200 dark:border-blue-800">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">J</span>
                </div>
            );
        }
        return (
            <Avatar
                className="w-8 h-8 border-2 border-white dark:border-gray-600"
            >
                <AvatarImage
                    src={profile?.thumbnail}
                    sizes="32"
                />
                <AvatarFallback>
                    {profile?.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col max-h-[820px] h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-850 dark:to-gray-800">
                <h2 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Cuộc trò chuyện
                </h2>
            </div>

            {/* Chat messages */}
            <div
                className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 h-full"
            >
                <div
                    ref={messagesRef}
                    className="w-full space-y-4 p-4"
                >
                    {optimisticMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-[fadeIn_0.3s_ease-in-out]`}
                        >
                            {msg.role === "assistant" && renderAvatar("assistant")}
                            {renderMessageContent(msg)}
                            {msg.role === "user" && renderAvatar("user")}
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
            </div>

            {/* Chat input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-850 dark:to-gray-800">
                <form
                    className="flex items-end gap-x-2"
                    onSubmit={handleSubmit}
                    ref={formRef}
                >
                    <Textarea
                        ref={textareaRef}
                        className="flex-1 resize-none min-h-12 max-h-40 text-lg rounded-md"
                        placeholder="Nhập câu trả lời của bạn..."
                        onKeyDown={handleKeyDown}
                        name="message"
                        disabled={!isStarted || isProcessing}
                    />
                    <Button
                        className="size-12 rounded-lg"
                        size={"icon"}
                        type="submit"
                        variant={"primary"}
                        disabled={!isStarted || isProcessing}
                    >
                        <Send />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatSection;