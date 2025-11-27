export type ViewState = 'home' | 'practice' | 'rules' | 'strategies' | 'results';

export interface RuleSection {
  title: string;
  icon: string;
  color: 'green' | 'red' | 'blue' | 'yellow';
  rules: string[];
}

export interface PracticeStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  mistakes: number;
  correctChars: number;
  moduleId?: string;
}

export type ModuleType = 'speed' | 'accuracy' | 'visual' | 'academic' | 'vocab';

export interface PracticeModule {
  id: string;
  type: ModuleType;
  title: string;
  description: string;
  icon: string;
  color: 'green' | 'blue' | 'red' | 'yellow' | 'navy';
  content: string[]; // Array of strings to randomly select from or cycle through
  duration: number; // in seconds
}

export interface StrategyTip {
  title: string;
  content: string;
  details: string; // Detailed paragraph for the expanded view
  icon: string;
}