import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { getAIResponse } from '@/utils/aiResponses';

const AIChat = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage(input, false);
    
    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(input);
      addMessage(response, true);
    }, 800);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 gradient-primary rounded-xl animate-pulse-glow">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Life Coach</h2>
          <p className="text-muted-foreground text-sm">Your personal transformation guide</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 max-h-[60vh]">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'} animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.isAI
                  ? 'bg-card border border-border/50 text-foreground'
                  : 'gradient-primary text-primary-foreground'
              }`}
            >
              <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your AI Coach anything..."
          className="w-full p-4 pr-14 bg-card border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 gradient-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
        >
          <Send className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
