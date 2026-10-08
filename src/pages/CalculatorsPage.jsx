import React, { useState } from 'react';
import { 
  Calculator, Activity, Flame, Droplets, Heart, 
  HelpCircle, CheckCircle, ArrowRight, RefreshCw, Zap
} from 'lucide-react';

export default function CalculatorsPage({ lang, t }) {
  const [activeTab, setActiveTab] = useState('bmi'); // 'bmi', 'bmr', 'tdee', 'heart'

  // BMI Inputs
  const [bmiWeight, setBmiWeight] = useState(70);
  const [bmiHeight, setBmiHeight] = useState(175);

  // BMR / TDEE Inputs
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState(1.55); // moderate

  // Heart Rate Inputs
  const [restingHr, setRestingHr] = useState(65);

  // 1. Calculate BMI
  const heightInMeters = (bmiHeight || 170) / 100;
  const bmiValue = Number(((bmiWeight || 70) / (heightInMeters * heightInMeters)).toFixed(1));

  let bmiCategory = t.bmiNormal;
  let bmiColor = 'text-emerald-500';
  let bmiBg = 'bg-emerald-500';
  let bmiPercent = 50;

  if (bmiValue < 18.5) {
    bmiCategory = t.bmiUnderweight;
    bmiColor = 'text-blue-500';
    bmiBg = 'bg-blue-500';
    bmiPercent = Math.max(5, (bmiValue / 18.5) * 25);
  } else if (bmiValue < 25) {
    bmiCategory = t.bmiNormal;
    bmiColor = 'text-emerald-500';
    bmiBg = 'bg-emerald-500';
    bmiPercent = 25 + ((bmiValue - 18.5) / (24.9 - 18.5)) * 25;
  } else if (bmiValue < 30) {
    bmiCategory = t.bmiOverweight;
    bmiColor = 'text-amber-500';
    bmiBg = 'bg-amber-500';
    bmiPercent = 50 + ((bmiValue - 25) / (29.9 - 25)) * 25;
  } else {
    bmiCategory = t.bmiObese;
    bmiColor = 'text-rose-500';
    bmiBg = 'bg-rose-500';
    bmiPercent = Math.min(100, 75 + ((bmiValue - 30) / 15) * 25);
  }

  const idealWeightMin = Math.round(18.5 * heightInMeters * heightInMeters);
  const idealWeightMax = Math.round(24.9 * heightInMeters * heightInMeters);

  // 2. Calculate BMR (Mifflin-St Jeor formula)
  // For men: 10 * weight + 6.25 * height - 5 * age + 5
  // For women: 10 * weight + 6.25 * height - 5 * age - 161
  const bmrBase = 10 * bmiWeight + 6.25 * bmiHeight - 5 * age;
  const bmrValue = Math.round(gender === 'male' ? bmrBase + 5 : bmrBase - 161);

  // 3. Calculate TDEE
  const tdeeValue = Math.round(bmrValue * activity);
  const tdeeCut = Math.round(tdeeValue - 450);
  const tdeeBulk = Math.round(tdeeValue + 400);

  // 4. Calculate Water & Heart
  const waterLiters = (bmiWeight * 0.035).toFixed(1);
  const waterGlassesCount = Math.round(bmiWeight * 0.035 / 0.25);

  const maxHeartRate = 220 - age;
  const fatBurnMin = Math.round(maxHeartRate * 0.6);
  const fatBurnMax = Math.round(maxHeartRate * 0.7);
  const cardioMin = Math.round(maxHeartRate * 0.7);
  const cardioMax = Math.round(maxHeartRate * 0.85);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Aqlli Salomatlik Formulalari</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {t.calcTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t.calcSubtitle}
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('bmi')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'bmi'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t.calcBmi}</span>
        </button>

        <button
          onClick={() => setActiveTab('bmr')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'bmr'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>{t.calcBmr}</span>
        </button>

        <button
          onClick={() => setActiveTab('tdee')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'tdee'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{t.calcTdee}</span>
        </button>

        <button
          onClick={() => setActiveTab('heart')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'heart'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t.calcHeart} &amp; Suv</span>
        </button>
      </div>

      {/* CALCULATOR MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/90 rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-700/80 shadow-xl">
        
        {/* TAB 1: BMI */}
        {activeTab === 'bmi' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
                    <span>{t.weightKg}</span>
                    <span className="text-emerald-500 font-mono text-base">{bmiWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="160"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>35 kg</span>
                    <span>100 kg</span>
                    <span>160 kg</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
                    <span>{t.heightCm}</span>
                    <span className="text-emerald-500 font-mono text-base">{bmiHeight} sm</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>120 sm</span>
                    <span>170 sm</span>
                    <span>220 sm</span>
                  </div>
                </div>
              </div>

              {/* Output & Gauge */}
              <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/80 text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {t.result}
                </span>

                <div>
                  <div className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                    {bmiValue}
                  </div>
                  <div className={`text-sm font-bold mt-1 ${bmiColor}`}>
                    {bmiCategory}
                  </div>
                </div>

                {/* Color Gauge bar */}
                <div className="relative pt-4">
                  <div className="w-full h-3 rounded-full flex overflow-hidden">
                    <div className="w-1/4 bg-blue-400" title="Kam vazn (<18.5)" />
                    <div className="w-1/4 bg-emerald-500" title="Normal (18.5 - 24.9)" />
                    <div className="w-1/4 bg-amber-400" title="Ortiqcha vazn (25 - 29.9)" />
                    <div className="w-1/4 bg-rose-500" title="Semizlik (>30)" />
                  </div>

                  {/* Marker Pin */}
                  <div
                    className="absolute top-2 w-4 h-4 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-gray-900 shadow-md -translate-x-1/2 transition-all duration-300"
                    style={{ left: `${bmiPercent}%` }}
                  />
                </div>

                <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                  <span>Siz uchun me'yoriy vazn oralig'i: </span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{idealWeightMin} - {idealWeightMax} kg</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: BMR */}
        {activeTab === 'bmr' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              <div className="space-y-4">
                {/* Gender */}
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 block mb-2">{t.gender}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGender('male')}
                      className={`py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        gender === 'male'
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t.genderMale}
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        gender === 'female'
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t.genderFemale}
                    </button>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    <span>{t.age}</span>
                    <span>{age} yosh</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="90"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Weight & Height */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    <span>{t.weightKg}</span>
                    <span>{bmiWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    <span>{t.heightCm}</span>
                    <span>{bmiHeight} sm</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* BMR Result Card */}
              <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/80 text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {t.calcBmr}
                </span>

                <div className="text-5xl font-black text-gray-900 dark:text-white">
                  {bmrValue} <span className="text-lg text-emerald-500 font-bold">{t.calories}</span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.bmrDesc} Agar butun kun davomida faqat yotib dam olsangiz ham tanangiz shu miqdordagi kaloriyani sarflaydi.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: TDEE */}
        {activeTab === 'tdee' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase text-gray-400 block">{t.activityLevel}</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { val: 1.2, label: t.actSedentary },
                  { val: 1.375, label: t.actLight },
                  { val: 1.55, label: t.actModerate },
                  { val: 1.725, label: t.actHeavy },
                ].map((act) => (
                  <button
                    key={act.val}
                    onClick={() => setActivity(act.val)}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all border ${
                      activity === act.val
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                        : 'bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-center space-y-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  Vazn Tashlash (Ozish)
                </span>
                <span className="text-3xl font-black text-gray-900 dark:text-white">{tdeeCut} kkal</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">-450 kkal kunlik defitsit</p>
              </div>

              <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-center space-y-2 ring-2 ring-emerald-500">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Vaznni Saqlash
                </span>
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{tdeeValue} kkal</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Muvozanatli TDEE normasi</p>
              </div>

              <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-center space-y-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Mushak Olish (Semirish)
                </span>
                <span className="text-3xl font-black text-gray-900 dark:text-white">{tdeeBulk} kkal</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">+400 kkal toza o'sish</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HEART & WATER */}
        {activeTab === 'heart' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Water Card */}
              <div className="p-6 rounded-3xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/50 space-y-4">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                  <Droplets className="w-5 h-5 fill-cyan-500 text-cyan-500" />
                  <span>{t.calcWater}</span>
                </div>
                <div>
                  <span className="text-4xl font-black text-gray-900 dark:text-white">{waterLiters} Litr</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">({waterGlassesCount} stakan toza suv)</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Vazningiz ({bmiWeight} kg) asosida kunlik organizmga kerakli minimal toza suv me'yori. Jismoniy mashq kunlari qo'shimcha 500 ml iching.
                </p>
              </div>

              {/* Heart Zones Card */}
              <div className="p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-4">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  <span>{t.calcHeart} (Yurak Urib Turishi)</span>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center text-xs pb-1 border-b border-rose-100 dark:border-rose-900/50">
                    <span className="text-gray-500 dark:text-gray-400">Maksimal Pul's:</span>
                    <span className="font-bold text-gray-900 dark:text-white font-mono">{maxHeartRate} zarba/daq</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-1 border-b border-rose-100 dark:border-rose-900/50">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">🔥 Yog' Yoqish Zonasi (60-70%):</span>
                    <span className="font-bold text-gray-900 dark:text-white font-mono">{fatBurnMin} - {fatBurnMax} zarba/daq</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-rose-600 dark:text-rose-400 font-bold">⚡ Kardio &amp; Chidamlilik (70-85%):</span>
                    <span className="font-bold text-gray-900 dark:text-white font-mono">{cardioMin} - {cardioMax} zarba/daq</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
