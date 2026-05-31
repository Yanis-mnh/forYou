"use client";
import { Music, PlayCircle } from "lucide-react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import musics from "../../data/musics.json";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAudio } from "@/context/AudioPlayerContext";

const MusicPicker = () => {
  const { audioRef, setSelectedMusic } = useAudio();
  return (
    <Drawer>
      <DrawerTrigger
        className="
      fixed bottom-4 right-4 p-2
     bg-white/70 backdrop-blur-sm rounded-full shadow-lg
     hover:bg-white/90 transition cursor-pointer z-50"
      >
        <Music />
      </DrawerTrigger>
      <DrawerContent className="bg-background/80 backdrop-blur-sm h-full">
        <DrawerHeader>
          <DrawerTitle>All Music Hona</DrawerTitle>
          <DrawerDescription>
            you can select the one u want to listen to
          </DrawerDescription>
          <div className="md:m-0 mt-2 h-full">
            <ScrollArea className="md:h-90 h-80 md:w-[350px] mx-auto  text-left border border-foreground/30 rounded-lg">
              <div className="w-full flex flex-col gap-4 ">
                {musics.map((music, i) => (
                  <div
                    key={i}
                    className="mx-2 flex items-center justify-between p-2 hover:bg-accent/50 rounded-md cursor-pointer"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.src = music.src;
                        setSelectedMusic(music);
                        audioRef.current.play().catch(() => {});
                      }
                    }}
                  >
                    <p className="my-2">{music.title}</p>
                    <div>
                      <PlayCircle className="inline mr-2" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default MusicPicker;
