import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useToast } from '@/hooks/use-toast';

const Tasks = () => {
  const { toast } = useToast();
  const { tasks, addTask, toggleTask, deleteTask, addMessage } = useAppStore();
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('general');

  const categories = ['general', 'work', 'health', 'learning', 'personal'];

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    addTask(newTask, category);
    addMessage(`✅ Task added: "${newTask}". Small steps lead to giant leaps! 💪`, true);
    toast({
      title: "Task Added! ✅",
      description: "Stay focused and crush it!",
    });
    setNewTask('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Coach
        </Link>

        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tasks</h1>
              <p className="text-muted-foreground">
                {completedCount}/{tasks.length} completed
              </p>
            </div>
            <div className="p-3 gradient-primary rounded-xl">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          {/* Add Task Form */}
          <div className="space-y-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What do you need to accomplish?"
              className="w-full p-4 bg-card border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
            />
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    category === cat
                      ? 'gradient-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddTask}
              disabled={!newTask.trim()}
              className="w-full py-4 gradient-primary text-primary-foreground font-semibold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-muted-foreground">No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                className={`step-card animate-fade-in ${
                  task.completed ? 'bg-success/20 border-success/50' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="p-1"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </p>
                  <span className="text-xs text-muted-foreground capitalize bg-card/50 px-2 py-0.5 rounded-full">
                    {task.category}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
