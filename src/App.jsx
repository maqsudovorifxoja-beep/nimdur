import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WorkoutTimerModal from './components/WorkoutTimerModal';
import ArticleModal from './components/ArticleModal';

import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/WorkoutsPage';
import NutritionPage from './pages/NutritionPage';
import CalculatorsPage from './pages/CalculatorsPage';
import ArticlesPage from './pages/ArticlesPage';
import AdminPage from './pages/AdminPage';

import { translations } from './data/translations';
import { initialWorkouts, initialFoods, initialArticles, initialUsers } from './data/mockData';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('fitlife_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Language state
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('fitlife_lang') || 'uz';
  });

  // Navigation tab with URL hash and localStorage persistence
  const [currentTab, setCurrentTab] = useState(() => {
    // 1. Try URL hash first (e.g. #admin, #workouts, etc.)
    const hash = window.location.hash.replace('#', '').trim();
    const validTabs = ['home', 'workouts', 'nutrition', 'calculators', 'articles', 'admin'];
    if (validTabs.includes(hash)) {
      return hash;
    }
    // 2. Try localStorage
    const saved = localStorage.getItem('fitlife_current_tab');
    if (saved && validTabs.includes(saved)) {
      return saved;
    }
    return 'home';
  });

  // Datasets with localStorage persistence and image fallbacks
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('fitlife_workouts');
    if (!saved) return initialWorkouts;
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((w) => {
        const fallback = initialWorkouts.find((iw) => iw.id === w.id);
        return {
          ...w,
          image: w.image || fallback?.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
          color: w.color || fallback?.color || 'from-emerald-500 to-teal-500'
        };
      });
    } catch {
      return initialWorkouts;
    }
  });

  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem('fitlife_foods');
    if (!saved) return initialFoods;
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return initialFoods;
      return parsed.map((f) => {
        const fallback = initialFoods.find((iFood) => iFood.id === f.id);
        return {
          ...fallback,
          ...f,
          name: f.name || fallback?.name,
          benefits: f.benefits || fallback?.benefits,
          category: f.category || fallback?.category || 'protein',
          image: f.image || fallback?.image || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
          badge: f.badge || fallback?.badge || 'Superfood',
          emoji: f.emoji || fallback?.emoji || '🥗'
        };
      });
    } catch {
      return initialFoods;
    }
  });

  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('fitlife_articles');
    if (!saved) return initialArticles;
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((a) => {
        const fallback = initialArticles.find((ia) => ia.id === a.id);
        const summ = a.summary || a.excerpt || fallback?.summary || fallback?.excerpt || {
          uz: "Salomatlik va sport bo'yicha ilmiy maqola",
          ru: "Научная статья о здоровье и спорте",
          en: "Scientific article on health and sports"
        };
        return {
          ...a,
          image: a.image || fallback?.image || 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
          summary: summ,
          excerpt: summ
        };
      });
    } catch {
      return initialArticles;
    }
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('fitlife_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Active Modals
  const [activeWorkoutForTimer, setActiveWorkoutForTimer] = useState(null);
  const [activeArticleForModal, setActiveArticleForModal] = useState(null);

  // Sync Theme to HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fitlife_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fitlife_theme', 'light');
    }
  }, [isDark]);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('fitlife_lang', lang);
  }, [lang]);

  // Sync Current Tab to localStorage and URL Hash
  useEffect(() => {
    localStorage.setItem('fitlife_current_tab', currentTab);
    if (window.location.hash.replace('#', '') !== currentTab) {
      window.location.hash = currentTab;
    }
  }, [currentTab]);

  // Support Browser Back/Forward buttons via hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const validTabs = ['home', 'workouts', 'nutrition', 'calculators', 'articles', 'admin'];
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const t = translations[lang] || translations.uz;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        t={t}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomePage
            t={t}
            lang={lang}
            workouts={workouts}
            foods={foods}
            articles={articles}
            setCurrentTab={setCurrentTab}
            onStartWorkout={(w) => setActiveWorkoutForTimer(w)}
            onOpenArticle={(a) => setActiveArticleForModal(a)}
          />
        )}

        {currentTab === 'workouts' && (
          <WorkoutsPage
            workouts={workouts}
            lang={lang}
            t={t}
            onStartWorkout={(w) => setActiveWorkoutForTimer(w)}
          />
        )}

        {currentTab === 'nutrition' && (
          <NutritionPage
            foods={foods}
            lang={lang}
            t={t}
          />
        )}

        {currentTab === 'calculators' && (
          <CalculatorsPage
            lang={lang}
            t={t}
          />
        )}

        {currentTab === 'articles' && (
          <ArticlesPage
            articles={articles}
            lang={lang}
            t={t}
            onOpenArticle={(a) => setActiveArticleForModal(a)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPage
            workouts={workouts}
            setWorkouts={setWorkouts}
            foods={foods}
            setFoods={setFoods}
            articles={articles}
            setArticles={setArticles}
            users={users}
            setUsers={setUsers}
            lang={lang}
            t={t}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer t={t} setCurrentTab={setCurrentTab} />

      {/* Interactive Workout Timer Modal */}
      {activeWorkoutForTimer && (
        <WorkoutTimerModal
          workout={activeWorkoutForTimer}
          lang={lang}
          t={t}
          onClose={() => setActiveWorkoutForTimer(null)}
          onComplete={(w) => {
            // Optional: update user burned calories
          }}
        />
      )}

      {/* Full Article Reader Modal */}
      {activeArticleForModal && (
        <ArticleModal
          article={activeArticleForModal}
          lang={lang}
          t={t}
          onClose={() => setActiveArticleForModal(null)}
        />
      )}

    </div>
  );
}
