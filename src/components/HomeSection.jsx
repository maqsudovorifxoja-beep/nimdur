import { 
  Flame, 
  Dumbbell, 
  Apple, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Award, 
  TrendingUp, 
  Heart, 
  Play,
  Quote
} from 'lucide-react';

export default function HomeSection({ 
  t, 
  lang, 
  workouts, 
  foods, 
  onNavigate, 
  onStartWorkout, 
  onViewWorkoutDetails 
}) {
  const featuredWorkouts = workouts.slice(0, 3);
  const featuredFoods = foods.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center px-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-xs mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            <span>{t.heroTitle1} </span>
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent underline decoration-emerald-500/30 decoration-wavy decoration-from-font">
              {t.heroTitle2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-9">
            {t.heroDesc}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14">
            <button
              onClick={() => onNavigate('workouts')}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/25 active:scale-95 transition-all text-sm sm:text-base cursor-pointer"
            >
              <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>{t.startNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('nutrition')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md transition-all active:scale-95 text-sm sm:text-base cursor-pointer"
            >
              <Apple className="w-5 h-5 text-emerald-500" />
              <span>{t.exploreDiet}</span>
            </button>

            <button
              onClick={() => onNavigate('calculators')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm sm:text-base cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.calculators}</span>
            </button>
          </div>

          {/* Live Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/60 shadow-xl">
            <div className="flex flex-col items-center p-2">
              <div className="flex items-center gap-1.5 text-emerald-500 font-extrabold text-2xl sm:text-3xl">
                <Users className="w-6 h-6 stroke-[2.5]" />
                <span>24.8k+</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {t.statActiveUsers}
              </p>
            </div>

            <div className="flex flex-col items-center p-2 border-l border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center gap-1.5 text-teal-500 font-extrabold text-2xl sm:text-3xl">
                <Dumbbell className="w-6 h-6 stroke-[2.5]" />
                <span>128k+</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {t.statWorkoutsDone}
              </p>
            </div>

            <div className="flex flex-col items-center p-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-2xl sm:text-3xl">
                <Flame className="w-6 h-6 stroke-[2.5]" />
                <span>4.8M</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {t.statCaloriesBurned}
              </p>
            </div>

            <div className="flex flex-col items-center p-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center gap-1.5 text-rose-500 font-extrabold text-2xl sm:text-3xl">
                <Award className="w-6 h-6 stroke-[2.5]" />
                <span>99.4%</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {t.statSatisfaction}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Daily Motivation Quote */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl shadow-teal-500/15">
          <div className="absolute right-4 top-2 text-white/10 pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-2">
                ⚡ {t.todayQuote}
              </span>
              <p className="text-lg sm:text-xl font-bold italic leading-snug">
                {t.quoteText}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 mt-2">
                — {t.quoteAuthor}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            {t.quickFeaturesTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Salomatlik va fitnesdagi barcha zaruriy vositalar yagona innovatsion tizimda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div 
            onClick={() => onNavigate('workouts')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.feature1Title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.feature1Desc}
            </p>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => onNavigate('nutrition')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.feature2Title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.feature2Desc}
            </p>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => onNavigate('calculators')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.feature3Title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.feature3Desc}
            </p>
          </div>

          {/* Feature 4 */}
          <div 
            onClick={() => onNavigate('articles')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.feature4Title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.feature4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Workouts Carousel Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.featuredWorkouts}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Bugunoq bajarishingiz mumkin bo'lgan eng samarali mashqlar
            </p>
          </div>
          <button
            onClick={() => onNavigate('workouts')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-2.5 transition-all"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredWorkouts.map((w) => (
            <div
              key={w.id}
              className="group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-xl hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${w.color} text-white shadow-xs`}>
                    {w.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    {w.level}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                  {w.title[lang] || w.title.uz}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
                  {w.description[lang] || w.description.uz}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{w.duration} {t.minutes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{w.calories} {t.calories}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{w.exercises?.length} {t.exercisesCount}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => onStartWorkout(w)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.startWorkout}</span>
                </button>
                <button
                  onClick={() => onViewWorkoutDetails(w)}
                  className="px-3.5 py-2.5 rounded-xl font-bold text-xs border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {t.workoutDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Superfoods Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.featuredFoods}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Mushaklar o'sishi va quvvat uchun yuqori ozuqaviy qiymatga ega mahsulotlar
            </p>
          </div>
          <button
            onClick={() => onNavigate('nutrition')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-2.5 transition-all"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFoods.map((f) => (
            <div
              key={f.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{f.emoji}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {f.calories} kkal / 100g
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                  {f.name[lang] || f.name.uz}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {f.benefits[lang] || f.benefits.uz}
                </p>
              </div>

              {/* Macro pills */}
              <div className="grid grid-cols-3 gap-1 text-center pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">{t.nutriProtein}</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{f.protein}g</span>
                </div>
                <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">{t.nutriFat}</span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{f.fat}g</span>
                </div>
                <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">{t.nutriCarbs}</span>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{f.carbs}g</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-12 text-white border border-emerald-500/30 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-4">
              🎯 Shaxsiy Rejangizni Bugunoq Tuzing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              O'z tanangiz va salomatligingizni yangi bosqichga olib chiqing
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              BMI hisoblang, kunlik suv balansini to'ldiring va interaktiv taymer bilan sport qilishni odatga aylantiring.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('calculators')}
                className="px-6 py-3 rounded-2xl font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 active:scale-95 text-sm"
              >
                BMI & Kaloriyani Hisoblash
              </button>
              <button
                onClick={() => onNavigate('nutrition')}
                className="px-6 py-3 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors text-sm"
              >
                Suv Balansi Tracker
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
