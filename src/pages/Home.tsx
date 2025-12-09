import { useEffect } from 'react';
import AIChat from '@/components/AIChat';
import RightPanel from '@/components/RightPanel';
import { useAppStore } from '@/stores/appStore';

const Home = () => {
  const { resetMorning } = useAppStore();

  useEffect(() => {
    resetMorning();
  }, [resetMorning]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">RiseMaster</span>
          </h1>
          <p className="text-muted-foreground mt-2">Your AI-Powered Discipline Coach</p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: AI Chat (70%) */}
          <div className="lg:w-[70%] glass-card p-6">
            <AIChat />
          </div>

          {/* Right: Options Panel (30%) */}
          <div className="lg:w-[30%]">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
