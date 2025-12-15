import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  text: string;
  isAI: boolean;
<<<<<<< HEAD
  timestamp: number;
=======
  timestamp: Date;
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
<<<<<<< HEAD
  createdAt: number;
=======
  createdAt: Date;
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  category: string;
}

interface AppState {
  messages: Message[];
  tasks: Task[];
  goals: Goal[];
  streak: number;
  morningCompleted: boolean;
  lastMorningDate: string | null;
<<<<<<< HEAD

=======
  
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
  addMessage: (text: string, isAI: boolean) => void;
  addTask: (title: string, category: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  completeMorning: () => void;
  resetMorning: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: '1',
<<<<<<< HEAD
          text:
            "🌅 Hello Master! I'm your AI Life Coach. Ready to transform your life today?",
          isAI: true,
          timestamp: Date.now(),
        },
      ],

=======
          text: "🌅 Hello Master! I'm your AI Life Coach. Ready to transform your life today?",
          isAI: true,
          timestamp: new Date(),
        },
      ],
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
      tasks: [],
      goals: [
        { id: '1', title: 'Morning Routines', progress: 0, target: 30, category: 'habits' },
        { id: '2', title: 'Workout Sessions', progress: 0, target: 20, category: 'fitness' },
        { id: '3', title: 'Books Read', progress: 0, target: 12, category: 'learning' },
      ],
<<<<<<< HEAD

=======
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
      streak: 0,
      morningCompleted: false,
      lastMorningDate: null,

      addMessage: (text, isAI) =>
        set((state) => ({
          messages: [
            ...state.messages,
<<<<<<< HEAD
            {
              id: generateId(),
              text,
              isAI,
              timestamp: Date.now(),
            },
=======
            { id: generateId(), text, isAI, timestamp: new Date() },
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
          ],
        })),

      addTask: (title, category) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
<<<<<<< HEAD
            {
              id: generateId(),
              title,
              completed: false,
              category,
              createdAt: Date.now(),
            },
=======
            { id: generateId(), title, completed: false, category, createdAt: new Date() },
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      updateGoalProgress: (id, progress) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, progress } : goal
          ),
        })),

      completeMorning: () => {
        const today = new Date().toDateString();
        const { lastMorningDate, streak } = get();
<<<<<<< HEAD

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const isConsecutive = lastMorningDate === yesterday.toDateString();

=======
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = lastMorningDate === yesterday.toDateString();
        
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
        set({
          morningCompleted: true,
          lastMorningDate: today,
          streak: isConsecutive ? streak + 1 : 1,
        });
      },

      resetMorning: () => {
        const today = new Date().toDateString();
        const { lastMorningDate } = get();
<<<<<<< HEAD

=======
        
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
        if (lastMorningDate !== today) {
          set({ morningCompleted: false });
        }
      },
    }),
    {
      name: 'risemaster-storage',
    }
  )
);
