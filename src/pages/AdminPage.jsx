import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  Dumbbell, 
  Apple, 
  BookOpen, 
  Trash2, 
  Plus, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Server, 
  Cpu, 
  HardDrive, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Search,
  Filter,
  Download,
  Flame,
  UserCheck,
  ChevronRight,
  Database
} from 'lucide-react';
import { weeklyAnalytics } from '../data/mockData';
import AdminAddModal from '../components/AdminAddModal';

export default function AdminPage({ 
  workouts, 
  setWorkouts, 
  foods, 
  setFoods, 
  articles, 
  setArticles, 
  users, 
  setUsers, 
  lang, 
  t 
}) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('fitlife_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab: 'dashboard' | 'workouts' | 'foods' | 'articles' | 'users' | 'system'
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('fitlife_admin_active_tab') || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('fitlife_admin_active_tab', activeTab);
  }, [activeTab]);
  const [modalType, setModalType] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Search queries per table
  const [workoutSearch, setWorkoutSearch] = useState('');
  const [foodSearch, setFoodSearch] = useState('');
  const [articleSearch, setArticleSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Toast notifier
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLogin = (e) => {
    e?.preventDefault();
    setLoginError('');

    const email = loginEmail.trim().toLowerCase();
    const pass = loginPassword.trim();

    // Default admin credentials: admin / admin123 OR admin@fitlife.uz / admin123
    if ((email === 'admin' || email === 'admin@fitlife.uz') && pass === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('fitlife_admin_auth', 'true');
      showToast("Xush kelibsiz, Bosh Administrator!");
    } else {
      setLoginError("Login yoki parol noto'g'ri! Test uchun: admin / admin123");
    }
  };

  // Demo 1-click Quick Login
  const handleQuickLogin = () => {
    setLoginEmail('admin@fitlife.uz');
    setLoginPassword('admin123');
    setIsAuthenticated(true);
    localStorage.setItem('fitlife_admin_auth', 'true');
    showToast("Test Administrator hisobiga kirildi!");
  };

  // Logout handler
  const handleLogout = () => {
    if (confirm("Admin paneldan chiqmoqchimisiz?")) {
      setIsAuthenticated(false);
      localStorage.removeItem('fitlife_admin_auth');
      localStorage.removeItem('fitlife_admin_active_tab');
      showToast("Admin sessiyasi yakunlandi.");
    }
  };

  // Delete Handlers
  const handleDeleteWorkout = (id) => {
    if (confirm("Ushbu mashg'ulotni o'chirishga ishonchingiz komilmi?")) {
      const updated = workouts.filter(w => w.id !== id);
      setWorkouts(updated);
      localStorage.setItem('fitlife_workouts', JSON.stringify(updated));
      showToast(t.successDelete || "Muvaffaqiyatli o'chirildi!");
    }
  };

  const handleDeleteFood = (id) => {
    if (confirm("Ushbu mahsulotni o'chirishga ishonchingiz komilmi?")) {
      const updated = foods.filter(f => f.id !== id);
      setFoods(updated);
      localStorage.setItem('fitlife_foods', JSON.stringify(updated));
      showToast(t.successDelete || "Muvaffaqiyatli o'chirildi!");
    }
  };

  const handleDeleteArticle = (id) => {
    if (confirm("Ushbu maqolani o'chirishga ishonchingiz komilmi?")) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      localStorage.setItem('fitlife_articles', JSON.stringify(updated));
      showToast(t.successDelete || "Muvaffaqiyatli o'chirildi!");
    }
  };

  const handleDeleteUser = (id) => {
    if (confirm("Ushbu foydalanuvchini o'chirishga ishonchingiz komilmi?")) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      localStorage.setItem('fitlife_users', JSON.stringify(updated));
      showToast("Foydalanuvchi muvaffaqiyatli o'chirildi!");
    }
  };

  const handleToggleUserStatus = (id) => {
    const updated = users.map(u => {
      if (u.id === id) {
        return { 
          ...u, 
          status: (u.status === 'active' || u.status === 'Active') ? 'pending' : 'active' 
        };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('fitlife_users', JSON.stringify(updated));
    showToast("Foydalanuvchi holati yangilandi!");
  };

  // Save new item from modal
  const handleSaveNewItem = (type, item) => {
    if (type === 'workout') {
      const updated = [item, ...workouts];
      setWorkouts(updated);
      localStorage.setItem('fitlife_workouts', JSON.stringify(updated));
    } else if (type === 'food') {
      const updated = [item, ...foods];
      setFoods(updated);
      localStorage.setItem('fitlife_foods', JSON.stringify(updated));
    } else if (type === 'article') {
      const updated = [item, ...articles];
      setArticles(updated);
      localStorage.setItem('fitlife_articles', JSON.stringify(updated));
    }
    showToast(t.successSave || "Muvaffaqiyatli saqlandi!");
  };

  // Database Backup JSON Download
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      workouts,
      foods,
      articles,
      users
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitlife-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Ma'lumotlar bazasi zaxira nusxasi yuklab olindi!");
  };

  // Filtered lists
  const filteredWorkouts = useMemo(() => {
    const q = workoutSearch.toLowerCase().trim();
    if (!q) return workouts;
    return workouts.filter(w => {
      const title = (w.title[lang] || w.title.uz || '').toLowerCase();
      const cat = (w.category || '').toLowerCase();
      return title.includes(q) || cat.includes(q);
    });
  }, [workouts, workoutSearch, lang]);

  const filteredFoods = useMemo(() => {
    const q = foodSearch.toLowerCase().trim();
    if (!q) return foods;
    return foods.filter(f => {
      const name = (f.name[lang] || f.name.uz || '').toLowerCase();
      const cat = (f.category || '').toLowerCase();
      return name.includes(q) || cat.includes(q);
    });
  }, [foods, foodSearch, lang]);

  const filteredArticles = useMemo(() => {
    const q = articleSearch.toLowerCase().trim();
    if (!q) return articles;
    return articles.filter(a => {
      const title = (a.title[lang] || a.title.uz || '').toLowerCase();
      const author = (a.author || '').toLowerCase();
      return title.includes(q) || author.includes(q);
    });
  }, [articles, articleSearch, lang]);

  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase().trim();
    if (!q) return users;
    return users.filter(u => {
      const name = (u.name || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [users, userSearch]);

  const maxWeeklyWorkouts = Math.max(...weeklyAnalytics.map(d => d.workouts));

  // ==========================================
  // 1. LOGIN SCREEN (IF NOT AUTHENTICATED)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md">
          {/* Ambient Glows */}
          <div className="absolute -top-10 -left-10 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl">
            {/* Header Icon */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 mb-4 animate-in zoom-in-50">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Admin Boshqaruv Markazi
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-xs">
                Platforma ma'lumotlarini boshqarish uchun xavfsiz administrator tizimiga kiring
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in shake">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Admin Login yoki Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin yoki admin@fitlife.uz"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Parol
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>Tizimga Kirish</span>
              </button>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                  🔑 Test hisob ma'lumotlari:
                </p>
                <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  Login: <span className="font-bold text-slate-800 dark:text-slate-200">admin</span> • Parol: <span className="font-bold text-slate-800 dark:text-slate-200">admin123</span>
                </p>
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="w-full py-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
                >
                  ⚡ 1-klikda tezkor kirish
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Admin Two-Column Layout (Sidebar + Content Workspace) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================================================== */}
        {/* 1. LEFT SIDEBAR                                     */}
        {/* ==================================================== */}
        <aside className="lg:col-span-3 xl:col-span-3 space-y-5 lg:sticky lg:top-24">
          
          {/* Admin Profile & Brand Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/25 shrink-0">
                A
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm truncate">
                    Jasurbek T.
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white font-extrabold text-[9px] uppercase tracking-wider shrink-0">
                    ROOT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  admin@fitlife.uz
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
              <button
                onClick={handleExportBackup}
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-[11px] font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all cursor-pointer"
                title="Baza zaxirasini yuklab olish"
              >
                <Download className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zaxira</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-[11px] font-bold bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 border border-rose-500/20 transition-all cursor-pointer"
                title="Tizimdan chiqish"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Chiqish</span>
              </button>
            </div>
          </div>

          {/* Navigation Sidebar Menu */}
          <div className="p-3.5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-1.5">
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Boshqaruv Paneli
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: t.adminTabDashboard, icon: TrendingUp },
                { id: 'workouts', label: t.adminTabWorkouts, icon: Dumbbell, count: workouts.length },
                { id: 'foods', label: t.adminTabFoods, icon: Apple, count: foods.length },
                { id: 'articles', label: t.adminTabArticles, icon: BookOpen, count: articles.length },
                { id: 'users', label: t.adminTabUsers, icon: Users, count: users.length },
                { id: 'system', label: t.adminTabSystem, icon: Server }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-xl ${
                        isActive ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold">{tab.label}</span>
                    </div>

                    {tab.count !== undefined ? (
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold ${
                        isActive 
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}>
                        {tab.count}
                      </span>
                    ) : tab.id === 'system' ? (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick System Stats Mini Widget */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/20 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Tizim Holati
              </span>
              <span className="text-emerald-500 text-[11px]">Faol (99.98%)</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-[99.98%]" />
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Versiya 2.4.0 • FitLife Cloud Sync
            </p>
          </div>

        </aside>

        {/* ==================================================== */}
        {/* 2. RIGHT MAIN WORKSPACE                             */}
        {/* ==================================================== */}
        <main className="lg:col-span-9 xl:col-span-9 space-y-6 w-full min-w-0">
          
          {/* KPI Cards Strip */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">{t.kpiTotalUsers}</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">{users.length} a'zo</span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+14.2% o'sish</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">{t.kpiActiveWorkouts}</span>
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
                  <Dumbbell className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">{workouts.length} dastur</span>
              <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">Faol katalog</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">{t.kpiTotalArticles}</span>
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">{articles.length} maqola</span>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">Ekspert blogi</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">{t.kpiSystemHealth}</span>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-500 block">99.98%</span>
              <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">Ping: 14ms • Barqaror</span>
            </div>
          </div>

      {/* ==========================================
          TAB 1: DASHBOARD & ANALYTICS
         ========================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Weekly Activity SVG Bar Chart */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t.weeklyActivity}
                  </h3>
                  <p className="text-xs text-slate-400">Kunlik yakunlangan mashg'ulotlar soni</p>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                  +28% o'sish
                </span>
              </div>

              {/* Bar Chart */}
              <div className="h-52 flex items-end justify-between gap-3 pt-6 px-2">
                {weeklyAnalytics.map((dayData, idx) => {
                  const heightPercent = Math.round((dayData.workouts / maxWeeklyWorkouts) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {dayData.workouts}
                      </span>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-xl h-36 flex items-end overflow-hidden">
                        <div
                          className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-xl transition-all duration-500 group-hover:from-emerald-600 group-hover:to-teal-500"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        {dayData.day[lang] || dayData.day.uz}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Calorie Burn Dynamics */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t.caloricChart}
                  </h3>
                  <p className="text-xs text-slate-400">Foydalanuvchilar yoqqan umumiy kaloriyalar</p>
                </div>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-xl">
                  1.18M kkal / hafta
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3 pt-2">
                {weeklyAnalytics.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300 font-bold">{item.day[lang] || item.day.uz}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono">{item.calories.toLocaleString()} kkal</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-rose-400 h-2.5 rounded-full"
                        style={{ width: `${Math.round((item.calories / 265000) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Creation CTA Strip */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tezkor Yangi Ma'lumot Kiritish</h4>
              <p className="text-xs text-slate-500">Platformaga yangi mashg'ulot, ovqatlanish mahsuloti yoki maqola qo'shing</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setModalType('workout')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Mashg'ulot
              </button>
              <button
                onClick={() => setModalType('food')}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Mahsulot
              </button>
              <button
                onClick={() => setModalType('article')}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Maqola
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ==========================================
          TAB 2: WORKOUTS TABLE
         ========================================== */}
      {activeTab === 'workouts' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mashg'ulotlar Dasturlari</h3>
              <p className="text-xs text-slate-500">Jami: {workouts.length} ta dastur mavjud</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={workoutSearch}
                  onChange={(e) => setWorkoutSearch(e.target.value)}
                  placeholder="Qidirish..."
                  className="pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => setModalType('workout')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Qo'shish</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">{t.thTitle}</th>
                  <th className="py-3 px-4">{t.thCategory}</th>
                  <th className="py-3 px-4">{t.thLevel}</th>
                  <th className="py-3 px-4">{t.thDuration}</th>
                  <th className="py-3 px-4">{t.thCalories}</th>
                  <th className="py-3 px-4 text-right">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {filteredWorkouts.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${w.color || 'from-emerald-500 to-teal-500'} text-white flex items-center justify-center shadow-xs shrink-0`}>
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <span className="truncate max-w-xs">{w.title[lang] || w.title.uz}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-700 dark:text-slate-300 uppercase text-[10px]">
                        {w.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold capitalize">{w.level}</td>
                    <td className="py-3.5 px-4 font-medium">{w.duration} daqiqa</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-500">{w.calories} kkal</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteWorkout(w.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: FOODS TABLE
         ========================================== */}
      {activeTab === 'foods' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Oziq-Ovqat va Superfoodlar</h3>
              <p className="text-xs text-slate-500">Jami: {foods.length} ta mahsulot ro'yxatda</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="Qidirish..."
                  className="pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => setModalType('food')}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Qo'shish</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">{t.thTitle}</th>
                  <th className="py-3 px-4">{t.thCategory}</th>
                  <th className="py-3 px-4">{t.thCalories}</th>
                  <th className="py-3 px-4">Oqsil</th>
                  <th className="py-3 px-4">Yog'</th>
                  <th className="py-3 px-4">Uglevod</th>
                  <th className="py-3 px-4 text-right">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {filteredFoods.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <span className="text-2xl">{f.emoji || '🥗'}</span>
                      <span>{f.name[lang] || f.name.uz}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">
                        {f.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">{f.calories} kkal</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">{f.protein}g</td>
                    <td className="py-3.5 px-4 text-amber-500 font-bold">{f.fat}g</td>
                    <td className="py-3.5 px-4 text-cyan-500 font-bold">{f.carbs}g</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteFood(f.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 4: ARTICLES TABLE
         ========================================== */}
      {activeTab === 'articles' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ilmiy Maqolalar & Blog</h3>
              <p className="text-xs text-slate-500">Jami: {articles.length} ta maqola chop etilgan</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  placeholder="Qidirish..."
                  className="pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => setModalType('article')}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Qo'shish</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">{t.thTitle}</th>
                  <th className="py-3 px-4">{t.author}</th>
                  <th className="py-3 px-4">{t.thCategory}</th>
                  <th className="py-3 px-4">{t.date}</th>
                  <th className="py-3 px-4">{t.likes}</th>
                  <th className="py-3 px-4 text-right">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {filteredArticles.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                      {a.title[lang] || a.title.uz}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{a.author}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px]">
                        {a.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{a.date}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-rose-500">❤️ {a.likes}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteArticle(a.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 5: USERS DIRECTORY
         ========================================== */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.adminTabUsers}</h3>
              <p className="text-xs text-slate-500">Ro'yxatdan o'tgan a'zolar ({users.length} ta)</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Foydalanuvchini qidirish..."
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Foydalanuvchi</th>
                  <th className="py-3 px-4">{t.thEmail}</th>
                  <th className="py-3 px-4">{t.thRole}</th>
                  <th className="py-3 px-4">{t.thStatus}</th>
                  <th className="py-3 px-4 text-right">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {filteredUsers.map((u) => {
                  const isActiveStatus = (u.status || '').toLowerCase() === 'active';
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                          {u.name?.charAt(0) || 'U'}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.role === 'Admin' 
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                            : u.role?.includes('Trainer') || u.role === 'Coach'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            isActiveStatus
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isActiveStatus ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span>{isActiveStatus ? 'Faol (Active)' : 'Kutilmoqda (Pending)'}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Foydalanuvchini o'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 6: SYSTEM TELEMETRY & BACKUP
         ========================================== */}
      {activeTab === 'system' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <Cpu className="w-5 h-5" />
                <span>Server Yuklamasi (CPU)</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">18.4%</div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full w-[18%]" />
              </div>
              <p className="text-[11px] text-slate-400">8 yadroli server past yuklamada barqaror ishlamoqda.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                <HardDrive className="w-5 h-5" />
                <span>Operativ Xotira (RAM)</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">3.2 / 16 GB</div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-2.5 rounded-full w-[24%]" />
              </div>
              <p className="text-[11px] text-slate-400">Xotira zahirasining 76% qismi bo'sh.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Xavfsizlik & SSL</span>
              </div>
              <div className="text-3xl font-black text-emerald-500">TLS 1.3 Faol</div>
              <p className="text-[11px] text-slate-400">Sertifikat muddati: 2026-yil oxirigacha amal qiladi.</p>
              <button
                onClick={() => showToast("Xavfsizlik skaneri: Tizimda xatolar topilmadi!")}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
              >
                Xavfsizlikni tekshirish
              </button>
            </div>
          </div>

          {/* Database Backup Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Ma'lumotlar Bazasi Zaxira Nusxasi (Backup)</h4>
                <p className="text-xs text-slate-500">Platformadagi barcha mashqlar, ovqatlar, maqolalar va foydalanuvchilar JSON formatida saqlanadi.</p>
              </div>
            </div>

            <button
              onClick={handleExportBackup}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Zaxira Nusxani Yuklash (JSON)</span>
            </button>
          </div>
        </div>
      )}

        </main>
      </div>

      {/* Add Modal Form */}
      {modalType && (
        <AdminAddModal
          type={modalType}
          t={t}
          onClose={() => setModalType(null)}
          onSave={handleSaveNewItem}
        />
      )}

    </div>
  );
}
