"use client";

import { createContext, useContext, useRef, useState, useEffect } from "react";
import musics from "../data/musics.json";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  selectedMusic: { title: string; src: string };
  setSelectedMusic: React.Dispatch<
    React.SetStateAction<{ title: string; src: string }>
  >;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [selectedMusic, setSelectedMusic] = useState<{
    title: string;
    src: string;
  }>(musics[Math.floor(Math.random() * musics.length)]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateMeta = () => setDuration(audio.duration);
    const updateVolume = () => setVolume(audio.volume);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateMeta);
    audio.addEventListener("volumechange", updateVolume);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateMeta);
      audio.removeEventListener("volumechange", updateVolume);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        playing,
        setPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        setVolume,
        selectedMusic,
        setSelectedMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
export default AudioContext;
