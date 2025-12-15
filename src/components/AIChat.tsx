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
