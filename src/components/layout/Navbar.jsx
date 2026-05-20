// src/components/layout/Navbar.jsx
// Responsive navbar with glassmorphism and animated mobile menu

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { navLinks } from "../../data";
import { useAudio } from "../../context/AudioContext";
import { HiMusicalNote } from "react-icons/hi2";
import { HiPause } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { isPlaying, toggle } = useAudio();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur py-3" : "py-5"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-rose-glow text-lg" />
            </motion.div>
            <span className="font-vibes text-2xl gradient-text">My Mitty</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`font-poppins text-sm transition-all duration-300 hover:text-rose-glow relative group ${
                  pathname === path ? "text-rose-glow" : "text-white/60"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-rose-glow transition-all duration-300 ${
                    pathname === path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Music + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Music toggle */}
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full glass-rose flex items-center justify-center text-rose-glow hover:shadow-glow-rose transition-all duration-300"
              aria-label="Toggle music"
              data-cursor-hover
            >
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              >
                {isPlaying ? (
                  <HiPause className="text-sm" />
                ) : (
                  <HiMusicalNote className="text-sm" />
                )}
              </motion.div>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-rose-glow transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-deep/95 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {navLinks.map(({ label, path }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`font-playfair text-3xl transition-all duration-300 hover:text-rose-glow ${
                      pathname === path ? "gradient-text" : "text-white/70"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
