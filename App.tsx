import React, { useState } from 'react';
import { Home } from './views/Home';
import { RulesGallery } from './views/RulesGallery';
import { Strategies } from './views/Strategies';
import { PracticeSession } from './views/PracticeSession';
import { Results } from './views/Results';
import { ViewState, PracticeStats, PracticeModule } from './types';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedModule, setSelectedModule] = useState<PracticeModule | null>(null);
  const [lastStats, setLastStats] = useState<PracticeStats | null>(null);

  const handleStartModule = (module: PracticeModule) => {
    setSelectedModule(module);
    setView('practice');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <Home 
            onStartModule={handleStartModule}
            onRules={() => setView('rules')}
            onStrategies={() => setView('strategies')}
          />
        );
      case 'rules':
        return <RulesGallery onBack={() => setView('home')} />;
      case 'strategies':
        return <Strategies onBack={() => setView('home')} />;
      case 'practice':
        if (!selectedModule) return <Home onStartModule={handleStartModule} onRules={() => setView('rules')} onStrategies={() => setView('strategies')} />;
        return (
          <PracticeSession 
            module={selectedModule}
            onExit={() => setView('home')}
            onComplete={(stats) => {
              setLastStats(stats);
              setView('results');
            }}
          />
        );
      case 'results':
        return (
          <Results 
            stats={lastStats || { wpm: 0, accuracy: 0, timeElapsed: 0, mistakes: 0, correctChars: 0 }}
            onHome={() => setView('home')}
            onRetry={() => setView('practice')}
          />
        );
      default:
        return <Home onStartModule={handleStartModule} onRules={() => setView('rules')} onStrategies={() => setView('strategies')} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-white text-duo-navy font-sans antialiased selection:bg-duo-green selection:text-white overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-black rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-black rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      <main className="relative z-10 w-full h-full">
        {renderView()}
      </main>
    </div>
  );
}

export default App;