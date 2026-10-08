import { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Activity,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function WorkoutTimerModal({ workout, isOpen, onClose, t, lang }) {
  if (!isOpen || !workout) return null;

  const exercises = workout.exercises || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  // phases: 'prep' | 'work' | 'rest' | 'complete'
  const [phase, setPhase] = useState('prep');
  const [timeLeft, setTimeLeft] = useState(5); // 5 sec prep
  const [isRunning, setIsRunning] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalSecondsSpent, setTotalSecondsSpent] = useState(0);

  const currentExercise = exercises[currentIdx];
  const nextExercise = exercises[currentIdx + 1];

  const totalPhaseTime = 
    phase === 'prep' ? 5 :
    phase === 'work' ? (currentExercise?.duration || 30) :
    phase === 'rest' ? (currentExercise?.rest || 15) : 1;

  const timerRef = useRef(null);

  // Sound trigger helper
  const triggerBeep = (type) => {
    if (!soundEnabled) return;
    if (type === 'countdown') sounds.playCountdown();
    else if (type === 'go') sounds.playGo();
    else if (type === 'complete') sounds.playSuccess();
  };

  useEffect(() => {
    // Reset state when modal opens with a new workout
    setCurrentIdx(0);
    setPhase('prep');
    setTimeLeft(5);
    setIsRunning(true);
    setTotalSecondsSpent(0);
  }, [workout]);

  useEffect(() => {
    if (!isRunning || phase === 'complete') {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // Audio sound cues at 3, 2, 1
        if (prev <= 4 && prev > 1) {
          triggerBeep('countdown');
        }

        if (prev <= 1) {
          // Switch phase
          if (phase === 'prep') {
            triggerBeep('go');
            setPhase('work');
            return currentExercise?.duration || 30;
          } else if (phase === 'work') {
            if (currentIdx < exercises.length - 1) {
              triggerBeep('go');
              setPhase('rest');
              return currentExercise?.rest || 15;
            } else {
              triggerBeep('complete');
              setPhase('complete');
              return 0;
            }
          } else if (phase === 'rest') {
            triggerBeep('go');
            setCurrentIdx((idx) => idx + 1);
            setPhase('work');
            const nextEx = exercises[currentIdx + 1];
            return nextEx?.duration || 30;
          }
          return 0;
        }

        setTotalSecondsSpent((tot) => tot + 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, phase, currentIdx, exercises, currentExercise, soundEnabled]);

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleSkip = () => {
    if (phase === 'prep') {
      setPhase('work');
      setTimeLeft(currentExercise?.duration || 30);
    } else if (phase === 'work') {
      if (currentIdx < exercises.length - 1) {
        setPhase('rest');
        setTimeLeft(currentExercise?.rest || 15);
      } else {
        triggerBeep('complete');
        setPhase('complete');
      }
    } else if (phase === 'rest') {
      setCurrentIdx((idx) => idx + 1);
      setPhase('work');
      const nextEx = exercises[currentIdx + 1];
      setTimeLeft(nextEx?.duration || 30);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setPhase('prep');
    setTimeLeft(5);
    setIsRunning(true);
    setTotalSecondsSpent(0);
  };

  // Progress circle calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalPhaseTime > 0 ? timeLeft / totalPhaseTime : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const getPhaseColor = () => {
    if (phase === 'prep') return 'text-amber-500 stroke-amber-500';
    if (phase === 'work') return 'text-emerald-500 stroke-emerald-500';
    if (phase === 'rest') return 'text-sky-500 stroke-sky-500';
    return 'text-teal-500 stroke-teal-500';
  };

  const caloriesBurnedEstimated = Math.round(
    (totalSecondsSpent / 60) * ((workout.calories || 250) / (workout.duration || 25))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                {workout.title[lang] || workout.title.uz}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.timerTitle} • {currentIdx + 1}/{exercises.length} {t.exercisesCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center text-center">
          
          {phase !== 'complete' ? (
            <>
              {/* Phase Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  phase === 'prep' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700' :
                  phase === 'work' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700' :
                  'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-700'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  {phase === 'prep' ? t.timerPrep : phase === 'work' ? t.timerWork : t.timerRest}
                </span>
              </div>

              {/* Current Exercise Title */}
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                {phase === 'rest' 
                  ? t.timerRest 
                  : (currentExercise?.name[lang] || currentExercise?.name.uz)}
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                {phase === 'work' ? `${t.reps}: ${currentExercise?.reps}` : `${t.nextExercise}: ${nextExercise ? (nextExercise.name[lang] || nextExercise.name.uz) : '-'}`}
              </p>

              {/* Big Circular Progress Timer */}
              <div className="relative flex items-center justify-center my-2">
                <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
                  {/* Track Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    className="stroke-slate-100 dark:stroke-slate-800"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {/* Animated Progress Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    className={`${getPhaseColor()} transition-all duration-300`}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Inner Content */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white tabular-nums">
                    {timeLeft}s
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 mt-1">
                    {phase === 'work' ? 'GO!' : phase === 'prep' ? 'READY' : 'REST'}
                  </span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-6 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mb-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.duration}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {Math.floor(totalSecondsSpent / 60)}m {totalSecondsSpent % 60}s
                  </span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mb-0.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.calories}</span>
                  </div>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    ~{caloriesBurnedEstimated} kkal
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t.exercisesCount}</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {currentIdx + 1} / {exercises.length}
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* Celebration Screen when Workout Finished */
            <div className="py-6 flex flex-col items-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 mb-5 animate-bounce">
                <Award className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {t.timerComplete}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-6">
                Siz butun mashg'ulot dasturini to'liq bajardingiz. Tanangiz va sog'lig'ingiz sizga rahmat aytadi!
              </p>

              <div className="w-full max-w-sm p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 mb-6 space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-500 dark:text-slate-400">Sarflangan vaqt:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {Math.floor(totalSecondsSpent / 60)} daqiqa {totalSecondsSpent % 60} soniya
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-500 dark:text-slate-400">Yoqilgan kaloriya:</span>
                  <span className="font-bold text-amber-500">
                    ~{Math.max(caloriesBurnedEstimated, workout.calories || 200)} kkal
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-500 dark:text-slate-400">Bajarilgan mashqlar:</span>
                  <span className="font-bold text-emerald-500">
                    {exercises.length} / {exercises.length} (100%)
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full max-w-sm py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
              >
                {t.btnClose}
              </button>
            </div>
          )}

        </div>

        {/* Footer Action Buttons */}
        {phase !== 'complete' && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.btnReset}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePauseResume}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all active:scale-95 ${
                  isRunning 
                    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' 
                    : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>{t.btnPause}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>{t.btnStart}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSkip}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                title="Skip to next step"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
