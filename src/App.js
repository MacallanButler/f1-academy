import React, { useState } from 'react';
import { ChevronRight, BookOpen, Eye, Trophy, Flag, Zap } from 'lucide-react';

export default function F1LearningApp() {
  const [currentModule, setCurrentModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const modules = [
    { id: 1, title: 'F1 Basics', icon: BookOpen, description: 'Learn what F1 is all about' },
    { id: 2, title: 'The Race', icon: Flag, description: 'Understand race day format' },
    { id: 3, title: 'Race Strategy', icon: Zap, description: 'Master tire strategy and pit stops' },
  ];

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white">
      <header className="bg-black/50 backdrop-blur-sm border-b border-red-600/30 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">F1 <span className="text-red-500">ACADEMY</span></h1>
              <p className="text-gray-400 text-sm mt-1">Your gateway to Formula 1</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-xl font-bold">{completedModules.length}/{modules.length}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {!currentModule ? (
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-3">Welcome to F1 Academy</h2>
              <p className="text-gray-300 text-lg">Master Formula 1 through interactive learning. Choose a module to begin your journey.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {modules.map((module) => {
                const Icon = module.icon;
                const isCompleted = completedModules.includes(module.id);
                
                return (
                  <button
                    key={module.id}
                    onClick={() => setCurrentModule(module.id)}
                    className="bg-black/40 backdrop-blur border border-red-600/30 rounded-lg p-6 text-left hover:border-red-500 hover:bg-black/60 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-10 h-10 text-red-500" />
                      {isCompleted && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Completed</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-gray-400 mb-4">{module.description}</p>
                    <div className="flex items-center text-red-500 group-hover:translate-x-1 transition-transform">
                      <span className="text-sm font-semibold">Start Learning</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setCurrentModule(null)}
              className="text-gray-400 hover:text-white mb-6 flex items-center"
            >
              <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
              Back to Modules
            </button>

            {currentModule === 1 && <Module1 onComplete={() => handleModuleComplete(1)} />}
            {currentModule === 2 && <Module2 onComplete={() => handleModuleComplete(2)} />}
            {currentModule === 3 && <Module3 onComplete={() => handleModuleComplete(3)} />}
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleTemplate({ moduleNumber, title, sections, LearnComponent, SeeItComponent, TryItComponent, onComplete }) {
  const [currentSection, setCurrentSection] = useState('learn');
  const [quizScore, setQuizScore] = useState(null);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Module {moduleNumber}: {title}</h2>

      <div className="flex gap-4 mb-8 border-b border-red-600/30 pb-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentSection === section.id
                  ? 'bg-red-600 text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white hover:bg-black/60'
              }`}
            >
              <Icon className="w-5 h-5" />
              {section.label}
            </button>
          );
        })}
      </div>

      <div className="bg-black/40 backdrop-blur border border-red-600/30 rounded-lg p-8">
        {currentSection === 'learn' && <LearnComponent />}
        {currentSection === 'seeIt' && <SeeItComponent />}
        {currentSection === 'tryIt' && <TryItComponent quizScore={quizScore} setQuizScore={setQuizScore} onComplete={onComplete} />}
      </div>
    </div>
  );
}

function Module1({ onComplete }) {
  const sections = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'seeIt', label: 'See It', icon: Eye },
    { id: 'tryIt', label: 'Try It', icon: Trophy },
  ];

  return <ModuleTemplate moduleNumber={1} title="F1 Basics" sections={sections} LearnComponent={Module1Learn} SeeItComponent={Module1SeeIt} TryItComponent={Module1TryIt} onComplete={onComplete} />;
}

function Module1Learn() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">What is Formula 1?</h3>
        <p className="text-gray-300 leading-relaxed">
          Formula 1 is the pinnacle of motorsport. It's a global championship featuring 20+ races across the world, 
          with 10 teams and 20 drivers competing simultaneously. F1 is the perfect blend of driver skill, 
          cutting-edge engineering, and strategic brilliance.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Two Championships</h3>
        <div className="space-y-4">
          <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Driver's Championship</h4>
            <p className="text-gray-300">
              The individual driver with the most points wins. This is what fans typically focus on.
            </p>
          </div>
          
          <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Constructor's Championship</h4>
            <p className="text-gray-300">
              The team with the most combined points from both drivers wins. This determines prize money.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Race Weekend Format</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">FRI</span>
            <div>
              <p className="font-semibold">Free Practice 1 and 2</p>
              <p className="text-gray-400 text-sm">Teams test setups and drivers learn the track</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">SAT</span>
            <div>
              <p className="font-semibold">Free Practice 3 plus Qualifying</p>
              <p className="text-gray-400 text-sm">Final practice, then qualifying determines starting grid</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">SUN</span>
            <div>
              <p className="font-semibold">The Race</p>
              <p className="text-gray-400 text-sm">Points awarded to top 10 finishers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Module1SeeIt() {
  const pointsSystem = [
    { position: '1st', points: 25, color: 'bg-yellow-500' },
    { position: '2nd', points: 18, color: 'bg-gray-300' },
    { position: '3rd', points: 15, color: 'bg-orange-600' },
    { position: '4th', points: 12, color: 'bg-blue-500' },
    { position: '5th', points: 10, color: 'bg-blue-400' },
    { position: '6th', points: 8, color: 'bg-green-500' },
    { position: '7th', points: 6, color: 'bg-green-400' },
    { position: '8th', points: 4, color: 'bg-purple-500' },
    { position: '9th', points: 2, color: 'bg-purple-400' },
    { position: '10th', points: 1, color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-4">Points Distribution</h3>
        <p className="text-gray-300 mb-6">
          Only the top 10 finishers score points. Notice the huge gap between 1st and 2nd place.
        </p>
        
        <div className="space-y-3">
          {pointsSystem.map((item) => (
            <div key={item.position} className="flex items-center gap-4">
              <span className="w-12 text-right font-semibold">{item.position}</span>
              <div className="flex-1 bg-gray-800 rounded-full h-8 overflow-hidden">
                <div
                  className={`${item.color} h-full flex items-center justify-end pr-4 font-bold text-sm`}
                  style={{ width: `${(item.points / 25) * 100}%` }}
                >
                  {item.points} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Module1TryIt({ quizScore, setQuizScore, onComplete }) {
  const questions = [
    {
      question: "Driver A leads by 15 points with 2 races left. Driver B wins both for 50 points. Driver A finishes 2nd both times for 36 points. Who wins?",
      options: [
        { text: "Driver A", correct: false },
        { text: "Driver B", correct: true },
        { text: "They tie", correct: false },
      ],
      explanation: "Driver B gains 50 points while Driver A gains 36. Driver B wins by 1 point!"
    },
    {
      question: "Your team has drivers in P2 and P3. The P3 driver leads the championship. What should the team do?",
      options: [
        { text: "Keep positions", correct: false },
        { text: "Swap them via team orders", correct: true },
        { text: "Let them race", correct: false },
      ],
      explanation: "Most teams would issue team orders to help their championship contender."
    },
    {
      question: "What does the Constructor's Championship determine?",
      options: [
        { text: "Driver bragging rights", correct: false },
        { text: "Prize money distribution", correct: true },
        { text: "Garage location", correct: false },
      ],
      explanation: "The Constructor's Championship determines prize money distribution among teams."
    },
  ];

  return <QuizComponent questions={questions} quizScore={quizScore} setQuizScore={setQuizScore} onComplete={onComplete} />;
}

function Module2({ onComplete }) {
  const sections = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'seeIt', label: 'See It', icon: Eye },
    { id: 'tryIt', label: 'Try It', icon: Trophy },
  ];

  return <ModuleTemplate moduleNumber={2} title="The Race" sections={sections} LearnComponent={Module2Learn} SeeItComponent={Module2SeeIt} TryItComponent={Module2TryIt} onComplete={onComplete} />;
}

function Module2Learn() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Race Start</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          Drivers complete a formation lap, then line up on the grid. Five red lights illuminate one by one, then all go out - that's the start!
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Race Flags</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <div className="w-16 h-12 bg-green-500 rounded"></div>
            <div>
              <p className="font-semibold">Green Flag</p>
              <p className="text-gray-400 text-sm">Track clear, racing can begin</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-12 bg-yellow-400 rounded"></div>
            <div>
              <p className="font-semibold">Yellow Flag</p>
              <p className="text-gray-400 text-sm">Danger ahead, no overtaking</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-12 bg-red-600 rounded"></div>
            <div>
              <p className="font-semibold">Red Flag</p>
              <p className="text-gray-400 text-sm">Session stopped</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-12 bg-blue-600 rounded"></div>
            <div>
              <p className="font-semibold">Blue Flag</p>
              <p className="text-gray-400 text-sm">Faster car behind, let them pass</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Safety Car and VSC</h3>
        <div className="space-y-4">
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Safety Car</h4>
            <p className="text-gray-300">
              For serious incidents. All cars line up behind safety car. Perfect time to pit!
            </p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Virtual Safety Car</h4>
            <p className="text-gray-300">
              For minor incidents. Drivers slow to delta time. Gaps maintained.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Module2SeeIt() {
  const [selected, setSelected] = useState('crash');

  const incidents = {
    crash: { title: "Major Crash", flag: "Red Flag", color: "bg-red-600" },
    debris: { title: "Debris", flag: "Safety Car", color: "bg-yellow-400" },
    minor: { title: "Minor Issue", flag: "VSC", color: "bg-yellow-600" }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-4">Race Incidents</h3>
        
        <div className="flex gap-4 mb-6">
          {Object.entries(incidents).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                selected === key ? 'bg-red-600' : 'bg-black/60'
              }`}
            >
              {data.title}
            </button>
          ))}
        </div>

        <div className="bg-black/60 border border-red-600/30 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-14 ${incidents[selected].color} rounded`}></div>
            <h4 className="text-xl font-bold">{incidents[selected].flag}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

function Module2TryIt({ quizScore, setQuizScore, onComplete }) {
  const questions = [
    {
      question: "Debris at Turn 5. What flag is shown?",
      options: [
        { text: "Red flag", correct: false },
        { text: "Yellow flag", correct: true },
        { text: "Blue flag", correct: false },
      ],
      explanation: "Yellow flags indicate local danger. Drivers must slow and cannot overtake."
    },
    {
      question: "Safety car deployed, you're P5 on old tires. What do you do?",
      options: [
        { text: "Stay out", correct: false },
        { text: "Pit immediately", correct: true },
        { text: "Wait and see", correct: false },
      ],
      explanation: "Safety cars minimize pit time loss. Fresh tires after restart are a huge advantage."
    },
    {
      question: "Red flag after 40 of 50 laps. What happens?",
      options: [
        { text: "Race over", correct: false },
        { text: "Return to pits, race restarts", correct: true },
        { text: "VSC deployed", correct: false },
      ],
      explanation: "Red flags pause the race. Teams can work on cars before restart."
    },
  ];

  return <QuizComponent questions={questions} quizScore={quizScore} setQuizScore={setQuizScore} onComplete={onComplete} />;
}

function Module3({ onComplete }) {
  const sections = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'seeIt', label: 'See It', icon: Eye },
    { id: 'tryIt', label: 'Try It', icon: Trophy },
  ];

  return <ModuleTemplate moduleNumber={3} title="Race Strategy" sections={sections} LearnComponent={Module3Learn} SeeItComponent={Module3SeeIt} TryItComponent={Module3TryIt} onComplete={onComplete} />;
}

function Module3Learn() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Tire Compounds</h3>
        <p className="text-gray-300 mb-4">
          Three dry compounds per race. Must use at least two different types.
        </p>
        <div className="space-y-3">
          <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              <h4 className="font-bold">Soft (Red)</h4>
            </div>
            <p className="text-gray-300 text-sm">Fastest but degrades quickly. 10-20 laps.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              <h4 className="font-bold">Medium (Yellow)</h4>
            </div>
            <p className="text-gray-300 text-sm">Balanced performance. 20-30 laps.</p>
          </div>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <h4 className="font-bold">Hard (White)</h4>
            </div>
            <p className="text-gray-300 text-sm">Slowest but lasts longest. 30-40+ laps.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Undercut vs Overcut</h3>
        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Undercut</h4>
            <p className="text-gray-300">
              Pit BEFORE your rival. Fresh tires let you go faster and gain track position when they pit.
            </p>
          </div>
          <div className="bg-purple-900/30 border border-purple-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Overcut</h4>
            <p className="text-gray-300">
              Stay out LONGER than your rival. Push on old tires while they're in traffic on new tires.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Pit Strategy</h3>
        <p className="text-gray-300">
          Pit stops take 2-3 seconds but cost 20-25 seconds total. Strategic timing is everything.
        </p>
      </div>
    </div>
  );
}

function Module3SeeIt() {
  const [strategy, setStrategy] = useState('one');

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-4">Strategy Comparison</h3>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setStrategy('one')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              strategy === 'one' ? 'bg-red-600' : 'bg-black/60'
            }`}
          >
            One Stop
          </button>
          <button
            onClick={() => setStrategy('two')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              strategy === 'two' ? 'bg-red-600' : 'bg-black/60'
            }`}
          >
            Two Stop
          </button>
        </div>

        <div className="bg-black/60 border border-red-600/30 rounded-lg p-6">
          {strategy === 'one' ? (
            <div>
              <h4 className="text-xl font-bold mb-3">One-Stop Strategy</h4>
              <p className="text-gray-300 mb-4">Start on mediums, switch to hards around lap 25-30.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span>Laps 1-28: Medium tires</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span>Laps 29-55: Hard tires</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">Lower risk, less time lost in pits, but slower overall pace.</p>
            </div>
          ) : (
            <div>
              <h4 className="text-xl font-bold mb-3">Two-Stop Strategy</h4>
              <p className="text-gray-300 mb-4">Aggressive strategy with fresher tires throughout.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Laps 1-18: Soft tires</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span>Laps 19-38: Medium tires</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Laps 39-55: Soft tires</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">Higher risk, more pit time, but faster overall pace.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Module3TryIt({ quizScore, setQuizScore, onComplete }) {
  const questions = [
    {
      question: "You're racing your rival. They just pitted. What's the undercut strategy?",
      options: [
        { text: "Pit immediately before them", correct: false },
        { text: "Stay out longer", correct: false },
        { text: "Already did it - you pit first", correct: true },
      ],
      explanation: "Undercut means pitting BEFORE your rival to gain advantage with fresh tires."
    },
    {
      question: "50-lap race. Which strategy is typically faster but riskier?",
      options: [
        { text: "One stop", correct: false },
        { text: "Two stop", correct: true },
        { text: "Zero stop", correct: false },
      ],
      explanation: "Two stops are faster (fresher tires) but riskier (more pit time, more can go wrong)."
    },
    {
      question: "Lap 20 of 50. Softs are dead, leader 15s ahead on mediums. What do you do?",
      options: [
        { text: "Stay out and hope", correct: false },
        { text: "Pit for mediums", correct: true },
        { text: "Pit for more softs", correct: false },
      ],
      explanation: "Dead tires lose seconds per lap. Pit for mediums to stay competitive."
    },
  ];

  return <QuizComponent questions={questions} quizScore={quizScore} setQuizScore={setQuizScore} onComplete={onComplete} />;
}

function QuizComponent({ questions, quizScore, setQuizScore, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (questions[currentQuestion].options[index].correct) {
      setQuizScore(prev => (prev || 0) + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizScore(null);
  };

  const currentQ = questions[currentQuestion];
  const isComplete = currentQuestion === questions.length - 1 && showFeedback;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-red-500">Knowledge Check</h3>
        <span className="text-gray-400">Question {currentQuestion + 1} of {questions.length}</span>
      </div>

      {!isComplete ? (
        <>
          <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-6">
            <p className="text-lg text-gray-200">{currentQ.question}</p>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = option.correct;
              const showResult = showFeedback && isSelected;

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showResult && isCorrect
                      ? 'bg-green-500/20 border-green-500'
                      : showResult && !isCorrect
                      ? 'bg-red-500/20 border-red-500'
                      : isSelected
                      ? 'bg-red-600/30 border-red-500'
                      : 'bg-black/40 border-red-600/30 hover:border-red-500 hover:bg-black/60'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="bg-blue-950/30 border border-blue-600/50 rounded-lg p-6">
              <h4 className="font-bold mb-2 text-blue-400">Explanation:</h4>
              <p className="text-gray-300">{currentQ.explanation}</p>
              <button
                onClick={handleNext}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Module'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 space-y-4">
          <div className="text-6xl mb-4">🏁</div>
          <h3 className="text-3xl font-bold">Module Complete!</h3>
          <p className="text-xl text-gray-300">You scored {quizScore} out of {questions.length}</p>
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={handleReset}
              className="bg-black/60 hover:bg-black/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}