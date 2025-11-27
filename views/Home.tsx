import React from 'react';
import { PRACTICE_MODULES, APP_NAME } from '../constants';
import { Zap, BookOpen, ScrollText, Trophy, Target, Image as ImageIcon, Book, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { PracticeModule } from '../types';

interface HomeProps {
  onStartModule: (module: PracticeModule) => void;
  onRules: () => void;
  onStrategies: () => void;
}

const IconMap: Record<string, any> = {
  Zap, Target, Image: ImageIcon, ScrollText, Book
};

export const Home: React.FC<HomeProps> = ({ onStartModule, onRules, onStrategies }) => {
  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-6 overflow-hidden max-w-[1600px] mx-auto">
      
      {/* Header Area */}
      <div className="flex-none mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="bg-duo-green p-3 rounded-2xl shadow-sm">
            <Zap size={32} className="text-white fill-current" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-duo-navy tracking-tight leading-none">{APP_NAME}</h1>
            <p className="text-duo-grayText text-base font-bold">Official DET Warmup</p>
          </div>
        </div>

        {/* Utility Buttons (Rules & Tips) */}
        <div className="flex gap-3">
            <button 
              onClick={onRules}
              className="flex items-center gap-2 bg-white border-2 border-duo-gray border-b-4 px-4 py-2 rounded-xl text-duo-navy font-bold hover:bg-gray-50 active:border-b-2 active:translate-y-[2px] transition-all"
            >
              <ShieldAlert size={20} className="text-duo-red" />
              <span>Rules</span>
            </button>
            <button 
              onClick={onStrategies}
              className="flex items-center gap-2 bg-duo-yellow border-2 border-duo-yellowDark border-b-4 px-4 py-2 rounded-xl text-duo-navy font-bold hover:brightness-105 active:border-b-2 active:translate-y-[2px] transition-all"
            >
              <Sparkles size={20} className="text-duo-navy" />
              <span>Tips & Tricks</span>
            </button>
        </div>
      </div>

      {/* Main Content: Big Practice Modules */}
      <div className="flex-grow min-h-0">
          <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
            {PRACTICE_MODULES.map((module) => {
              const Icon = IconMap[module.icon] || Zap;
              const colorStyles: Record<string, string> = {
                yellow: "bg-duo-yellow border-duo-yellowDark text-duo-yellowDark",
                red: "bg-duo-red border-duo-redDark text-duo-red",
                blue: "bg-duo-blue border-duo-blueDark text-duo-blue",
                green: "bg-duo-green border-duo-greenDark text-duo-green",
                navy: "bg-duo-navy border-gray-800 text-duo-navy"
              };
              
              return (
                <button 
                  key={module.id} 
                  onClick={() => onStartModule(module)}
                  className="bg-white border-2 border-duo-gray border-b-8 rounded-[2rem] p-6 hover:translate-y-[-4px] hover:border-b-[10px] active:translate-y-[2px] active:border-b-4 transition-all text-left group flex flex-col h-full shadow-sm hover:shadow-md relative overflow-hidden"
                >
                   {/* Background Decor */}
                   <div className="absolute -right-6 -bottom-6 text-duo-gray opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                      <Icon size={180} />
                   </div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`p-4 rounded-2xl shadow-sm ${colorStyles[module.color].split(' ')[0]}`}>
                        <Icon className="text-white w-10 h-10" />
                    </div>
                    <span className="font-black text-sm bg-gray-100 text-duo-grayText px-3 py-1.5 rounded-lg border-2 border-gray-200">
                      {module.duration} SEC
                    </span>
                  </div>
                  
                  <div className="relative z-10 flex-grow">
                    <h3 className={`text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight ${colorStyles[module.color].split(' ')[2]}`}>
                        {module.title}
                    </h3>
                    <p className="text-duo-grayText text-lg font-bold leading-relaxed">
                        {module.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 w-full py-4 rounded-xl bg-duo-gray/10 text-center font-black text-duo-grayText text-base uppercase tracking-widest group-hover:bg-duo-blue group-hover:text-white transition-colors duration-300">
                    Start Warmup
                  </div>
                </button>
              );
            })}
          </div>
      </div>
    </div>
  );
};