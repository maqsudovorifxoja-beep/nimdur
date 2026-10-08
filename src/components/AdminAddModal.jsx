import React, { useState } from 'react';
import { X, Plus, Save } from 'lucide-react';

export default function AdminAddModal({ type, t, onClose, onSave }) {
  // Common states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(type === 'workout' ? 'Cardio' : type === 'food' ? 'Proteins' : 'Health');
  
  // Workout specific
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState(25);
  const [calories, setCalories] = useState(200);
  const [desc, setDesc] = useState('');

  // Food specific
  const [protein, setProtein] = useState(20);
  const [fat, setFat] = useState(5);
  const [carbs, setCarbs] = useState(15);
  const [benefits, setBenefits] = useState('');

  // Article specific
  const [author, setAuthor] = useState('Admin Coach');
  const [readTime, setReadTime] = useState('5 daqiqa');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (type === 'workout') {
      const newWorkout = {
        id: `w-${Date.now()}`,
        title: { uz: title, ru: title, en: title },
        category: category.toLowerCase(),
        level: level.toLowerCase(),
        duration: Number(duration),
        calories: Number(calories),
        icon: 'Flame',
        color: 'from-emerald-500 to-teal-500',
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        description: { uz: desc || "Yangi qo'shilgan mashg'ulot dasturi", ru: desc || "Новая тренировочная программа", en: desc || "Newly added workout routine" },
        exercises: [
          { name: { uz: "Boshlang'ich qizdirish", ru: "Разминка", en: "Warmup" }, duration: 40, rest: 15, reps: "20 marta" },
          { name: { uz: "Asosiy mashq harakati", ru: "Основное движение", en: "Core Movement" }, duration: 45, rest: 20, reps: "15 marta" },
          { name: { uz: "Cho'zilish va tinchlanish", ru: "Заминка", en: "Stretching" }, duration: 50, rest: 0, reps: "1 daqiqa" }
        ]
      };
      onSave('workout', newWorkout);
    } else if (type === 'food') {
      const newFood = {
        id: `f-${Date.now()}`,
        name: { uz: title, ru: title, en: title },
        category: category.toLowerCase(),
        calories: Number(calories),
        protein: Number(protein),
        fat: Number(fat),
        carbs: Number(carbs),
        emoji: '🥗',
        badge: "Yangi",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        benefits: { uz: benefits || "Organizm uchun foydali ozuqa", ru: benefits || "Полезный продукт для здоровья", en: benefits || "Healthy nutrient rich food" }
      };
      onSave('food', newFood);
    } else if (type === 'article') {
      const newArticle = {
        id: `a-${Date.now()}`,
        title: { uz: title, ru: title, en: title },
        category,
        author: author || "FitLife Eksperti",
        date: new Date().toISOString().split('T')[0],
        readTime: readTime || "4 daqiqa",
        likes: 1,
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        excerpt: { uz: title, ru: title, en: title },
        content: { uz: content || "Salomatlik bo'yicha tavsiyalar.", ru: content || "Полезные рекомендации.", en: content || "Healthy lifestyle recommendations." }
      };
      onSave('article', newArticle);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {type === 'workout' && "Yangi Mashg'ulot Qo'shish"}
            {type === 'food' && "Yangi Mahsulot Qo'shish"}
            {type === 'article' && "Yangi Maqola Qo'shish"}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Nomi</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nomini kiriting..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Toifasi</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {type === 'workout' && (
                <>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                  <option value="Abs">Abs</option>
                  <option value="Yoga">Yoga</option>
                  <option value="HIIT">HIIT</option>
                </>
              )}
              {type === 'food' && (
                <>
                  <option value="Proteins">Oqsillar (Proteins)</option>
                  <option value="Vegetables">Sabzavotlar (Vegetables)</option>
                  <option value="Fruits">Mevalar (Fruits)</option>
                  <option value="Nuts">Yong'oqlar (Nuts)</option>
                  <option value="Grains">Donlar (Grains)</option>
                </>
              )}
              {type === 'article' && (
                <>
                  <option value="Health">Salomatlik (Health)</option>
                  <option value="Nutrition">Ovqatlanish (Nutrition)</option>
                  <option value="Fitness">Fitnes (Fitness)</option>
                </>
              )}
            </select>
          </div>

          {/* Conditional workout fields */}
          {type === 'workout' && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Daraja</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Vaqt (daq)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Kaloriya</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
            </div>
          )}

          {/* Conditional food fields */}
          {type === 'food' && (
            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Kaloriya</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Oqsil(g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Yog'(g)</label>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Uglevod</label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
            </div>
          )}

          {/* Conditional article fields */}
          {type === 'article' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Muallif</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">O'qish vaqti</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Tavsif / Matn</label>
            <textarea
              rows="3"
              value={type === 'workout' ? desc : type === 'food' ? benefits : content}
              onChange={(e) => {
                if (type === 'workout') setDesc(e.target.value);
                else if (type === 'food') setBenefits(e.target.value);
                else setContent(e.target.value);
              }}
              placeholder="Qisqacha ma'lumot..."
              className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Save className="w-4 h-4" />
              <span>{t.save}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
