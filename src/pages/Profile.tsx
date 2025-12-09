import { Link } from 'react-router-dom';
import { ArrowLeft, User, Flame, Trophy, Star, Target, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

const Profile = () => {
  const { streak, tasks, goals, morningCompleted } = useAppStore();

  const completedTasks = tasks.filter(t => t.completed).length;
  const achievedGoals = goals.filter(g => g.progress >= g.target).length;

  const achievements = [
    { 
      icon: Flame, 
      title: 'Early Riser', 
      description: 'Complete 7 morning routines',
      earned: streak >= 7,
      progress: Math.min(streak, 7),
      target: 7
    },
    { 
      icon: Trophy, 
      title: 'Goal Crusher', 
      description: 'Complete any goal',
      earned: achievedGoals > 0,
      progress: achievedGoals,
      target: 1
    },
    { 
      icon: Star, 
      title: 'Task Master', 
      description: 'Complete 10 tasks',
      earned: completedTasks >= 10,
      progress: Math.min(completedTasks, 10),
      target: 10
    },
    { 
      icon: Target, 
      title: 'Consistent', 
      description: 'Maintain a 30-day streak',
      earned: streak >= 30,
      progress: Math.min(streak, 30),
      target: 30
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Coach
        </Link>

        {/* Profile Header */}
        <div className="glass-card p-8 mb-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Master</h1>
          <p className="text-muted-foreground">Rising to greatness, one day at a time</p>
          
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">{streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success">{completedTasks}</p>
              <p className="text-sm text-muted-foreground">Tasks Done</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">{achievedGoals}</p>
              <p className="text-sm text-muted-foreground">Goals Hit</p>
            </div>
          </div>
        </div>

        {/* Today's Status */}
        <div className={`glass-card p-6 mb-8 ${morningCompleted ? 'border-success/50' : 'border-secondary/50'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${morningCompleted ? 'bg-success/20' : 'gradient-primary'}`}>
              {morningCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : (
                <Flame className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-foreground">
                {morningCompleted ? "Today's Morning Complete!" : "Morning Routine Pending"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {morningCompleted 
                  ? "You're crushing it! Keep the momentum going."
                  : "Complete your morning routine to continue your streak."}
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Achievements</h2>
          <div className="grid gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all animate-fade-in ${
                  achievement.earned
                    ? 'bg-success/10 border-success/50'
                    : 'bg-card/50 border-border/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-3 rounded-xl ${
                  achievement.earned ? 'bg-success/20' : 'bg-card'
                }`}>
                  <achievement.icon className={`w-6 h-6 ${
                    achievement.earned ? 'text-success' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {!achievement.earned && (
                    <div className="mt-2 h-1.5 bg-card rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all"
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
                {achievement.earned && (
                  <span className="text-success text-2xl">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
