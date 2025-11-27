import React, { useState, useEffect, useRef } from 'react';
import { DuoButton } from '../components/DuoButton';
import { PracticeModule, PracticeStats } from '../types';
import { X, Clock, Target, Gauge, LogOut, Check } from 'lucide-react';

interface PracticeSessionProps {
  module: PracticeModule;
  onComplete: (stats: PracticeStats) => void;
  onExit: () => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({ module, onComplete, onExit }) => {
  const [contentIdx, setContentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(module.duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const [rtWpm, setRtWpm] = useState(0);
  const [rtAccuracy, setRtAccuracy] = useState(100);

  const [stats, setStats] = useState({
    mistakes: 0,
    correctChars: 0,
    totalTyped: 0
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const activeContent = React.useMemo(() => {
    return module.content[contentIdx % module.content.length];
  }, [module, contentIdx]);

  useEffect(() => {
    setUserInput('');
    setTimeLeft(module.duration);
    setIsActive(false);
    setIsFinished(false);
    setStats({ mistakes: 0, correctChars: 0, totalTyped: 0 });
    setRtWpm(0);
    setRtAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [contentIdx, module]);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishSession();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (!isActive) return;
    const timeElapsedMin = (module.duration - timeLeft) / 60;
    const grossWPM = timeElapsedMin > 0 ? (userInput.length / 5) / timeElapsedMin : 0;
    
    let correctChars = 0;
    const targetSub = activeContent.substring(0, userInput.length);
    for(let i=0; i<userInput.length; i++) {
        if(userInput[i] === targetSub[i]) correctChars++;
    }
    const acc = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;

    setRtWpm(Math.round(grossWPM));
    setRtAccuracy(Math.round(acc));
  }, [userInput, timeLeft, isActive, module.duration, activeContent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive) setIsActive(true);
    const val = e.target.value;
    
    if (val.length > userInput.length) {
        const charIdx = val.length - 1;
        if (module.type !== 'visual') {
            if (val[charIdx] !== activeContent[charIdx]) {
                setStats(prev => ({ ...prev, mistakes: prev.mistakes + 1 }));
            } else {
                setStats(prev => ({ ...prev, correctChars: prev.correctChars + 1 }));
            }
        }
    }

    setUserInput(val);
    setStats(prev => ({ ...prev, totalTyped: val.length }));

    if (module.type !== 'visual' && val === activeContent) {
      finishSession();
    }
  };

  const finishSession = () => {
    setIsActive(false);
    setIsFinished(true);
    const timeSpent = module.duration - timeLeft;
    const timeMin = timeSpent / 60;
    const grossWPM = timeMin > 0 ? (userInput.length / 5) / timeMin : 0;
    
    onComplete({
      wpm: Math.round(grossWPM),
      accuracy: Math.round(rtAccuracy),
      timeElapsed: timeSpent,
      mistakes: stats.mistakes,
      correctChars: stats.correctChars,
      moduleId: module.id
    });
  };

  const renderSpeedFeedback = () => {
    if (module.type === 'visual') return null;
    const target = activeContent;
    const input = userInput;
    
    return (
      <div className="font-mono text-lg md:text-xl leading-relaxed text-duo-grayText select-none break-words pointer-events-none">
        {target.split('').map((char, idx) => {
          let colorClass = "text-gray-300";
          let bgClass = "";
          
          if (idx < input.length) {
            if (input[idx] === char) {
                colorClass = "text-duo-greenDark font-bold";
            } else {
                colorClass = "text-duo-red";
                bgClass = "bg-red-100";
            }
          }
          const isCursor = idx === input.length;
          
          return (
            <span key={idx} className={`${colorClass} ${bgClass} ${isCursor ? 'border-l-2 border-duo-blue' : ''}`}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 max-w-5xl mx-auto overflow-hidden">
      
      {/* Header */}
      <div className="flex-none flex items-center justify-between mb-4">
        <button 
            onClick={onExit} 
            className="flex items-center gap-2 bg-gray-100 hover:bg-red-100 text-duo-grayText hover:text-duo-red px-4 py-2 rounded-xl transition-colors font-bold uppercase text-sm tracking-wide"
        >
          <LogOut size={18} />
          <span>Quit to Home</span>
        </button>
        
        <div className="bg-duo-navy text-white px-6 py-2 rounded-2xl text-base font-black uppercase tracking-widest shadow-sm">
            {module.title}
        </div>
        
        {/* Placeholder to balance header center */}
        <div className="w-32 hidden md:block" />
      </div>

      {/* Stats Bar */}
      <div className="flex-none grid grid-cols-3 gap-3 mb-4">
         <div className="bg-duo-blue text-white rounded-2xl p-3 flex flex-col items-center justify-center border-b-4 border-duo-blueDark shadow-sm">
             <div className="opacity-80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Clock size={12}/> Time</div>
             <div className="text-2xl font-black font-mono leading-none mt-1">
                 {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
             </div>
         </div>
         <div className="bg-duo-yellow text-duo-navy rounded-2xl p-3 flex flex-col items-center justify-center border-b-4 border-duo-yellowDark shadow-sm">
             <div className="opacity-60 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Gauge size={12}/> Speed</div>
             <div className="text-2xl font-black leading-none mt-1">{rtWpm}</div>
         </div>
         <div className={`${rtAccuracy > 90 ? 'bg-duo-green border-duo-greenDark' : 'bg-duo-red border-duo-redDark'} text-white rounded-2xl p-3 flex flex-col items-center justify-center border-b-4 transition-colors shadow-sm`}>
             <div className="opacity-80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Target size={12}/> Acc.</div>
             <div className="text-2xl font-black leading-none mt-1">{rtAccuracy}%</div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow min-h-0 flex flex-col gap-4">
        
        {module.type === 'visual' && (
          <div className="flex-none h-40 md:h-56 rounded-2xl overflow-hidden border-2 border-duo-gray">
             <img src={activeContent} alt="Target" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex-grow bg-white border-2 border-duo-gray rounded-3xl p-4 md:p-6 shadow-sm relative flex flex-col overflow-hidden">
           {module.type !== 'visual' && (
             <div className="flex-none mb-4 overflow-hidden max-h-[40%] border-b-2 border-dashed border-gray-100 pb-2">
               {renderSpeedFeedback()}
             </div>
           )}

           <div className="relative flex-grow">
                <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    disabled={isFinished}
                    placeholder={!isActive ? "Start typing to begin..." : ""}
                    className={`w-full h-full bg-transparent outline-none resize-none font-medium text-xl md:text-2xl text-duo-navy placeholder-gray-300 ${module.type !== 'visual' ? 'absolute inset-0 opacity-0 z-10 cursor-text' : 'relative z-10 focus:ring-0'}`}
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
        </div>
      </div>

      {/* Footer / Submit */}
      <div className="flex-none mt-4">
          <DuoButton 
            variant="primary" 
            size="xl"
            onClick={finishSession}
            fullWidth
            className="shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-center gap-3">
                <Check size={28} strokeWidth={3} />
                <span>SUBMIT & ANALYZE</span>
            </div>
          </DuoButton>
      </div>
    </div>
  );
};