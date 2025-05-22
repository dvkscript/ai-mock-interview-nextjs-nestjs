// components/VoiceBtn.tsx
'use client';

import { speechToText } from '@/actions/stt.action';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mic, MicOff } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useTransition } from 'react';

interface VoiceBtnProps {
    isMuted: boolean;
    isProcessing: boolean;
    isStarted: boolean;
    isUserSpeaking: boolean;
    setIsMuted: (isMuted: boolean) => void;
    setIsUserSpeaking: (isUserSpeaking: boolean) => void;
    setSpeechToText: React.Dispatch<React.SetStateAction<string[]>>;
    isDosabled?: boolean;
}

export default function VoiceBtn({
    isMuted,
    isProcessing,
    isStarted,
    isUserSpeaking,
    setIsMuted,
    setIsUserSpeaking,
    setSpeechToText,
    isDosabled
}: VoiceBtnProps) {
    // Audio context refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const rafIdRef = useRef<number | null>(null);

    // Media recorder refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioDataRef = useRef<Blob>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Speech detection refs
    const isTalkingRef = useRef(false);
    const recordingStartTimeRef = useRef<number | null>(null);
    const lastSpeechTimeRef = useRef<number | null>(null);

    const [isPending, startTransition] = useTransition();

    // Audio setup functions
    const getAudioStream = async (): Promise<MediaStream> => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        return stream;
    };

    const setupAnalyser = (stream: MediaStream) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;
    };

    const setupMediaRecorder = useCallback((stream: MediaStream) => {
        try {
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size === 0) return;
                audioDataRef.current = event.data;
            };

            mediaRecorder.onstop = async () => {
                if (streamRef.current) {
                    setupMediaRecorder(streamRef.current);
                }
                const audioData = audioDataRef.current;
                const lastSpeechTime = lastSpeechTimeRef.current;

                audioDataRef.current = null;
                lastSpeechTimeRef.current = null;
                isTalkingRef.current = false;
                setIsUserSpeaking(false);

                if (audioData && lastSpeechTime) {
                    startTransition(async () => {
                        const file = new File([audioData], 'audio.webm', { type: 'audio/webm' })
                        const res = await speechToText(file);
                        const text = res.data?.text?.trim()
                        if (text) {
                            setSpeechToText((prevState) => [...prevState, text])
                        }
                    })
                }
            };

            mediaRecorder.start();
            recordingStartTimeRef.current = Date.now();
        } catch {
            return
        }
    }, [setIsUserSpeaking, setSpeechToText]);

    const restartMediaRecorder = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }

        if (streamRef.current) {
            setTimeout(() => {
                setupMediaRecorder(streamRef.current!);
                recordingStartTimeRef.current = Date.now();
                lastSpeechTimeRef.current = null;
                isTalkingRef.current = false;
            }, 100);
        }
    }, [setupMediaRecorder]);

    // Volume check function
    const startVolumeCheck = useCallback(() => {
        const checkVolume = () => {
            const analyser = analyserRef.current;
            const dataArray = dataArrayRef.current;

            if (!analyser || !dataArray) return;

            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            const isNowTalking = avg > 35;
            const now = Date.now();

            if (isNowTalking) {
                if (!isTalkingRef.current) {
                    isTalkingRef.current = true;
                    setIsUserSpeaking(true);
                }
                lastSpeechTimeRef.current = now;
            }

            const timeSinceStart = now - (recordingStartTimeRef.current || now);
            const timeSinceLastSpeech = now - (lastSpeechTimeRef.current || now);

            if (!isTalkingRef.current && timeSinceStart > 3000) {
                restartMediaRecorder();
            }

            if (isTalkingRef.current && timeSinceLastSpeech > 2000) {
                isTalkingRef.current = false;
                setIsUserSpeaking(false);
                restartMediaRecorder();
            }

            rafIdRef.current = requestAnimationFrame(checkVolume);
        };

        checkVolume();
    }, [restartMediaRecorder, setIsUserSpeaking]);

    // Cleanup functions
    const cleanup = () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        audioContextRef.current?.close();
        mediaRecorderRef.current?.stop();
        streamRef.current?.getTracks().forEach((track) => track.stop());
    };

    const stopAudioStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    // Effect for audio initialization
    useEffect(() => {
        if (!isStarted || !isMuted || isProcessing) {
            return stopAudioStream()
        };

        const initAudio = async () => {
            const stream = await getAudioStream();
            setupAnalyser(stream);
            setupMediaRecorder(stream);
            startVolumeCheck();
        };

        initAudio();

        return () => cleanup();
    }, [setupMediaRecorder, startVolumeCheck, isStarted, isMuted, isProcessing]);

    return (
        <Button
            variant={!isMuted ? "destructive" : "outline"}
            size="lg"
            className={cn(
                "rounded-full transition-all hover:scale-110",
                !isMuted && "shadow-md"
            )}
            onClick={() => setIsMuted(!isMuted)}
            disabled={isDosabled}
        >
            {isMuted ? (
                <>
                    {isPending ? (
                        <div role="status">
                            <svg aria-hidden="true" className="w-10 h-10 inline-block text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <Mic />
                    )}
                    <span>
                        {isUserSpeaking ? "Đang nói..." : "Tắt Mic"}
                    </span>
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
