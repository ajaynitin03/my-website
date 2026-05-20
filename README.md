# 💕 Romantic Birthday Website — Complete Setup Guide
### For Beginners using VS Code on Windows

---

## 📋 TABLE OF CONTENTS

1. [What You're Building](#what-youre-building)
2. [What You Need to Install First](#step-1-install-these-tools-first)
3. [Download the Project](#step-2-get-the-project-files)
4. [Open in VS Code](#step-3-open-in-vs-code)
5. [Install Project Dependencies](#step-4-install-project-dependencies)
6. [Run the Website](#step-5-run-the-website)
7. [Personalize It](#step-6-personalize-the-website)
8. [Folder Structure Explained](#folder-structure-explained)
9. [Troubleshooting](#troubleshooting-common-errors)
10. [Deploy Online (Vercel)](#step-7-deploy-online-free-with-vercel)

---

## 🌸 What You're Building

A cinematic, ultra-romantic birthday website with:
- 🎬 Cinematic intro screen with her name
- 📖 Your love story timeline
- 📸 Photo gallery with lightbox
- 💌 Animated love letter
- 🎬 Video memories showcase
- 💕 "100 Reasons I Love You" interactive cards
- 🌙 Future dreams section
- 🎉 Grand birthday surprise finale with confetti

---

## STEP 1: Install These Tools First

> ⚠️ Do this BEFORE anything else. Only needs to be done once on your computer.

### 1A — Install Node.js

Node.js lets your computer run JavaScript projects.

1. Go to: **https://nodejs.org**
2. Click the big green button that says **"LTS"** (Long Term Support)
3. Download and run the installer
4. Click "Next" through all the steps, keep everything default
5. Click "Finish"

**✅ Check it worked:** Open VS Code → press `` Ctrl + ` `` (backtick key, top-left of keyboard) to open Terminal → type:
```
node --version
```
You should see something like: `v20.11.0`

---

### 1B — Install Git

Git lets you manage project files.

1. Go to: **https://git-scm.com/download/win**
2. Download and run the installer
3. Keep all default settings, click "Next" all the way through
4. Click "Finish"

**✅ Check it worked:** In VS Code Terminal type:
```
git --version
```
You should see: `git version 2.x.x`

---

## STEP 2: Get the Project Files

### Option A — Copy the files manually (Easiest for beginners)

1. Create a new folder on your Desktop called `romantic-birthday-site`
2. Copy all the project files into that folder exactly as provided

### Option B — Download as ZIP
If you received this as a ZIP file:
1. Right-click the ZIP → **Extract All**
2. Choose your Desktop as the destination
3. Click Extract

---

## STEP 3: Open in VS Code

1. Open **VS Code**
2. Click **File** → **Open Folder**
3. Navigate to your `romantic-birthday-site` folder
4. Click **Select Folder**

You should now see the project files in the left panel (Explorer).

> 💡 Tip: Press `Ctrl + `` ` `` ` to open the built-in Terminal inside VS Code

---

## STEP 4: Install Project Dependencies

This downloads all the libraries the website needs (React, animations, etc.)

In the VS Code Terminal, make sure you're in the right folder. You should see:
```
C:\Users\YourName\Desktop\romantic-birthday-site>
```

If not, type:
```
cd Desktop\romantic-birthday-site
```

Then run:
```
npm install
```

> ⏳ This will take 1-3 minutes. You'll see lots of text scrolling — that's normal!
> ✅ It's done when you see your cursor again (the blinking `>` prompt)

---

## STEP 5: Run the Website

In the Terminal, type:
```
npm run dev
```

You should see something like:
```
  VITE v5.x.x  ready in 800ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Now open your browser and go to: **http://localhost:5173**

🎉 **Your website is running!**

> 💡 To stop the website: click in the Terminal and press `Ctrl + C`
> 💡 To start again: type `npm run dev`

---

## STEP 6: Personalize the Website

### 6A — Change Her Name

Open the file: `src/pages/Intro.jsx`

Find this line near the top:
```js
const HER_NAME = "Aisha";
```

Change `"Aisha"` to your girlfriend's actual name. Do the same in:
- `src/pages/Home.jsx` (same line)
- `src/pages/FinalSurprise.jsx` (same line)

---

### 6B — Edit Your Love Story (Timeline)

Open: `src/data/index.js`

Find the `timelineData` array. Each memory looks like this:
```js
{
  id: 1,
  date: "March 14, 2021",          // ← Change to your real date
  title: "The Day We Met 💫",       // ← Change to your real title
  description: "I remember...",     // ← Write your real memory
  emoji: "✨",                       // ← Change emoji if you want
  color: "#ff4d8d",                  // ← Keep or change color
  image: "https://...",              // ← Add your photo URL or local path
  rotate: "-2deg",                   // ← Slight tilt for polaroid effect
},
```

Edit as many as you want! Add or remove items from the array.

---

### 6C — Add Your Own Photos

**Option 1 — Use online photo links (easiest):**
- Upload your photos to Google Drive, then get a shareable link
- Or use Imgur (imgur.com) — upload photo, copy the direct link

**Option 2 — Use local photos:**
1. Put your photos in `src/assets/images/` folder
2. In `src/data/index.js`, change the image URL to:
```js
image: "/src/assets/images/your-photo-name.jpg",
```

---

### 6D — Edit the Love Letter

Open: `src/data/index.js`

Find:
```js
export const loveLetterText = `My darling, ...`
```

Replace the entire text with your own letter. Keep the paragraph breaks (empty lines between paragraphs) as they control the typing animation timing.

---

### 6E — Edit the 100 Reasons

Open: `src/data/index.js`

Find `export const loveReasons = [...]`

Replace or add to the list of reasons. Each reason is just a string in quotes:
```js
"The way she laughs at my jokes even when they're not funny",
"How she always knows exactly what I need",
```

---

### 6F — Add Your Own Videos

Open: `src/data/index.js`

Find `export const videoMemories = [...]`

For each video, set the `videoUrl` to your video file path:
```js
videoUrl: "/src/assets/videos/our-trip.mp4",
```

Put your MP4 files in the `src/assets/videos/` folder.

---

### 6G — Add Background Music

1. Put an MP3 file in `src/assets/music/` folder (e.g., `romantic.mp3`)
2. Open `src/context/AudioContext.jsx`
3. Find this line:
```js
audioRef.current.src = "https://www.bensound.com/...";
```
4. Change it to:
```js
audioRef.current.src = "/src/assets/music/romantic.mp3";
```

---

## 📁 FOLDER STRUCTURE EXPLAINED

```
romantic-birthday-site/
│
├── 📄 index.html          ← The main HTML file (don't edit much)
├── 📄 package.json        ← Lists all dependencies
├── 📄 vite.config.js      ← Build tool configuration
├── 📄 tailwind.config.js  ← Color & animation settings
├── 📄 postcss.config.js   ← CSS processing (leave as-is)
│
├── 📁 public/
│   └── heart.svg          ← Browser tab icon
│
└── 📁 src/                ← ALL your actual code lives here
    │
    ├── 📄 main.jsx        ← App entry point (don't edit)
    ├── 📄 App.jsx         ← Root layout with global effects
    ├── 📄 router.jsx      ← Page routes/navigation setup
    │
    ├── 📁 pages/          ← Each page of the website
    │   ├── Intro.jsx      ← Landing screen (her name reveal)
    │   ├── Home.jsx       ← Main home page
    │   ├── Timeline.jsx   ← Your love story
    │   ├── Gallery.jsx    ← Photo gallery
    │   ├── LoveLetter.jsx ← Animated love letter
    │   ├── Videos.jsx     ← Video memories
    │   ├── Reasons.jsx    ← 100 reasons I love you
    │   ├── Future.jsx     ← Future dreams
    │   └── FinalSurprise.jsx ← Birthday finale + confetti
    │
    ├── 📁 components/     ← Reusable building blocks
    │   ├── animations/    ← Animation wrappers
    │   │   ├── PageTransition.jsx   ← Fade between pages
    │   │   ├── RevealSection.jsx    ← Scroll reveal effect
    │   │   └── TypingText.jsx       ← Typewriter text
    │   │
    │   ├── effects/       ← Visual effects
    │   │   ├── CustomCursor.jsx     ← Glowing cursor
    │   │   ├── ParticleBackground.jsx ← Floating stars/hearts
    │   │   ├── AuroraBackground.jsx ← Glowing color blobs
    │   │   ├── HeartParticles.jsx   ← Click-to-spawn hearts
    │   │   └── ConfettiExplosion.jsx ← Birthday confetti
    │   │
    │   ├── layout/        ← Page structure
    │   │   └── Navbar.jsx           ← Top navigation bar
    │   │
    │   ├── ui/            ← UI components
    │   │   ├── AnimatedButton.jsx   ← Glowing buttons
    │   │   └── GlowText.jsx         ← Gradient glowing text
    │   │
    │   ├── audio/         ← Music
    │   │   └── MusicPlayer.jsx      ← Floating music widget
    │   │
    │   └── common/        ← Shared components
    │       └── LoaderScreen.jsx     ← Loading animation
    │
    ├── 📁 context/        ← Global state
    │   └── AudioContext.jsx  ← Music player state
    │
    ├── 📁 hooks/          ← Custom React hooks
    │   └── index.js       ← useLenis, useMousePosition, etc.
    │
    ├── 📁 data/           ← ⭐ ALL YOUR CONTENT IS HERE
    │   └── index.js       ← Timeline, gallery, reasons, quotes...
    │
    ├── 📁 styles/         ← Global CSS
    │   └── globals.css    ← Custom styles + Tailwind
    │
    └── 📁 assets/         ← Your media files
        ├── images/        ← Put your photos here
        ├── videos/        ← Put your videos here
        ├── music/         ← Put your music here
        ├── fonts/         ← Custom fonts (if any)
        └── icons/         ← Custom icons (if any)
```

---

## 🔧 TROUBLESHOOTING COMMON ERRORS

### ❌ Error: "npm is not recognized"
**Fix:** Node.js didn't install properly.
- Re-download from nodejs.org and reinstall
- Restart VS Code completely after installing

---

### ❌ Error: "Cannot find module" or "Module not found"
**Fix:** Dependencies didn't install properly.
```
npm install
```
Run this again. If still failing:
```
npm install --legacy-peer-deps
```

---

### ❌ Error: "Port 5173 is already in use"
**Fix:** Another app is using that port.
```
npm run dev -- --port 3000
```
Then open: http://localhost:3000

---

### ❌ The page is blank / shows errors
**Fix:** Open browser DevTools (press F12) → click Console tab → read the red error message and search it online, or check that all files were saved correctly.

---

### ❌ Images not showing
**Fix:** Check the image path in `src/data/index.js`. For local images, make sure the file actually exists in `src/assets/images/` and the filename matches exactly (case-sensitive!).

---

### ❌ Music not playing
This is normal! Browsers block autoplay until the user interacts with the page. Click the music button (🎵) in the bottom-right corner to start it.

---

## STEP 7: Deploy Online FREE with Vercel

Share the website with your girlfriend by putting it online!

### 7A — Create accounts
1. Create a free account at **https://github.com** (needed to store code)
2. Create a free account at **https://vercel.com** (needed to host website)

### 7B — Upload to GitHub

In VS Code Terminal:
```
git init
git add .
git commit -m "my romantic website"
```

Then:
1. Go to **github.com** → click **New** (green button)
2. Name it `romantic-birthday-site`
3. Click **Create repository**
4. Copy the commands it shows you under "push existing repository"
5. Paste them in VS Code Terminal and press Enter

### 7C — Deploy on Vercel
1. Go to **vercel.com**
2. Click **Add New Project**
3. Click **Import** next to your GitHub repository
4. Leave all settings as default
5. Click **Deploy**

In 2-3 minutes you'll get a live URL like:
`https://romantic-birthday-site.vercel.app`

**Send that link to her! 💕**

---

## 💡 QUICK TIPS

| Action | How |
|--------|-----|
| Start the website | `npm run dev` in Terminal |
| Stop the website | Press `Ctrl + C` in Terminal |
| Save a file | `Ctrl + S` |
| Find text in file | `Ctrl + F` |
| Find text in ALL files | `Ctrl + Shift + F` |
| Open Terminal in VS Code | `` Ctrl + ` `` |
| Format code nicely | `Shift + Alt + F` |

---

## 🎨 CUSTOMIZATION CHEAT SHEET

| What to change | Where to find it |
|----------------|------------------|
| Her name | `src/pages/Intro.jsx`, `Home.jsx`, `FinalSurprise.jsx` |
| Timeline memories | `src/data/index.js` → `timelineData` |
| Gallery photos | `src/data/index.js` → `galleryImages` |
| Love letter text | `src/data/index.js` → `loveLetterText` |
| 100 reasons | `src/data/index.js` → `loveReasons` |
| Future dreams | `src/data/index.js` → `futureDreams` |
| Background music | `src/context/AudioContext.jsx` → `audioRef.current.src` |
| Colors | `tailwind.config.js` → `colors` section |
| Fonts | `index.html` → Google Fonts link |

---

## ❤️ Made with Love

This website was built to make someone feel deeply loved.
Every animation, every word, every detail — crafted just for her.

*Happy Birthday to the most beautiful person in your world.* 💕

---

> **Need help?** The most common fixes are:
> 1. Run `npm install` again
> 2. Restart VS Code
> 3. Make sure you're in the right folder in Terminal
