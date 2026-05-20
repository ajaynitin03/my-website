// src/context/AudioContext.jsx
import { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/music/song.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function play() {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setHasInteracted(true);
  }

  function pause() {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  }

  function toggle() {
    if (isPlaying) pause(); else play();
  }

  function fadeIn(duration = 2000) {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
    const step = volume / (duration / 50);
    const interval = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < volume) {
        audioRef.current.volume = Math.min(audioRef.current.volume + step, volume);
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  return (
    <AudioCtx.Provider value={{ isPlaying, volume, setVolume, play, pause, toggle, fadeIn, hasInteracted }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}