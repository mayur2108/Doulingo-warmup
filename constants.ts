import { PracticeModule, RuleSection, StrategyTip } from './types';

export const APP_NAME = "DuoType";

export const RULES_DATA: RuleSection[] = [
  {
    title: "Environment",
    icon: "Home",
    color: "blue",
    rules: [
      "Alone in a quiet, bright room.",
      "Ears visible. No hair covering them.",
      "No headphones or pods allowed.",
      "Face fully visible in frame."
    ]
  },
  {
    title: "The Phone Rule",
    icon: "Smartphone",
    color: "yellow",
    rules: [
      "Smartphone required as 2nd camera.",
      "Must record screen & keyboard.",
      "Set to 'Do Not Disturb'.",
      "Lean it against a side object."
    ]
  },
  {
    title: "Your Eyes",
    icon: "Eye",
    color: "green",
    rules: [
      "Look at the screen ONLY.",
      "Look down ONLY to type.",
      "Don't look away or off-camera.",
      "Stay centered in the frame."
    ]
  },
  {
    title: "Strict Tech",
    icon: "Cpu",
    color: "red",
    rules: [
      "Close Grammarly & VPNs.",
      "Mouse must stay in window.",
      "One monitor only.",
      "No external notes or paper."
    ]
  }
];

export const STRATEGIES: StrategyTip[] = [
  {
    title: "Don't Stop Typing",
    content: "Length matters. The more you write, the higher your potential score.",
    details: "In the Duolingo English Test, quantity often correlates with quality in the eyes of the grading algorithm. When you are given a production task, do not pause to overthink a single word. Keep your fingers moving. If you get stuck, write a simple sentence and move to the next idea. A 100-word response will almost always outscore a 30-word response, even if the shorter one is grammatically perfect. Flow is your friend. Keep the momentum going until the timer hits zero.",
    icon: "Maximize"
  },
  {
    title: "Vocabulary Power",
    content: "Never use 'good' or 'bad'. Use 'excellent' or 'adverse'.",
    details: "Your lexical sophistication is a key scoring component. The test is looking for your ability to use CEFR C1 and C2 level words. Before the test, memorize synonyms for common words. Instead of 'happy', use 'elated'. Instead of 'important', use 'crucial' or 'paramount'. Sprinkling just three or four advanced adjectives into your writing can significantly bump your literacy score. Don't sound artificial, but definitely upgrade your basic vocabulary.",
    icon: "BookOpen"
  },
  {
    title: "The Last Minute",
    content: "Save the last 60 seconds to check for capital letters and periods.",
    details: "It is heartbreaking to write a brilliant essay and lose points for simple mechanical errors. Train yourself to stop writing new content when the timer hits the 1-minute mark. Use this final minute exclusively for 'clean up'. Scan for the beginning of sentences—are they capitalized? Scan for the ends—do they have periods? These binary errors are easy for the AI to spot and punish. A polished response is better than a rushed, unfinished one.",
    icon: "CheckCircle"
  },
  {
    title: "Speak Naturally",
    content: "Don't sound like a robot. Fluency > Perfection.",
    details: "For the speaking sections, the grading AI analyzes your acoustic features. This includes your pacing, intonation, and pauses. If you try to speak too perfectly, you might sound robotic or slow, which lowers your fluency score. It is better to speak at a natural, slightly faster pace with a few minor grammar slips than to speak incredibly slowly with perfect grammar. Imagine you are talking to a friend, not a computer. Keep it natural.",
    icon: "Mic"
  },
  {
    title: "The Adaptive Trick",
    content: "The first 5 questions decide your difficulty. Focus 100%.",
    details: "The DET is a computer-adaptive test. This means the difficulty of question 2 depends on how you did on question 1. If you nail the first few questions, the test gives you harder questions, which are worth more points. If you mess up the start, you get easier questions, capping your maximum possible score. Treat the first 5 minutes of the test as the most critical. Be hyper-focused immediately. There is no 'warm up' period in the real exam.",
    icon: "Star"
  },
  {
    title: "Describe Everything",
    content: "For images: Who? What? Where? When? Why?",
    details: "When describing an image, do not just list objects like 'I see a dog and a cat.' That is a basic level response. Tell a story. 'The golden retriever is playfully chasing a small calico cat across a sunlit grassy park.' Speculate on the context: 'It appears to be a summer afternoon.' Describe the emotions. The more descriptive details and prepositions (behind, next to, under) you use, the better your score.",
    icon: "Image"
  },
  {
    title: "Stay Calm",
    content: "If a question feels impossible, guess and move on.",
    details: "You will encounter questions you do not know the answer to. This is normal. The test is designed to find your upper limit. Do not freeze. If you stare at a 'Fill in the Blanks' word for 30 seconds, you are wasting time that could be used on easier words. If you don't know it, make an educated guess based on context clues and immediately move forward. Panic is the enemy of performance. Breathe, guess, and go.",
    icon: "Heart"
  }
];

export const PRACTICE_MODULES: PracticeModule[] = [
  {
    id: 'mod_speed',
    type: 'speed',
    title: 'Speed Sprint',
    description: 'Go fast. Ignore mistakes. Just type.',
    icon: 'Zap',
    color: 'yellow',
    duration: 60,
    content: [
      "The quick brown fox jumps over the lazy dog but more importantly specialized cognitive tasks require intense focus.",
      "Rapid technological advancement has fundamentally shifted how educational institutions approach curriculum.",
      "Environmental sustainability is not merely a choice but a necessity for the continued prosperity of global systems."
    ]
  },
  {
    id: 'mod_accuracy',
    type: 'accuracy',
    title: 'Precision Mode',
    description: 'Perfect punctuation & Capitals.',
    icon: 'Target',
    color: 'red',
    duration: 90,
    content: [
      "However, Dr. Smith argued, \"The results are inconclusive; we must conduct further testing.\" This is vital.",
      "In 2024, the DET (Duolingo English Test) updated its criteria: specifically, the 'Interactive Reading' score.",
      "Can we truly understand AI? Perhaps not; nevertheless, we proceed with development for humanity."
    ]
  },
  {
    id: 'mod_visual',
    type: 'visual',
    title: 'Image Describe',
    description: 'Write what you see. Fast.',
    icon: 'Image',
    color: 'blue',
    duration: 60,
    content: [
      "https://picsum.photos/id/1/800/400?grayscale",
      "https://picsum.photos/id/20/800/400?grayscale",
      "https://picsum.photos/id/48/800/400?grayscale"
    ]
  },
  {
    id: 'mod_academic',
    type: 'academic',
    title: 'Academic',
    description: 'University level sentences.',
    icon: 'ScrollText',
    color: 'green',
    duration: 120,
    content: [
      "Although the correlation between socioeconomic status and academic achievement is well-documented, studies suggest intervention helps.",
      "The proliferation of digital media has democratized information access; conversely, it has facilitated misinformation."
    ]
  },
  {
    id: 'mod_vocab',
    type: 'vocab',
    title: 'Vocab Builder',
    description: 'Type complex words only.',
    icon: 'Book',
    color: 'navy',
    duration: 60,
    content: [
      "unprecedented consequence substantial implementation theoretical perspective distinction fundamental integration",
      "comprehensive diverse evolution contemporary interpretation significance analysis capability variation distinctive"
    ]
  }
];