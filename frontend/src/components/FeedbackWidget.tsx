import React, { useState } from 'react';
import { MessageSquare, X, CheckCircle2, Send, Bug, Sparkles } from 'lucide-react';

export const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature'>('bug');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setMessage('');
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-3.5 shadow-2xl hover:bg-blue-500 hover:scale-105 transition-all flex items-center justify-center group border border-blue-400/30"
          aria-label="Give Feedback"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-2 font-bold text-xs">
            Feedback
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-[#0B1120] rounded-2xl shadow-2xl w-80 border border-white/[0.12] overflow-hidden flex flex-col backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#050816] text-white p-4 flex justify-between items-center border-b border-white/[0.08]">
            <h3 className="font-bold text-xs tracking-wider uppercase flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" /> Share Customer Feedback
            </h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close Feedback Widget" className="text-slate-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center text-slate-300 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="font-bold text-white text-sm">Thank You for Your Feedback!</p>
              <p className="text-xs text-slate-400">Our product team reviews every submission.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackType('bug')}
                  className={`flex-1 py-1.5 px-3 text-xs rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    feedbackType === 'bug'
                      ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                      : 'bg-[#111827] border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  <Bug className="w-3.5 h-3.5" /> Bug
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('feature')}
                  className={`flex-1 py-1.5 px-3 text-xs rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    feedbackType === 'feature'
                      ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                      : 'bg-[#111827] border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Feature
                </button>
              </div>

              <textarea
                className="w-full bg-[#111827] border border-white/[0.08] rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-28"
                placeholder={feedbackType === 'bug' ? 'Describe the issue or unexpected behavior...' : 'What feature would improve your enterprise workflow?'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={!message.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Submit Feedback
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;
