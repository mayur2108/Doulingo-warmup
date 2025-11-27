import React, { useState } from 'react';
import { STRATEGIES } from '../constants';
import { DuoButton } from '../components/DuoButton';
import { X, Maximize, BookOpen, CheckCircle, Mic, Star, Image, Heart, ArrowLeft } from 'lucide-react';
import { StrategyTip } from '../types';

interface StrategiesProps {
  onBack: () => void;
}

const IconMap: Record<string, any> = {
  Maximize, BookOpen, CheckCircle, Mic, Star, Image, Heart
};

export const Strategies: React.FC<StrategiesProps> = ({ onBack }) => {
  const [selectedTip, setSelectedTip] = useState<StrategyTip | null>(null);

  // Detailed View (Modal overlay inside the view)
  if (selectedTip) {
     const Icon = IconMap[selectedTip.icon] || Star;
     return (
        <div className="fixed inset-0 z-[60] bg-duo-navy/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden animate-scale-up border-4 border-duo-yellow">
                <div className="bg-duo-yellow p-6 flex items-center gap-4 border-b-4 border-duo-yellowDark">
                    <button 
                        onClick={() => setSelectedTip(null)}
                        className="bg-white/20 hover:bg-white/40 p-2 rounded-xl text-duo-navy transition-colors"
                    >
                        <ArrowLeft size={28} strokeWidth={3} />
                    </button>
                    <h2 className="text-2xl md:text-3xl font-black text-duo-navy uppercase">Strategy Detail</h2>
                </div>
                
                <div className="p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-100 p-4 rounded-2xl">
                            <Icon className="text-duo-blue w-12 h-12" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-duo-navy leading-tight">
                            {selectedTip.title}
                        </h1>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-xl font-bold text-duo-grayText">
                            {selectedTip.content}
                        </p>
                        
                        <div className="w-full h-1 bg-gray-100 rounded-full" />

                        <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-duo-yellow">
                            <p className="text-lg md:text-xl leading-relaxed text-duo-navy font-semibold">
                                {selectedTip.details}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-4">
                        <DuoButton fullWidth size="lg" onClick={() => setSelectedTip(null)}>
                            Got it!
                        </DuoButton>
                    </div>
                </div>
            </div>
        </div>
     );
  }

  // Grid View
  return (
    <div className="fixed inset-0 z-50 bg-duo-navy/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="bg-duo-yellow p-6 flex items-center justify-between border-b-4 border-duo-yellowDark shrink-0">
          <div>
            <h2 className="text-3xl font-black text-duo-navy uppercase tracking-tight">Tips & Tricks</h2>
            <p className="text-duo-navy/70 font-bold">Select a card to unlock the strategy</p>
          </div>
          <button 
            onClick={onBack}
            className="bg-white/20 hover:bg-white/40 p-2 rounded-xl transition-colors text-duo-navy"
          >
            <X size={32} strokeWidth={3} />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="overflow-y-auto p-6 bg-gray-50 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STRATEGIES.map((strat, idx) => {
                const Icon = IconMap[strat.icon] || Star;
                return (
                <button 
                    key={idx} 
                    onClick={() => setSelectedTip(strat)}
                    className="bg-white border-2 border-b-8 border-duo-gray rounded-3xl p-6 hover:border-duo-blue hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-4 transition-all flex flex-col text-left group h-full"
                >
                    <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-50 group-hover:bg-blue-100 p-3 rounded-2xl transition-colors">
                        <Icon className="text-duo-blue w-8 h-8" />
                    </div>
                    </div>
                    <h3 className="text-xl font-black text-duo-navy leading-tight mb-2 group-hover:text-duo-blue transition-colors">
                        {strat.title}
                    </h3>
                    <p className="text-duo-grayText font-bold text-sm leading-relaxed mb-4">
                        {strat.content}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                        <span className="text-duo-blue font-black uppercase text-xs tracking-wider group-hover:underline">
                            Read More
                        </span>
                    </div>
                </button>
                );
            })}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-duo-gray shrink-0 bg-white">
          <DuoButton fullWidth variant="primary" onClick={onBack}>
            Back to Practice
          </DuoButton>
        </div>
      </div>
    </div>
  );
};