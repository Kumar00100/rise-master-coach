import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Target, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { streak, tasks, goals, morningCompleted } = useAppStore();

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  // Mock weekly data
  const weeklyData = [
    { day: 'Mon', progress: 65 },
    { day: 'Tue', progress: 78 },
    { day: 'Wed', progress: 82 },
    { day: 'Thu', progress: 70 },
    { day: 'Fri', progress: 88 },
    { day: 'Sat', progress: 92 },
    { day: 'Sun', progress: streak > 0 ? 95 : 60 },
  ];

  const stats = [
    { icon: Flame, label: 'Current Streak', value: `${streak} days`, color: 'text-primary' },
    { icon: CheckCircle2, label: 'Tasks Done', value: `${completedTasks}/${totalTasks}`, color: 'text-success' },
    { icon: Target, label: 'Goals Active', value: goals.length.toString(), color: 'text-accent' },
    { icon: TrendingUp, label: 'Today', value: morningCompleted ? 'On Track' : 'Start Now', color: morningCompleted ? 'text-success' : 'text-secondary' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Coach
        </Link>

        <div className="glass-card p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and stay motivated</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-4 text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Progress Chart */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Weekly Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(16 100% 60%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(330 80% 60%)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(215 20% 65%)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(215 20% 65%)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(217 32% 17%)',
                    border: '1px solid hsl(215 19% 34%)',
                    borderRadius: '8px',
                    color: 'hsl(210 40% 98%)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="hsl(16 100% 60%)"
                  strokeWidth={3}
                  fill="url(#progressGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Goals Progress</h2>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div
                key={goal.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-medium">{goal.title}</span>
                  <span className="text-muted-foreground">{goal.progress}/{goal.target}</span>
                </div>
                <div className="h-3 bg-card rounded-full overflow-hidden border border-border/50">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
