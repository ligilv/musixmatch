'use client'
import { song1 } from "@/dummyData/songLyrics/song1";
import { IconMusic, IconMicrophone, IconPlayerPlay, IconPlayerPause, IconRewindBackward5, IconRewindForward5, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

const height = '120px'

function formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function Page({ params }: { params: { id: string } }) {
    const song = song1;
    const audioRef = useRef<HTMLAudioElement>(null);
    const lyricRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const lastActiveIndexRef = useRef<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [activeLyricIndex, setActiveLyricIndex] = useState<number | null>(null);

    // Find active lyric based on current time
    const findActiveLyric = (timeInMs: number) => {
        for (let i = song.lyrics.length - 1; i >= 0; i--) {
            if (timeInMs >= song.lyrics[i].startTimeinMs) {
                return i;
            }
        }
        return null;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            if (!isSeeking) {
                const time = audio.currentTime;
                setCurrentTime(time);

                // Update active lyric
                const timeInMs = time * 1000;
                const activeIndex = findActiveLyric(timeInMs);

                // Only update and scroll if lyric changed
                if (activeIndex !== lastActiveIndexRef.current) {
                    setActiveLyricIndex(activeIndex);
                    lastActiveIndexRef.current = activeIndex;

                    // Scroll to active lyric
                    if (activeIndex !== null && lyricRefs.current[activeIndex]) {
                        setTimeout(() => {
                            lyricRefs.current[activeIndex]?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                            });
                        }, 100);
                    }
                }
            }
        };
        const updateDuration = () => {
            if (audio.duration) {
                setDuration(audio.duration);
            }
        };
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setActiveLyricIndex(null);
            lastActiveIndexRef.current = null;
        };
        const handleLoadedData = () => {
            if (audio.duration) {
                setDuration(audio.duration);
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('loadeddata', handleLoadedData);
        audio.addEventListener('canplay', updateDuration);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        // Set initial duration if already loaded
        if (audio.duration) {
            setDuration(audio.duration);
        }

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('loadeddata', handleLoadedData);
            audio.removeEventListener('canplay', updateDuration);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [isSeeking, song.lyrics]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    const skipBackward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    };

    const skipForward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(duration, audio.currentTime + 5);
    };

    const handleSeekStart = () => {
        setIsSeeking(true);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        audio.currentTime = newTime;
    };

    const handleSeekEnd = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = parseFloat((e.target as HTMLInputElement).value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
        setIsSeeking(false);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newVolume = parseFloat(e.target.value);
        audio.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isMuted) {
            audio.volume = volume || 0.5;
            setVolume(volume || 0.5);
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const handleLyricClick = (startTimeinMs: number, index: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        const timeInSeconds = startTimeinMs / 1000;
        audio.currentTime = timeInSeconds;
        setCurrentTime(timeInSeconds);

        // Immediately update the active lyric index
        setActiveLyricIndex(index);
        lastActiveIndexRef.current = index;

        setIsSeeking(true);
        // Reset seeking state after a short delay
        setTimeout(() => {
            setIsSeeking(false);
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                            <IconMusic className="size-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {song.name}
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                                <IconMicrophone className="size-4" />
                                {song.lyrics.length} lines
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lyrics Container */}
                <Card className="p-8 bg-card/50 backdrop-blur-sm" style={{ marginBottom: height }}>
                    <div className="space-y-6">
                        {song.lyrics.map((lyric, index) => {
                            const isActive = activeLyricIndex === index;
                            const isPast = activeLyricIndex !== null && index < activeLyricIndex;

                            return (
                                <div
                                    key={lyric.startTimeinMs}
                                    ref={(el) => {
                                        lyricRefs.current[index] = el;
                                    }}
                                    onClick={() => handleLyricClick(lyric.startTimeinMs, index)}
                                    className={`group relative transition-all duration-300 cursor-pointer hover:bg-muted/30 rounded-lg p-2 -m-2 ${isActive
                                        ? 'scale-[1.02]'
                                        : isPast
                                            ? 'opacity-60'
                                            : 'opacity-100'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 text-right pt-1 pr-1">
                                            <span className={`text-xs font-mono transition-opacity ${isActive
                                                ? 'text-primary opacity-100 font-semibold'
                                                : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                                                }`}>
                                                {(() => {
                                                    const totalSeconds = Math.floor(lyric.startTimeinMs / 1000);
                                                    const minutes = Math.floor(totalSeconds / 60);
                                                    const seconds = totalSeconds % 60;
                                                    return `${minutes}m ${seconds}s`;
                                                })()}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-lg leading-relaxed transition-all duration-300 font-medium ${isActive
                                                ? 'text-primary scale-105 font-bold'
                                                : isPast
                                                    ? 'text-muted-foreground'
                                                    : 'text-foreground group-hover:text-primary'
                                                }`}>
                                                {lyric.text}
                                            </p>
                                        </div>
                                    </div>
                                    {index < song.lyrics.length - 1 && (
                                        <div className={`mt-4 h-px transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-transparent via-primary to-transparent'
                                            : 'bg-gradient-to-r from-transparent via-border to-transparent'
                                            }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
            {/* Custom Audio Player */}
            <div className="fixed bottom-0 left-0 right-0 flex justify-center">
                <div style={{
                    height: height,
                    width: '100%',
                    maxWidth: '768px', // matches max-w-3xl
                    backgroundColor: '#EBF4DD',
                    borderTop: '1px solid hsl(var(--border))',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px 16px',
                    gap: '8px'
                }}>
                    {/* Seek Bar */}
                    <div className="flex items-center gap-2 w-full">
                        <span className="text-xs text-muted-foreground font-mono min-w-[45px]">
                            {formatTime(currentTime)}
                        </span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={currentTime}
                            onMouseDown={handleSeekStart}
                            onTouchStart={handleSeekStart}
                            onChange={handleSeek}
                            onMouseUp={handleSeekEnd}
                            onTouchEnd={handleSeekEnd}
                            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            style={{
                                background: duration > 0 ? `linear-gradient(to right, #000000 0%, #000000 ${(currentTime / duration) * 100}%, #EBF4DD ${(currentTime / duration) * 100}%, #EBF4DD 100%)` : '#EBF4DD'
                            }}
                        />
                        <span className="text-xs text-muted-foreground font-mono min-w-[45px]">
                            {formatTime(duration)}
                        </span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between w-full">
                        {/* Left: Playback Controls */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={skipBackward}
                                className="h-10 w-10"
                            >
                                <IconRewindBackward5 className="size-5" />
                            </Button>
                            <Button
                                variant="default"
                                size="icon"
                                onClick={togglePlayPause}
                                className="h-12 w-12"
                            >
                                {isPlaying ? (
                                    <IconPlayerPause className="size-6" />
                                ) : (
                                    <IconPlayerPlay className="size-6" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={skipForward}
                                className="h-10 w-10"
                            >
                                <IconRewindForward5 className="size-5" />
                            </Button>
                        </div>

                        {/* Right: Volume Control */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className="h-10 w-10"
                            >
                                {isMuted || volume === 0 ? (
                                    <IconVolumeOff className="size-5" />
                                ) : (
                                    <IconVolume className="size-5" />
                                )}
                            </Button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                style={{
                                    background: `linear-gradient(to right, #000000 0%, #000000 ${(isMuted ? 0 : volume) * 100}%, #EBF4DD ${(isMuted ? 0 : volume) * 100}%, #EBF4DD 100%)`
                                }}
                            />
                        </div>
                    </div>

                    {/* Hidden audio element */}
                    <audio ref={audioRef} src='/audio1.mp3' preload="metadata" />
                </div>
            </div>
        </div>
    );
}