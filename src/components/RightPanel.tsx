import { Link } from 'react-router-dom';
import { Sun, Plus, BarChart3, Target, User, Flame, Phone } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

interface RightPanelProps {
  onClose?: () => void;
}

const RightPanel = ({ onClose }: RightPanelProps) => {
  const { streak, morningCompleted } = useAppStore();

  const options = [
    { 
      to: '/voice-call', 
      icon: Phone, 
      label: 'Voice Call',
      description: 'Talk to your coach'
    },
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
    <div className="p-4">
      <h2 className="text-lg font-bold text-foreground mb-1">Quick Actions</h2>
      <p className="text-muted-foreground text-xs mb-4">Choose your next move</p>

      {/* Streak Display */}
      <div className="mb-4 p-3 gradient-primary rounded-xl flex items-center gap-3">
        <Flame className="w-6 h-6 text-primary-foreground" />
        <div>
          <p className="text-primary-foreground font-bold text-xl">{streak}</p>
          <p className="text-primary-foreground/80 text-xs">Day Streak</p>
        </div>
      </div>

      <div className="space-y-2">
        {options.map((option) => (
          <Link
            key={option.to}
            to={option.to}
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-primary/20 transition-all duration-200 group"
          >
            <div className={`p-2 rounded-lg ${option.completed ? 'bg-success/20' : 'bg-primary/20'} group-hover:bg-primary/30 transition-colors`}>
              <option.icon className={`w-4 h-4 ${option.completed ? 'text-success' : 'text-primary'}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm flex items-center gap-2">
                {option.label}
                {option.completed && (
                  <span className="text-xs bg-success/20 text-success px-1.5 py-0.5 rounded-full">Done</span>
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
