import { useState, useMemo } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Clock, 
  Search, 
  Play, 
  Filter, 
  Activity, 
  Sparkles,
  ChevronRight,
  ListOrdered
} from 'lucide-react';

export default function WorkoutsSection({ 
  t, 
  lang, 
  workouts, 
  onStartWorkout, 
  onViewWorkoutDetails 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'cardio', label: t.filterCardio },
    { id: 'strength', label: t.filterStrength },
    { id: 'abs', label: t.filterAbs },
    { id: 'yoga', label: t.filterYoga },
    { id: 'hiit', label: t.filterHiit }
  ];

  const levels = [
    { id: 'all', label: t.levelAll },
    { id: 'beginner', label: t.levelBeginner },
    { id: 'intermediate', label: t.levelIntermediate },
    { id: 'advanced', label: t.levelAdvanced }
  ];

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      const matchCat = selectedCategory === 'all' || w.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || w.level === selectedLevel;
      const title = (w.title[lang] || w.title.uz || '').toLowerCase();
      const desc = (w.description[lang] || w.description.uz || '').toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || title.includes(q) || desc.includes(q);
      return matchCat && matchLevel && matchSearch;
    });
  }, [workouts, selectedCategory, selectedLevel, searchQuery, lang]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Activity className="w-3.5 h-3.5" />
          <span>FitLife Programs 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
          {t.workoutsTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          {t.workoutsSubtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Search input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mashg'ulot nomi yoki tavsifini qidiring..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Tozalash
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-102'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Level Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Daraja:</span>
          </span>
          {levels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedLevel === lvl.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

      </div>

      {/* Workouts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((w) => (
              <div
                key={w.id}
                className="group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${w.color || 'from-emerald-500 to-teal-500'} text-white shadow-xs`}>
                      {w.category}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 uppercase">
                      {w.level}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                    {w.title[lang] || w.title.uz}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {w.description[lang] || w.description.uz}
                  </p>

                  {/* Stats Meta */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 text-center mb-6">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.duration}</span>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {w.duration} {t.minutes}
                      </span>
                    </div>
                    <div className="border-x border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.calories}</span>
                      <span className="text-xs font-black text-amber-500">
                        {w.calories} kkal
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.exercisesCount}</span>
                      <span className="text-xs font-black text-emerald-500">
                        {w.exercises?.length || 0} ta
                      </span>
                    </div>
                  </div>

                  {/* Exercise list snapshot */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Mashqlar ketma-ketligi:
                    </span>
                    {w.exercises?.slice(0, 3).map((ex, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="truncate">{ex.name[lang] || ex.name.uz}</span>
                      </div>
                    ))}
                    {(w.exercises?.length || 0) > 3 && (
                      <p className="text-[11px] text-emerald-500 font-semibold pl-6">
                        + yana {(w.exercises?.length || 0) - 3} ta mashq
                      </p>
                    )}
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <button
                    onClick={() => onStartWorkout(w)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{t.startWorkout}</span>
                  </button>

                  <button
                    onClick={() => onViewWorkoutDetails(w)}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title={t.workoutDetails}
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
              Mashg'ulotlar topilmadi
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Tanlangan filtrlar bo'yicha hech qanday mashq topilmadi. Filtrlarni tozalab ko'ring.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
