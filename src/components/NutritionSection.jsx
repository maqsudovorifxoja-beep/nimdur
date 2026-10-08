import { useState, useMemo } from 'react';
import { 
  Droplets, 
  Apple, 
  Utensils, 
  Search, 
  Plus, 
  RotateCcw, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  ChevronRight,
  Calculator,
  Trash2
} from 'lucide-react';
import { initialMealPlans } from '../data/mockData';

export default function NutritionSection({ 
  t, 
  lang, 
  foods, 
  onShowToast 
}) {
  // Water Tracker State
  const [glasses, setGlasses] = useState(() => {
    const saved = localStorage.getItem('fitlife_water_glasses');
    return saved !== null ? parseInt(saved, 10) : 4;
  });

  const handleAddGlass = () => {
    setGlasses((prev) => {
      const next = Math.min(prev + 1, 12);
      localStorage.setItem('fitlife_water_glasses', next.toString());
      if (next === 8 && onShowToast) {
        onShowToast(t.waterStreak);
      }
      return next;
    });
  };

  const handleResetWater = () => {
    setGlasses(0);
    localStorage.setItem('fitlife_water_glasses', '0');
  };

  const handleToggleGlass = (index) => {
    setGlasses((prev) => {
      const next = index < prev ? index : index + 1;
      localStorage.setItem('fitlife_water_glasses', next.toString());
      if (next === 8 && onShowToast) {
        onShowToast(t.waterStreak);
      }
      return next;
    });
  };

  // Meal Plans State
  const [activePlan, setActivePlan] = useState('weightLoss');
  const currentPlan = initialMealPlans.find((p) => p.type === activePlan) || initialMealPlans[0];

  // Food Catalog Search & Filter
  const [foodCategory, setFoodCategory] = useState('all');
  const [foodSearch, setFoodSearch] = useState('');

  const foodCategories = [
    { id: 'all', label: t.catAll },
    { id: 'protein', label: t.catProtein },
    { id: 'veg', label: t.catVeg },
    { id: 'fruit', label: t.catFruit },
    { id: 'nuts', label: t.catNuts },
    { id: 'grains', label: t.catGrains }
  ];

  const filteredFoods = useMemo(() => {
    return foods.filter((f) => {
      const matchCat = foodCategory === 'all' || f.category === foodCategory;
      const name = (f.name[lang] || f.name.uz || '').toLowerCase();
      const q = foodSearch.toLowerCase().trim();
      const matchSearch = !q || name.includes(q);
      return matchCat && matchSearch;
    });
  }, [foods, foodCategory, foodSearch, lang]);

  // Interactive Meal Plate Calculator
  const [selectedPlate, setSelectedPlate] = useState([]);

  const addToPlate = (food) => {
    setSelectedPlate((prev) => [...prev, { ...food, plateId: Date.now() + Math.random() }]);
    if (onShowToast) onShowToast(`"${food.name[lang] || food.name.uz}" likopchaga qo'shildi!`);
  };

  const removeFromPlate = (plateId) => {
    setSelectedPlate((prev) => prev.filter((item) => item.plateId !== plateId));
  };

  const plateTotals = useMemo(() => {
    return selectedPlate.reduce(
      (acc, curr) => ({
        calories: acc.calories + (curr.calories || 0),
        protein: acc.protein + (curr.protein || 0),
        fat: acc.fat + (curr.fat || 0),
        carbs: acc.carbs + (curr.carbs || 0)
      }),
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
  }, [selectedPlate]);

  const waterMl = glasses * 250;
  const targetMl = 2000;
  const waterProgress = Math.min(Math.round((waterMl / targetMl) * 100), 100);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Apple className="w-3.5 h-3.5" />
          <span>Nutrition & Vitality</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
          {t.nutritionTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          {t.nutritionSubtitle}
        </p>
      </div>

      {/* Water Hydration Tracker Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-500/10 via-cyan-500/5 to-emerald-500/10 border border-sky-500/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-300 text-xs font-bold">
                <Droplets className="w-4 h-4 text-sky-500" />
                <span>{t.waterTitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {glasses} / 8 {t.glassesDrunk.toLowerCase()} ({waterMl} ml)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
                {t.waterSubtitle}
              </p>

              {glasses >= 8 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{t.waterStreak}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={handleAddGlass}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addGlass}</span>
                </button>
                <button
                  onClick={handleResetWater}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetWater}</span>
                </button>
              </div>
            </div>

            {/* Interactive Glasses Grid */}
            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {Array.from({ length: 8 }).map((_, i) => {
                  const isDrunk = i < glasses;
                  return (
                    <button
                      key={i}
                      onClick={() => handleToggleGlass(i)}
                      className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isDrunk
                          ? 'border-sky-500 bg-gradient-to-b from-sky-400 to-cyan-500 text-white shadow-md shadow-sky-500/25 scale-105'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:border-sky-300'
                      }`}
                      title={`Stakan ${i + 1} (250 ml)`}
                    >
                      <Droplets className={`w-5 h-5 ${isDrunk ? 'fill-white' : ''}`} />
                      <span className="text-[10px] font-black mt-1">250ml</span>
                    </button>
                  );
                })}
              </div>

              {/* Hydration Progress Bar */}
              <div className="w-full max-w-xs space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span>{waterProgress}% me'yor</span>
                  <span>{waterMl} / 2000 ml</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-cyan-500 transition-all duration-500 rounded-full"
                    style={{ width: `${waterProgress}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Recommended Meal Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
            {t.mealPlansTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Maqsadingizga qarab professional nutrisiologlar tomonidan tuzilgan kunlik menyu
          </p>
        </div>

        {/* Plan Type Selector */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[
            { id: 'weightLoss', label: t.planWeightLoss },
            { id: 'muscle', label: t.planMuscle },
            { id: 'balance', label: t.planBalance }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePlan(tab.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activePlan === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-102'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Plan Breakdown Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700/60 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentPlan.title[lang] || currentPlan.title.uz}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Kunlik jami energiya qiymati: <span className="font-bold text-amber-500">{currentPlan.calories} kkal</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Oqsil: {currentPlan.macros.p}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                Yog': {currentPlan.macros.f}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400">
                Uglevod: {currentPlan.macros.c}
              </span>
            </div>
          </div>

          {/* Meals Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Breakfast */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-amber-500 tracking-wider">
                    {t.breakfast}
                  </span>
                  <span className="text-lg">🥣</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentPlan.breakfast[lang] || currentPlan.breakfast.uz}
                </p>
              </div>
            </div>

            {/* Lunch */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-emerald-500 tracking-wider">
                    {t.lunch}
                  </span>
                  <span className="text-lg">🍲</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentPlan.lunch[lang] || currentPlan.lunch.uz}
                </p>
              </div>
            </div>

            {/* Snack */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-sky-500 tracking-wider">
                    {t.snack}
                  </span>
                  <span className="text-lg">🍎</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentPlan.snack[lang] || currentPlan.snack.uz}
                </p>
              </div>
            </div>

            {/* Dinner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-indigo-500 tracking-wider">
                    {t.dinner}
                  </span>
                  <span className="text-lg">🥗</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentPlan.dinner[lang] || currentPlan.dinner.uz}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Superfoods Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
            {t.foodsCatalog}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            {t.nutriPer100g}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={foodSearch}
              onChange={(e) => setFoodSearch(e.target.value)}
              placeholder={t.searchFood}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2">
            {foodCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFoodCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  foodCategory === c.id
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.map((f) => (
            <div
              key={f.id}
              className="group p-5 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{f.emoji}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {f.calories} kkal
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                  {f.name[lang] || f.name.uz}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                  {f.benefits[lang] || f.benefits.uz}
                </p>
              </div>

              <div>
                {/* Macro Stats */}
                <div className="grid grid-cols-3 gap-1 text-center py-2 border-t border-slate-100 dark:border-slate-700/60 mb-3">
                  <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 font-semibold block">{t.nutriProtein}</span>
                    <span className="text-xs font-bold text-emerald-500">{f.protein}g</span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 font-semibold block">{t.nutriFat}</span>
                    <span className="text-xs font-bold text-amber-500">{f.fat}g</span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 font-semibold block">{t.nutriCarbs}</span>
                    <span className="text-xs font-bold text-sky-500">{f.carbs}g</span>
                  </div>
                </div>

                {/* Add to Plate button */}
                <button
                  onClick={() => addToPlate(f)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Likopchaga qo'shish</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Custom Meal Plate Summary */}
        {selectedPlate.length > 0 && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 shadow-xl space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Sizning Taom Likopchangiz ({selectedPlate.length} mahsulot)
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlate([])}
                className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hammasini olib tashlash</span>
              </button>
            </div>

            {/* List of items in plate */}
            <div className="flex flex-wrap gap-2">
              {selectedPlate.map((item) => (
                <div
                  key={item.plateId}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs"
                >
                  <span>{item.emoji}</span>
                  <span>{item.name[lang] || item.name.uz}</span>
                  <button
                    onClick={() => removeFromPlate(item.plateId)}
                    className="ml-1 text-slate-400 hover:text-rose-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Total Macro Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-emerald-500/20">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Umumiy Kaloriya</span>
                <span className="text-lg font-black text-amber-500">{plateTotals.calories} kkal</span>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Jami Oqsil</span>
                <span className="text-lg font-black text-emerald-500">{plateTotals.protein.toFixed(1)} g</span>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Jami Yog'</span>
                <span className="text-lg font-black text-amber-600">{plateTotals.fat.toFixed(1)} g</span>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Jami Uglevod</span>
                <span className="text-lg font-black text-sky-500">{plateTotals.carbs.toFixed(1)} g</span>
              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
}
