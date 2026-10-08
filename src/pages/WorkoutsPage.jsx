import React, { useState } from 'react';
import { 
  Flame, Clock, Dumbbell, Filter, Search, Play, 
  ChevronDown, ChevronUp, CheckCircle, Sparkles, Layers
} from 'lucide-react';

export default function WorkoutsPage({ workouts, lang, t, onStartWorkout }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);

  const categories = [
    { id: 'All', label: t.filterAll },
    { id: 'Cardio', label: t.filterCardio },
    { id: 'Strength', label: t.filterStrength },
    { id: 'Abs', label: t.filterAbs },
    { id: 'Yoga', label: t.filterYoga },
    { id: 'HIIT', label: t.filterHiit },
  ];

  const levels = [
    { id: 'All', label: t.levelAll },
    { id: 'Beginner', label: t.levelBeginner },
    { id: 'Intermediate', label: t.levelIntermediate },
    { id: 'Advanced', label: t.levelAdvanced },
  ];

  const filteredWorkouts = workouts.filter((w) => {
    const matchCategory = selectedCategory === 'All' || w.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchLevel = selectedLevel === 'All' || w.level.toLowerCase() === selectedLevel.toLowerCase();
    const titleText = (w.title[lang] || w.title.uz).toLowerCase();
    const descText = (w.description[lang] || w.description.uz).toLowerCase();
    const matchSearch = titleText.includes(searchQuery.toLowerCase()) || descText.includes(searchQuery.toLowerCase());
    return matchCategory && matchLevel && matchSearch;
  });

  const toggleExpand = (id) => {
    setExpandedWorkoutId(expandedWorkoutId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Dumbbell className="w-3.5 h-3.5" />
          <span>FitLife Programs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {t.workoutsTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t.workoutsSubtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-gray-800/90 rounded-3xl p-5 border border-gray-100 dark:border-gray-700/80 shadow-sm space-y-4">
        
        {/* Top: Search and Level select */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mashg'ulotlarni qidirish..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full sm:w-44 px-3.5 py-2.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {levels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>{lvl.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Workouts Grid */}
      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800">
          <p className="text-base text-gray-500">Hech qanday mashg'ulot topilmadi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkouts.map((w) => {
            const isExpanded = expandedWorkoutId === w.id;
            const exCount = (w.exercises || []).length;

            return (
              <div
                key={w.id}
                className="group bg-white dark:bg-gray-800/90 rounded-3xl border border-gray-100 dark:border-gray-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image cover */}
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img
                      src={w.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"}
                      alt={w.title[lang] || w.title.uz}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {w.category}
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      <span>{w.calories} {t.calories}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          {w.level}
                        </span>
                        <span>•</span>
                        <span>{exCount} {t.exercisesCount}</span>
                      </div>

                      <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                        {w.title[lang] || w.title.uz}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {w.description[lang] || w.description.uz}
                    </p>

                    {/* Stats pills */}
                    <div className="flex items-center gap-4 py-2 border-y border-gray-100 dark:border-gray-700/80 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        {w.duration} {t.minutes}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-500" />
                        ~{Math.round(w.calories / w.duration)} kkal/daq
                      </span>
                    </div>

                    {/* Expandable Exercise breakdown */}
                    <div>
                      <button
                        onClick={() => toggleExpand(w.id)}
                        className="w-full flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-500 transition-colors py-1"
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-emerald-500" />
                          {t.workoutDetails}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700 animate-in fade-in duration-200">
                          {(w.exercises || []).map((ex, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-[10px]">
                                  {idx + 1}
                                </span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                  {ex.name[lang] || ex.name.uz}
                                </span>
                              </div>
                              <span className="text-gray-500 dark:text-gray-400 font-mono text-[11px]">
                                {ex.reps || `${ex.duration}s`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onStartWorkout(w)}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-98"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{t.startWorkout}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
