import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Morning from "./pages/Morning";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import VoiceCall from "./pages/VoiceCall";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import HistoryPage from "./app/history/page";
=======
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/history" element={<HistoryPage />} />
=======
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
          <Route path="/morning" element={<Morning />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/voice-call" element={<VoiceCall />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
