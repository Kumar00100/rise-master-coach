import { useState, useEffect } from 'react';
import { Mic, X, Send, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const VoiceCall = () => {
  const [time, setTime] = useState(0);
  const [isListening, setIsListening] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendText = () => {
    if (textMessage.trim()) {
      console.log('Sending:', textMessage);
      setTextMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-teal-100/50">
      <div className="w-full max-w-sm px-6">
        {/* Connected Status */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm font-medium">Connected</p>
          <h1 className="text-2xl font-bold text-foreground mt-1">Coach Voice Call</h1>
        </div>

        {/* Animated Character */}
        <div className="relative mb-12">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative w-56 h-56 mx-auto bg-gradient-to-br from-teal-100 to-teal-200 rounded-full shadow-2xl flex items-center justify-center">
            {/* Face */}
            <div className="relative">
              {/* Eyes */}
              <div className="flex gap-8 mb-4">
                <div className={`w-3 h-3 bg-foreground rounded-full transition-all duration-300 ${isListening ? 'animate-pulse' : ''}`}></div>
                <div className={`w-3 h-3 bg-foreground rounded-full transition-all duration-300 ${isListening ? 'animate-pulse' : ''}`}></div>
              </div>
              
              {/* Smile */}
              <div className="w-10 h-5 border-b-2 border-foreground rounded-b-full mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <p className="text-4xl font-bold text-foreground mb-1">{formatTime(time)}</p>
          <p className="text-muted-foreground text-sm">
            {isListening ? 'Coach is listening' : 'Microphone muted'}
          </p>
        </div>

        {/* Text Input (Optional) */}
        {showTextInput && (
          <div className="mb-8 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
                placeholder="Type a message..."
                className="w-full p-4 pr-12 bg-card border border-border rounded-full focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground shadow-lg"
              />
              <button
                onClick={handleSendText}
                disabled={!textMessage.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 gradient-primary rounded-full disabled:opacity-50 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center items-center gap-6">
          {/* Text Toggle Button */}
          <button 
            onClick={() => setShowTextInput(!showTextInput)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              showTextInput 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-foreground border border-border hover:bg-muted'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Microphone Button */}
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              isListening 
                ? 'bg-card text-foreground border border-border hover:bg-muted' 
                : 'bg-destructive text-destructive-foreground'
            }`}
          >
            <Mic className="w-6 h-6" />
          </button>

          {/* End Call Button */}
          <Link 
            to="/"
            className="w-14 h-14 bg-destructive rounded-full shadow-lg flex items-center justify-center hover:bg-destructive/90 transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-destructive-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;