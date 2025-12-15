import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Plus, Minus } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

const Goals = () => {
  const { goals, updateGoalProgress } = useAppStore();
  const [showAddGoal, setShowAddGoal] = useState(false);

  const categoryColors: Record<string, string> = {
    habits: 'from-primary to-secondary',
    fitness: 'from-success to-accent',
    learning: 'from-accent to-primary',
  };

  const handleIncrement = (id: string, current: number, target: number) => {
    if (current < target) {
      updateGoalProgress(id, current + 1);
    }
  };

  const handleDecrement = (id: string, current: number) => {
    if (current > 0) {
      updateGoalProgress(id, current - 1);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Coach
        </Link>

        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Goals</h1>
              <p className="text-muted-foreground">Track your long-term objectives</p>
            </div>
            <div className="p-3 gradient-primary rounded-xl">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = Math.round((goal.progress / goal.target) * 100);
            const gradientClass = categoryColors[goal.category] || 'from-primary to-secondary';
            
            return (
              <div
                key={goal.id}
                className="glass-card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{goal.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold gradient-text">{percentage}%</p>
                    <p className="text-sm text-muted-foreground">{goal.progress}/{goal.target}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-4 bg-card rounded-full overflow-hidden mb-4 border border-border/50">
                  <div
                    className={`h-full bg-gradient-to-r ${gradientClass} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Increment/Decrement Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleDecrement(goal.id, goal.progress)}
                    disabled={goal.progress === 0}
                    className="p-3 bg-card border border-border rounded-xl hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-5 h-5 text-foreground" />
                  </button>
                  <span className="text-xl font-bold text-foreground w-16 text-center">
                    {goal.progress}
                  </span>
                  <button
                    onClick={() => handleIncrement(goal.id, goal.progress, goal.target)}
                    disabled={goal.progress >= goal.target}
                    className="p-3 gradient-primary rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>

                {goal.progress >= goal.target && (
                  <div className="mt-4 p-3 bg-success/20 border border-success/50 rounded-xl text-center">
                    <p className="text-success font-medium">🎉 Goal Achieved! You're amazing!</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 glass-card p-6 text-center">
          <p className="text-muted-foreground mb-4">More goal customization coming soon!</p>
          <p className="text-sm text-muted-foreground">
            For now, update your progress using the + and - buttons above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Goals;
