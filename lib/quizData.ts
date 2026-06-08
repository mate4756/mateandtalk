export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: 'spanish' | 'football' | 'mate' | 'dictionary';
}

export const argentineTermsQuiz: QuizQuestion[] = [
  {
    id: '1',
    question: 'What does "che" mean in Argentine Spanish?',
    options: ['Hey/Man', 'Goodbye', 'Thank you', 'Sorry'],
    correctAnswer: 0,
    explanation: '"Che" is an interjection used to get someone\'s attention, similar to "hey" or "man" in English.',
    category: 'spanish'
  },
  {
    id: '2',
    question: 'If someone says "¿qué hacés, boludo?", they are:',
    options: ['Insulting you', 'Greeting a friend', 'Asking for directions', 'Complimenting you'],
    correctAnswer: 1,
    explanation: '"Boludo" can be an insult, but among friends it\'s used affectionately, similar to "dude" or "bro".',
    category: 'spanish'
  },
  {
    id: '3',
    question: 'What is "mate"?',
    options: ['A friend', 'A traditional herbal drink', 'A type of food', 'A greeting'],
    correctAnswer: 1,
    explanation: 'Mate is a traditional South American caffeine-rich infused drink, central to Argentine social culture.',
    category: 'mate'
  },
  {
    id: '4',
    question: 'What does "laburo" mean?',
    options: ['Laboratory', 'Work/Job', 'Love', 'Food'],
    correctAnswer: 1,
    explanation: '"Laburo" is lunfardo (slang) for work or job, from the Italian "lavoro".',
    category: 'spanish'
  },
  {
    id: '5',
    question: 'If something is "una masa", it means:',
    options: ['It\'s heavy', 'It\'s great/awesome', 'It\'s confusing', 'It\'s expensive'],
    correctAnswer: 1,
    explanation: '"Una masa" means something is great, awesome, or excellent.',
    category: 'spanish'
  },
  {
    id: '6',
    question: 'What does "quilombo" mean?',
    options: ['A beautiful place', 'A chaotic situation/mess', 'A type of dance', 'A food'],
    correctAnswer: 1,
    explanation: '"Quilombo" originally referred to refugee settlements, now means a chaotic situation or mess.',
    category: 'spanish'
  },
  {
    id: '7',
    question: 'What is "fiaca"?',
    options: ['A type of cake', 'Laziness/lack of energy', 'A celebration', 'A vehicle'],
    correctAnswer: 1,
    explanation: '"Fiaca" is the feeling of laziness or lack of energy to do something.',
    category: 'spanish'
  },
  {
    id: '8',
    question: 'If someone says "bancame", they mean:',
    options: ['Wait for me', 'Give me money', 'Go away', 'I don\'t believe you'],
    correctAnswer: 0,
    explanation: '"Bancame" means "wait for me" or "hold on", from the verb "bancar" (to tolerate/wait).',
    category: 'spanish'
  },
  {
    id: '9',
    question: 'What does "posta" mean?',
    options: ['A post office', 'For real/seriously', 'A type of pasta', 'A position'],
    correctAnswer: 1,
    explanation: '"Posta" means "for real" or "seriously", used to emphasize truth.',
    category: 'spanish'
  },
  {
    id: '10',
    question: 'What is "pibe"?',
    options: ['A type of bird', 'A kid/boy', 'A drink', 'A vehicle'],
    correctAnswer: 1,
    explanation: '"Pibe" is a colloquial term for a kid or boy, similar to "kid" or "lad" in English.',
    category: 'spanish'
  },
  {
    id: '11',
    question: 'What does "al toque" mean?',
    options: ['Touching something', 'Right away/immediately', 'Very slowly', 'With care'],
    correctAnswer: 1,
    explanation: '"Al toque" means right away or immediately, similar to "right now" or "ASAP".',
    category: 'spanish'
  },
  {
    id: '12',
    question: 'If something is "una goma", it means:',
    options: ['It\'s sticky', 'It\'s boring', 'It\'s elastic', 'It\'s sweet'],
    correctAnswer: 1,
    explanation: '"Una goma" means something is boring or tedious.',
    category: 'spanish'
  },
  {
    id: '13',
    question: 'What does "morfar" mean?',
    options: ['To die', 'To eat', 'To sleep', 'To run'],
    correctAnswer: 1,
    explanation: '"Morfar" is lunfardo for eating, from the Italian "mangiare".',
    category: 'spanish'
  },
  {
    id: '14',
    question: 'What is "mina"?',
    options: ['A mine', 'A girl/woman', 'A mineral', 'A weapon'],
    correctAnswer: 1,
    explanation: '"Mina" is a colloquial term for a girl or woman, similar to "chick" or "girl" in English.',
    category: 'spanish'
  },
  {
    id: '15',
    question: 'What does "chabón" mean?',
    options: ['A type of food', 'A guy/dude', 'A place', 'A feeling'],
    correctAnswer: 1,
    explanation: '"Chabón" is a colloquial term for a guy or dude, similar to "dude" or "bro" in English.',
    category: 'spanish'
  },
  {
    id: '16',
    question: 'If something is "una bomba", it means:',
    options: ['It\'s dangerous', 'It\'s excellent/great', 'It\'s explosive', 'It\'s loud'],
    correctAnswer: 1,
    explanation: '"Una bomba" means something is excellent or great, similar to "awesome" in English.',
    category: 'spanish'
  },
  {
    id: '17',
    question: 'What does "bondi" mean?',
    options: ['A type of candy', 'A bus', 'A car', 'A train'],
    correctAnswer: 1,
    explanation: '"Bondi" is lunfardo for a bus, commonly used in Buenos Aires.',
    category: 'spanish'
  },
  {
    id: '18',
    question: 'What is "guita"?',
    options: ['A guitar', 'Money', 'A type of fish', 'A game'],
    correctAnswer: 1,
    explanation: '"Guita" is lunfardo for money, similar to "cash" or "dough" in English.',
    category: 'spanish'
  },
  {
    id: '19',
    question: 'What does "forro" mean?',
    options: ['A cover', 'An annoying person', 'A type of fabric', 'A cold'],
    correctAnswer: 1,
    explanation: '"Forro" can mean an annoying or unpleasant person, similar to "jerk" or "idiot".',
    category: 'spanish'
  },
  {
    id: '20',
    question: 'What is "chorro"?',
    options: ['A type of dance', 'A thief', 'A food', 'A celebration'],
    correctAnswer: 1,
    explanation: '"Chorro" is a colloquial term for a thief or robber.',
    category: 'spanish'
  }
];

export const footballQuiz: QuizQuestion[] = [
  {
    id: 'f1',
    question: 'In which year did Argentina win its first World Cup?',
    options: ['1978', '1986', '1930', '1950'],
    correctAnswer: 0,
    explanation: 'Argentina won its first World Cup in 1978, hosted at home, defeating the Netherlands 3-1 in the final.',
    category: 'football'
  },
  {
    id: 'f2',
    question: 'Who scored the "Goal of the Century" against England in 1986?',
    options: ['Diego Maradona', 'Mario Kempes', 'Gabriel Batistuta', 'Lionel Messi'],
    correctAnswer: 0,
    explanation: 'Diego Maradona scored the "Goal of the Century" by dribbling past 5 English players in the 1986 World Cup quarterfinal.',
    category: 'football'
  },
  {
    id: 'f3',
    question: 'What is the nickname of the Argentine national team?',
    options: ['La Albiceleste', 'Los Gauchos', 'Los Pumas', 'El Tango'],
    correctAnswer: 0,
    explanation: 'La Albiceleste (The White and Sky Blue) refers to the team\'s iconic striped jersey colors.',
    category: 'football'
  },
  {
    id: 'f4',
    question: 'Which stadium is considered the home of Argentine football?',
    options: ['El Monumental', 'La Bombonera', 'El Cilindro', 'El Gigante'],
    correctAnswer: 0,
    explanation: 'Estadio Monumental in Buenos Aires is the largest stadium in Argentina and home to River Plate.',
    category: 'football'
  },
  {
    id: 'f5',
    question: 'What does "Bravo, Boca" mean in the stadium?',
    options: ['Goodbye Boca', 'Applause/Recognition', 'Insult', 'Warning'],
    correctAnswer: 1,
    explanation: '"Bravo, Boca" is a chant of applause and recognition, showing appreciation for the team\'s performance.',
    category: 'football'
  }
];

export const mateQuiz: QuizQuestion[] = [
  {
    id: 'm1',
    question: 'What is the correct way to pass the mate?',
    options: ['Handle facing the receiver', 'Handle facing yourself', 'No specific way', 'With both hands'],
    correctAnswer: 0,
    explanation: 'The mate is passed with the handle facing the receiver as a sign of respect and courtesy.',
    category: 'mate'
  },
  {
    id: 'm2',
    question: 'What is a "cebador"?',
    options: ['The person who prepares the mate', 'The mate gourd', 'The straw', 'The yerba mate'],
    correctAnswer: 0,
    explanation: 'The cebador is the person responsible for preparing and serving the mate to the group.',
    category: 'mate'
  },
  {
    id: 'm3',
    question: 'What is the "bombilla"?',
    options: ['The metal straw', 'The gourd', 'The hot water', 'The yerba mate'],
    correctAnswer: 0,
    explanation: 'The bombilla is the metal straw used to drink mate, filtering the yerba while allowing liquid to pass.',
    category: 'mate'
  },
  {
    id: 'm4',
    question: 'How should the water temperature be for mate?',
    options: ['Boiling (100°C)', 'Hot but not boiling (70-80°C)', 'Room temperature', 'Cold'],
    correctAnswer: 1,
    explanation: 'Water should be hot but not boiling (70-80°C) to avoid burning the yerba and making it bitter.',
    category: 'mate'
  },
  {
    id: 'm5',
    question: 'What does it mean when the mate is "lavado"?',
    options: ['It\'s been cleaned', 'It has lost its flavor', 'It\'s new', 'It\'s too hot'],
    correctAnswer: 1,
    explanation: 'When mate is "lavado" (washed), it has lost its flavor and needs to be replaced with fresh yerba.',
    category: 'mate'
  }
];

export const dictionaryQuiz: QuizQuestion[] = [
  {
    id: 'd1',
    question: 'What does "afanar" mean?',
    options: ['To love', 'To steal', 'To work', 'To sleep'],
    correctAnswer: 1,
    explanation: '"Afanar" is slang for stealing or taking something, commonly used in street language.',
    category: 'dictionary'
  },
  {
    id: 'd2',
    question: 'If someone is "embole", they are:',
    options: ['Excited', 'Bored', 'Angry', 'Happy'],
    correctAnswer: 1,
    explanation: '"Embole" means being bored or experiencing a total lack of interest or energy.',
    category: 'dictionary'
  },
  {
    id: 'd3',
    question: 'What does "trucho" mean?',
    options: ['Authentic', 'Fake or poor quality', 'Expensive', 'Beautiful'],
    correctAnswer: 1,
    explanation: '"Trucho" refers to something fake, counterfeit, or of poor quality.',
    category: 'dictionary'
  },
  {
    id: 'd4',
    question: 'What is "tarado"?',
    options: ['A type of car', 'Stupid or slow', 'A food', 'A celebration'],
    correctAnswer: 1,
    explanation: '"Tarado" is an insult meaning stupid, foolish, or mentally slow.',
    category: 'dictionary'
  },
  {
    id: 'd5',
    question: 'What does "no me la contés" mean?',
    options: ['Tell me everything', "Don't try to fool me", "I don't understand", "It's fine"],
    correctAnswer: 1,
    explanation: '"No me la contés" means "don\'t try to fool me" or "I know what you\'re doing".',
    category: 'dictionary'
  }
];

export function getQuestionsForWeek(rotationWeek: number): QuizQuestion[] {
  switch (rotationWeek) {
    case 1:
      // Week 1: Argentine Spanish only
      return argentineTermsQuiz;
    case 2:
      // Week 2: Mix of Spanish + Football or Mate
      const spanishQuestions = argentineTermsQuiz.slice(0, 10);
      const moduleQuestions = Math.random() > 0.5 ? footballQuiz : mateQuiz;
      return [...spanishQuestions, ...moduleQuestions];
    case 3:
      // Week 3: Grand Finale - All modules combined
      const spanishFinale = argentineTermsQuiz.slice(0, 8);
      const footballFinale = footballQuiz.slice(0, 4);
      const mateFinale = mateQuiz.slice(0, 4);
      const dictionaryFinale = dictionaryQuiz.slice(0, 4);
      return [...spanishFinale, ...footballFinale, ...mateFinale, ...dictionaryFinale];
    default:
      return argentineTermsQuiz;
  }
}

export function getCurrentWeekNumber(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const daysSinceStart = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  return Math.floor(daysSinceStart / 7) + 1;
}

export function getRotationWeek(): number {
  // 3-week rotation cycle
  const currentWeek = getCurrentWeekNumber();
  return ((currentWeek - 1) % 3) + 1; // Returns 1, 2, or 3
}

export function getRandomQuestions(count: number = 6, rotationWeek?: number): QuizQuestion[] {
  const questions = rotationWeek !== undefined 
    ? getQuestionsForWeek(rotationWeek)
    : argentineTermsQuiz;
  
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
}

// Scheduled Weekly Quiz Logic
export interface WeekSchedule {
  weekNumber: number;
  activationDate: Date;
  unlockDate: string; // Formatted date string
}

export const weekSchedules: WeekSchedule[] = [
  {
    weekNumber: 1,
    activationDate: new Date(2026, 5, 8), // June 8, 2026 (month is 0-indexed)
    unlockDate: 'June 8, 2026'
  },
  {
    weekNumber: 2,
    activationDate: new Date(2026, 5, 15), // June 15, 2026
    unlockDate: 'June 15, 2026'
  },
  {
    weekNumber: 3,
    activationDate: new Date(2026, 5, 22), // June 22, 2026
    unlockDate: 'June 22, 2026'
  }
];

export function isWeekActive(weekNumber: number): boolean {
  const schedule = weekSchedules.find(s => s.weekNumber === weekNumber);
  if (!schedule) return false;
  
  const now = new Date();
  return now >= schedule.activationDate;
}

export function getCurrentActiveWeek(): number {
  const now = new Date();
  for (const schedule of weekSchedules) {
    if (now >= schedule.activationDate) {
      return schedule.weekNumber;
    }
  }
  return 0; // No week is active yet
}

export function getWeekStatus(weekNumber: number): 'locked' | 'coming-soon' | 'ready' {
  const schedule = weekSchedules.find(s => s.weekNumber === weekNumber);
  if (!schedule) return 'locked';
  
  const now = new Date();
  if (now >= schedule.activationDate) {
    return 'ready';
  }
  
  // Check if it's the next upcoming week
  const currentActive = getCurrentActiveWeek();
  if (weekNumber === currentActive + 1) {
    return 'coming-soon';
  }
  
  return 'locked';
}
