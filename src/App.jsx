// src/App.jsx
// ─── Root layout — wraps every page ─────────────────────────

import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { useLenis } from "./hooks";
import { AudioProvider } from "./context/AudioContext";

import Navbar from "./components/layout/Navbar";
import CustomCursor from "./components/effects/CustomCursor";
import HeartParticles from "./components/effects/HeartParticles";
import MusicPlayer from "./components/audio/MusicPlayer";
import LoaderScreen from "./components/common/LoaderScreen";
import PageTransition from "./components/animations/PageTransition";

import "./styles/globals.css";

function Inner() {
  const location = useLocation();
  useLenis(); // Boot smooth scrolling

  const isIntro = location.pathname === "/";

  return (
    <div className="relative bg-deep min-h-screen cinematic-grain">
      {/* Global effects */}
      <CustomCursor />
      <HeartParticles />

      {/* Navbar hidden on intro screen */}
      {!isIntro && <Navbar />}

      {/* Page content with animated transitions */}
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>

      {/* Floating music player (hidden on intro) */}
      {!isIntro && <MusicPlayer />}
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <AudioProvider>
      {/* Loading screen */}
      {!loaded && <LoaderScreen onComplete={() => setLoaded(true)} />}

      {/* Main app */}
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        <Inner />
      </div>
    </AudioProvider>
  );
}
