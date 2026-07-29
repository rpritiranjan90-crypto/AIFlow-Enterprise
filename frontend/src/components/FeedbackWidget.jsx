import React, { useState } from 'react';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('bug'); // bug, feature, general
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send to an API or Zendesk/Sentry
    console.log(`Submitted ${feedbackType}:`, message);
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
          className="bg-slate-800 text-white rounded-full p-4 shadow-lg hover:bg-slate-700 hover:shadow-xl transition-all flex items-center justify-center group"
          aria-label="Give Feedback"
        >
          <span className="text-xl">💬</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-2 font-medium">
            Feedback
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-80 border border-slate-200 overflow-hidden flex flex-col transform transition-all">
          <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold text-sm tracking-wide uppercase">Share Feedback</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          
          {submitted ? (
            <div className="p-8 text-center text-slate-600">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-medium">Thanks for your feedback!</p>
              <p className="text-sm mt-1">Our product team reviews every submission.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5">
              <div className="flex gap-2 mb-4">
                <button 
                  type="button" 
                  onClick={() => setFeedbackType('bug')}
                  className={`flex-1 py-1 text-sm rounded border ${feedbackType === 'bug' ? 'bg-red-50 border-red-200 text-red-700 font-medium' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                >
                  Bug
                </button>
                <button 
                  type="button" 
                  onClick={() => setFeedbackType('feature')}
                  className={`flex-1 py-1 text-sm rounded border ${feedbackType === 'feature' ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                >
                  Feature
                </button>
              </div>
              
              <textarea 
                className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-28 mb-4"
                placeholder={feedbackType === 'bug' ? "What went wrong?" : "What would you like to see?"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              
              <button 
                type="submit" 
                disabled={!message.trim()}
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;
