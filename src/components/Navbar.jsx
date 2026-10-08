import { useState } from 'react';
import { 
  Activity, 
  Dumbbell, 
  Apple, 
  Calculator, 
  BookOpen, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X,
  Sparkles,
  Flame
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  isDark, 
  setIsDark, 
  t,
  onQuickStart 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.home, icon: Sparkles },
    { id: 'workouts', label: t.workouts, icon: Dumbbell },
    { id: 'nutrition', label: t.nutrition, icon: Apple },
    { id: 'calculators', label: t.calculators, icon: Calculator },
    { id: 'articles', label: t.articles, icon: BookOpen },
    { id: 'admin', label: t.admin, icon: ShieldCheck, badge: 'PRO' }
  ];

  const languages = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  const handleNavClick = (id) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300 bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Activity className="w-5 h-5 text-white stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
            <div className="whitespace-nowrap">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {t.appName.split('&')[0]}
                </span>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-800 dark:text-white">
                  & {t.appName.split('&')[1] || 'Sport'}
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Health & Longevity 2026
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-500 stroke-[2.5]' : 'opacity-70'}`} />
                  <span className="whitespace-nowrap leading-none">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md bg-rose-500 text-white shadow-xs shrink-0 whitespace-nowrap">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Workout Button - only on wider screens to prevent crowding */}
            <button
              onClick={onQuickStart}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Flame className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="whitespace-nowrap leading-none">{t.startNow}</span>
            </button>

            {/* Unified Language & Theme Capsule */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs shrink-0">
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700/80 hover:shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
                  aria-label="Select Language"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="uppercase text-[11px] font-extrabold tracking-wide">{lang}</span>
                </button>

                {langMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-40 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setLangMenuOpen(false)}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-left transition-colors ${
                          lang === l.code 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' 
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </span>
                        {lang === l.code && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vertical subtle divider */}
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5" />

              {/* Dark / Light Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700/80 hover:shadow-xs transition-all cursor-pointer shrink-0"
                title={isDark ? "Light mode" : "Dark mode"}
                aria-label="Toggle Dark Mode"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-500 transition-transform -rotate-12 hover:rotate-0 duration-300" />
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-1 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'opacity-70'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuickStart();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20"
            >
              <Flame className="w-5 h-5 text-amber-300" />
              <span>{t.startNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
