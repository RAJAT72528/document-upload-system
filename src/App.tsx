

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoadingProgress } from "./components/ui/LoadingProgress";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    const storage = typeof window !== 'undefined' ? window.sessionStorage : null;
    const isReload = storage?.getItem("isReloading") === "true";
    storage?.setItem("isReloading", "false");
    return isReload || true;
  });

  useEffect(() => {
    const storage = typeof window !== 'undefined' ? window.sessionStorage : null;
    if (!storage) return;

    const handleBeforeUnload = () => {
      storage.setItem("isReloading", "true");
    };

    addEventListener("beforeunload", handleBeforeUnload);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      removeEventListener("beforeunload", handleBeforeUnload);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;