import React, { useState } from 'react';
import { 
  BookOpen, Search, Clock, Calendar, User, Heart, 
  ArrowRight, Sparkles, Filter 
} from 'lucide-react';

export default function ArticlesPage({ articles = [], lang = 'uz', t, onOpenArticle }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: t?.filterAll || 'Barchasi' },
    { id: 'recovery', label: 'Tiklanish & Uyqu' },
    { id: 'nutrition', label: 'To\'g\'ri Ovqatlanish' },
    { id: 'fitness', label: 'Fitnes & Kardio' },
  ];

  const filteredArticles = articles.filter((a) => {
    const cat = (a.category || '').toLowerCase();
    const sel = selectedCat.toLowerCase();
    const matchCat = sel === 'all' || cat === sel;
    
    const titleText = (a.title?.[lang] || a.title?.uz || '').toLowerCase();
    const summaryText = (a.summary?.[lang] || a.summary?.uz || a.excerpt?.[lang] || a.excerpt?.uz || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || titleText.includes(q) || summaryText.includes(q);
    
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ilmiy Salomatlik Blogi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {t?.articlesTitle || "Salomatlik va Sport Blogi"}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t?.articlesSubtitle || "Sog'lom turmush tarzi va to'g'ri ovqatlanish bo'yicha ilmiy maqolalar"}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800/80 p-4 rounded-3xl border border-gray-100 dark:border-gray-700/80 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === c.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t?.searchArticles || "Maqolalarni qidirish..."}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800">
          <p className="text-base text-gray-500">Hech qanday maqola topilmadi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const articleSummary = article.summary?.[lang] || article.summary?.uz || article.excerpt?.[lang] || article.excerpt?.uz || '';
            const articleTitle = article.title?.[lang] || article.title?.uz || '';

            return (
              <div
                key={article.id}
                className="group bg-white dark:bg-gray-800/90 rounded-3xl border border-gray-100 dark:border-gray-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img
                      src={article.image || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80"}
                      alt={articleTitle}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                      {article.category}
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-rose-500 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>{article.likes || 120}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500" /> {article.readTime} daqiqa</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                      {articleTitle}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {articleSummary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                    {article.author}
                  </span>

                  <button
                    onClick={() => onOpenArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2.5 transition-all cursor-pointer"
                  >
                    <span>{t?.readMore || "To'liq o'qish"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
