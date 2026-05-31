"use client";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import musics from "../../data/musics.json";
import { toast } from "sonner";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { useAudio } from "@/context/AudioPlayerContext";

export default function RightSide() {
  const { audioRef, playing, selectedMusic, setSelectedMusic, setPlaying } =
    useAudio();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // update playing state when audio plays/pauses
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    audio.src = selectedMusic.src;
    audio.play().catch(() => {
      document.addEventListener("click", () => audio.play().catch(() => {}), {
        once: true,
      });
    });

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [selectedMusic]);

  return (
    <div className="flex flex-col items-center gap-0 flex-2 m-0 p-0 w-[80%] md:w-full">
      {" "}
      <MusicDisk playing={playing} title={selectedMusic?.title} />{" "}
      <AudioPlayer
        selectedMusic={selectedMusic}
        onEnded={() => {
          console.log("ended");
          const random = musics[Math.floor(Math.random() * musics.length)];
          setSelectedMusic(random);
        }}
      />
    </div>
  );
}

const MusicDisk = ({
  playing,
  title,
}: {
  playing: boolean;
  title?: string;
}) => {
  return (
    <div
      className="flex justify-center items-center p-8  "
      onClick={() =>
        toast.custom((t) => (
          <div
            className=" bg-primary/50 text-primary-foreground 
          px-4 py-3 rounded-xl flex items-center justify-center gap-3 shadow-lg
           backdrop-blur-sm border border-primary/30 w-[80vw] md:w-full mx-auto"
          >
            <span>{title}</span>
            <Heart
              fill="currentColor"
              className="text-red-500 animate-pulse"
              onClick={() => {
                console.log("clicked");
              }}
            />
          </div>
        ))
      }
    >
      <div
        className="relative bg-foreground w-40 h-40 rounded-full flex justify-center items-center shadow-2xl overflow-hidden animate-spin-slow
        hover:scale-[1.01] transition-transform cursor-pointer"
        style={{ animationPlayState: playing ? "running" : "paused" }}
      >
        <div className="absolute inset-2 rounded-full border border-background/20"></div>
        <div className="absolute inset-4 rounded-full border border-background/20"></div>
        <div className="absolute inset-6 rounded-full border border-background/20"></div>
        <div className="absolute inset-8 rounded-full border border-background/20"></div>
        <div className="absolute inset-10 rounded-full border border-background/20"></div>

        <div className="bg-primary w-16 h-16 rounded-full flex justify-center items-center shadow-lg">
          <div className="bg-background w-3 h-3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
