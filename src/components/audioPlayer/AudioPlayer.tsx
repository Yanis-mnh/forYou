"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { AudioLinesIcon, PauseIcon, PlayIcon } from "lucide-react";
import { useAudio } from "@/context/AudioPlayerContext";

interface AudioPlayerProps {
  className?: string;
  onEnded: () => void;
  selectedMusic: { src: string; title: string };
}

const AudioPlayer = ({
  className,
  onEnded,
  selectedMusic,
}: AudioPlayerProps) => {
  const { audioRef, currentTime, setCurrentTime } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    audio.play().catch(() => {});
  }, [selectedMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef, setCurrentTime]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  };

  // Handle seeking from slider
  const handleSeek = (values: number[]) => {
    const newTime = values?.[0];
    if (audioRef.current && typeof newTime === "number" && isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
    }
  };

  const duration = Number.isFinite(audioRef.current?.duration)
    ? audioRef.current?.duration ?? 0
    : 0;

  const safeTime = Number.isFinite(currentTime) ? currentTime : 0;

  return (
    <div
      className={`flex justify-between items-center gap-3 bg-accent text-primary rounded-lg p-2 ${
        className ?? ""
      }`}
    >
      {/* Play / Pause button */}
      <Button
        variant="ghost"
        className="cursor-pointer hover:text-primary/80"
        onClick={togglePlay}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>

      {/* Slider for progress */}
      <Slider
        className="w-48"
        value={[safeTime]}
        max={duration}
        step={0.1}
        onValueChange={handleSeek}
      />

      <span className="w-10 text-xs tabular-nums">
        {currentTime.toFixed(0)}s
      </span>

      <audio
        ref={audioRef}
        src={selectedMusic.src}
        onEnded={onEnded}
        preload="auto"
        className="w-full"
        onLoadedData={(e) => {
          e.currentTarget.play().catch(() => {});
        }}
      ></audio>
    </div>
  );
};

export default AudioPlayer;
