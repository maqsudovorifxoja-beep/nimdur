import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Trash2, 
  Volume2, 
  VolumeX, 
  X, 
  Play, 
  ArrowRight, 
  Copy, 
  Check, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { generateAiResponse } from '../utils/aiAssistantEngine';
import { sounds } from '../utils/audio';

export default function AIAssistant({
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  lang = 'uz',
  t,
  workouts = [],
  foods = [],
  articles = [],
  setCurrentTab,
  onStartWorkout,
  onOpenArticle
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledSetIsOpen || setInternalIsOpen;

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('fitlife_ai_sound') !== 'false';
  });
  const [copiedId, setCopiedId] = useState(null);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  // Initial welcome message per language
  const getInitialMessage = () => ({
    id: 'welcome-msg',
    sender: 'ai',
    text: t?.aiGreeting || (
      lang === 'ru' 
        ? "Здравствуйте! Я ваш персональный FitLife AI-тренер 🤖. Готов помочь с выбором тренировки, расчетом калорий и меню правильного питания!" 
        : lang === 'en'
        ? "Hello! I am your personal FitLife AI fitness coach 🤖. Ask me anything about workout plans, nutrition, BMI, or healthy habits!"
        : "Salom! Men sizning FitLife AI murabbiyingizman 🤖. Mashg'ulot tanlash, to'g'ri ovqatlanish, kaloriya yoki vazn balansi bo'yicha har qanday savolingizga javob berishga tayyorman!"
    ),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action: null
  });

  // Chat message history with localStorage persistence
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('fitlife_ai_chat_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [getInitialMessage()];
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isTyping]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem('fitlife_ai_chat_v2', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem('fitlife_ai_sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  // Quick suggestions list
  const quickSuggestions = [
    { label: t?.aiPromptBurnFat || "🔥 Qorin yog'ini ketkazish", query: lang === 'ru' ? "Как убрать жир на животе?" : lang === 'en' ? "How to burn belly fat?" : "Qorin yog'ini qanday ketkazish mumkin?" },
    { label: t?.aiPromptCardio || "🏃 15 daqiqalik kardio", query: lang === 'ru' ? "Посоветуй интенсивное кардио" : lang === 'en' ? "Recommend a quick cardio routine" : "Kardio mashg'ulot tavsiya et" },
    { label: t?.aiPromptDiet || "🥗 Ozish uchun taomnoma", query: lang === 'ru' ? "Какая диета лучше для похудения?" : lang === 'en' ? "What is the best diet for fat loss?" : "Ozish uchun qanday taomlar yeyish kerak?" },
    { label: t?.aiPromptPreWorkout || "🍎 Mashqdan oldin ovqatlanish", query: lang === 'ru' ? "Что есть перед тренировкой?" : lang === 'en' ? "What to eat before a workout?" : "Mashg'ulotdan oldin nima yeyish kerak?" },
    { label: t?.aiPromptWater || "💧 Kunlik suv me'yori", query: lang === 'ru' ? "Сколько воды нужно пить в день?" : lang === 'en' ? "How much water to drink daily?" : "Kuniga qancha suv ichish kerak?" },
    { label: t?.aiPromptBmi || "📊 BMI va kaloriya hisobi", query: lang === 'ru' ? "Как рассчитать ИМТ и калории?" : lang === 'en' ? "How to calculate BMI and daily calories?" : "BMI va kunlik kaloriyani qanday hisoblayman?" },
    { label: t?.aiPromptRecovery || "😴 Uyqu va mushak tiklanishi", query: lang === 'ru' ? "Как сон влияет на мышцы?" : lang === 'en' ? "How does sleep affect muscle recovery?" : "Uyqu va mushaklar tiklanishi haqida ma'lumot ber" },
  ];

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    if (soundEnabled && sounds.playMessagePop) {
      sounds.playMessagePop();
    }

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: null
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI thinking delay (400-750ms for natural feel)
    const delay = Math.min(800, Math.max(450, query.length * 15));
    setTimeout(() => {
      const aiReply = generateAiResponse(query, lang, { workouts, foods, articles });
      
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: aiReply.action || null
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      if (soundEnabled && sounds.playAiResponse) {
        sounds.playAiResponse();
      }
    }, delay);
  };

  const handleClearChat = () => {
    const confirmMsg = t?.aiAssistantClearConfirm || "Chat tarixini tozalashni xohlaysizmi?";
    if (window.confirm(confirmMsg)) {
      const resetMsg = [getInitialMessage()];
      setMessages(resetMsg);
      try {
        localStorage.setItem('fitlife_ai_chat_v2', JSON.stringify(resetMsg));
      } catch {}
    }
  };

  const handleCopyText = (id, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExecuteAction = (action) => {
    if (!action) return;
    if (action.type === 'workout' && action.workout) {
      onStartWorkout?.(action.workout);
    } else if (action.type === 'article' && action.article) {
      onOpenArticle?.(action.article);
    } else if (action.type === 'navigate' && action.tab) {
      setCurrentTab?.(action.tab);
    }
  };

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
        
        {/* Proactive hint bubble (shown when closed) */}
        {!isOpen && showNotificationBadge && (
          <div className="mb-3 mr-1 animate-fade-in flex items-center gap-2 bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100 px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-500/20 text-xs sm:text-sm font-medium backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t?.aiAssistantBubbleHint || "Salom! FitLife AI Murabbiy sizga yordamga tayyor ✨"}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationBadge(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1 p-0.5 rounded-full"
              title="Yopish"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Trigger Button */}
        <button
          id="fitlife-ai-assistant-toggle"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotificationBadge(false);
          }}
          aria-label="FitLife AI Murabbiy"
          className={`group relative flex items-center gap-2.5 px-4 py-3.5 sm:px-5 sm:py-3.5 rounded-full font-semibold text-white shadow-2xl transition-all duration-300 active:scale-95 ${
            isOpen
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-rose-500/30'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 shadow-emerald-500/40 hover:scale-105'
          }`}
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
              <span className="text-sm font-medium hidden sm:inline">Yopish</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
                <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-sm font-semibold tracking-wide">
                {t?.aiAssistantBadge || 'AI Murabbiy'}
              </span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* 2. MAIN CHAT WIDGET MODAL / POPUP */}
      {isOpen && (
        <div 
          id="fitlife-ai-modal"
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[82vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-emerald-500/30 dark:border-emerald-500/20 flex flex-col overflow-hidden backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Top Header */}
          <div className="relative px-4 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-between select-none shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-wide leading-tight">
                    {t?.aiAssistantTitle || 'FitLife AI Murabbiy'}
                  </h3>
                  <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full font-mono font-medium">
                    v2.6
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 font-light flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  {t?.aiAssistantOnline || 'Online'} • 24/7 Smart Coach
                </p>
              </div>
            </div>

            {/* Header controls */}
            <div className="flex items-center gap-1 text-emerald-100">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-xl hover:bg-white/15 transition-colors"
                title={soundEnabled ? (t?.aiSoundOn || "Ovoz yoqilgan") : (t?.aiSoundOff || "Ovoz o'chirilgan")}
                aria-label="Sound Toggle"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-emerald-300/70" />}
              </button>

              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-xl hover:bg-white/15 transition-colors"
                title={t?.aiAssistantClear || "Tarixni tozalash"}
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/15 transition-colors ml-0.5"
                title="Yopish"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips Carousel */}
          <div className="px-3 py-2 bg-slate-50/90 dark:bg-gray-800/60 border-b border-slate-200/60 dark:border-gray-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap pl-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
            </span>
            {quickSuggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.query)}
                disabled={isTyping}
                className="whitespace-nowrap text-xs bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-gray-700/80 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-xs shrink-0 active:scale-95 disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-gray-950/40 text-slate-800 dark:text-slate-100">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] group flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 text-xs sm:text-sm rounded-2xl shadow-xs leading-relaxed relative ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs shadow-emerald-500/10'
                        : 'bg-white dark:bg-gray-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/70 dark:border-gray-700/60 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {/* Message Body with clean markdown/newlines rendering */}
                    <div className="whitespace-pre-line space-y-1">
                      {msg.text}
                    </div>

                    {/* Interactive Action Card if provided by AI */}
                    {msg.action && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-700/80 flex flex-col gap-2">
                        {msg.action.workout && (
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-gray-900/80 border border-slate-200/50 dark:border-gray-700/50">
                            <img
                              src={msg.action.workout.image}
                              alt="Workout"
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                                {msg.action.workout.title?.[lang] || msg.action.workout.title?.uz}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                ⏱ {msg.action.workout.duration} min • 🔥 {msg.action.workout.calories} kcal
                              </p>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => handleExecuteAction(msg.action)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                        >
                          {msg.action.type === 'workout' && <Play className="w-3.5 h-3.5 fill-current" />}
                          {msg.action.label}
                          {msg.action.type === 'navigate' && <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message timestamp and copy button */}
                  <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-slate-400 dark:text-slate-500">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:text-emerald-500"
                        title={copiedId === msg.id ? (t?.aiCopySuccess || "Nusxalandi!") : "Nusxa olish"}
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-end justify-start animate-fade-in">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-xs border border-slate-200/70 dark:border-gray-700/60 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.3s]"></span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-1">
                    {t?.aiAssistantThinking || "FitLife AI tahlil qilmoqda..."}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-gray-900 border-t border-slate-200/80 dark:border-gray-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t?.aiAssistantPlaceholder || "AI murabbiydan so'rang..."}
              disabled={isTyping}
              className="flex-1 bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-40 disabled:hover:from-emerald-500 disabled:hover:to-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-95"
              aria-label={t?.aiAssistantSend || "Yuborish"}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
