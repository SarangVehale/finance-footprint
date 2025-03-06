
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import History from "./pages/History";
import Analytics from "./pages/analytics/Analytics";
import Settings from "./pages/Settings";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import Welcome from "./pages/Welcome";
import TutorialPage from "./pages/tutorials/TutorialPage";
import VideoTutorialPage from "./pages/video-tutorials/VideoTutorialPage";
import { useEffect, useState } from "react";

/**
 * Main App Component
 * 
 * Sets up routing, providers, and initial loading state.
 * Controls the welcome screen flow for first-time users.
 */
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    return localStorage.getItem("hasSeenWelcome") === "true";
  });

  useEffect(() => {
    // Add viewport meta tag for better handling across different devices
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Clean up meta tag if needed
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                hasSeenWelcome ? (
                  <Index />
                ) : (
                  <Welcome />
                )
              } />
              <Route path="/home" element={<Index />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/tutorial/:id" element={<TutorialPage />} />
              <Route path="/video/:id" element={<VideoTutorialPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
