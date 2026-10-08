// Mock data for FitLife & Sport platform

export const initialWorkouts = [
  {
    id: 'w1',
    category: 'cardio',
    level: 'intermediate',
    duration: 25,
    calories: 280,
    title: {
      uz: 'Intensiv Yog\' Yoquvchi Kardio',
      ru: 'Интенсивное Жиросжигающее Кардио',
      en: 'High-Burn Fat Shred Cardio'
    },
    description: {
      uz: 'Yurak qon-tomir tizimini kuchaytiruvchi va maksimal kaloriya sarflaydigan dinamik kardio kompleksi.',
      ru: 'Динамичный комплекс кардио для укрепления сердечно-сосудистой системы и сжигания максимума калорий.',
      en: 'Dynamic cardio routine designed to strengthen cardiovascular stamina and burn maximum calories.'
    },
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
    icon: 'Flame',
    color: 'from-orange-500 to-amber-500',
    exercises: [
      { name: { uz: 'Jumping Jacks (Sakrash)', ru: 'Jumping Jacks (Прыжки)', en: 'Jumping Jacks' }, duration: 45, rest: 15, reps: '45 sek' },
      { name: { uz: 'High Knees (Tizlarni ko\'tarish)', ru: 'Бег с высоким подниманием колен', en: 'High Knees' }, duration: 40, rest: 20, reps: '40 sek' },
      { name: { uz: 'Burpee (Byorpi)', ru: 'Бёрпи с прыжком', en: 'Burpees' }, duration: 30, rest: 20, reps: '12-15 marta' },
      { name: { uz: 'Mountain Climbers (Tog\'chi)', ru: 'Альпинист', en: 'Mountain Climbers' }, duration: 40, rest: 20, reps: '40 sek' },
      { name: { uz: 'Shadow Boxing (Soya jangi)', ru: 'Бой с тенью', en: 'Shadow Boxing' }, duration: 45, rest: 15, reps: '45 sek' }
    ]
  },
  {
    id: 'w2',
    category: 'strength',
    level: 'beginner',
    duration: 30,
    calories: 230,
    title: {
      uz: 'Uy Sharoitida Butun Tana Kuch Mashqlari',
      ru: 'Силовая Тренировка Всего Тела Дома',
      en: 'Full Body Home Strength Routine'
    },
    description: {
      uz: 'Maxsus anjomlarsiz o\'z tana vazni bilan asosiy mushak guruhlarini baquvvat qilish dasturi.',
      ru: 'Программа тренировки с весом собственного тела для развития мышц без специального инвентаря.',
      en: 'No-equipment calisthenics routine targeting all primary muscle groups using body weight.'
    },
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    icon: 'Dumbbell',
    color: 'from-emerald-500 to-teal-500',
    exercises: [
      { name: { uz: 'Klassik Otjimanie (Push-ups)', ru: 'Классические отжимания', en: 'Classic Push-ups' }, duration: 40, rest: 25, reps: '12-15 marta' },
      { name: { uz: 'Tana vaznida Prised (Squats)', ru: 'Приседания со своим весом', en: 'Bodyweight Squats' }, duration: 45, rest: 20, reps: '20 marta' },
      { name: { uz: 'Orqaga Vipadlar (Lunges)', ru: 'Выпады назад', en: 'Reverse Lunges' }, duration: 40, rest: 20, reps: '12 har bir oyoqqa' },
      { name: { uz: 'Kresloda Triceps Otjimanie', ru: 'Обратные отжимания на трицепс', en: 'Chair Tricep Dips' }, duration: 35, rest: 25, reps: '15 marta' },
      { name: { uz: 'Yelka Supermen mashqi', ru: 'Лодочка (Супермен)', en: 'Superman Back Extension' }, duration: 40, rest: 20, reps: '15 marta' }
    ]
  },
  {
    id: 'w3',
    category: 'abs',
    level: 'intermediate',
    duration: 18,
    calories: 160,
    title: {
      uz: 'Temir Press & Bel Mashqlari',
      ru: 'Стальной Пресс и Мышцы Кора',
      en: 'Iron Core & Six-Pack Burn'
    },
    description: {
      uz: 'Qorin mushaklarini chuqur ishlatuvchi, belni qotiruvchi va qorin yog\'larini kamaytiruvchi kompleks.',
      ru: 'Глубокая проработка прямой и косых мышц живота для красивого рельефа и крепкого кора.',
      en: 'Sculpt your abdominal wall and reinforce core stability with targeted rotational and static holds.'
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    icon: 'Zap',
    color: 'from-violet-500 to-indigo-500',
    exercises: [
      { name: { uz: 'Klassik Plank (Planka)', ru: 'Классическая планка', en: 'Classic Plank' }, duration: 50, rest: 20, reps: '50 sek' },
      { name: { uz: 'Velosiped Krenchi (Bicycle)', ru: 'Скручивания "Велосипед"', en: 'Bicycle Crunches' }, duration: 45, rest: 20, reps: '20 marta' },
      { name: { uz: 'Oyoqlarni ko\'tarish (Leg Raises)', ru: 'Подъем прямых ног лежа', en: 'Lying Leg Raises' }, duration: 40, rest: 25, reps: '15 marta' },
      { name: { uz: 'Rus burilishi (Russian Twist)', ru: 'Русский твист', en: 'Russian Twists' }, duration: 45, rest: 20, reps: '30 marta' },
      { name: { uz: 'Yonbosh Planka (Side Plank)', ru: 'Боковая планка (по 30 сек)', en: 'Side Plank' }, duration: 60, rest: 20, reps: '30s har bir tomonga' }
    ]
  },
  {
    id: 'w4',
    category: 'yoga',
    level: 'beginner',
    duration: 35,
    calories: 140,
    title: {
      uz: 'Ertalabki Yoga & Butun Tana Cho\'zilishi',
      ru: 'Утренняя Йога и Мягкая Растяжка',
      en: 'Morning Awakening Yoga & Full Stretch'
    },
    description: {
      uz: 'Bo\'g\'imlar harakatchanligini tiklovchi, stressni yenguvchi va tetiklik baxsh etuvchi sokin amaliyot.',
      ru: 'Спокойная практика для гибкости суставов, снятия мышечных зажимов и бодрого начала дня.',
      en: 'A soothing sequence improving joint mobility, decompressing the spine, and relieving morning stiffness.'
    },
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    icon: 'Sparkles',
    color: 'from-sky-500 to-cyan-500',
    exercises: [
      { name: { uz: 'Mushuk-Sigir holati (Cat-Cow)', ru: 'Поза кошки-коровы', en: 'Cat-Cow Flow' }, duration: 60, rest: 15, reps: '1 daqiqa' },
      { name: { uz: 'Pastga qaragan it (Downward Dog)', ru: 'Собака мордой вниз', en: 'Downward-Facing Dog' }, duration: 50, rest: 15, reps: '50 sek' },
      { name: { uz: 'Kobra holati (Cobra Pose)', ru: 'Поза Кобры', en: 'Cobra Pose' }, duration: 45, rest: 15, reps: '45 sek' },
      { name: { uz: 'Jangchi I va II holatlari', ru: 'Позы Воина I и II', en: 'Warrior I & II Pose' }, duration: 60, rest: 15, reps: '60 sek' },
      { name: { uz: 'Bola holati (Child\'s Pose)', ru: 'Поза Ребенка (релакс)', en: 'Child\'s Pose Relaxation' }, duration: 60, rest: 15, reps: '1 daqiqa' }
    ]
  },
  {
    id: 'w5',
    category: 'hiit',
    level: 'advanced',
    duration: 20,
    calories: 320,
    title: {
      uz: 'Tabata 4-Daqiqa Ekstremal HIIT',
      ru: 'Табата Экстремальный HIIT',
      en: 'Tabata Extreme 4-Minute Peak HIIT'
    },
    description: {
      uz: '20 soniya maksimal harakat va 10 soniya tanaffus qoidasiga asoslangan metabolik portlash kompleksi.',
      ru: 'Взрывная интервальная нагрузка по протоколу Табата: 20 сек максимум, 10 сек отдых.',
      en: 'High-intensity interval training protocol: 20s all-out effort followed by 10s rest intervals.'
    },
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
    icon: 'Activity',
    color: 'from-rose-500 to-red-600',
    exercises: [
      { name: { uz: 'Sprinter Burpee', ru: 'Бёрпи со спринтом', en: 'Sprinter Burpees' }, duration: 30, rest: 15, reps: 'Maksimal tezlikda' },
      { name: { uz: 'Squat Jump (Sakrab o\'tirish)', ru: 'Прыжковые приседания', en: 'Squat Jumps' }, duration: 30, rest: 15, reps: 'Maksimal tezlikda' },
      { name: { uz: 'Speed Skater (Konkichi sakrashi)', ru: 'Конькобежец в прыжке', en: 'Speed Skaters' }, duration: 30, rest: 15, reps: 'Maksimal tezlikda' },
      { name: { uz: 'Plyo Push-ups (Qarsak chalish)', ru: 'Взрывные отжимания', en: 'Plyometric Push-ups' }, duration: 25, rest: 20, reps: '10-12 marta' }
    ]
  },
  {
    id: 'w6',
    category: 'strength',
    level: 'advanced',
    duration: 40,
    calories: 360,
    title: {
      uz: 'Katta Oyoq & Dumbonlar Quvvati',
      ru: 'Сила Ног и Ягодиц (Lower Body Power)',
      en: 'Lower Body Strength & Glute Power'
    },
    description: {
      uz: 'Pastki tana mushaklarini maksimal kattalashtirish va mustahkamlash uchun professional reja.',
      ru: 'Интенсивный тренинг на развитие квадрицепсов, бицепса бедра и ягодичных мышц.',
      en: 'High-volume leg and glute development routine maximizing lower body athletic drive.'
    },
    image: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?auto=format&fit=crop&w=800&q=80',
    icon: 'TrendingUp',
    color: 'from-amber-500 to-yellow-500',
    exercises: [
      { name: { uz: 'Bolgarcha Squat (Bulgarian Split)', ru: 'Болгарские выпады', en: 'Bulgarian Split Squats' }, duration: 45, rest: 25, reps: '12 har oyoqqa' },
      { name: { uz: 'Dumbon Ko\'prigi (Glute Bridge)', ru: 'Ягодичный мостик', en: 'Glute Bridge' }, duration: 40, rest: 20, reps: '20 marta' },
      { name: { uz: 'Devorga O\'tirish (Wall Sit)', ru: 'Стульчик у стены', en: 'Wall Sit Isometric' }, duration: 50, rest: 25, reps: '50 sek' },
      { name: { uz: 'Boldir ko\'tarishlari (Calf Raises)', ru: 'Подъемы на носки', en: 'Standing Calf Raises' }, duration: 45, rest: 15, reps: '30 marta' }
    ]
  }
];

export const initialFoods = [
  {
    id: 'f1',
    category: 'protein',
    name: {
      uz: 'Tovuq ko\'kragi (Pishirilgan)',
      ru: 'Куриная грудка (вареная)',
      en: 'Chicken Breast (Cooked)'
    },
    calories: 165,
    protein: 31,
    fat: 3.6,
    carbs: 0,
    emoji: '🍗',
    badge: 'Oqsil',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Kam yog\'li sof oqsil manbai, mushaklar o\'sishi va to\'qimalar regeneratsiyasini kafolatlaydi.',
      ru: 'Чистейший источник легкоусвояемого белка без лишних жиров для мышечного роста.',
      en: 'Lean primary protein source optimal for muscle synthesis and fat-loss meal plans.'
    }
  },
  {
    id: 'f2',
    category: 'protein',
    name: {
      uz: 'Tuxum (Butun, 2 dona)',
      ru: 'Яйца куриные (отварные)',
      en: 'Whole Free-Range Eggs'
    },
    calories: 143,
    protein: 12.6,
    fat: 9.5,
    carbs: 0.7,
    emoji: '🥚',
    badge: 'Superfood',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Barcha 9 ta muhim aminokislotaga boy, xolin va lyutein moddalariga ega ideal mahsulot.',
      ru: 'Эталонный аминокислотный профиль, богат холином для здоровья мозга и печени.',
      en: 'Contains all 9 essential amino acids plus choline for optimal cognitive function.'
    }
  },
  {
    id: 'f3',
    category: 'protein',
    name: {
      uz: 'Losos / Qizil Baliq',
      ru: 'Лосось / Семга на пару',
      en: 'Wild Pacific Salmon'
    },
    calories: 208,
    protein: 20,
    fat: 13,
    carbs: 0,
    emoji: '🐟',
    badge: 'Omega-3',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Omega-3 yog\' kislotalarining eng kuchli manbai. Bo\'g\'imlar va yurak salomatligini himoya qiladi.',
      ru: 'Богат Омега-3 полиненасыщенными жирными кислотами, защищает сердце и суставы.',
      en: 'Rich in anti-inflammatory EPA/DHA Omega-3 fats, shielding cardiovascular vessels.'
    }
  },
  {
    id: 'f4',
    category: 'veg',
    name: {
      uz: 'Brokkoli (Yashil karam)',
      ru: 'Брокколи на пару',
      en: 'Fresh Steamed Broccoli'
    },
    calories: 34,
    protein: 2.8,
    fat: 0.4,
    carbs: 6.6,
    emoji: '🥦',
    badge: 'Detoks',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Sulforafan moddasiga ega kuchli antioksidant, immunitetni ko\'taradi va ovqat hazmini yaxshilaydi.',
      ru: 'Содержит сульфорафан, мощнейший антиоксидант и стимулятор естественного детокса.',
      en: 'Packed with sulforaphane, Vitamin C, and fiber promoting metabolic gut balance.'
    }
  },
  {
    id: 'f5',
    category: 'veg',
    name: {
      uz: 'Avokado Hass',
      ru: 'Авокадо Хасс',
      en: 'Hass Fresh Avocado'
    },
    calories: 160,
    protein: 2,
    fat: 14.7,
    carbs: 8.5,
    emoji: '🥑',
    badge: 'Foydali Yog\'',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Monoto\'yinmagan sog\'lom yog\'lar, kaliy va kletchatka manbai, xolesterinni normallashtiradi.',
      ru: 'Снижает плохой холестерин, изобилует калием и полезными мононенасыщенными жирами.',
      en: 'Heart-healthy monounsaturated oleic acid and potassium for sustained satiety.'
    }
  },
  {
    id: 'f6',
    category: 'fruit',
    name: {
      uz: 'Chernika & Qoraqat (Blueberry)',
      ru: 'Черника и Голубика',
      en: 'Fresh Wild Blueberries'
    },
    calories: 57,
    protein: 0.7,
    fat: 0.3,
    carbs: 14.5,
    emoji: '🫐',
    badge: 'Antioksidant',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Miya faoliyatini va ko\'rish qobiliyatini yaxshilovchi antotsianin superfood.',
      ru: 'Главный суперфуд для здоровья сосудов мозга, зрения и замедления старения.',
      en: 'High anthocyanin antioxidant score shielding cognitive neurons from oxidative stress.'
    }
  },
  {
    id: 'f7',
    category: 'nuts',
    name: {
      uz: 'Gretskiy Yong\'oq & Bodom',
      ru: 'Грецкий Орех и Миндаль',
      en: 'Walnuts & Raw Almonds'
    },
    calories: 580,
    protein: 18,
    fat: 52,
    carbs: 15,
    emoji: '🥜',
    badge: 'Energiya',
    image: 'https://images.unsplash.com/photo-1543208541-0961a29a7547?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Miya va asab tizimi uchun E vitamini, magniy hamda alfa-linolen kislotasi.',
      ru: 'Кладезь витамина E, магния и растительных жиров для крепкой нервной системы.',
      en: 'Premium source of Vitamin E, magnesium, and plant-based ALA fatty acids.'
    }
  },
  {
    id: 'f8',
    category: 'grains',
    name: {
      uz: 'Kinoa va Jo\'xori (Ovsyanqa)',
      ru: 'Киноа и Цельный Овёс',
      en: 'Quinoa & Rolled Oats'
    },
    calories: 365,
    protein: 13.5,
    fat: 6,
    carbs: 62,
    emoji: '🥣',
    badge: 'Kletchatka',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80',
    benefits: {
      uz: 'Sekin hazm bo\'luvchi murakkab uglevodlar, uzoq vaqt to\'qlik hissi va barqaror qon shakari.',
      ru: 'Сложные медленные углеводы, обеспечивают стабильный уровень глюкозы и бодрость.',
      en: 'Complex low-GI sustained release carbs maintaining stable blood glycogen levels.'
    }
  }
];

export const initialMealPlans = [
  {
    id: 'mp1',
    type: 'weightLoss',
    calories: 1650,
    targetCalories: '1,650 kkal',
    macros: { p: '135g', f: '45g', c: '160g', protein: '135g (30%)', fat: '45g (25%)', carbs: '160g (45%)' },
    title: {
      uz: 'Vazn Yo\'qotish (Defitsit Ratsioni)',
      ru: 'Снижение Веса (Дефицит Калорий)',
      en: 'Fat Loss (Caloric Deficit Diet)'
    },
    breakfast: {
      uz: 'Ovsyanqa (50g) rezavor mevalar bilan + 2 ta qaynatilgan tuxum va yashil choy',
      ru: 'Овсяная каша (50г) с ягодами + 2 вареных яйца и зеленый чай',
      en: 'Rolled oats (50g) with fresh berries + 2 boiled eggs & unsweetened green tea'
    },
    lunch: {
      uz: 'Pishirilgan tovuq filesi (150g) + grechka (60g xom holatda) va bodring-pomidor salati',
      ru: 'Куриное филе (150г) на гриле + гречка (60г) и свежий огуречно-помидорный салат',
      en: 'Grilled chicken fillet (150g) + steamed buckwheat (60g dry) with cucumber-tomato salad'
    },
    snack: {
      uz: 'Gretskiy yogurt (2% yog\'lik) + bir siqim bodom (20g)',
      ru: 'Греческий йогурт 2% + горсть сырого миндаля (20г)',
      en: 'Greek yogurt (2%) + handful of raw almonds (20g)'
    },
    dinner: {
      uz: 'Losos yoki sudak balig\'i (140g) dimlangan brokkoli va zaytun moyi bilan',
      ru: 'Судак или лосось (140г) на пару с тушеной брокколи и оливковым маслом',
      en: 'Steamed white fish or salmon (140g) with broccoli and light olive oil drizzle'
    },
    meals: {
      breakfast: {
        uz: 'Ovsyanqa (50g) rezavor mevalar bilan + 2 ta qaynatilgan tuxum va yashil choy',
        ru: 'Овсяная каша (50г) с ягодами + 2 вареных яйца и зеленый чай',
        en: 'Rolled oats (50g) with fresh berries + 2 boiled eggs & unsweetened green tea'
      },
      lunch: {
        uz: 'Pishirilgan tovuq filesi (150g) + grechka (60g xom holatda) va bodring-pomidor salati',
        ru: 'Куриное филе (150г) на гриле + гречка (60г) и свежий огуречно-помидорный салат',
        en: 'Grilled chicken fillet (150g) + steamed buckwheat (60g dry) with cucumber-tomato salad'
      },
      snack: {
        uz: 'Gretskiy yogurt (2% yog\'lik) + bir siqim bodom (20g)',
        ru: 'Греческий йогурт 2% + горсть сырого миндаля (20г)',
        en: 'Greek yogurt (2%) + handful of raw almonds (20g)'
      },
      dinner: {
        uz: 'Losos yoki sudak balig\'i (140g) dimlangan brokkoli va zaytun moyi bilan',
        ru: 'Судак или лосось (140г) на пару с тушеной брокколи и оливковым маслом',
        en: 'Steamed white fish or salmon (140g) with broccoli and light olive oil drizzle'
      }
    }
  },
  {
    id: 'mp2',
    type: 'muscleGain',
    calories: 2750,
    targetCalories: '2,750 kkal',
    macros: { p: '175g', f: '75g', c: '340g', protein: '175g (25%)', fat: '75g (25%)', carbs: '340g (50%)' },
    title: {
      uz: 'Mushak O\'stirish (Surplus Ratsioni)',
      ru: 'Набор Мышечной Массы (Профицит)',
      en: 'Hypertrophy & Muscle Growth Diet'
    },
    breakfast: {
      uz: '3 ta tuxumdan omlet + 2 bo\'lak to\'liq donli non + avokado va bananli smuzi',
      ru: 'Омлет из 3 яиц + 2 тоста из цельнозернового хлеба + авокадо и банановый смузи',
      en: '3-egg omelet + 2 whole grain toasts + avocado & peanut butter banana smoothie'
    },
    lunch: {
      uz: 'Mol go\'shti steyki (180g) + jigarrang guruch (100g) va rang-barang sabzavotlar',
      ru: 'Говяжий стейк (180г) + бурый рис (100г) и смесь свежих овощей',
      en: 'Lean beef steak (180g) + brown rice (100g dry) + steamed garden veggies'
    },
    snack: {
      uz: 'Tvorog (5%) asal bilan + olma va 30g yong\'oq',
      ru: 'Творог 5% с чайной ложкой меда + зеленое яблоко и орехи',
      en: 'Cottage cheese (5%) with honey + green apple and 30g mixed nuts'
    },
    dinner: {
      uz: 'Indeyka yoki tovuq ko\'kragi (170g) + pishirilgan kartoshka (200g) va ko\'katlar',
      ru: 'Филе индейки (170г) + запеченный картофель (200г) со свежей зеленью',
      en: 'Turkey breast fillet (170g) + baked sweet potato (200g) with fresh garden herbs'
    },
    meals: {
      breakfast: {
        uz: '3 ta tuxumdan omlet + 2 bo\'lak to\'liq donli non + avokado va bananli smuzi',
        ru: 'Омлет из 3 яиц + 2 тоста из цельнозернового хлеба + авокадо и банановый смузи',
        en: '3-egg omelet + 2 whole grain toasts + avocado & peanut butter banana smoothie'
      },
      lunch: {
        uz: 'Mol go\'shti steyki (180g) + jigarrang guruch (100g) va rang-barang sabzavotlar',
        ru: 'Говяжий стейк (180г) + бурый рис (100г) и смесь свежих овощей',
        en: 'Lean beef steak (180g) + brown rice (100g dry) + steamed garden veggies'
      },
      snack: {
        uz: 'Tvorog (5%) asal bilan + olma va 30g yong\'oq',
        ru: 'Творог 5% с чайной ложкой меда + зеленое яблоко и орехи',
        en: 'Cottage cheese (5%) with honey + green apple and 30g mixed nuts'
      },
      dinner: {
        uz: 'Indeyka yoki tovuq ko\'kragi (170g) + pishirilgan kartoshka (200g) va ko\'katlar',
        ru: 'Филе индейки (170г) + запеченный картофель (200г) со свежей зеленью',
        en: 'Turkey breast fillet (170g) + baked sweet potato (200g) with fresh garden herbs'
      }
    }
  },
  {
    id: 'mp3',
    type: 'balanced',
    calories: 2100,
    targetCalories: '2,100 kkal',
    macros: { p: '140g', f: '60g', c: '240g', protein: '140g (25%)', fat: '60g (25%)', carbs: '240g (50%)' },
    title: {
      uz: 'Optimal Salomatlik & Balans',
      ru: 'Сбалансированное Здоровое Меню',
      en: 'Optimal Vitality & Balanced Routine'
    },
    breakfast: {
      uz: 'Chiyali puding bodom sutida + pashot tuxum va qizil ikra/baliqli toast',
      ru: 'Чиа-пудинг на миндальном молоке + яйцо пашот и тост со слабосоленым лососем',
      en: 'Almond milk chia pudding + poached egg on whole grain toast with smoked salmon'
    },
    lunch: {
      uz: 'Kinoa taomi pishirilgan tovuq va avokado, zaytun moyli ko\'katlar bilan',
      ru: 'Боул с киноа, запеченным цыпленком, авокадо и рукколой',
      en: 'Quinoa bowl with roasted chicken, avocado, arugula, and balsamic reduction'
    },
    snack: {
      uz: 'Mavsumiy mevalar (nok, apelsin) + 1 stakan kefir',
      ru: 'Сезонные фрукты (груша, апельсин) + стакан кефира',
      en: 'Fresh seasonal fruits (pear/orange) + glass of organic kefir'
    },
    dinner: {
      uz: 'Dengiz mahsulotlari yoki oq baliq dimlangan qovoqcha va sabzi bilan',
      ru: 'Морской окунь с цукини и морковью на гриле',
      en: 'Sea bass or shrimp with grilled zucchini, bell peppers, and lemon zest'
    },
    meals: {
      breakfast: {
        uz: 'Chiyali puding bodom sutida + pashot tuxum va qizil ikra/baliqli toast',
        ru: 'Чиа-пудинг на миндальном молоке + яйцо пашот и тост со слабосоленым лососем',
        en: 'Almond milk chia pudding + poached egg on whole grain toast with smoked salmon'
      },
      lunch: {
        uz: 'Kinoa taomi pishirilgan tovuq va avokado, zaytun moyli ko\'katlar bilan',
        ru: 'Боул с киноа, запеченным цыпленком, авокадо и рукколой',
        en: 'Quinoa bowl with roasted chicken, avocado, arugula, and balsamic reduction'
      },
      snack: {
        uz: 'Mavsumiy mevalar (nok, apelsin) + 1 stakan kefir',
        ru: 'Сезонные фрукты (груша, апельсин) + стакан кефира',
        en: 'Fresh seasonal fruits (pear/orange) + glass of organic kefir'
      },
      dinner: {
        uz: 'Dengiz mahsulotlari yoki oq baliq dimlangan qovoqcha va sabzi bilan',
        ru: 'Морской окунь с цукини и морковью на гриле',
        en: 'Sea bass or shrimp with grilled zucchini, bell peppers, and lemon zest'
      }
    }
  }
];

export const initialArticles = [
  {
    id: 'a1',
    title: {
      uz: 'Uyqu va Mushak Tiklanishi: Nega 8 Soat Kamlik Qilishi Mumkin?',
      ru: 'Сон и Восстановление Мышц: Почему 8 Часов Могут Быть Неэффективны?',
      en: 'Sleep Hygiene & Muscle Recovery: Why Quality Outweighs Quantity'
    },
    category: 'recovery',
    readTime: 6,
    author: 'Dr. Alisher Qosimov',
    date: '2026-03-24',
    likes: 142,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    summary: {
      uz: 'Chuqur uyqu fazasida somatotrop gormoni (o\'sish gormoni) ajralib, mikrojarohatlarni davolaydi. Qanday qilib uyqu sifatini 2 baravar oshirish mumkin?',
      ru: 'В фазе глубокого сна вырабатывается до 75% суточного соматотропина. Как синхронизировать циркадные ритмы для спортивного прогресса?',
      en: 'Up to 75% of human growth hormone is released during deep slow-wave sleep. Learn how to optimize circadian patterns for peak athletic recovery.'
    },
    excerpt: {
      uz: 'Chuqur uyqu fazasida somatotrop gormoni (o\'sish gormoni) ajralib, mikrojarohatlarni davolaydi. Qanday qilib uyqu sifatini 2 baravar oshirish mumkin?',
      ru: 'В фазе глубокого сна вырабатывается до 75% суточного соматотропина. Как синхронизировать циркадные ритмы для спортивного прогресса?',
      en: 'Up to 75% of human growth hormone is released during deep slow-wave sleep. Learn how to optimize circadian patterns for peak athletic recovery.'
    },
    content: {
      uz: `Ko'plab sportchilar zalda qattiq mehnat qilishadi, lekin natija kutganlaridek bo'lmaydi. Buning 80% sababi — noto'g'ri uyqu va tiklanish jarayonidir.

1. **Chuqur Uyqu Bosqichi (Slow-Wave Sleep)**: Aynan ushbu bosqichda tana to'qimalarni qayta tiklaydi va mushak tolalari o'sadi.
2. **Kechki Ko'k Nur (Blue Light)**: Telefon va kompyuter ekranlari melatonin gormoni ishlab chiqarilishini to'xtatadi. Uxlashdan 1 soat oldin ekranlarni chetga suring.
3. **Magniy va Harorat**: Xonadagi 18-20°C harorat uyquni chuqurlashtiradi.

Qoidaga amal qiling: kamida 7.5 - 8 soat qorong'u va salqin xonada uxlash orqali jismoniy charchoqni butunlay yengasiz.`,
      ru: `Многие тренируются до седьмого пота, но прогресс останавливается из-за пренебрежения сном.

1. **Глубокая фаза сна**: Именно в ней пик выработки гормона роста восстанавливает микротравмы мышечных волокон.
2. **Синий свет экранов**: Блокирует выработку мелатонина. За 60 минут до сна используйте теплый свет или выключите гаджеты.
3. **Температура воздуха**: Оптимальный диапазон для засыпания — 18-20°C.

Соблюдение гигиены сна ускорит метаболизм и предотвратит перетренированность.`,
      en: `Muscle hypertrophy doesn't happen on the gym floor; it happens in bed during slow-wave non-REM sleep.

1. **Deep Sleep Hormonal Surge**: 75% of nightly growth hormone pulses occur during deep sleep.
2. **Screen Discipline**: Blue spectrum light suppresses pineal melatonin secretion. Dim lights 60 minutes before bedtime.
3. **Ambient Temperature**: 18-20°C (65-68°F) ambient temperature facilitates core body cooling necessary for restorative sleep.`
    }
  },
  {
    id: 'a2',
    title: {
      uz: 'Metabolizmni Tezlashtirishning 5 Ta Ilmiy Isbotlangan Usuli',
      ru: '5 Научно Доказанных Способов Разогнать Метаболизм',
      en: '5 Scientifically Proven Ways to Accelerate Your Metabolic Rate'
    },
    category: 'nutrition',
    readTime: 5,
    author: 'Zilola Karimova, Nutrisiolog',
    date: '2026-03-29',
    likes: 219,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    summary: {
      uz: 'Oqsilning termik effekti (TEF), NEAT faolligi, sovuq suv va intervalli kardioning metabolizmga ta\'siri.',
      ru: 'Термический эффект белковой пищи, бытовая активность NEAT, правильный водный режим и HIIT тренировки.',
      en: 'Harness the thermic effect of food (TEF), non-exercise physical activity (NEAT), and hydration to boost resting caloric burn.'
    },
    excerpt: {
      uz: 'Oqsilning termik effekti (TEF), NEAT faolligi, sovuq suv va intervalli kardioning metabolizmga ta\'siri.',
      ru: 'Термический эффект белковой пищи, бытовая активность NEAT, правильный водный режим и HIIT тренировки.',
      en: 'Harness the thermic effect of food (TEF), non-exercise physical activity (NEAT), and hydration to boost resting caloric burn.'
    },
    content: {
      uz: `Metabolizm — bu organizmning kaloriyalarni energiyaga aylantirish tezligi. Uni quyidagi usullar bilan oshirish mumkin:

1. **Oqsil ulushini ko'paytiring**: Oqsilni hazm qilish uchun tana energiyaning 20-30% ini sarflaydi (TEF).
2. **NEAT (No-Exercise Activity Thermogenesis)**: Zaldagi 1 soatdan ko'ra, kun davomida piyoda yurish, zinadan chiqish ko'proq kaloriya yoqadi.
3. **Yetarli suv ichish**: 500 ml sovuq suv ichish metabolizmni 1 soat davomida 25-30% ga tezlashtiradi.
4. **Kuch mashqlari**: 1 kg qo'shimcha mushak tinch holatda ham kuniga 12-15 kkal sarflaydi.`,
      ru: `Базальный метаболизм можно активировать естественными привычками:

1. **Белок в каждом приеме пищи**: Высокий термический эффект (TEF) требует затрат до 30% калорий на усвоение.
2. **Повышайте NEAT**: Бытовая подвижность (10 000 шагов, подъем по лестнице) сжигает больше жира, чем изолированная тренировка.
3. **Водный баланс**: Холодная вода требует энергии на согревание и ускоряет липолиз.
4. **Силовой тренинг**: Мышечная ткань потребляет калории даже во сне.`,
      en: `Metabolic efficiency is malleable through consistent daily habits:

1. **Thermic Effect of Protein**: Up to 30% of ingested protein calories are burned purely through thermogenic assimilation.
2. **Optimize NEAT Activity**: Walking pacing, standing desks, and stairs vastly outpace a single static workout.
3. **Hydration Priming**: 500ml cold water elevates metabolic turnover by 24-30% over 60 minutes.
4. **Lean Muscle Preservation**: Skeletal muscle increases your 24-hour basal metabolic baseline.`
    }
  },
  {
    id: 'a3',
    title: {
      uz: 'Yurak Salomatligi: Kardio vs Og\'ir Kuch Mashqlari',
      ru: 'Здоровье Сердца: Кардио против Силовых Тренировок',
      en: 'Cardiovascular Longevity: Cardio vs Heavy Resistance Training'
    },
    category: 'fitness',
    readTime: 7,
    author: 'Prof. Jamshid Xasanov',
    date: '2026-04-02',
    likes: 188,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    summary: {
      uz: 'Qaysi biri uzoq umr ko\'rishga ko\'proq yordam beradi? Zamonaviy kardiologiya tadqiqotlari natijalari.',
      ru: 'Что эффективнее продлевает молодость сосудов? Мета-анализы кардиологических ассоциаций.',
      en: 'The definitive synergy: how hybrid programming combining Zone 2 aerobic base with compound lifting extends life expectancy.'
    },
    excerpt: {
      uz: 'Qaysi biri uzoq umr ko\'rishga ko\'proq yordam beradi? Zamonaviy kardiologiya tadqiqotlari natijalari.',
      ru: 'Что эффективнее продлевает молодость сосудов? Мета-анализы кардиологических ассоциаций.',
      en: 'The definitive synergy: how hybrid programming combining Zone 2 aerobic base with compound lifting extends life expectancy.'
    },
    content: {
      uz: `Ko'p yillar davomida kardio va kuch mashqlari o'rtasida bahs davom etgan. Bugungi ilmiy konsensus: ikkalasining uyg'unligi (Gibrid Mashg'ulot) uzoq umr ko'rishning kalitidir.

- **Zona 2 Kardio**: Haftasiga 150 daqiqa yengil yugurish yoki velosiped mitoxondriyalar sonini oshiradi va qon bosimini tushiradi.
- **Kuch Mashqlari**: Suyak zichligini saqlaydi, yosh o'tishi bilan paydo bo'ladigan sarkopeniya (mushak yo'qotilishi) ning oldini oladi.`,
      ru: `Научный консенсус 2026 года однозначен: синергия двух направлений дарит максимальное долголетие.

- **Зона 2 Кардио (150 мин/неделю)**: Тренирует митохондрии, повышает эластичность аорты и снижает частоту пульса в покое.
- **Силовые тренировки**: Профилактика остеопороза, поддержка уровня тестостерона и защита суставов.`,
      en: `The modern longevity consensus points squarely to hybrid physical conditioning:

- **Zone 2 Aerobic Base (150 mins weekly)**: Expands mitochondrial density, reduces resting arterial stiffness, and lowers resting heart rate.
- **Progressive Resistance Training**: Preserves bone mineral density and completely halts sarcopenic degenerative atrophy.`
    }
  }
];

export const initialUsers = [
  { id: 'u1', name: 'Jasurbek Mahmudov', email: 'jasur@fitlife.uz', role: 'Premium Member', status: 'active', joinDate: '2026-01-15' },
  { id: 'u2', name: 'Elena Smirnova', email: 'elena@gmail.com', role: 'Trainer / Coach', status: 'active', joinDate: '2026-02-03' },
  { id: 'u3', name: 'David Miller', email: 'david.m@sports.io', role: 'Standard Member', status: 'active', joinDate: '2026-02-18' },
  { id: 'u4', name: 'Madina Umarova', email: 'madina.u@mail.uz', role: 'Standard Member', status: 'pending', joinDate: '2026-03-01' },
  { id: 'u5', name: 'Farxod Toshpulatov', email: 'farxod.pro@fitlife.uz', role: 'Admin', status: 'active', joinDate: '2025-11-10' }
];

export const weeklyActivity = [
  { day: 'Dush / Пн / Mon', activeUsers: 1420, caloriesBurned: 520000 },
  { day: 'Sesh / Вт / Tue', activeUsers: 1680, caloriesBurned: 610000 },
  { day: 'Chor / Ср / Wed', activeUsers: 1890, caloriesBurned: 740000 },
  { day: 'Pay / Чт / Thu', activeUsers: 1750, caloriesBurned: 680000 },
  { day: 'Jum / Пт / Fri', activeUsers: 2100, caloriesBurned: 890000 },
  { day: 'Shan / Сб / Sat', activeUsers: 2450, caloriesBurned: 1040000 },
  { day: 'Yak / Вс / Sun', activeUsers: 1980, caloriesBurned: 790000 }
];

export const weeklyAnalytics = [
  { day: { uz: 'Dush', ru: 'Пн', en: 'Mon' }, workouts: 142, calories: 154000 },
  { day: { uz: 'Sesh', ru: 'Вт', en: 'Tue' }, workouts: 168, calories: 182000 },
  { day: { uz: 'Chor', ru: 'Ср', en: 'Wed' }, workouts: 189, calories: 205000 },
  { day: { uz: 'Pay', ru: 'Чт', en: 'Thu' }, workouts: 175, calories: 190000 },
  { day: { uz: 'Jum', ru: 'Пт', en: 'Fri' }, workouts: 210, calories: 228000 },
  { day: { uz: 'Shan', ru: 'Сб', en: 'Sat' }, workouts: 245, calories: 265000 },
  { day: { uz: 'Yak', ru: 'Вс', en: 'Sun' }, workouts: 198, calories: 214000 }
];

