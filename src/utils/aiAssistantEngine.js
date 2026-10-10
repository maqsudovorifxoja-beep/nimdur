// Smart Knowledge & NLP Engine for FitLife AI Coach

export function generateAiResponse(rawQuery, lang = 'uz', context = {}) {
  const query = (rawQuery || '').trim().toLowerCase();
  const { workouts = [], foods = [], articles = [] } = context;

  // 1. Check for numeric height & weight pattern for instant BMI calculation
  // Examples: "boyim 175 vaznim 70", "рост 180 вес 82", "height 170 weight 65", "180 sm 75 kg"
  const heightMatch = query.match(/(?:bo['`’]?yim|рост|height|sm|см)?\s*[:=]?\s*(\d{2,3})\s*(?:sm|см|cm)?/i);
  const weightMatch = query.match(/(?:vazn(?:im)?|вес|weight|kg|кг)?\s*[:=]?\s*(\d{2,3})\s*(?:kg|кг|kilo)?/i);

  // If user clearly provided numbers or asked for BMI with numbers:
  const numbersInQuery = query.match(/\d{2,3}/g);
  if ((query.includes('bmi') || query.includes('vazn') || query.includes('bo\'y') || query.includes('boy') || query.includes('рост') || query.includes('вес') || query.includes('height') || query.includes('weight')) && numbersInQuery && numbersInQuery.length >= 2) {
    const num1 = parseInt(numbersInQuery[0], 10);
    const num2 = parseInt(numbersInQuery[1], 10);
    let height = Math.max(num1, num2);
    let weight = Math.min(num1, num2);

    if (height >= 120 && height <= 230 && weight >= 35 && weight <= 200) {
      const heightM = height / 100;
      const bmi = +(weight / (heightM * heightM)).toFixed(1);
      const waterLiters = +(weight * 0.033).toFixed(1);
      const estBmr = Math.round(10 * weight + 6.25 * height - 5 * 25 + 5);

      if (lang === 'ru') {
        let status = 'Нормальный вес';
        let advice = 'Отличный показатель! Поддерживайте баланс тренировок и правильного питания.';
        if (bmi < 18.5) {
          status = 'Дефицит веса';
          advice = 'Рекомендуется увеличить калорийность за счет сложных углеводов и белков.';
        } else if (bmi >= 25 && bmi < 29.9) {
          status = 'Избыточный вес';
          advice = 'Рекомендуется легкий дефицит калорий (-300 ккал) и 3-4 кардио тренировки в неделю.';
        } else if (bmi >= 30) {
          status = 'Ожирение';
          advice = 'Рекомендуются умеренные прогулки, плавание и консультация со специалистом.';
        }

        return {
          text: `📊 **Экспресс-анализ параметров:**\n\n• **Рост:** ${height} см | **Вес:** ${weight} кг\n• **ИМТ (Индекс массы тела):** **${bmi}** (${status})\n• **Базовый обмен (BMR):** ~${estBmr} ккал/день\n• **Норма воды:** ~${waterLiters} л в день\n\n💡 **Совет тренера:** ${advice}`,
          action: {
            type: 'navigate',
            tab: 'calculators',
            label: '🧮 Открыть подробные калькуляторы'
          }
        };
      } else if (lang === 'en') {
        let status = 'Normal weight';
        let advice = 'Great balance! Maintain regular physical activity and balanced macros.';
        if (bmi < 18.5) {
          status = 'Underweight';
          advice = 'Increase caloric density with clean complex carbs and quality proteins.';
        } else if (bmi >= 25 && bmi < 29.9) {
          status = 'Overweight';
          advice = 'Aim for a mild calorie deficit (-300 to 500 kcal) and 3-4 workout sessions per week.';
        } else if (bmi >= 30) {
          status = 'Obese';
          advice = 'Start with low-impact cardio, brisk walking, and consult a nutritionist.';
        }

        return {
          text: `📊 **Instant Body Metric Analysis:**\n\n• **Height:** ${height} cm | **Weight:** ${weight} kg\n• **BMI (Body Mass Index):** **${bmi}** (${status})\n• **Resting Metabolic Rate:** ~${estBmr} kcal/day\n• **Daily Water Target:** ~${waterLiters} Liters\n\n💡 **Coach Tip:** ${advice}`,
          action: {
            type: 'navigate',
            tab: 'calculators',
            label: '🧮 Open Health Calculators'
          }
        };
      } else {
        // Uzbek default
        let status = 'Me\'yordagi vazn (Normal)';
        let advice = 'Ajoyib ko\'rsatkich! Ushbu holatni saqlash uchun haftada 3-4 marta faol harakat qiling va toza taomlar iste\'mol qiling.';
        if (bmi < 18.5) {
          status = 'Kam vazn (Defitsit)';
          advice = 'Sog\'lom vazn to\'plash uchun kunlik kaloriyani oshiring: yong\'oqlar, tuxum, tovuq go\'shti va murakkab uglevodlarga e\'tibor bering.';
        } else if (bmi >= 25 && bmi < 29.9) {
          status = 'Ortiqcha vazn';
          advice = 'Kichik kaloriya defitsiti (-300 kkal), oq nonga cheklov va haftasiga 3-4 marta kardio mashg\'ulotlari sizga juda tez natija beradi.';
        } else if (bmi >= 30) {
          status = 'Semizlik darajasi';
          advice = 'Bo\'g\'imlarga og\'irlik tushirmaslik uchun tez yurish, suzish va shakarli ichimliklarni butunlay to\'xtatishdan boshlashni tavsiya qilaman.';
        }

        return {
          text: `📊 **Tezkor Tana Ko'rsatkichlari Tahlili:**\n\n• **Bo'y:** ${height} sm | **Vazn:** ${weight} kg\n• **BMI (Tana massasi indeksi):** **${bmi}** (${status})\n• **Asosiy metabolizm (BMR):** ~${estBmr} kkal/kun\n• **Kunlik suv ehtiyoji:** ~${waterLiters} litr\n\n💡 **Murabbiy maslahati:** ${advice}`,
          action: {
            type: 'navigate',
            tab: 'calculators',
            label: '🧮 To\'liq kalkulyatorlarni ochish'
          }
        };
      }
    }
  }

  // 2. Abs / Six-Pack / Belly fat queries
  if (
    query.includes('qorin') || query.includes('press') || query.includes('живот') || 
    query.includes('пресс') || query.includes('abs') || query.includes('belly') || query.includes('bel')
  ) {
    const absWorkout = workouts.find((w) => w.id === 'w3' || w.category === 'abs') || workouts[2];

    if (lang === 'ru') {
      return {
        text: `🔥 **Как убрать живот и накачать пресс:**\n\n1. **Дефицит калорий — ключ к успеху:** Локального жиросжигания не существует. Жир уходит равномерно при дефиците 300–400 ккал.\n2. **Укрепляйте мышцы кора:** Планка, скручивания и подъем ног формируют мышечный корсет и подтягивают талию.\n3. **Меньше сахара и быстрых углеводов:** Они вызывают задержку воды и вздутие.\n\nРекомендую начать с нашей программы **«${absWorkout?.title?.ru || 'Стальной Пресс'}»**!`,
        action: absWorkout ? {
          type: 'workout',
          workout: absWorkout,
          label: '▶ Начать тренировку пресса (18 мин)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🏋️ Посмотреть тренировки'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `🔥 **How to lose belly fat and build strong abs:**\n\n1. **Calorie Deficit First:** Spot reduction is a myth. Total body fat must drop through a 300–500 kcal deficit.\n2. **Core Stability Training:** Planks, leg raises, and rotational twists tighten the abdominal wall.\n3. **Cut refined sugars:** They cause water retention and bloating.\n\nI recommend starting our **"${absWorkout?.title?.en || 'Iron Core'}"** routine right now!`,
        action: absWorkout ? {
          type: 'workout',
          workout: absWorkout,
          label: '▶ Start Abs Workout (18 min)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🏋️ View Workouts'
        }
      };
    } else {
      return {
        text: `🔥 **Qorin yog'ini ketkazish va press chiqarish sirlari:**\n\n1. **Faqat mashq emas, kaloriya defitsiti muhim:** Faqat qorinning o'zidan yog' yoqib bo'lmaydi. Butun tanadagi yog' foizini kamaytirish uchun kunlik me'yordan 300-400 kkal kamroq iste'mol qiling.\n2. **Mushak korsetini kuchaytiring:** Planka, oyoqlarni ko'tarish va velosiped mashqlari qorinni ichkariga tortib, chiroyli relyef hosil qiladi.\n3. **Shakar va gazli ichimliklarni to'xtating:** Bu eng tez natija beruvchi omil.\n\nSizga FitLife-dagi **«${absWorkout?.title?.uz || 'Temir Press'}»** mashg'ulotini tavsiya qilaman!`,
        action: absWorkout ? {
          type: 'workout',
          workout: absWorkout,
          label: '▶ Qorin mashg\'ulotini boshlash (18 daqiqa)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🏋️ Mashg\'ulotlar bo\'limiga o\'tish'
        }
      };
    }
  }

  // 3. Cardio / Fat Burning / Running
  if (
    query.includes('kardio') || query.includes('yugurish') || query.includes('yog\'') || 
    query.includes('кардио') || query.includes('жиросжиг') || query.includes('cardio') || 
    query.includes('fat burn') || query.includes('ozish') || query.includes('похудеть') || 
    query.includes('weight loss')
  ) {
    const cardioWorkout = workouts.find((w) => w.id === 'w1' || w.category === 'cardio') || workouts[0];

    if (lang === 'ru') {
      return {
        text: `🏃‍♂️ **Сжигание жира и кардио-тренинг:**\n\n• **Оптимальный пульс:** 60–75% от максимума для эффективного окисления жиров.\n• **Интервалы:** Чередование прыжков, бега на месте и бёрпи разгоняет метаболизм на 24 часа вперед (эффект EPOC).\n• **Регулярность:** 3–4 раза в неделю по 20–30 минут.\n\nПопробуйте нашу проверенную программу **«${cardioWorkout?.title?.ru || 'Интенсивное Кардио'}»**!`,
        action: cardioWorkout ? {
          type: 'workout',
          workout: cardioWorkout,
          label: '▶ Запустить кардио таймер (25 мин)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🔥 Тренировки'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `🏃‍♂️ **Fat Burning & Cardio Optimization:**\n\n• **Target Heart Rate:** 60–75% of your max heart rate maximizes fat oxidation.\n• **High-Intensity Intervals:** Combining jumping jacks, high knees, and burpees triggers the 24-hour EPOC afterburn.\n• **Frequency:** 3–4 sessions per week (20–30 minutes each).\n\nLet's fire up our **"${cardioWorkout?.title?.en || 'High-Burn Cardio'}"** routine right now!`,
        action: cardioWorkout ? {
          type: 'workout',
          workout: cardioWorkout,
          label: '▶ Launch Cardio Timer (25 min)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🔥 Workouts'
        }
      };
    } else {
      return {
        text: `🏃‍♂️ **Yog' yoqish va maksimal natija uchun kardio:**\n\n• **Yurak urish tezligi (Puls):** Maksimal ko'rsatkichning 60–75% oralig'ida bo'lganda tana yog'larni energiya sifatida sarflaydi.\n• **Dinamik intervallar:** Jumping Jacks, yuqori tizzalar va byorpi mashqlari metabolizmni 24 soatga tezlashtiradi.\n• **Haftalik reja:** Haftada 3–4 marta 20–25 daqiqadan shug'ullanish kifoya.\n\nKeling, hoziroq **«${cardioWorkout?.title?.uz || 'Intensiv Yog\' Yoquvchi Kardio'}»** mashg'ulotini boshlaymiz!`,
        action: cardioWorkout ? {
          type: 'workout',
          workout: cardioWorkout,
          label: '▶ Kardio mashg\'ulotini boshlash (25 daqiqa)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🔥 Barcha kardio mashqlar'
        }
      };
    }
  }

  // 4. HIIT / Tabata / Short intense workout
  if (
    query.includes('hiit') || query.includes('tabata') || query.includes('tezkor') || 
    query.includes('qisqa') || query.includes('табата') || query.includes('хиит') || 
    query.includes('interval')
  ) {
    const hiitWorkout = workouts.find((w) => w.id === 'w5' || w.category === 'hiit') || workouts[0];

    if (lang === 'ru') {
      return {
        text: `⚡ **HIIT и протокол Табата — максимум эффекта за минимум времени:**\n\n• **Правило:** 20 секунд предельной интенсивности + 10 секунд отдыха.\n• **Результат:** 4-15 минут такой тренировки сжигают столько же калорий, сколько 40 минут монотонного бега.\n• **Выносливость:** Укрепляет сердечную мышцу и взрывную силу.\n\nГотовы испытать себя? Запустите **«${hiitWorkout?.title?.ru || 'Табата HIIT'}»**!`,
        action: hiitWorkout ? {
          type: 'workout',
          workout: hiitWorkout,
          label: '▶ Начать HIIT Табата (20 мин)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '⚡ Все тренировки'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `⚡ **HIIT & Tabata Protocol — Maximum Burn in Minimum Time:**\n\n• **Protocol:** 20s all-out maximum effort followed by 10s rest intervals.\n• **Efficiency:** 15 minutes of HIIT burns as much glycogen and triggers more afterburn than 45 minutes of steady jogging.\n• **Cardio Stamina:** Dramatically raises VO2 max.\n\nReady for a burst of energy? Try our **"${hiitWorkout?.title?.en || 'Tabata Extreme HIIT'}"**!`,
        action: hiitWorkout ? {
          type: 'workout',
          workout: hiitWorkout,
          label: '▶ Launch Tabata HIIT (20 min)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '⚡ Explore HIIT'
        }
      };
    } else {
      return {
        text: `⚡ **HIIT va Tabata — eng kam vaqtda eng yuqori natija:**\n\n• **Qoida:** 20 soniya maksimal tezlikda harakat + 10 soniya nafas rostlash.\n• **Afzalligi:** 15 daqiqalik HIIT 45 daqiqalik oddiy yugurishdan ko'ra ko'proq kaloriya sarflaydi va kun bo'yi yog' yoqilishini ta'minlaydi.\n• **Vaqt tejamkorligi:** Band insonlar uchun eng zo'r tanlov!\n\nKeling, kuchingizni sinab ko'rish uchun **«${hiitWorkout?.title?.uz || 'Tabata HIIT'}»** ni ishga tushiramiz!`,
        action: hiitWorkout ? {
          type: 'workout',
          workout: hiitWorkout,
          label: '▶ HIIT mashg\'ulotini boshlash (20 daqiqa)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '⚡ HIIT mashqlar'
        }
      };
    }
  }

  // 5. Pre-workout & Post-workout Nutrition
  if (
    query.includes('mashqdan oldin') || query.includes('mashg\'ulotdan oldin') || 
    query.includes('mashqdan keyin') || query.includes('до тренировки') || 
    query.includes('после тренировки') || query.includes('pre workout') || 
    query.includes('post workout') || query.includes('ovqat') || query.includes('yeyish')
  ) {
    if (lang === 'ru') {
      return {
        text: `🍎 **Питание до и после тренировки:**\n\n**За 1.5–2 часа ДО тренировки:**\n• Сложные углеводы + легкий белок (овсянка с ягодами, гречка с курицей, банан с ореховой пастой).\n• Это даст стабильную энергию без тяжести в желудке.\n\n**В течение 45 минут ПОСЛЕ тренировки:**\n• Качественный белок + умеренные углеводы (лосось, яйца, творог или белковый смузи).\n• Это восстановит мышечные волокна и запасы гликогена.\n\nОзнакомьтесь с нашей подборкой суперфудов в разделе питания!`,
        action: {
          type: 'navigate',
          tab: 'nutrition',
          label: '🥗 Открыть каталог правильного питания'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `🍎 **Pre & Post Workout Fueling Strategy:**\n\n**1.5–2 hours BEFORE Workout:**\n• Complex carbs + clean lean protein (oatmeal with berries, brown rice with chicken, banana with peanut butter).\n• Provides steady sustained blood glucose without digestive distress.\n\n**Within 45 minutes AFTER Workout:**\n• Fast-absorbing protein + moderate carbs (wild salmon, eggs, greek yogurt, protein shake).\n• Immediately kickstarts muscle protein synthesis and glycogen reload.\n\nCheck out our curated superfood directory!`,
        action: {
          type: 'navigate',
          tab: 'nutrition',
          label: '🥗 Explore Healthy Foods'
        }
      };
    } else {
      return {
        text: `🍎 **Mashg'ulotdan oldin va keyin qanday ovqatlanish kerak?**\n\n**Mashqdan 1.5–2 soat OLDIN:**\n• Murakkab uglevodlar + yengil oqsil (suli bo'tqasi + banan, yoki grechka + tovuq filesi).\n• Bu sizga mashq davomida kuchli energiya beradi va oshqozonda og'irlik tug'dirmaydi.\n\n**Mashq tugagach 45 daqiqa ICHIDA:**\n• Toza oqsil + ozroq uglevod (tuxum, tvorog, losos balig'i yoki mevali smuzi).\n• Bu mushak tolalari tiklanishi va yangilanishi uchun juda zarur!\n\nPlatformamizdagi tayyor taomnomalar va superfoodlar ro'yxatini ko'rib chiqing:`,
        action: {
          type: 'navigate',
          tab: 'nutrition',
          label: '🥗 Sog\'lom ovqatlanish bo\'limiga o\'tish'
        }
      };
    }
  }

  // 6. Water & Hydration
  if (
    query.includes('suv') || query.includes('вод') || query.includes('water') || 
    query.includes('drink') || query.includes('gidrat') || query.includes('гидрат') || 
    query.includes('ichish')
  ) {
    if (lang === 'ru') {
      return {
        text: `💧 **Водный баланс — основа здоровья и энергии:**\n\n• **Золотое правило:** 30–35 мл чистой воды на 1 кг массы тела.\n• **Утренний запуск:** 1 стакан теплой воды натощак пробуждает ЖКТ и лимфоток.\n• **На тренировке:** Пейте по 2-3 небольших глотка каждые 15 минут.\n• **Важно:** Чай, кофе и сладкие соки не заменяют чистую воду!\n\nИспользуйте наш калькулятор воды для точного персонального расчета!`,
        action: {
          type: 'navigate',
          tab: 'calculators',
          label: '💧 Рассчитать норму воды'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `💧 **Hydration Guidelines for Peak Performance:**\n\n• **Baseline Rule:** 30–35 ml of water per 1 kg of body weight.\n• **Morning Kickstart:** 1 glass of room-temp water upon waking stimulates metabolism and organ hydration.\n• **During Workouts:** Sip 100–150 ml every 15 minutes to prevent cramping.\n• **Note:** Sugary drinks and excessive espresso do not count toward pure water intake.\n\nCalculate your exact hydration need in our Calculators hub!`,
        action: {
          type: 'navigate',
          tab: 'calculators',
          label: '💧 Calculate Daily Water Target'
        }
      };
    } else {
      return {
        text: `💧 **Kunlik suv ichish me'yori va qoidalari:**\n\n• **Oltin qoida:** Har 1 kg tana vazni uchun 30–35 ml toza suv (masalan, 70 kg vazn uchun ~2.3 litr).\n• **Ertalabki odat:** Uyg'ongach 1 stakan iliq suv ichish ichki a'zolarni uyg'otadi va metabolizmni 25% ga tezlashtiradi.\n• **Mashg'ulot paytida:** Har 15 daqiqada 2-3 qultumdan suv ichib turing.\n• **Eslatma:** Choy, kofe va sharbatlar toza suv o'rnini bosa olmaydi!\n\nO'z vazningiz bo'yicha aniq hisoblash uchun kalkulyatordan foydalaning:`,
        action: {
          type: 'navigate',
          tab: 'calculators',
          label: '💧 Suv me\'yori kalkulyatoriga o\'tish'
        }
      };
    }
  }

  // 7. Sleep & Recovery
  if (
    query.includes('uyqu') || query.includes('tiklanish') || query.includes('сон') || 
    query.includes('отдых') || query.includes('sleep') || query.includes('recovery') || 
    query.includes('charchoq') || query.includes('усталость')
  ) {
    const sleepArticle = articles.find((a) => a.id === 'a1') || articles[0];

    if (lang === 'ru') {
      return {
        text: `😴 **Сон и мышечное восстановление:**\n\n• **Мышцы растут во сне:** До 75% гормона роста вырабатывается в фазе глубокого медленного сна.\n• **Цифровой детокс:** Выключайте экраны смартфонов за 45–60 минут до сна — синий свет разрушает мелатонин.\n• **Температура:** Идеально спать в проветренной комнате при температуре 18–20°C.\n\nПрочитайте научную статью нашего доктора по оптимизации сна:`,
        action: sleepArticle ? {
          type: 'article',
          article: sleepArticle,
          label: '📖 Читать статью о сне (6 мин)'
        } : {
          type: 'navigate',
          tab: 'articles',
          label: '📚 Все статьи'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `😴 **Sleep Hygiene & Deep Muscular Recovery:**\n\n• **Growth Hormone Surge:** Up to 75% of daily human growth hormone is secreted during slow-wave non-REM sleep.\n• **Circadian Shield:** Put away mobile screens 60 minutes before bed to allow natural pineal melatonin release.\n• **Cool Environment:** Keep your bedroom at 18–20°C (65–68°F) for restorative slumber.\n\nExplore our deep dive scientific article on sleep recovery:`,
        action: sleepArticle ? {
          type: 'article',
          article: sleepArticle,
          label: '📖 Read Sleep Recovery Article (6 min)'
        } : {
          type: 'navigate',
          tab: 'articles',
          label: '📚 Health Articles'
        }
      };
    } else {
      return {
        text: `😴 **Uyqu va mushaklarning to'liq tiklanishi:**\n\n• **Mushaklar uyquda o'sadi:** O'sish gormonining 75% qismi chuqur uyqu vaqtida ishlab chiqariladi.\n• **Ko'k nurdan saqlaning:** Uxlashdan 45-60 daqiqa oldin telefon va noutbukni chetga suring, aks holda melatonin gormoni to'xtab qoladi.\n• **Xona harorati:** Salqin (18–20°C) va qorong'u xona eng chuqur uyquni kafolatlaydi.\n\nUshbu mavzuda mutaxassisimiz tayyorlagan ilmiy maqolani o'qib ko'ring:`,
        action: sleepArticle ? {
          type: 'article',
          article: sleepArticle,
          label: '📖 Uyqu bo\'yicha maqolani o\'qish (6 daqiqa)'
        } : {
          type: 'navigate',
          tab: 'articles',
          label: '📚 Barcha maqolalarga o\'tish'
        }
      };
    }
  }

  // 8. Yoga, Flexibility, Stress relief
  if (
    query.includes('yoga') || query.includes('cho\'zilish') || query.includes('chuzilish') || 
    query.includes('растяжка') || query.includes('стретчинг') || query.includes('flexibility') || 
    query.includes('stress') || query.includes('og\'riq') || query.includes('bo\'g\'im')
  ) {
    const yogaWorkout = workouts.find((w) => w.id === 'w4' || w.category === 'yoga') || workouts[3];

    if (lang === 'ru') {
      return {
        text: `🧘‍♀️ **Йога и мягкая растяжка:**\n\n• Снимает напряжение в пояснице и шее после рабочего дня.\n• Улучшает циркуляцию лимфы и подвижность суставов.\n• Снижает уровень гормона стресса (кортизола) и дарит внутренний покой.\n\nПопробуйте нашу мягкую программу **«${yogaWorkout?.title?.ru || 'Утренняя Йога'}»**!`,
        action: yogaWorkout ? {
          type: 'workout',
          workout: yogaWorkout,
          label: '▶ Начать йогу и растяжку (35 мин)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🧘 Все тренировки'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `🧘‍♀️ **Yoga, Mobility & Decompression:**\n\n• Decompresses the lumbar spine and releases tight neck and shoulder knots.\n• Enhances joint synovial fluid circulation and flexibility.\n• Lowers cortisol levels for restorative inner calm.\n\nTry our soothing **"${yogaWorkout?.title?.en || 'Morning Yoga'}"** session!`,
        action: yogaWorkout ? {
          type: 'workout',
          workout: yogaWorkout,
          label: '▶ Start Yoga & Stretch (35 min)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🧘 All Workouts'
        }
      };
    } else {
      return {
        text: `🧘‍♀️ **Yoga va yengil cho'zilish mashqlari:**\n\n• Kun davomida bel, bo'yin va yelkadagi zo'riqishlarni butunlay yozadi.\n• Bo'g'imlar elastikligini oshiradi va jarohatlarning oldini oladi.\n• Stress gormoni (kortizol)ni pasaytirib, asablarni tinchlantiradi.\n\nSizga FitLife-dagi **«${yogaWorkout?.title?.uz || 'Ertalabki Yoga'}»** sokin amaliyotini tavsiya etaman!`,
        action: yogaWorkout ? {
          type: 'workout',
          workout: yogaWorkout,
          label: '▶ Yoga mashg\'ulotini boshlash (35 daqiqa)'
        } : {
          type: 'navigate',
          tab: 'workouts',
          label: '🧘 Mashg\'ulotlar bo\'limi'
        }
      };
    }
  }

  // 9. Nutrition & Healthy Foods general
  if (
    query.includes('dieta') || query.includes('ratsion') || query.includes('ovqatlanish') || 
    query.includes('oqsil') || query.includes('protein') || query.includes('питание') || 
    query.includes('рацион') || query.includes('диета') || query.includes('nutrition') || 
    query.includes('diet') || query.includes('taomnoma')
  ) {
    if (lang === 'ru') {
      return {
        text: `🥗 **Формула идеального здорового питания:**\n\n• **Белки (25-30%):** Лосось, куриная грудка, яйца, творог (строят мышцы).\n• **Сложные углеводы (45-50%):** Гречка, овсянка, бурый рис (дают долгую энергию).\n• **Полезные жиры (20-25%):** Авокадо, оливковое масло, семена чиа (защищают суставы и гормоны).\n• **Клетчатка:** 400–500 г зелени и овощей ежедневно.\n\nВ нашей базе собраны лучшие суперфуды с подсчетом КБЖУ!`,
        action: {
          type: 'navigate',
          tab: 'nutrition',
          label: '🥗 Посмотреть суперфуды и меню'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `🥗 **The Gold Standard Nutrition Blueprint:**\n\n• **Clean Proteins (25-30%):** Wild salmon, eggs, chicken breast (preserves lean mass).\n• **Complex Carbs (45-50%):** Buckwheat, rolled oats, quinoa (sustained glycogen).\n• **Healthy Lipids (20-25%):** Avocado, extra virgin olive oil, chia seeds (hormonal balance).\n• **Dietary Fiber:** 400–500g of leafy greens and cruciferous vegetables.\n\nBrowse our comprehensive healthy foods library with macro breakdowns!`,
        action: {
          type: 'navigate',
          tab: 'nutrition',
          label: '🥗 Browse Superfood Directory'
        }
      };
    } else {
      return {
        text: `🥗 **Mukammal sog'lom ovqatlanish formulasi:**\n\n• **Oqsillar (25-30%):** Tovuq filesi, tuxum, losos balig'i, tvorog (mushaklar asosi).\n• **Murakkab uglevodlar (45-50%):** Grechka, suli yormasi, qo'ng'ir guruch (uzoq va barqaror quvvat).\n• **Foydali yog'lar (20-25%):** Avokado, zaytun yog'i, yong'oqlar (gormonal tizim himoyasi).\n• **Kletchatka:** Kuniga kamida 400-500 gramm yangi ko'katlar va sabzavotlar.\n\nPlatformamizdagi barcha superfoodlar va ularning oqsil-yog'-uglevod qiymatlarini ko'rishingiz mumkin:`,
        action: {
          type: 'navigate',
          tab: 'nutrition',
          label: '🥗 Ratsion va superfoodlarni ko\'rish'
        }
      };
    }
  }

  // 10. Calculators inquiry (BMI, BMR, Calories)
  if (
    query.includes('kalkulyator') || query.includes('bmi') || query.includes('bmr') || 
    query.includes('kaloriya') || query.includes('калькулятор') || query.includes('имт') || 
    query.includes('калории') || query.includes('calculator')
  ) {
    if (lang === 'ru') {
      return {
        text: `📊 **Интеллектуальные калькуляторы FitLife:**\n\nВы можете рассчитать свои индивидуальные параметры:\n• **ИМТ (Индекс массы тела):** Соответствие роста и веса.\n• **BMR (Базальный метаболизм):** Сколько калорий тело сжигает в покое.\n• **Норма воды:** Точная потребность в жидкости с учетом активности.\n• **Суточная калорийность:** Норма для похудения, поддержания или набора массы.\n\n*Подсказка: напишите мне свой рост и вес (например: «рост 175 вес 70»), и я рассчитаю прямо здесь!*`,
        action: {
          type: 'navigate',
          tab: 'calculators',
          label: '🧮 Открыть интерактивные калькуляторы'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `📊 **FitLife Smart Health Calculators:**\n\nYou can calculate all your vital metrics:\n• **BMI (Body Mass Index):** Weight-to-height ratio analysis.\n• **BMR (Basal Metabolic Rate):** Resting caloric expenditure.\n• **Hydration Target:** Water needed based on weight and activity.\n• **Daily Calorie Target:** Deficit, maintenance, or surplus targets.\n\n*Pro-tip: type your height and weight here (e.g. "height 175 weight 70") and I'll calculate it immediately!*`,
        action: {
          type: 'navigate',
          tab: 'calculators',
          label: '🧮 Open Health Calculators'
        }
      };
    } else {
      return {
        text: `📊 **FitLife Zamonaviy Salomatlik Kalkulyatorlari:**\n\nPlatformamizda quyidagi aniq hisob-kitoblar mavjud:\n• **BMI (Tana massasi indeksi):** Bo'y va vazn nisbati normadami yoki yo'q.\n• **BMR (Bazal metabolizm):** Tinch holatda sarflanadigan kaloriya.\n• **Suv balansi:** Vazningizga qarab kunlik aniq litr miqdori.\n• **Kaloriya ehtiyoji:** Ozish, vazn saqlash yoki mushak chiqarish me'yori.\n\n*Maslahat: Menga bo'y va vazningizni yozsangiz (masalan: «bo'yim 175 vaznim 70»), shu yerning o'zida hisoblab beraman!*`,
        action: {
          type: 'navigate',
          tab: 'calculators',
          label: '🧮 Kalkulyatorlar bo\'limiga o\'tish'
        }
      };
    }
  }

  // 11. Greetings & Pleasantries
  if (
    query.includes('salom') || query.includes('assalom') || query.includes('qalesan') || 
    query.includes('privet') || query.includes('привет') || query.includes('здравствуй') || 
    query.includes('hello') || query.includes('hi') || query.includes('hey')
  ) {
    if (lang === 'ru') {
      return {
        text: `👋 **Здравствуйте! Рад приветствовать вас в FitLife!**\n\nЯ ваш персональный AI-тренер и консультант по здоровому образу жизни ⚡.\n\n**Чем я могу вам помочь сегодня?**\n• Подобрать эффективную тренировку под вашу цель\n• Рассчитать суточную норму калорий, воды или ИМТ\n• Составить сбалансированный рацион питания\n• Дать советы по быстрому восстановлению и сну\n\nЗадайте вопрос или воспользуйтесь быстрыми подсказками ниже! 🎯`,
        action: {
          type: 'navigate',
          tab: 'workouts',
          label: '🏋️ Посмотреть программы тренировок'
        }
      };
    } else if (lang === 'en') {
      return {
        text: `👋 **Hello and welcome to FitLife!**\n\nI am your 24/7 personal AI fitness and wellness coach ⚡.\n\n**How can I assist you today?**\n• Recommend targeted workout programs (HIIT, Cardio, Strength, Yoga)\n• Calculate your BMI, daily caloric expenditure, and hydration goals\n• Provide balanced nutrition guidance and meal plans\n• Share science-backed sleep and recovery habits\n\nFeel free to ask any question or tap a quick prompt below! 🎯`,
        action: {
          type: 'navigate',
          tab: 'workouts',
          label: '🏋️ Explore Workout Routines'
        }
      };
    } else {
      return {
        text: `👋 **Assalomu alaykum! FitLife platformasiga xush kelibsiz!**\n\nMen sizning 24/7 shaxsiy AI sport va salomatlik murabbiyingizman ⚡.\n\n**Sizga bugun nimalarda yordam bera olaman?**\n• Maqsadingizga mos mashg'ulot tanlash (Kardio, Qorin, Kuch, Yoga, HIIT)\n• BMI, kunlik kaloriya va suv me'yorini hisoblash\n• Foydali va to'g'ri ovqatlanish ratsionini tuzish\n• Uyqu va jarohatlarsiz tiklanish bo'yicha maslahatlar\n\nSavolingizni yozing yoki quyidagi tayyor tugmalardan birini tanlang! 🎯`,
        action: {
          type: 'navigate',
          tab: 'workouts',
          label: '🏋️ Mashg\'ulotlarni ko\'rish'
        }
      };
    }
  }

  // 12. Thanks & Appreciation
  if (
    query.includes('rahmat') || query.includes('katta rahmat') || query.includes('tashakkur') || 
    query.includes('спасибо') || query.includes('благодарю') || query.includes('thank') || 
    query.includes('thanks') || query.includes('zo\'r') || query.includes('zor') || query.includes('отлично')
  ) {
    if (lang === 'ru') {
      return {
        text: `🙏 **Всегда пожалуйста!** Рад быть полезным на вашем пути к здоровому и сильному телу. Помните: главный секрет успеха — это постоянство и дисциплина! Если возникнут еще вопросы — я всегда здесь. 💪🔥`,
        action: null
      };
    } else if (lang === 'en') {
      return {
        text: `🙏 **You are very welcome!** Proud to support your fitness and health journey. Remember: consistency beats intensity every single time! I'm always here if you need more guidance. 💪🔥`,
        action: null
      };
    } else {
      return {
        text: `🙏 **Arzimaydi, doimo xizmatingizdaman!** Kuchli, sog'lom va tetik bo'lish yo'lida sizga yordam berishdan mamnunman. Esda tuting: eng muhimi — muntazamlik va intizom! Har qanday savolda men yoningizdaman. 💪🔥`,
        action: null
      };
    }
  }

  // 13. Default Smart Fallback with Contextual Recommendations
  const featuredWorkout = workouts[0];
  if (lang === 'ru') {
    return {
      text: `💡 **Отличный вопрос о здоровье и спорте!**\n\nВот ключевые рекомендации тренера по этой теме:\n1. **Дисциплина важнее мотивации:** 3 регулярные 25-минутные тренировки в неделю превосходят одну 2-часовую изнурительную сессию.\n2. **Качественный сон и гидратация:** Пейте не менее 2 литров воды и спите 7-8 часов в прохладной темной комнате.\n3. **Осознанное питание:** Увеличьте долю нежирного белка и клетчатки.\n\nВы можете попробовать нашу тренировку прямо сейчас или рассчитать параметры в калькуляторе!`,
      action: featuredWorkout ? {
        type: 'workout',
        workout: featuredWorkout,
        label: '▶ Попробовать популярную тренировку'
      } : {
        type: 'navigate',
        tab: 'workouts',
        label: '🏋️ Все тренировки'
      }
    };
  } else if (lang === 'en') {
    return {
      text: `💡 **Great fitness & wellness inquiry!**\n\nHere are core coach principles to guide you:\n1. **Consistency Trumps Intensity:** Three focused 25-minute sessions per week yield far better results than one exhausting workout.\n2. **Hydration & Rest:** Target at least 2 liters of water daily and 7-8 hours of sound sleep in a cool room.\n3. **Nutrition Foundation:** Prioritize lean protein and colorful vegetables at every meal.\n\nWould you like to kick off a workout or calculate your health metrics?`,
      action: featuredWorkout ? {
        type: 'workout',
        workout: featuredWorkout,
        label: '▶ Launch Popular Workout'
      } : {
        type: 'navigate',
        tab: 'workouts',
        label: '🏋️ Browse Workouts'
      }
    };
  } else {
    return {
      text: `💡 **Ajoyib savol! Salomatlik va sport bo'yicha asosiy maslahatlarim:**\n\n1. **Muntazamlik — muvaffaqiyat garovi:** Haftada 3 marta 25 daqiqadan shug'ullanish 1 marta o'ta qattiq charchashdan ancha foydaliroq.\n2. **Suv va to'laqonli uyqu:** Kuniga kamida 2-2.5 litr toza suv iching va 7-8 soat orom oling.\n3. **Tabiiy ovqatlanish:** Shirinlik va yarim tayyor fastfood mahsulotlarini kamaytirib, tabiiy oqsillar va meva-sabzavotlarga ustunlik bering.\n\nKeling, tanangizni chiniqtirish uchun bugun mashg'ulot bajarib ko'ramiz:`,
      action: featuredWorkout ? {
        type: 'workout',
        workout: featuredWorkout,
        label: '▶ Mashhur mashg\'ulotni boshlash'
      } : {
        type: 'navigate',
        tab: 'workouts',
        label: '🏋️ Mashg\'ulotlarga o\'tish'
      }
    };
  }
}
