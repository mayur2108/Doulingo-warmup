import React from 'react';
import { PracticeStats } from '../types';
import { DuoButton } from '../components/DuoButton';
import { Trophy, RotateCcw, Home, Check } from 'lucide-react';

interface ResultsProps {
  stats: PracticeStats;
  onHome: () => void;
  onRetry: () => void;
}

export const Results: React.FC<ResultsProps> = ({ stats, onHome, onRetry }) => {
  const isGoodScore = stats.wpm > 40 && stats.accuracy > 90;

  return (
    <div className="h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg flex flex-col items-center space-y-6 animate-fade-in-up">
        
        <div className="text-center">
          <div className="relative inline-block mb-4">
             <div className="bg-duo-yellow w-28 h-28 rounded-full flex items-center justify-center border-b-8 border-duo-yellowDark shadow-xl z-10 relative">
               <Trophy size={56} className="text-white" />
             </div>
             <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-duo-blue p-2 rounded-full animate-bounce">
                <Check className="text-white w-5 h-5" />
             </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-duo-navy mb-1">Warmup Complete!</h2>
          <p className="text-duo-grayText font-bold text-sm">You are ready for the test.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white border-2 border-duo-gray border-b-4 rounded-3xl p-4 text-center">
            <p className="text-duo-grayText text-xs font-black uppercase tracking-widest mb-1">Speed</p>
            <div className="text-4xl font-black text-duo-blue">
              {stats.wpm} <span className="text-sm font-bold opacity-60">WPM</span>
            </div>
          </div>

          <div className="bg-white border-2 border-duo-gray border-b-4 rounded-3xl p-4 text-center">
            <p className="text-duo-grayText text-xs font-black uppercase tracking-widest mb-1">Accuracy</p>
            <div className={`text-4xl font-black ${stats.accuracy > 90 ? 'text-duo-green' : 'text-duo-yellowDark'}`}>
              {stats.accuracy}%
            </div>
          </div>
        </div>

        <div className={`w-full p-4 rounded-2xl border-2 ${isGoodScore ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
          <h4 className={`font-black uppercase text-xs mb-1 ${isGoodScore ? 'text-green-600' : 'text-orange-600'}`}>
            Analysis
          </h4>
          <p className="text-duo-navy font-bold text-sm leading-tight">
            {isGoodScore 
              ? "Excellent pace! Maintain this rhythm during the exam. Keep your eyes on the screen." 
              : "Focus on accuracy. Too many backspaces break flow. Type slightly slower with more precision."}
          </p>
        </div>

        <div className="w-full space-y-3">
          <DuoButton variant="primary" size="lg" fullWidth onClick={onRetry}>
            <div className="flex items-center justify-center gap-2">
              <RotateCcw size={20} />
              AGAIN
            </div>
          </DuoButton>
          <DuoButton variant="ghost" fullWidth onClick={onHome}>
            <div className="flex items-center justify-center gap-2">
              <Home size={20} />
              HOME
            </div>
          </DuoButton>
        </div>
      </div>
    </div>
  );
};