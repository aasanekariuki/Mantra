import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PageTransition } from "./components/animation/PageTransition";
import { ScrollToTop } from "./components/layout/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Research from "./pages/Research";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Opportunities from "./pages/Opportunities";
import Impact from "./pages/Impact";
import Partners from "./pages/Partners";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  return (
    <div className="grain min-h-screen bg-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <ScrollToTop />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
            <Route path="/programs/:slug" element={<PageTransition><ProgramDetail /></PageTransition>} />
            <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
            <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
            <Route path="/research" element={<PageTransition><Research /></PageTransition>} />
            <Route path="/stories" element={<PageTransition><Stories /></PageTransition>} />
            <Route path="/stories/:slug" element={<PageTransition><StoryDetail /></PageTransition>} />
            <Route path="/opportunities" element={<PageTransition><Opportunities /></PageTransition>} />
            <Route path="/impact" element={<PageTransition><Impact /></PageTransition>} />
            <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
            <Route path="/get-involved" element={<PageTransition><GetInvolved /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
