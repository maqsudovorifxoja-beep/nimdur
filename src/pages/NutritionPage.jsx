import React, { useState } from 'react';
import { 
  Apple, Droplets, RotateCcw, Plus, Search, Sparkles, 
  Utensils, Check, ShieldCheck, PieChart, Heart
} from 'lucide-react';
import { initialMealPlans, initialFoods } from '../data/mockData';

export default function NutritionPage({ foods, lang, t }) {
  // Water Tracker State (stored in localStorage or memory)
  const [glasses, setGlasses] = useState(() => {
    const saved = localStorage.getItem('fitlife_water_glasses');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlanTab, setActivePlanTab] = useState('weightLoss');

  const updateGlasses = (val) => {
    const nextVal = Math.max(0, Math.min(8, val));
    setGlasses(nextVal);
    localStorage.setItem('fitlife_water_glasses', nextVal.toString());
  };

  const categories = [
    { id: 'all', label: t?.catAll || 'Barchasi' },
    { id: 'protein', label: t?.catProtein || 'Oqsillar' },
    { id: 'veg', label: t?.catVeg || 'Sabzavotlar' },
    { id: 'fruit', label: t?.catFruit || 'Mevalar' },
    { id: 'nuts', label: t?.catNuts || 'Yong\'oqlar' },
    { id: 'grains', label: t?.catGrains || 'Donli' },
  ];

  // Safe fallback to initialFoods if foods array is empty or undefined
  const safeFoods = (foods && foods.length > 0) ? foods : initialFoods;

  const filteredFoods = safeFoods.filter((f) => {
    const cat = (f.category || '').toLowerCase();
    const sel = selectedCategory.toLowerCase();
    const matchCat = 
      sel === 'all' || 
      cat === sel || 
      (sel === 'protein' && (cat === 'protein' || cat === 'proteins')) ||
      (sel === 'veg' && (cat === 'veg' || cat === 'vegetables')) ||
      (sel === 'fruit' && (cat === 'fruit' || cat === 'fruits')) ||
      (sel === 'nuts' && (cat === 'nuts' || cat === 'nut')) ||
      (sel === 'grains' && (cat === 'grains' || cat === 'grain')) ||
      cat.startsWith(sel) || 
      sel.startsWith(cat);

    const nameText = (f.name?.[lang] || f.name?.uz || f.name?.en || '').toLowerCase();
    const benefitText = (f.benefits?.[lang] || f.benefits?.uz || f.benefits?.en || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || nameText.includes(q) || benefitText.includes(q);
    return matchCat && matchSearch;
  });

  const plans = (initialMealPlans && initialMealPlans.length > 0) ? initialMealPlans : [];
  const currentPlan = 
    plans.find(p => p.type === activePlanTab || (activePlanTab === 'muscleGain' && p.type === 'muscle') || (activePlanTab === 'balanced' && p.type === 'balance')) ||
    plans[0] ||
    {};

  const getMealText = (mealType) => {
    if (!currentPlan) return '';
    const mealObj = currentPlan.meals?.[mealType] || currentPlan[mealType];
    if (!mealObj) return '';
    return mealObj[lang] || mealObj.uz || mealObj.en || (typeof mealObj === 'string' ? mealObj : '');
  };

  const getCalories = () => {
    if (!currentPlan) return '2,000 kkal';
    return currentPlan.targetCalories || (currentPlan.calories ? `${currentPlan.calories} kkal` : '2,000 kkal');
  };

  const getMacro = (key) => {
    if (!currentPlan?.macros) return '25%';
    if (key === 'protein') return currentPlan.macros.protein || currentPlan.macros.p || '135g (30%)';
    if (key === 'carbs') return currentPlan.macros.carbs || currentPlan.macros.c || '180g (45%)';
    if (key === 'fat') return currentPlan.macros.fat || currentPlan.macros.f || '50g (25%)';
    return '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Apple className="w-3.5 h-3.5" />
          <span>Sog'lom Hayot Ratsioni</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {t.nutritionTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t.nutritionSubtitle}
        </p>
      </div>

      {/* INTERACTIVE WATER TRACKER SECTION */}
      <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-teal-500/10 dark:from-cyan-950/30 dark:via-blue-950/30 dark:to-teal-950/30 rounded-3xl p-6 sm:p-10 border border-cyan-500/20 shadow-lg">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                {t.waterTitle}
              </span>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {glasses * 250} / 2000 ml ({glasses} / 8 stakan)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {t.waterSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateGlasses(glasses + 1)}
                className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addGlass}</span>
              </button>

              <button
                onClick={() => updateGlasses(0)}
                className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                title={t.resetWater}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 8 Clickable Glasses Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const isFilled = num <= glasses;
              return (
                <button
                  key={num}
                  onClick={() => updateGlasses(num === glasses ? num - 1 : num)}
                  className={`group relative h-24 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-end p-2 cursor-pointer overflow-hidden ${
                    isFilled
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 shadow-sm'
                      : 'border-dashed border-gray-300 dark:border-gray-700 hover:border-cyan-400 bg-white/60 dark:bg-gray-800/40'
                  }`}
                >
                  {/* Water fill animation */}
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-cyan-500 to-teal-400 transition-all duration-500 rounded-b-xl ${
                      isFilled ? 'h-full opacity-90' : 'h-0 opacity-0'
                    }`}
                  />

                  <div className="relative z-10 text-center">
                    <Droplets
                      className={`w-6 h-6 mx-auto mb-1 transition-colors ${
                        isFilled ? 'text-white fill-white' : 'text-gray-400 group-hover:text-cyan-500'
                      }`}
                    />
                    <span
                      className={`text-[10px] font-bold block ${
                        isFilled ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      250 ml
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Goal Achieved Celebration */}
          {glasses >= 8 && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-2 text-xs font-bold animate-in zoom-in-95 duration-200">
              <Sparkles className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span>{t.waterStreak}</span>
            </div>
          )}
        </div>
      </section>

      {/* FOODS CATALOG SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Superfoodlar &amp; Ozuqalar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              {t.foodsCatalog}
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchFood}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Foods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
              <Apple className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Mahsulot topilmadi</h3>
              <p className="text-xs text-gray-500 mt-1">Boshqa toifani tanlang yoki qidiruv so'zini tozalang</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Barchasini ko'rsatish
              </button>
            </div>
          ) : (
            filteredFoods.map((f) => (
              <div
                key={f.id}
                className="group bg-white dark:bg-gray-800/90 rounded-3xl border border-gray-100 dark:border-gray-700/80 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 rounded-2xl overflow-hidden relative mb-4 bg-slate-800">
                    <img
                      src={f.image || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"}
                      alt={f.name?.[lang] || f.name?.uz || 'Superfood'}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {f.calories} {t.calories} / 100g
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                      {f.badge || 'Superfood'}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    {f.name?.[lang] || f.name?.uz || f.name?.en || 'Superfood'}
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {f.benefits?.[lang] || f.benefits?.uz || f.benefits?.en || ''}
                  </p>
                </div>

                {/* BJU / Macros */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1.5">
                    {t.nutriPer100g}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                    <div className="bg-emerald-500/10 p-1.5 rounded-xl text-emerald-700 dark:text-emerald-400">
                      <span className="text-[9px] block font-semibold">{t.nutriProtein}</span>
                      <span className="font-black text-xs">{f.protein}g</span>
                    </div>
                    <div className="bg-amber-500/10 p-1.5 rounded-xl text-amber-700 dark:text-amber-400">
                      <span className="text-[9px] block font-semibold">{t.nutriFat}</span>
                      <span className="font-black text-xs">{f.fat}g</span>
                    </div>
                    <div className="bg-cyan-500/10 p-1.5 rounded-xl text-cyan-700 dark:text-cyan-400">
                      <span className="text-[9px] block font-semibold">{t.nutriCarbs}</span>
                      <span className="font-black text-xs">{f.carbs}g</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* RECOMMENDED MEAL PLANS SECTION */}
      <section className="bg-white dark:bg-gray-800/80 rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-700/80 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Ilmiy Taomnoma
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              {t.mealPlansTitle}
            </h2>
          </div>

          {/* Plan Tabs */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900/60 p-1 rounded-2xl">
            <button
              onClick={() => setActivePlanTab('weightLoss')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePlanTab === 'weightLoss'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.planWeightLoss}
            </button>
            <button
              onClick={() => setActivePlanTab('muscleGain')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePlanTab === 'muscleGain'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.planMuscle}
            </button>
            <button
              onClick={() => setActivePlanTab('balanced')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePlanTab === 'balanced'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.planBalance}
            </button>
          </div>
        </div>

        {/* Plan Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Kunlik Kaloriya</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{getCalories()}</span>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Oqsil Ulushi</span>
            <span className="text-lg font-black text-emerald-500">{getMacro('protein')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Uglevod Ulushi</span>
            <span className="text-lg font-black text-cyan-500">{getMacro('carbs')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Foydali Yog'lar</span>
            <span className="text-lg font-black text-amber-500">{getMacro('fat')}</span>
          </div>
        </div>

        {/* Meal Breakdown Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Breakfast */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Utensils className="w-4 h-4" />
              <span>{t.breakfast}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {getMealText('breakfast')}
            </p>
          </div>

          {/* Lunch */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
              <Utensils className="w-4 h-4" />
              <span>{t.lunch}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {getMealText('lunch')}
            </p>
          </div>

          {/* Dinner */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
              <Utensils className="w-4 h-4" />
              <span>{t.dinner}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {getMealText('dinner')}
            </p>
          </div>

          {/* Snack */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Utensils className="w-4 h-4" />
              <span>{t.snack}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {getMealText('snack')}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
