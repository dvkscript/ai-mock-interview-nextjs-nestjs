import { useEffect, useRef, useCallback, useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { AudioController, audioPlayerManager } from "./AudioPlayerManager"
import { AssistantMessage } from "../../types"

function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}


export interface AudioPlayerHandle {
    play: () => void
    pause: () => void
    toggle: () => void
}

export interface AudioPlayerProps {
    className?: string
    data: AssistantMessage;
    onPlayChange?: (isPlaying: boolean) => void;
    text: string;
}

const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(({ data, className, onPlayChange, text }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const isAudioReady = useRef(false);
    const readyPromise = useRef<Promise<void>>(new Promise((resolve) => {
        const onCanPlayThrough = () => {
            isAudioReady.current = true;
            resolve();
            audioRef.current?.removeEventListener("canplaythrough", onCanPlayThrough);
        };
        // Đăng ký khi component mount
        setTimeout(() => {
            audioRef.current?.addEventListener("canplaythrough", onCanPlayThrough);
        }, 0);
    }));

    // audio controller để register vào manager
    const controller = useRef<AudioController>({
        id: data.id,
        play: () => {
            audioRef.current?.play()
            setIsPlaying(true)
        },
        pause: () => {
            audioRef.current?.pause()
            setIsPlaying(false)
        },
        onEnded: () => {
            audioPlayerManager.unregister(controller.current);
            setIsPlaying(false)
        },
        isReady: () => isAudioReady.current ? true : readyPromise.current
    })

    useEffect(() => {
        const audioController = controller.current;

        audioPlayerManager.register(audioController)
        return () => {
            audioPlayerManager.unregister(audioController)
        }
    }, [])

    const onLoadedData = useCallback((e: Event) => {
        const audio = e.currentTarget as HTMLAudioElement
        setDuration(audio.duration || 0)
    }, [])

    const onTimeUpdate = useCallback((e: Event) => {
        const audio = e.currentTarget as HTMLAudioElement
        setCurrentTime(audio.currentTime)
    }, [])

    const onEnded = useCallback(() => {
        setIsPlaying(false);
        controller.current.onEnded();
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (text.split(" ").length < 15) {
            audio.playbackRate = 1.2;
        }

        audio.addEventListener("loadeddata", onLoadedData);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("loadeddata", onLoadedData);
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
        };
    }, [onLoadedData, onTimeUpdate, onEnded, text]);

    useEffect(() => {
        if (onPlayChange) onPlayChange(isPlaying)
    }, [isPlaying, onPlayChange])

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return
        if (isPlaying) {
            controller.current.pause()
        } else {
            audioPlayerManager.playOnlyById(controller.current.id)
        }
    }, [isPlaying])

    useImperativeHandle(ref, () => ({
        play: () => audioPlayerManager.playOnlyById(controller.current.id),
        pause: () => controller.current.pause(),
        toggle: togglePlay
    }))

    return (
        <Button
            size="xs"
            className={cn("px-0", className)}
            onClick={togglePlay}
            variant="ghost"
        >
            <audio ref={audioRef} src={data.audioUrl} preload="metadata" />
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <div className="text-sm text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>
        </Button>
    )
})

AudioPlayer.displayName = "AudioPlayer"

export default AudioPlayer
