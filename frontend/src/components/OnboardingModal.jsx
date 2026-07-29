import React, { useState, useEffect } from 'react';

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Only show once per user (simulated)
    const hasSeen = localStorage.getItem('has_seen_onboarding');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const closeTour = () => {
    localStorage.setItem('has_seen_onboarding', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        
        {/* Progress Bar */}
        <div className="flex h-1 bg-slate-100">
          <div className={`bg-blue-500 transition-all duration-300 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome to AIFlow Enterprise 👋</h2>
              <p className="text-slate-600 mb-6">
                You're minutes away from orchestrating your first autonomous AI agent. Let's take a quick tour to get you oriented.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
                <strong className="text-slate-800">Pro Tip:</strong> We've loaded a sample dataset into your workspace so you can start experimenting immediately.
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The Workflow Builder</h2>
              <p className="text-slate-600 mb-6">
                Navigate to the <strong>Builder</strong> tab to visually construct agentic chains. Drag an LLM node, configure your prompt, and attach a data source to give the model context.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                Need inspiration? Check out the "Sample Workflows" directory in the sidebar.
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">You're all set! 🚀</h2>
              <p className="text-slate-600 mb-6">
                If you ever get stuck, click the <strong>Help</strong> button in the bottom right corner or consult our comprehensive API Documentation.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between items-center">
            <button 
              onClick={closeTour}
              className="text-slate-400 hover:text-slate-600 font-medium"
            >
              Skip Tour
            </button>
            <div className="space-x-3">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={closeTour}
                  className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-md shadow-green-500/20"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
