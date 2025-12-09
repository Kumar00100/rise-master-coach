const greetings = [
  "🌅 Rise and shine, Master! Ready to conquer today?",
  "💪 Another day, another opportunity for greatness!",
  "🔥 Let's make today legendary! What's your first move?",
  "⭐ Good to see you! Time to level up!",
];

const motivational = [
  "You're stronger than your excuses! 💪",
  "One small step today = massive transformation tomorrow 🚀",
  "Consistency beats perfection every single time ⭐",
  "Your future self will thank you for starting now 🔥",
  "Discipline is the bridge between goals and accomplishment 🌉",
  "Every champion was once a beginner who refused to quit 🏆",
];

const morningResponses = [
  "Great choice! Your morning routine sets the tone for the entire day 🌅",
  "Morning rituals are the secret weapon of high achievers! Let's go! ⚡",
  "Starting your day with intention? That's how legends are made! 🔥",
];

const taskResponses = [
  "Excellent! Breaking down goals into tasks is pure wisdom 📋",
  "Small tasks, big results! What would you like to tackle? ✅",
  "Let's get organized! A clear plan leads to clear results 🎯",
];

const dashboardResponses = [
  "Your progress is impressive! Keep that momentum going 📊",
  "Numbers don't lie - you're making real progress! 🚀",
  "Data is your friend! Let's see how you're crushing it 💪",
];

const goalResponses = [
  "Big goals require bold action! What are you aiming for? 🎯",
  "Dream big, plan smart, work hard! Let's define your targets 🏆",
  "Goals give direction to your energy. Let's set some powerful ones! ⚡",
];

export const getAIResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  if (input.includes('morning') || input.includes('wake') || input.includes('routine')) {
    return morningResponses[Math.floor(Math.random() * morningResponses.length)];
  }
  
  if (input.includes('task') || input.includes('todo') || input.includes('add')) {
    return taskResponses[Math.floor(Math.random() * taskResponses.length)];
  }
  
  if (input.includes('dashboard') || input.includes('progress') || input.includes('stats')) {
    return dashboardResponses[Math.floor(Math.random() * dashboardResponses.length)];
  }
  
  if (input.includes('goal') || input.includes('target') || input.includes('aim')) {
    return goalResponses[Math.floor(Math.random() * goalResponses.length)];
  }
  
  if (input.includes('motivation') || input.includes('motivate') || input.includes('inspire')) {
    return motivational[Math.floor(Math.random() * motivational.length)];
  }
  
  if (input.includes('thank') || input.includes('thanks')) {
    return "You're welcome, Master! Remember, I'm always here to help you rise! 🌟";
  }
  
  // Default motivational response
  return motivational[Math.floor(Math.random() * motivational.length)];
};

export const getContextualSuggestion = (context: 'morning_done' | 'task_added' | 'goal_set'): string => {
  const suggestions = {
    morning_done: [
      "🔥 Incredible! Your morning routine is complete! What's next on your conquest list?",
      "💪 Morning conquered! You're already ahead of 90% of people. What's the next challenge?",
      "⭐ Beautiful start! Your consistency is building an unstoppable version of you!",
    ],
    task_added: [
      "✅ Task added! Small steps lead to giant leaps. You've got this!",
      "📋 Excellent organization! A planned day is a productive day!",
      "🎯 Task logged! Now let's crush it one step at a time!",
    ],
    goal_set: [
      "🏆 Goal locked in! Now let's reverse-engineer your success!",
      "🚀 Powerful goal! Break it down into daily actions and watch the magic happen!",
      "⚡ Goal set! Remember: Progress over perfection, every single day!",
    ],
  };
  
  const responses = suggestions[context];
  return responses[Math.floor(Math.random() * responses.length)];
};
