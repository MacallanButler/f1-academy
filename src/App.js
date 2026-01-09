import React, { useState } from 'react';
import { ChevronRight, BookOpen, Eye, Trophy, Flag, Zap, CheckCircle, XCircle } from 'lucide-react';

export default function F1LearningApp() {
  const [currentModule, setCurrentModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const modules = [
    { id: 1, title: 'F1 Basics', icon: BookOpen, description: 'Learn what F1 is all about' },
    { id: 2, title: 'F1 Race Day', icon: Flag, description: 'Understand F1 race format' },
    { id: 3, title: 'F1 Strategy', icon: Zap, description: 'Master F1 tire strategy' },
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
            <button onClick={() => setCurrentModule(null)} className="hover:opacity-80 transition-opacity">
              <h1 className="text-3xl font-bold tracking-tight">F1 <span className="text-red-500">ACADEMY</span></h1>
              <p className="text-gray-400 text-sm mt-1">Your gateway to Formula 1</p>
            </button>
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
  const [quizScore, setQuizScore] = useState(0);

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
    { id: 'seeIt', label: 'Visualize', icon: Eye },
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
    { position: '2nd', points: 18, color: 'bg-gray-400' },
    { position: '3rd', points: 15, color: 'bg-orange-600' },
    { position: '4th', points: 12, color: 'bg-blue-600' },
    { position: '5th', points: 10, color: 'bg-blue-400' },
    { position: '6th', points: 8, color: 'bg-green-600' },
    { position: '7th', points: 6, color: 'bg-green-400' },
    { position: '8th', points: 4, color: 'bg-purple-600' },
    { position: '9th', points: 2, color: 'bg-purple-400' },
    { position: '10th', points: 1, color: 'bg-pink-600' },
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
                  className={`${item.color} h-full flex items-center justify-end pr-4 font-bold text-sm text-white`}
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
      question: "Driver A leads the championship by 15 points. There are 2 races left. Driver B wins both races (25 points each = 50 total). Driver A finishes 2nd both times (18 points each = 36 total). Who wins the championship?",
      options: [
        { text: "Driver A", correct: true },
        { text: "Driver B", correct: false },
        { text: "They tie", correct: false },
      ],
      explanation: "Driver A started with a 15-point lead. Driver A gains 36 points (18+18), so their new lead is 15+36 = 51 points total. Driver B gains 50 points (25+25). Driver A wins by 1 point (51 vs 50)!"
    },
    {
      question: "Your team has drivers in Position 2 (P2) and Position 3 (P3). The P3 driver is leading the Driver's Championship. The P2 driver is out of championship contention. What should the team do?",
      options: [
        { text: "Keep positions - racing is racing", correct: false },
        { text: "Swap them via team orders", correct: true },
        { text: "Let them race", correct: false },
      ],
      explanation: "Most teams would issue team orders to help their championship contender. The extra points could decide the championship. Note: P2 means Position 2 (second place), P3 means Position 3 (third place)."
    },
    {
      question: "What does the Constructor's Championship determine?",
      options: [
        { text: "Driver bragging rights", correct: false },
        { text: "Prize money distribution to teams", correct: true },
        { text: "Garage location", correct: false },
      ],
      explanation: "The Constructor's Championship determines how prize money is distributed among teams. This is why teams prioritize it heavily - it directly impacts their budget for next season."
    },
  ];

  return <QuizComponent questions={questions} quizScore={quizScore} setQuizScore={setQuizScore} onComplete={onComplete} />;
}



function Module2({ onComplete }) {
  const sections = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'seeIt', label: 'Visualize', icon: Eye },
    { id: 'tryIt', label: 'Try It', icon: Trophy },
  ];

  return <ModuleTemplate moduleNumber={2} title="F1 Race Day" sections={sections} LearnComponent={Module2Learn} SeeItComponent={Module2SeeIt} TryItComponent={Module2TryIt} onComplete={onComplete} />;
}

function Module2Learn() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Race Start</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          Drivers complete a formation lap, then line up on the grid. Five red lights illuminate one by one, then all go out simultaneously (they don't turn green) - that's the start signal!
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
              <p className="text-gray-400 text-sm">Danger ahead, no overtaking in that sector</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-12 bg-red-600 rounded"></div>
            <div>
              <p className="font-semibold">Red Flag</p>
              <p className="text-gray-400 text-sm">Session stopped - all cars must return to pit lane immediately. Race is paused due to serious incident or unsafe conditions.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-12 bg-blue-600 rounded"></div>
            <div>
              <p className="font-semibold">Blue Flag</p>
              <p className="text-gray-400 text-sm">Faster car behind, you must let them pass within 3 blue flags</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Safety Car and Virtual Safety Car</h3>
        <div className="space-y-4">
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Safety Car (SC)</h4>
            <p className="text-gray-300">
              Deployed for serious incidents. All cars must slow down and line up behind the safety car. No overtaking allowed. Perfect time to pit since the pack bunches up!
            </p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Virtual Safety Car (VSC)</h4>
            <p className="text-gray-300">
              Deployed for minor incidents. Drivers must slow to a target delta time (a specific lap time that's about 30% slower than normal). Gaps between cars are maintained. Teams can still pit but the advantage is smaller than under a full Safety Car.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Red Flag Procedures</h3>
        <p className="text-gray-300 leading-relaxed">
          When a red flag is shown, the race is immediately stopped. All cars must slow down and return to the pit lane. During a red flag period, teams can work on the cars, change tires, and repair damage. The race will restart once the track is safe, usually with a standing start from the grid positions they were in when the red flag was shown.
        </p>
      </div>
    </div>
  );
}

function Module2SeeIt() {
  const [selected, setSelected] = useState('crash');

  const incidents = {
    crash: { title: "Major Crash", flag: "Red Flag", color: "bg-red-600", description: "Race stopped immediately. All cars return to pit lane where teams can work on cars. Race will restart once track is safe." },
    debris: { title: "Debris on Track", flag: "Safety Car", color: "bg-yellow-400", description: "Pack bunches up behind safety car. Perfect time to pit! Gap to cars behind is minimized." },
    minor: { title: "Car Stopped Safely", flag: "Virtual Safety Car", color: "bg-yellow-600", description: "Cars slow to delta time (target lap time). Gaps maintained. Some teams pit but advantage is smaller." }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-4">Race Incidents and Flags</h3>
        
        <div className="flex gap-4 mb-6 flex-wrap">
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
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-20 h-14 ${incidents[selected].color} rounded`}></div>
            <h4 className="text-xl font-bold">{incidents[selected].flag}</h4>
          </div>
          <p className="text-gray-300">{incidents[selected].description}</p>
        </div>
      </div>
    </div>
  );
}

function Module2TryIt({ quizScore, setQuizScore, onComplete }) {
  const questions = [
    {
      question: "There's debris on track at Turn 5. What flag will be shown and what should drivers do?",
      options: [
        { text: "Red flag - stop the race", correct: false },
        { text: "Yellow flag - slow down, no overtaking in that sector", correct: true },
        { text: "Blue flag - let faster cars pass", correct: false },
      ],
      explanation: "Yellow flags indicate local danger in a specific sector. Drivers must slow down and cannot overtake in that flag zone. If debris is serious and can't be cleared quickly, it might escalate to a Safety Car or red flag."
    },
    {
      question: "You're in Position 5 (P5) on old tires. A Safety Car is deployed. Your pit crew can service you in 2.5 seconds. What do you do?",
      options: [
        { text: "Stay out - track position is everything", correct: false },
        { text: "Pit immediately - minimal time loss under Safety Car", correct: true },
        { text: "Wait to see what leaders do", correct: false },
      ],
      explanation: "Safety Cars bunch up the field, so pitting costs you much less time than under green flag conditions. Fresh tires after the restart will be a huge advantage. This is why you often see most of the field pit during a Safety Car."
    },
    {
      question: "The race is red flagged after 40 of 50 laps due to heavy rain. What happens next?",
      options: [
        { text: "Race is over, points awarded based on current positions", correct: false },
        { text: "Cars return to pits, teams can work on cars, race will restart when conditions improve", correct: true },
        { text: "Virtual Safety Car is deployed instead", correct: false },
      ],
      explanation: "Red flags pause the race. All cars return to pit lane where teams can work on them - change tires, fix damage, adjust setup. The race will restart once conditions are safe, usually with a standing start. If enough laps are completed, full points are awarded."
    },
  ];

  return <QuizComponent questions={questions} quizScore={quizScore} setQuizScore={setQuizScore} onComplete={onComplete} />;
}

function Module3({ onComplete }) {
  const sections = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'seeIt', label: 'Visualize', icon: Eye },
    { id: 'tryIt', label: 'Try It', icon: Trophy },
  ];

  return <ModuleTemplate moduleNumber={3} title="F1 Strategy" sections={sections} LearnComponent={Module3Learn} SeeItComponent={Module3SeeIt} TryItComponent={Module3TryIt} onComplete={onComplete} />;
}

function Module3Learn() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Tire Compounds</h3>
        <p className="text-gray-300 mb-4">
          Pirelli provides three dry-weather tire compounds for each race, marked with colored sidewalls. Teams must use at least two different compounds during the race (unless it rains).
        </p>
        <div className="space-y-3">
          <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              <h4 className="font-bold">Soft (Red)</h4>
            </div>
            <p className="text-gray-300 text-sm">Fastest lap times but degrades (wears out) quickly. Typically lasts 10-20 laps.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              <h4 className="font-bold">Medium (Yellow)</h4>
            </div>
            <p className="text-gray-300 text-sm">Balanced performance and durability. The middle ground. Typically lasts 20-30 laps.</p>
          </div>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <h4 className="font-bold">Hard (White)</h4>
            </div>
            <p className="text-gray-300 text-sm">Slowest lap times but lasts longest. Can go 30-40+ laps. Sometimes drivers run the entire race on one set.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Undercut vs Overcut</h3>
        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Undercut</h4>
            <p className="text-gray-300">
              Pit BEFORE your rival. Fresh tires let you set faster lap times. When your rival pits later, you may have gained enough time to come out ahead of them on track.
            </p>
          </div>
          <div className="bg-purple-900/30 border border-purple-600/50 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">Overcut</h4>
            <p className="text-gray-300">
              Stay out LONGER than your rival. Push hard on your old tires while they're stuck in traffic on their new tires. Less common but can work if track position is crucial.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-3">Pit Stop Strategy</h3>
        <p className="text-gray-300">
          A pit stop takes 2-3 seconds for the tire change itself, but you lose 20-25 seconds total (including pit entry speed limit and exit). Strategic timing is everything - teams constantly calculate whether to pit now or stay out longer.
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
        <h3 className="text-2xl font-bold text-red-500 mb-4">Strategy Comparison: One-Stop vs Two-Stop</h3>
        
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
              <p className="text-gray-300 mb-4">Start on mediums, switch to hards around lap 25-30. Conservative approach.</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span>Laps 1-28: Medium tires</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span>Laps 29-55: Hard tires</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Lower risk, less time lost in pits, but slower overall pace as tires degrade.</p>
            </div>
          ) : (
            <div>
              <h4 className="text-xl font-bold mb-3">Two-Stop Strategy</h4>
              <p className="text-gray-300 mb-4">Aggressive strategy with fresher tires throughout the race.</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Laps 1-18: Soft tires (fast start)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span>Laps 19-38: Medium tires</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Laps 39-55: Soft tires (fast finish)</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Higher risk, more pit time lost (40-50 seconds total), but faster overall pace with fresher tires.</p>
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
      question: "You're racing your rival. They just pitted for fresh tires. What is the 'undercut' strategy?",
      options: [
        { text: "Pit immediately after them", correct: false },
        { text: "Stay out longer on old tires", correct: false },
        { text: "You already did it - undercut means pitting BEFORE them", correct: true },
      ],
      explanation: "Undercut means pitting BEFORE your rival to gain advantage with fresh tires. You set faster lap times while they're still on old tires. When they finally pit, you may have gained enough time to stay ahead."
    },
    {
      question: "In a 50-lap race, which strategy is typically faster but riskier?",
      options: [
        { text: "One stop (less pit time)", correct: false },
        { text: "Two stop (fresher tires)", correct: true },
        { text: "Zero stop (ultimate track position)", correct: false },
      ],
      explanation: "Two stops give you fresher tires throughout the race, leading to faster lap times. But it's riskier because you lose 40-50 seconds total in the pits, and more things can go wrong (slow stops, safety cars at wrong time)."
    },
    {
      question: "It's lap 20 of 50. Your soft tires are completely worn out. The leader is 15 seconds ahead on medium tires. What should you do?",
      options: [
        { text: "Stay out and hope for a safety car", correct: false },
        { text: "Pit for fresh medium tires now", correct: true },
        { text: "Pit for another set of soft tires", correct: false },
      ],
      explanation: "Dead tires lose multiple seconds per lap. You need to pit for mediums to stay competitive. Staying out will cost you way more than the 20-25 seconds a pit stop takes. More softs would degrade too quickly again."
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
function QuizComponent({ questions, quizScore, setQuizScore, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (questions[currentQuestion].options[index].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleComplete = () => {
    onComplete();
    setTimeout(() => {
      setCurrentQuestion(questions.length - 1);
      setShowFeedback(true);
    }, 100);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizScore(0);
  };

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isComplete = isLastQuestion && showFeedback && selectedAnswer !== null;

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
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {showResult && (
                      isCorrect ? 
                        <CheckCircle className="w-6 h-6 text-green-500" /> : 
                        <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="bg-blue-950/30 border border-blue-600/50 rounded-lg p-6">
              <h4 className="font-bold mb-2 text-blue-400">Explanation:</h4>
              <p className="text-gray-300 mb-4">{currentQ.explanation}</p>
              {!isLastQuestion ? (
                <button
                  onClick={handleNext}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Complete Module
                </button>
              )}
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