// src/router.jsx
// ─── All page routes defined here ────────────────────────────

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import Gallery from "./pages/Gallery";
import LoveLetter from "./pages/LoveLetter";
import Videos from "./pages/Videos";
import Reasons from "./pages/Reasons";
import Future from "./pages/Future";
import FinalSurprise from "./pages/FinalSurprise";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Intro /> },
      { path: "home", element: <Home /> },
      { path: "timeline", element: <Timeline /> },
      { path: "gallery", element: <Gallery /> },
      { path: "letter", element: <LoveLetter /> },
      { path: "videos", element: <Videos /> },
      { path: "reasons", element: <Reasons /> },
      { path: "future", element: <Future /> },
      { path: "surprise", element: <FinalSurprise /> },
    ],
  },
]);

export default router;
