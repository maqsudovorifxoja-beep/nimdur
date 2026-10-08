import React, { useState } from 'react';
import { X, Clock, Calendar, User, Heart, Share2, Check } from 'lucide-react';

export default function ArticleModal({ article, lang, t, onClose }) {
  if (!article) return null;

  const [likes, setLikes] = useState(article.likes || 120);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Header with image */}
        <div className="relative h-60 w-full shrink-0">
          <img 
            src={article.image} 
            alt="Article cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-white">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2 leading-snug">
              {article.title[lang] || article.title.uz}
            </h2>
          </div>
        </div>

        {/* Metadata bar */}
        <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/40">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-emerald-500" /> {article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                hasLiked 
                  ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
              title="Havolani nusxalash"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          <p className="font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 rounded-2xl border-l-4 border-emerald-500">
            {article.summary?.[lang] || article.summary?.uz || article.excerpt?.[lang] || article.excerpt?.uz || ''}
          </p>

          <p className="whitespace-pre-line">
            {article.content?.[lang] || article.content?.uz || ''}
          </p>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
              💡 Asosiy xulosa:
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Har qanday salomatlik va sport natijasi intizom, to'g'ri ozuqa va dam olish rejimiga bog'liq. Maslahatlarni bugunoq hayotingizga tadbiq eting!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end bg-gray-50/50 dark:bg-gray-800/30">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-opacity"
          >
            {t.btnClose}
          </button>
        </div>

      </div>
    </div>
  );
}
