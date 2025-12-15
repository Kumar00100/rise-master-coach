import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

export default function HistoryPage() {
  const messages = useAppStore((state) => state.messages);

  if (!messages) {
    return null;
  }

  const grouped = messages.reduce<Record<string, typeof messages>>(
    (acc, msg) => {
      const dateKey = new Date(Number(msg.timestamp)).toDateString();
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(msg);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br
      from-[#f6f1ec] via-[#eef5f8] to-[#f4ecfb] px-4 py-6">

      <div className="flex items-center gap-3 mb-6">
        <Link to="/">
          <button className="p-2 rounded-full bg-white shadow">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <h1 className="text-lg font-semibold">Conversation History</h1>
      </div>

      {messages.length === 0 && (
        <p className="text-sm text-gray-500">No conversations yet</p>
      )}

      <div className="space-y-6">
        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date}>
            <p className="text-xs text-gray-500 mb-2">{date}</p>
            <div className="space-y-3">
              {msgs.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white/80 rounded-xl p-4 shadow"
                >
                  <p className="text-xs text-gray-400">
                    {msg.isAI ? 'Coach' : 'You'}
                  </p>
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
