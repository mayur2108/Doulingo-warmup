import React from 'react';
import { RULES_DATA } from '../constants';
import { DuoButton } from '../components/DuoButton';
import { X, Home, Smartphone, Eye, Cpu } from 'lucide-react';

interface RulesGalleryProps {
  onBack: () => void;
}

const IconMap: Record<string, any> = {
  Home, Smartphone, Eye, Cpu
};

export const RulesGallery: React.FC<RulesGalleryProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-duo-navy/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="bg-duo-red p-6 flex items-center justify-between border-b-4 border-duo-redDark shrink-0">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Rules & Regs</h2>
            <p className="text-white/80 font-bold">Strict protocols. No exceptions.</p>
          </div>
          <button 
            onClick={onBack}
            className="bg-white/20 hover:bg-white/40 p-2 rounded-xl transition-colors text-white"
          >
            <X size={32} strokeWidth={3} />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="overflow-y-auto p-6 bg-gray-50 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RULES_DATA.map((section, idx) => {
              const Icon = IconMap[section.icon] || Home;
              const colors = {
                green: "text-duo-green bg-green-50",
                red: "text-duo-red bg-red-50",
                blue: "text-duo-blue bg-blue-50",
                yellow: "text-duo-yellowDark bg-yellow-50"
              };
              const dotColors = {
                green: "bg-duo-green",
                red: "bg-duo-red",
                blue: "bg-duo-blue",
                yellow: "bg-duo-yellow"
              };

              return (
                <div key={idx} className="bg-white border-2 border-duo-gray rounded-3xl overflow-hidden shadow-sm flex flex-col h-full">
                  <div className="p-5 border-b-2 border-gray-100 flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${colors[section.color]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-duo-navy uppercase tracking-wide">
                      {section.title}
                    </h3>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <ul className="space-y-3">
                      {section.rules.map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-3">
                          <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dotColors[section.color]}`} />
                          <span className="text-duo-grayText font-bold text-sm leading-relaxed">
                            {rule}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

         {/* Footer */}
         <div className="p-4 border-t-2 border-duo-gray shrink-0 bg-white">
          <DuoButton fullWidth variant="outline" onClick={onBack}>
            I Understand
          </DuoButton>
        </div>

      </div>
    </div>
  );
};