import React from 'react';
import { Activity, Heart, Shield, Award, Sparkles, Send } from 'lucide-react';

export default function Footer({ t, setCurrentTab }) {
  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-white">
                FitLife <span className="text-emerald-500">&amp;</span> Sport
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 100% Ilmiy metodika</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> ISO Salomatlik</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              {t.home} &amp; Bo'limlar
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <li>
                <button onClick={() => setCurrentTab('workouts')} className="hover:text-emerald-500 transition-colors">
                  {t.workouts}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('nutrition')} className="hover:text-emerald-500 transition-colors">
                  {t.nutrition}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('calculators')} className="hover:text-emerald-500 transition-colors">
                  {t.calculators}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('articles')} className="hover:text-emerald-500 transition-colors">
                  {t.articles}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin')} className="hover:text-rose-500 transition-colors font-semibold">
                  {t.admin}
                </button>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Foydali Vositalar
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => setCurrentTab('calculators')}>BMI Kalkulyatori (TVI)</span></li>
              <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => setCurrentTab('calculators')}>BMR Metabolizm Hisobi</span></li>
              <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => setCurrentTab('nutrition')}>Interaktiv Suv Nazorati</span></li>
              <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => setCurrentTab('workouts')}>Interaktiv Mashg'ulot Taymeri</span></li>
              <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => setCurrentTab('nutrition')}>Parhez &amp; Ratsionlar</span></li>
            </ul>
          </div>

          {/* Newsletter / Health tip */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Yangiliklardan Xabardor Bo'ling
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Har haftalik eng yangi fitnes dasturlari va sog'lom retseptlarni bevosita pochta orqali oling.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email manzilingiz..." 
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                onClick={() => alert("Rahmat! Siz sog'lom turmush obunasiga muvaffaqiyatli qo'shildingiz!")}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-500">
          <p>© 2026 FitLife &amp; Sport Platform. {t.footerRights}</p>
          <div className="flex items-center gap-1">
            <span>Yaratildi:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Salomatlik &amp; Sport Ishtiyoqi</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
