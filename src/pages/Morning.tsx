import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Droplets, Wind, BookOpen, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useToast } from '@/hooks/use-toast';

const Morning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { morningCompleted, completeMorning, addMessage } = useAppStore();
  
  const [steps, setSteps] = useState([
    { id: 1, icon: Sun, text: "🌅 Wake up! It's 4:00 AM - Rise before the world", completed: false },
    { id: 2, icon: Droplets, text: "💧 Splash cold water on your face", completed: false },
    { id: 3, icon: Droplets, text: "🥛 Drink 1 full glass of water", completed: false },
    { id: 4, icon: Wind, text: "🧘‍♂️ 5-minute deep breathing exercise", completed: false },
    { id: 5, icon: Wind, text: "💪 10 push-ups or stretching routine", completed: false },
    { id: 6, icon: BookOpen, text: "📖 Read or journal for 10 minutes", completed: false },
  ]);

  const toggleStep = (id: number) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  const allCompleted = steps.every(step => step.completed);

  const handleComplete = () => {
    completeMorning();
    addMessage("🔥 Incredible! Your morning routine is complete! You're already ahead of 90% of people. Keep this momentum going!", true);
    toast({
      title: "Morning Routine Complete! 🌅",
      description: "Your streak has been updated. You're unstoppable!",
    });
    navigate('/');
  };

  if (morningCompleted) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to Coach
          </Link>

          <div className="glass-card p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Morning Complete! 🎉</h1>
            <p className="text-muted-foreground mb-6">
              You've already conquered your morning routine today. Come back tomorrow to continue your streak!
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 gradient-primary text-primary-foreground font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Return to Coach
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Coach
        </Link>

        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 gradient-primary rounded-xl">
              <Sun className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Morning Routine</h1>
              <p className="text-muted-foreground">Complete all steps to start your day right</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`step-card cursor-pointer animate-fade-in ${
                step.completed ? 'bg-success/20 border-success/50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                step.completed ? 'bg-success/30' : 'bg-primary/20'
              }`}>
                {step.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                ) : (
                  <step.icon className="w-6 h-6 text-primary" />
                )}
              </div>
              <span className={`flex-1 text-lg ${step.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleComplete}
          disabled={!allCompleted}
          className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all ${
            allCompleted
              ? 'gradient-primary text-primary-foreground hover:scale-[1.02] animate-pulse-glow'
              : 'bg-card border border-border text-muted-foreground cursor-not-allowed'
          }`}
        >
          {allCompleted ? '✅ Mark Morning Complete! 🔥' : `Complete all ${steps.length} steps`}
        </button>
      </div>
    </div>
  );
};

export default Morning;
