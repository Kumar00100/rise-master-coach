import { Link } from 'react-router-dom';
import { Sun, Plus, BarChart3, Target, User, Flame } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

const RightPanel = () => {
  const { streak, morningCompleted } = useAppStore();

  const options = [
    { 
      to: '/morning', 
      icon: Sun, 
      label: 'Morning Routine',
      description: 'Start your day right',
      completed: morningCompleted
    },
    { 
      to: '/tasks', 
      icon: Plus, 
      label: 'Add Task',
      description: 'Track your todos'
    },
    { 
      to: '/dashboard', 
      icon: BarChart3, 
      label: 'Dashboard',
      description: 'View your progress'
    },
    { 
      to: '/goals', 
      icon: Target, 
      label: 'Goals',
      description: 'Set your targets'
    },
    { 
      to: '/profile', 
      icon: User, 
      label: 'Profile',
      description: 'Your achievements'
    },
  ];

  return (
    <div className="glass-card p-6 h-full">
      <h2 className="text-xl font-bold text-foreground mb-2">Quick Actions</h2>
      <p className="text-muted-foreground text-sm mb-6">Choose your next move</p>

      {/* Streak Display */}
      <div className="mb-6 p-4 gradient-primary rounded-xl flex items-center gap-3">
        <Flame className="w-8 h-8 text-primary-foreground" />
        <div>
          <p className="text-primary-foreground font-bold text-2xl">{streak}</p>
          <p className="text-primary-foreground/80 text-sm">Day Streak</p>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <Link
            key={option.to}
            to={option.to}
            className="option-btn group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`p-2 rounded-lg ${option.completed ? 'bg-success/20' : 'bg-primary/20'} group-hover:bg-primary/30 transition-colors`}>
              <option.icon className={`w-5 h-5 ${option.completed ? 'text-success' : 'text-primary'}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground flex items-center gap-2">
                {option.label}
                {option.completed && (
                  <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Done</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{option.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
