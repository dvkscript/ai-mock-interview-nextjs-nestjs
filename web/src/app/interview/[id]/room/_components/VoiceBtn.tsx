// components/VoiceBtn.tsx
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mic, MicOff } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceBtnProps {
    isMuted: boolean;
    isStarted: boolean;
    setIsMuted: (isMuted: boolean) => void;
    setIsUserSpeaking: (isUserSpeaking: boolean) => void;
    setSpeechToText: React.Dispatch<React.SetStateAction<string[]>>;
    isDosabled?: boolean;
}

export default function VoiceBtn({
    isMuted,
    isStarted,
    setIsMuted,
    setIsUserSpeaking,
    setSpeechToText,
    isDosabled
}: VoiceBtnProps) {
    const [interimTranscript, setInterimTranscript] = useState("");
    const [lastTranscript, setLastTranscript] = useState("");
    const micStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastSpeechTimeRef = useRef<number>(Date.now());

    const {
        transcript,
        interimTranscript: currentInterimTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({
        clearTranscriptOnListen: false,
    });

    // Hàm xử lý khi im lặng quá lâu
    const handleSilence = useCallback(() => {
        const now = Date.now();
        if (now - lastSpeechTimeRef.current > 3000) {
            // Reset text và trạng thái
            setInterimTranscript("");
            setIsUserSpeaking(false);
            
            // Nếu có text chưa được xử lý, thêm vào danh sách
            if (transcript && transcript !== lastTranscript) {
                const newText = transcript.slice(lastTranscript.length).trim();
                if (newText) {
                    setSpeechToText(prev => [...prev, newText]);
                    setLastTranscript(transcript);
                }
            }
        }
    }, [transcript, lastTranscript, setSpeechToText, setIsUserSpeaking]);

    // Khởi tạo và cấu hình microphone
    const initializeMicrophone = useCallback(async () => {
        try {
            // Dừng stream cũ nếu có
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioContextRef.current) {
                await audioContextRef.current.close();
            }

            // Cấu hình chi tiết cho microphone
            const constraints = {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: false,
                    channelCount: 1,
                    sampleRate: 16000,
                }
            };

            // Yêu cầu quyền truy cập microphone với cấu hình cụ thể
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            micStreamRef.current = stream;

            // Tạo AudioContext mới
            const audioContext = new AudioContext();
            audioContextRef.current = audioContext;

            // Tạo source node từ microphone stream
            const source = audioContext.createMediaStreamSource(stream);
            
            // Tạo gain node để ngăn chặn âm thanh phản hồi
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0; // Tắt output để không nghe được âm thanh hệ thống

            // Kết nối các node
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Bắt đầu nhận diện giọng nói
            await SpeechRecognition.startListening({ 
                continuous: true,
                language: 'vi-VN',
                interimResults: true
            });

            // Bắt đầu kiểm tra im lặng
            if (silenceTimeoutRef.current) {
                clearInterval(silenceTimeoutRef.current);
            }
            silenceTimeoutRef.current = setInterval(handleSilence, 500);
            lastSpeechTimeRef.current = Date.now();

            setIsMuted(true);
        } catch (error) {
            console.error('Error initializing microphone:', error);
            setIsMuted(false);
        }
    }, [setIsMuted, handleSilence]);

    // Xử lý khi click vào nút mic
    const handleMicClick = useCallback(async () => {
        if (!isMuted) {
            await initializeMicrophone();
        } else {
            // Dừng mic stream
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach(track => track.stop());
                micStreamRef.current = null;
            }
            if (audioContextRef.current) {
                await audioContextRef.current.close();
                audioContextRef.current = null;
            }
            if (silenceTimeoutRef.current) {
                clearInterval(silenceTimeoutRef.current);
                silenceTimeoutRef.current = null;
            }
            try {
                await SpeechRecognition.stopListening();
            } catch (e) {
                console.error('Error stopping speech recognition:', e);
            }
            setIsMuted(false);
            setIsUserSpeaking(false);
            resetTranscript();
            setInterimTranscript("");
            setLastTranscript("");
            // Reset text ở popup
            setSpeechToText([]);
        }
    }, [isMuted, setIsMuted, setIsUserSpeaking, resetTranscript, initializeMicrophone, setSpeechToText]);

    // Cập nhật interim transcript khi có thay đổi
    useEffect(() => {
        if (currentInterimTranscript) {
            setInterimTranscript(currentInterimTranscript);
            setIsUserSpeaking(true);
            lastSpeechTimeRef.current = Date.now();
        }
    }, [currentInterimTranscript, setIsUserSpeaking]);

    // Xử lý khi có transcript hoàn chỉnh
    useEffect(() => {
        if (transcript && transcript !== lastTranscript) {
            const newText = transcript.slice(lastTranscript.length).trim();
            if (newText) {
                setSpeechToText(prev => [...prev, newText]);
                setLastTranscript(transcript);
            }
        }
    }, [transcript, lastTranscript, setSpeechToText]);

    // Dừng nhận diện và dọn dẹp khi component unmount
    useEffect(() => {
        return () => {
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach(track => track.stop());
                micStreamRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
            if (silenceTimeoutRef.current) {
                clearInterval(silenceTimeoutRef.current);
                silenceTimeoutRef.current = null;
            }
            SpeechRecognition.stopListening();
            setInterimTranscript("");
            setLastTranscript("");
        };
    }, []);

    // Dừng nhận diện khi isStarted thay đổi
    useEffect(() => {
        if (!isStarted) {
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach(track => track.stop());
                micStreamRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
            if (silenceTimeoutRef.current) {
                clearInterval(silenceTimeoutRef.current);
                silenceTimeoutRef.current = null;
            }
            SpeechRecognition.stopListening();
            setIsMuted(false);
            setIsUserSpeaking(false);
            resetTranscript();
            setInterimTranscript("");
            setLastTranscript("");
        }
    }, [isStarted, setIsMuted, setIsUserSpeaking, resetTranscript]);

    // Kiểm tra trình duyệt có hỗ trợ Speech Recognition không
    if (!browserSupportsSpeechRecognition) {
        return (
            <Button
                variant="destructive"
                size="lg"
                className="rounded-full"
                disabled={true}
            >
                <MicOff />
                <span>Trình duyệt không hỗ trợ</span>
            </Button>
        );
    }

    return (
        <Button
            variant={!isMuted ? "destructive" : "outline"}
            size="lg"
            className={cn(
                "rounded-full transition-all hover:scale-110 relative",
                !isMuted && "shadow-md",
                listening && "animate-pulse"
            )}
            onClick={handleMicClick}
            disabled={isDosabled || !isStarted}
        >
            {isMuted ? (
                <>
                    <Mic className={cn(listening && "animate-bounce")} />
                    <span>{listening ? "Đang nói..." : "Tắt Mic"}</span>
                    {interimTranscript && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm min-w-[200px] max-w-[300px] truncate animate-fade-in">
                            {interimTranscript}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <MicOff />
                    <span>Bật Mic</span>
                </>
            )}
        </Button>
    );
}
