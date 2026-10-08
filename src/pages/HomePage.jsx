import React, { useState } from 'react';
import { 
  Dumbbell, Flame, Sparkles, HeartPulse, ShieldCheck, 
  ArrowRight, Play, CheckCircle2, Award, Zap, Apple, 
  TrendingUp, Compass, Clock
} from 'lucide-react';

export default function HomePage({ 
  t, 
  lang, 
  workouts, 
  foods, 
  articles, 
  setCurrentTab, 
  onStartWorkout, 
  onOpenArticle 
}) {
  // Interactive Daily Health Check Widget state
  const [sleepHours, setSleepHours] = useState(7);
  const [waterCups, setWaterCups] = useState(6);
  const [didExercise, setDidExercise] = useState(true);

  // Compute simple wellness score
  const sleepScore = Math.min(35, (sleepHours / 8) * 35);
  const waterScore = Math.min(35, (waterCups / 8) * 35);
  const exerciseScore = didExercise ? 30 : 10;
  const healthScore = Math.round(sleepScore + waterScore + exerciseScore);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                {t.heroTitle1} <br />
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  {t.heroTitle2}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.heroDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentTab('workouts')}
                  className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.startNow}</span>
                </button>

                <button
                  onClick={() => setCurrentTab('nutrition')}
                  className="px-8 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-bold text-sm sm:text-base flex items-center gap-2 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Apple className="w-4 h-4 text-emerald-500" />
                  <span>{t.exploreDiet}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 dark:text-gray-400 font-medium border-t border-gray-100 dark:border-gray-800/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Bepul Dasturlar
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Ilmiy Tasdiqlangan Retseptlar
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Interaktiv Kalkulyatorlar
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-200/80 dark:border-gray-700/80">
                
                {/* Floating Activity Badge */}
                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
                  <Flame className="w-4 h-4 fill-white" />
                  <span>2,400+ kkal / kun</span>
                </div>

                <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                  <img 
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" 
                    alt="Workout"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Kunlik Tavsiya</span>
                      <h4 className="text-base font-bold">Yuqori Intensiv Kardio</h4>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Health Check */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Bugungi Salomatlik Indeksi
                    </span>
                    <span className="text-sm font-black text-emerald-500">
                      {healthScore} / 100
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${healthScore}%` }}
                    />
                  </div>

                  {/* Micro sliders */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block">Uyqu (soat)</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{sleepHours}s</span>
                      <div className="flex justify-center gap-1 mt-1">
                        <button onClick={() => setSleepHours(Math.max(4, sleepHours - 1))} className="px-1.5 py-0.5 text-[10px] bg-gray-200 dark:bg-gray-600 rounded">-</button>
                        <button onClick={() => setSleepHours(Math.min(12, sleepHours + 1))} className="px-1.5 py-0.5 text-[10px] bg-gray-200 dark:bg-gray-600 rounded">+</button>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block">Suv (stakan)</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{waterCups} ta</span>
                      <div className="flex justify-center gap-1 mt-1">
                        <button onClick={() => setWaterCups(Math.max(0, waterCups - 1))} className="px-1.5 py-0.5 text-[10px] bg-gray-200 dark:bg-gray-600 rounded">-</button>
                        <button onClick={() => setWaterCups(Math.min(12, waterCups + 1))} className="px-1.5 py-0.5 text-[10px] bg-gray-200 dark:bg-gray-600 rounded">+</button>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block">Sport</span>
                      <button 
                        onClick={() => setDidExercise(!didExercise)}
                        className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded-lg transition-colors ${
                          didExercise ? 'bg-emerald-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-700'
                        }`}
                      >
                        {didExercise ? 'Bajarildi' : 'Yo\'q'}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-emerald-500 tracking-tight">18,500+</span>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1">{t.statActiveUsers}</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-teal-500 tracking-tight">42,000+</span>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1">{t.statWorkoutsDone}</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-amber-500 tracking-tight">9.8M</span>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1">{t.statCaloriesBurned}</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-cyan-500 tracking-tight">99.2%</span>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1">{t.statSatisfaction}</p>
          </div>
        </div>
      </section>

      {/* DAILY MOTIVATION QUOTE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-md">
              {t.todayQuote}
            </span>
            <blockquote className="text-xl sm:text-2xl font-bold italic mt-4 leading-relaxed">
              {t.quoteText}
            </blockquote>
            <p className="text-sm font-semibold text-emerald-100 mt-3">
              — {t.quoteAuthor}
            </p>
          </div>
          <Sparkles className="absolute right-6 -bottom-6 w-44 h-44 text-white/10 pointer-events-none" />
        </div>
      </section>

      {/* 4 PILLARS FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {t.quickFeaturesTitle}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Har bir bo'lim salomatlikni mustahkamlash va sport samaradorligini oshirish uchun mo'ljallangan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => setCurrentTab('workouts')}
            className="group p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 hover:border-emerald-500/50 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.feature1Title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.feature1Desc}</p>
          </div>

          <div 
            onClick={() => setCurrentTab('nutrition')}
            className="group p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 hover:border-teal-500/50 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.feature2Title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.feature2Desc}</p>
          </div>

          <div 
            onClick={() => setCurrentTab('calculators')}
            className="group p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 hover:border-cyan-500/50 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.feature3Title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.feature3Desc}</p>
          </div>

          <div 
            onClick={() => setCurrentTab('articles')}
            className="group p-6 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 hover:border-indigo-500/50 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.feature4Title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.feature4Desc}</p>
          </div>
        </div>
      </section>

      {/* FEATURED WORKOUTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Eng Samarali Dasturlar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              {t.featuredWorkouts}
            </h2>
          </div>
          <button 
            onClick={() => setCurrentTab('workouts')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:gap-2.5 transition-all"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workouts.slice(0, 3).map((w) => (
            <div 
              key={w.id}
              className="group bg-white dark:bg-gray-800/90 rounded-3xl border border-gray-100 dark:border-gray-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img 
                  src={w.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"} 
                  alt={w.title[lang] || w.title.uz}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {w.category}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>{w.calories} kkal</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {w.title[lang] || w.title.uz}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">
                    {w.description[lang] || w.description.uz}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {w.duration} {t.minutes}</span>
                    <span>• {w.level}</span>
                  </div>
                  <button
                    onClick={() => onStartWorkout(w)}
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-transform hover:scale-110 shadow-md shadow-emerald-500/20"
                    title={t.startWorkout}
                  >
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SUPERFOODS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Ozuqaviy Boylik
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              {t.featuredFoods}
            </h2>
          </div>
          <button 
            onClick={() => setCurrentTab('nutrition')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:gap-2.5 transition-all"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.slice(0, 4).map((f) => (
            <div 
              key={f.id}
              className="bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-100 dark:border-gray-700/80 p-5 shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              <div className="h-36 rounded-2xl overflow-hidden relative bg-slate-800">
                <img 
                  src={f.image || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"} 
                  alt={f.name[lang] || f.name.uz}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80";
                  }}
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  {f.calories} kkal / 100g
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  {f.badge}
                </span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  {f.name[lang] || f.name.uz}
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-gray-100 dark:border-gray-700 text-center text-[10px]">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-xl">
                  <span className="text-gray-400 block">Oqsil</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{f.protein}g</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-xl">
                  <span className="text-gray-400 block">Yog'</span>
                  <span className="font-bold text-amber-500">{f.fat}g</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-xl">
                  <span className="text-gray-400 block">Uglevod</span>
                  <span className="font-bold text-cyan-500">{f.carbs}g</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
