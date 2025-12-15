<<<<<<< HEAD
import { useState } from 'react';
import { Mic, Keyboard, Send, X } from 'lucide-react';
import { History } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIVoiceCoach() {
  const [listening, setListening] = useState(true);
  const [showText, setShowText] = useState(false);
  const [input, setInput] = useState('');


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center
      bg-gradient-to-br relative">

      {/* Bubble */}
      <div className="relative z-10 mb-24">
        <div
          className={`w-64 h-64 rounded-full
          bg-gradient-to-br from-[#e3f6f5] via-[#e9eeff] to-[#f2e9ff]
          shadow-[0_40px_100px_rgba(0,0,0,0.12)]
          ${listening ? 'animate-pulse' : ''}`}
        />

        {/* Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex gap-6 mb-4">
            <div className="w-3 h-3 bg-gray-700 rounded-full" />
            <div className="w-3 h-3 bg-gray-700 rounded-full" />
          </div>
          <div className="w-6 h-2 bg-gray-700 rounded-full" />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 flex items-center gap-6 z-20">
        <Link to="/history">
          <button
            className="w-12 h-12 rounded-full bg-white shadow-lg
          flex items-center justify-center transition-all"
          >
            <History className="w-5 h-5 text-gray-700" />
          </button>
        </Link>


        {/* Mic */}
        <button
          onClick={() => setListening(!listening)}
          className={`w-16 h-16 rounded-full flex items-center justify-center
          transition-all
          ${listening
              ? 'bg-white shadow-xl'
              : 'bg-red-500 shadow-2xl'}
          `}
        >
          <Mic className={`w-7 h-7 ${listening ? 'text-black' : 'text-white'}`} />
        </button>

        {/* Text Toggle */}
        <button
          onClick={() => setShowText(true)}
          className="w-12 h-12 rounded-full bg-white shadow-lg
          flex items-center justify-center"
        >
          <Keyboard className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Text Overlay */}
      {showText && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-end z-30">
          <div className="w-full bg-white p-4 rounded-t-3xl shadow-2xl">

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to your coach…"
                className="flex-1 p-4 rounded-xl border
                focus:outline-none focus:ring-2 focus:ring-purple-300"
              />

              <button className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                <Send className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => setShowText(false)}
                className="p-3 rounded-xl bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
=======
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

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-6 max-h-[60vh]">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'} animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={`max-w-[85%] px-4 py-3 shadow-sm ${
                msg.isAI
                  ? 'bg-card/80 backdrop-blur-sm border border-border/30 text-foreground rounded-2xl rounded-tl-md'
                  : 'gradient-primary text-primary-foreground rounded-2xl rounded-tr-md'
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
>>>>>>> 93df1df2b1449a1a222c1b6a2d16f4958f84c803
