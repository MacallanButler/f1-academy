import React, { useState } from 'react';
import { ChevronRight, BookOpen, Eye, Trophy, Award } from 'lucide-react';

// Main App Component
export default function F1LearningApp() {
  const [currentModule, setCurrentModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const modules = [
    { id: 1, title: 'F1 Basics', icon: BookOpen, description: 'Learn what F1 is all about' },
    { id: 2, title: 'The Race', icon: Trophy, description: 'Understand race day format' },
    { id: 3, title: 'Race Strategy', icon: Award, description: 'Master tire strategy and pit stops' },
  ];

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white">
      {/* Header */}
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
          // Module Selection Screen
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
          // Module Content
          <div>
            <button
              onClick={() => setCurrentModule(null)}
              className="text-gray-400 hover:text-white mb-6 flex items-center"
            >
              <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
              Back to Modules
            </button>

            {currentModule === 1 && (
              <Module1 onComplete={() => handleModuleComplete(1)} />
            )}
            {currentModule === 2 && (
              <ComingSoon moduleName="The Race" />
            )}
            {currentModule === 3 && (
              <ComingSoon moduleName="Race Strategy" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Module 1: F1 Basics Component
function Module1({ onComplete }) {
  const [currentSection, setCurrentSection] = useState('learn');
  const [quizScore, setQuizScore] = useState(null);

  const sections = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'seeIt', label: 'See It', icon: Eye },
    { id: 'tryIt', label: 'Try It', icon: Trophy },
  ];

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Module 1: F1 Basics</h2>

      {/* Section Navigation */}
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

      {/* Section Content */}
      <div className="bg-black/40 backdrop-blur border border-red-600/30 rounded-lg p-8">
        {currentSection === 'learn' && <LearnSection />}
        {currentSection === 'seeIt' && <SeeItSection />}
        {currentSection === 'tryIt' && <TryItSection quizScore={quizScore} setQuizScore={setQuizScore} onComplete={onComplete} />}
      </div>
    </div>
  );
}

// Learn Section Content
function LearnSection() {
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
            <h4 className="font-bold text-lg mb-2">🏆 Driver's Championship</h4>
            <p className="text-gray-300">
              The individual driver with the most points wins. This is what fans typically focus on - 
              the battle between legendary drivers like Verstappen, Hamilton, and Leclerc.
            </p>
          </div>
          
          <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">🏁 Constructor's Championship</h4>
            <p className="text-gray-300">
              The team with the most combined points from both their drivers wins. This is what teams 
              actually care most about because it determines prize money distribution. A team could have 
              the Driver's Champion but lose the Constructor's Championship if their second driver underperforms.
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
              <p className="font-semibold">Free Practice 1 & 2</p>
              <p className="text-gray-400 text-sm">Teams test setups and drivers learn the track</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">SAT</span>
            <div>
              <p className="font-semibold">Free Practice 3 + Qualifying</p>
              <p className="text-gray-400 text-sm">Final practice, then qualifying determines Sunday's starting grid</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">SUN</span>
            <div>
              <p className="font-semibold">The Race</p>
              <p className="text-gray-400 text-sm">Points awarded to top 10 finishers: 25-18-15-12-10-8-6-4-2-1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// See It Section with Data Visualization
function SeeItSection() {
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
          Only the top 10 finishers score points. Notice the huge gap between 1st and 2nd place - 
          winning matters significantly more than coming second.
        </p>
        
        <div className="space-y-3">
          {pointsSystem.map((item) => (
            <div key={item.position} className="flex items-center gap-4">
              <span className="w-12 text-right font-semibold">{item.position}</span>
              <div className="flex-1 bg-gray-800 rounded-full h-8 overflow-hidden">
                <div
                  className={`${item.color} h-full flex items-center justify-end pr-4 font-bold text-sm transition-all duration-1000`}
                  style={{ width: `${(item.points / 25) * 100}%` }}
                >
                  {item.points} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-6">
        <h4 className="text-xl font-bold mb-3">Why This Matters</h4>
        <p className="text-gray-300">
          The 7-point gap between 1st (25) and 2nd (18) is massive. A driver who consistently finishes 
          2nd will struggle to beat someone who wins races even if they DNF occasionally. This points 
          structure rewards aggressive racing and going for wins.
        </p>
      </div>
    </div>
  );
}

// Try It Section with Interactive Quiz
function TryItSection({ quizScore, setQuizScore, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question: "Driver A is leading the championship by 15 points. There are 2 races left. Driver B wins both races (50 points). Driver A finishes 2nd both times (36 points). Who wins?",
      options: [
        { text: "Driver A", correct: false },
        { text: "Driver B", correct: true },
        { text: "They tie", correct: false },
      ],
      explanation: "Driver B gains 50 points while Driver A gains 36. Driver B closes the 15-point gap and wins by 1 point!"
    },
    {
      question: "Your team has drivers in P2 and P3. The P3 driver is leading the Driver's Championship. The P2 driver is out of contention. What should you do?",
      options: [
        { text: "Keep positions - racing is racing", correct: false },
        { text: "Swap them via team orders", correct: true },
        { text: "Let them race it out", correct: false },
      ],
      explanation: "Most teams would issue team orders to swap positions. The Constructor's Championship matters, but helping your championship contender is crucial. This happened famously with Ferrari's 'Fernando is faster than you' in 2010."
    },
    {
      question: "What does the Constructor's Championship determine?",
      options: [
        { text: "Which driver gets bragging rights", correct: false },
        { text: "Prize money distribution to teams", correct: true },
        { text: "Who picks their garage location", correct: false },
      ],
      explanation: "The Constructor's Championship determines how prize money is distributed among teams. This is why teams sometimes prioritize it over the Driver's Championship."
    },
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (questions[currentQuestion].options[index].correct) {
      if (!quizScore) setQuizScore(0);
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
                  <span className={showResult && isCorrect ? 'font-bold' : ''}>
                    {option.text}
                  </span>
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

// Coming Soon Placeholder
function ComingSoon({ moduleName }) {
  return (
    <div className="text-center py-16 bg-black/40 backdrop-blur border border-red-600/30 rounded-lg">
      <h3 className="text-3xl font-bold mb-4">{moduleName}</h3>
      <p className="text-gray-400 text-lg">This module is under development. Check back soon!</p>
    </div>
  );
}