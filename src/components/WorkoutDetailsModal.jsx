import { X, Clock, Flame, Dumbbell, Play, CheckCircle } from 'lucide-react';

export default function WorkoutDetailsModal({ workout, isOpen, onClose, onStartWorkout, t, lang }) {
  if (!isOpen || !workout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
              {workout.category.toUpperCase()} • {workout.level.toUpperCase()}
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {workout.title[lang] || workout.title.uz}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {workout.description[lang] || workout.description.uz}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">{t.duration}</p>
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {workout.duration} {t.minutes}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">{t.calories}</p>
                <p className="text-base font-bold text-amber-600 dark:text-amber-400">
                  {workout.calories} {t.calories}
                </p>
              </div>
            </div>
          </div>

          {/* Exercises list */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-emerald-500" />
              <span>{t.workoutDetails} ({workout.exercises?.length || 0})</span>
            </h4>

            <div className="space-y-2.5">
              {workout.exercises?.map((ex, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/70 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {ex.name[lang] || ex.name.uz}
                      </h5>
                      <p className="text-xs text-slate-400 font-medium">
                        {t.reps}: {ex.reps}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                      {ex.duration}s mashq • {ex.rest}s dam
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              onClose();
              onStartWorkout(workout);
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{t.startWorkout}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
