import { useEffect, useState } from 'react';
import AIChat from '@/components/AIChat';
import RightPanel from '@/components/RightPanel';
import { useAppStore } from '@/stores/appStore';
import { MoreHorizontal, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Home = () => {
  const { resetMorning } = useAppStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    resetMorning();
  }, [resetMorning]);

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">RiseMaster</span>
          </h1>
          <p className="text-muted-foreground mt-2">Your AI-Powered Discipline Coach</p>
        </header>
<<<<<<< HEAD
        {/* Main Content - Full width chat */}       
          <AIChat />
=======

        {/* Main Content - Full width chat */}
        <div className="glass-card p-6">
          <AIChat />
        </div>
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
      </div>

      {/* Floating Action Button */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center hover:scale-105">
            {open ? <X className="w-6 h-6" /> : <MoreHorizontal className="w-6 h-6" />}
          </button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          align="end" 
          className="w-72 p-0 bg-card/95 backdrop-blur-xl border-border"
          sideOffset={12}
        >
          <RightPanel onClose={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Home;
