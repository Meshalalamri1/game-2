
const gameData = {
  topics: [
    {
      id: 1,
      title: "عواصم الدول",
      image: "", 
      questions: [
        { points: 200, text: "ما هي عاصمة السعودية؟", answer: "الرياض", answered: false },
        { points: 200, text: "ما هي عاصمة الإمارات العربية المتحدة؟", answer: "أبوظبي", answered: false },
        { points: 400, text: "ما هي عاصمة النمسا؟", answer: "فيينا", answered: false },
        { points: 400, text: "ما هي عاصمة أستراليا؟", answer: "كانبرا", answered: false },
        { points: 600, text: "ما هي عاصمة بوتان؟", answer: "تيمفو", answered: false },
        { points: 600, text: "ما هي عاصمة الباراغواي؟", answer: "أسونسيون", answered: false }
      ]
    },
    {
      id: 2,
      title: "أهل البر",
      image: "", 
      questions: [
        { points: 200, text: "ما هو أسرع حيوان بري؟", answer: "الفهد", answered: false },
        { points: 200, text: "أي حيوان يستخدم الصدى للصيد؟", answer: "الخفاش", answered: false },
        { points: 400, text: "ما هو الحيوان الذي له أكبر قلب؟", answer: "الحوت الأزرق", answered: false },
        { points: 400, text: "ما هو أكبر أنواع القردة؟", answer: "الغوريلا", answered: false },
        { points: 600, text: "ما اسم صغير الفيل؟", answer: "الدغفل", answered: false },
        { points: 600, text: "ما هو الحيوان الذي ينام وعين واحدة مفتوحة؟", answer: "الدلفين", answered: false }
      ]
    },
    {
      id: 3,
      title: "العلوم",
      image: "", 
      questions: [
        { points: 200, text: "ما هو العنصر الكيميائي الذي رمزه O؟", answer: "الأكسجين", answered: false },
        { points: 200, text: "ما هي اسرع سرعة يستطيع الانسان الوصول لها؟", answer: "سرعة الضوء", answered: false },
        { points: 400, text: "ما هي أكبر غدة في جسم الإنسان؟", answer: "الكبد", answered: false },
        { points: 400, text: "ما هي المادة التي ترفع غليان الماء عالياً؟", answer: "الملح", answered: false },
        { points: 600, text: "ما هو العنصر المشع المستخدم في علاج السرطان؟", answer: "اليود المشع", answered: false },
        { points: 600, text: "ما هو الهرمون المسؤول عن الشعور بالسعادة؟", answer: "السيروتونين", answered: false }
      ]
    },
    {
      id: 4,
      title: "السيارات",
      image: "", 
      questions: [
        { points: 200, text: "ما هي الشركة المصنعة لسيارة كامري؟", answer: "تويوتا", answered: false },
        { points: 200, text: "ما هي الشركة المصنعة لسيارة لاند كروزر؟", answer: "تويوتا", answered: false },
        { points: 400, text: "ما هو بلد المنشأ لسيارات فولفو؟", answer: "السويد", answered: false },
        { points: 400, text: "ما هي سيارة فيراري الأيقونية ذات اللون الأحمر المعروفة؟", answer: "فيراري إف 40", answered: false },
        { points: 600, text: "من هو مؤسس شركة تيسلا للسيارات الكهربائية؟", answer: "إيلون ماسك", answered: false },
        { points: 600, text: "ما هي أسرع سيارة في العالم لعام 2023؟", answer: "هينيسي فينوم إف5", answered: false }
      ]
    },
    {
      id: 5,
      title: "الجغرافيا",
      image: "", 
      questions: [
        { points: 200, text: "ما هي أكبر قارة في العالم؟", answer: "آسيا", answered: false },
        { points: 200, text: "ما هي اصغر قارة في العالم؟", answer: "أستراليا", answered: false },
        { points: 400, text: "ما هي أكبر دولة عربية من حيث المساحة؟", answer: "الجزائر", answered: false },
        { points: 400, text: "ما هو المضيق الذي يفصل بين آسيا وأمريكا الشمالية؟", answer: "مضيق بيرنغ", answered: false },
        { points: 600, text: "ما هي الدولة التي لديها أكبر عدد من الحدود البرية مع دول أخرى؟", answer: "الصين وروسيا (لكل منهما 14 دولة مجاورة)", answered: false },
        { points: 600, text: "ما هي الدولة الوحيدة في العالم التي تقع داخل دولة أخرى؟", answer: "الفاتيكان (داخل إيطاليا)", answered: false }
      ]
    },
    {
      id: 6,
      title: "الطعام",
      image: "", 
      questions: [
        { points: 200, text: "ما هي الفاكهة المعروفة بـ 'ملك الفواكه'؟", answer: "الدوريان", answered: false },
        { points: 200, text: "ما هي المادة الأساسية في صناعة الشوكولاتة؟", answer: "حبوب الكاكاو", answered: false },
        { points: 400, text: "في أي دولة نشأت البيتزا؟", answer: "إيطاليا", answered: false },
        { points: 400, text: "ما هو الطعام الذي يسمى 'الذهب الأحمر'؟", answer: "الزعفران", answered: false },
        { points: 600, text: "ما هي الفاكهة التي تسمى 'ملكة الفواكه'؟", answer: "المانجوستين", answered: false },
        { points: 600, text: "ما هي التوابل الأغلى في العالم؟", answer: "الزعفران", answered: false }
      ]
    },
    {
      id: 7,
      title: "أسئلة ثقافية",
      image: "", 
      questions: [
        { points: 200, text: "من كم لون يتكون قوس قزح؟", answer: "7 ألوان", answered: false },
        { points: 200, text: "كم عدد أحرف اللغة الإنجليزية؟", answer: "26 حرفاً", answered: false },
        { points: 400, text: "ما هو أصل جبنة البارميزان؟", answer: "إيطاليا", answered: false },
        { points: 400, text: "ما هي أكبر هضبة في العالم؟", answer: "هضبة التبت", answered: false },
        { points: 600, text: "من هي أول امرأة فازت بجائزة نوبل؟", answer: "ماري كوري", answered: false },
        { points: 600, text: "أين تم افتتاح أول بنك للدم في العالم؟", answer: "في مدينة نيويورك، عام 1940م", answered: false }
      ]
    },
    {
      id: 8,
      title: "أسئلة جغرافية متنوعة",
      image: "", 
      questions: [
        { points: 200, text: "ما هو أعلى جبل في العالم؟", answer: "جبل إيفرست", answered: false },
        { points: 200, text: "ما هي عاصمة إثيوبيا؟", answer: "أديس أبابا", answered: false },
        { points: 400, text: "ما هي أكبر بحيرة في العالم؟", answer: "بُحيرة قزوين حسب المساحة السطحية", answered: false },
        { points: 400, text: "ما هي أعلى شلالات العالم؟", answer: "شلالات آنجل", answered: false },
        { points: 600, text: "ما هي أكبر دولة في العالم من حيث المساحة؟", answer: "روسيا", answered: false },
        { points: 600, text: "ما هو البحر الذي يفصل بين دولتي تركيا واليونان؟", answer: "بحر إيجه", answered: false }
      ]
    },
    {
      id: 9,
      title: "أسئلة علمية",
      image: "", 
      questions: [
        { points: 200, text: "ماذا يُسمى كوكب المريخ؟", answer: "الكوكب الأحمر", answered: false },
        { points: 200, text: "ما هو الغاز المشهور بغاز الضحك؟", answer: "أكسيد النيتروس", answered: false },
        { points: 400, text: "من هو مُخترع المصباح الكهربائي؟", answer: "توماس أديسون", answered: false },
        { points: 400, text: "ما هو عدد كواكب المجموعة الشمسية؟", answer: "8 كواكب", answered: false },
        { points: 600, text: "ما هو شكل مجرة درب التبانة؟", answer: "حلزوني", answered: false },
        { points: 600, text: "ما الغاز الذي يمتص الأشعة فوق البنفسجية في الغلاف الجوي؟", answer: "غاز الأوزون", answered: false }
      ]
    },
    {
      id: 10,
      title: "الرياضة",
      image: "", 
      questions: [
        { points: 200, text: "من هو أسطورة كرة القدم البرازيلي الملقب بـ (الظاهرة)؟", answer: "رونالدو", answered: false },
        { points: 200, text: "كم عدد لاعبي فريق كرة السلة؟", answer: "5 لاعبين", answered: false },
        { points: 400, text: "أين أقيمت أول دورة ألعاب أولمبية حديثة؟", answer: "أثينا، اليونان", answered: false },
        { points: 400, text: "ما هي الرياضة التي اشتهر بها محمد علي كلاي؟", answer: "الملاكمة", answered: false },
        { points: 600, text: "كم عدد البطولات التي فاز بها مايكل جوردان مع شيكاغو بولز؟", answer: "6 بطولات", answered: false },
        { points: 600, text: "ما هي الدولة التي استضافت كأس العالم لكرة القدم 2022؟", answer: "قطر", answered: false }
      ]
    },
    {
      id: 11,
      title: "التاريخ",
      image: "", 
      questions: [
        { points: 200, text: "متى انتهت الحرب العالمية الثانية؟", answer: "عام 1945", answered: false },
        { points: 200, text: "من هو مكتشف أمريكا؟", answer: "كريستوفر كولومبوس", answered: false },
        { points: 400, text: "متى سقطت الخلافة العثمانية؟", answer: "عام 1924", answered: false },
        { points: 400, text: "من هو أول من صعد إلى القمر؟", answer: "نيل أرمسترونج", answered: false },
        { points: 600, text: "ما هي الحضارة التي بنت الأهرامات في مصر؟", answer: "الحضارة المصرية القديمة (الفرعونية)", answered: false },
        { points: 600, text: "من هو أول رئيس للولايات المتحدة الأمريكية؟", answer: "جورج واشنطن", answered: false }
      ]
    },
    {
      id: 12,
      title: "الأدب",
      image: "", 
      questions: [
        { points: 200, text: "من هو مؤلف كتاب 'البؤساء'؟", answer: "فيكتور هوجو", answered: false },
        { points: 200, text: "من هو مؤلف مسرحية 'هاملت'؟", answer: "وليام شكسبير", answered: false },
        { points: 400, text: "من هو الشاعر الملقب بـ 'المتنبي'؟", answer: "أحمد بن الحسين", answered: false },
        { points: 400, text: "ما هي رواية نجيب محفوظ التي فاز بسببها بجائزة نوبل؟", answer: "الثلاثية (بين القصرين، قصر الشوق، السكرية)", answered: false },
        { points: 600, text: "من هو مؤلف رواية 'الحرب والسلام'؟", answer: "ليو تولستوي", answered: false },
        { points: 600, text: "ما هي آخر رواية كتبها إرنست همنغواي؟", answer: "الشيخ والبحر", answered: false }
      ]
    },
    {
      id: 13,
      title: "التكنولوجيا",
      image: "", 
      questions: [
        { points: 200, text: "ما هو اسم مؤسس شركة مايكروسوفت؟", answer: "بيل غيتس", answered: false },
        { points: 200, text: "ما هو اسم مؤسس شركة آبل؟", answer: "ستيف جوبز", answered: false },
        { points: 400, text: "في أي عام تم إطلاق أول آيفون؟", answer: "2007", answered: false },
        { points: 400, text: "ما هو البرنامج المستخدم لتصفح الإنترنت؟", answer: "متصفح الويب (مثل كروم، فايرفوكس، سفاري)", answered: false },
        { points: 600, text: "ما هي لغة البرمجة الأكثر استخداماً في تطوير تطبيقات الويب؟", answer: "جافاسكريبت", answered: false },
        { points: 600, text: "ما هو اسم الذكاء الاصطناعي الذي طورته شركة أوبن إيه آي؟", answer: "GPT (تحديداً ChatGPT)", answered: false }
      ]
    },
    {
      id: 14,
      title: "الفنون",
      image: "", 
      questions: [
        { points: 200, text: "من رسم لوحة 'الموناليزا'؟", answer: "ليوناردو دافنشي", answered: false },
        { points: 200, text: "من هو مغني أغنية 'ثريلر'؟", answer: "مايكل جاكسون", answered: false },
        { points: 400, text: "ما هو اسم الفرقة الموسيقية البريطانية المشهورة التي كان من أعضائها جون لينون؟", answer: "البيتلز", answered: false },
        { points: 400, text: "من هو الفنان الهولندي الذي قطع أذنه؟", answer: "فينسنت فان جوخ", answered: false },
        { points: 600, text: "من هو مخرج فيلم 'تايتانيك'؟", answer: "جيمس كاميرون", answered: false },
        { points: 600, text: "ما هو الفن الذي يستخدم الضوء والظل لإنشاء صور ثلاثية الأبعاد؟", answer: "الهولوغرام", answered: false }
      ]
    },
    {
      id: 15,
      title: "الألغاز",
      image: "", 
      questions: [
        { points: 200, text: "ما هو الشيء الذي يتحرك حولك لكنك لا تراه؟", answer: "الهواء", answered: false },
        { points: 200, text: "ما هو الشيء الذي كلما زاد نقص؟", answer: "العمر", answered: false },
        { points: 400, text: "أنا معك في كل مكان، لكنك لا تستطيع لمسي أو رؤيتي، من أنا؟", answer: "اسمك", answered: false },
        { points: 400, text: "ما هو الشيء الذي يمشي ويقف وليس له أرجل؟", answer: "الساعة", answered: false },
        { points: 600, text: "ما هو الشيء الذي تراه مرة في الدقيقة، ومرتين في اللحظة، ولا تراه في السنة؟", answer: "حرف اللام", answered: false },
        { points: 600, text: "كلما أخذت مني كبرت، من أنا؟", answer: "الحفرة", answered: false }
      ]
    },
    {
      id: 16,
      title: "التراث والفلكلور",
      image: "", 
      questions: [
        { points: 200, text: "ما هي الرقصة الشعبية السعودية المشهورة؟", answer: "العرضة", answered: false },
        { points: 200, text: "ما هو الزي التقليدي للرجال في دول الخليج العربي؟", answer: "الثوب والغترة", answered: false },
        { points: 400, text: "ما هي الآلة الموسيقية التقليدية في مصر؟", answer: "الربابة", answered: false },
        { points: 400, text: "ما هو الطبق الشعبي الأردني المشهور المصنوع من البرغل واللحم؟", answer: "المنسف", answered: false },
        { points: 600, text: "ما هو فن القول الشعبي المنتشر في اليمن؟", answer: "البالة", answered: false },
        { points: 600, text: "ما هو اسم الرقص الشعبي الإيرلندي السريع؟", answer: "الريفردانس", answered: false }
      ]
    },
    {
      id: 17,
      title: "اللغات",
      image: "", 
      questions: [
        { points: 200, text: "ما هي اللغة الرسمية في البرازيل؟", answer: "البرتغالية", answered: false },
        { points: 200, text: "كم عدد الحروف في اللغة العربية؟", answer: "28 حرفاً", answered: false },
        { points: 400, text: "ما هي أكثر لغة متحدث بها كلغة أم في العالم؟", answer: "الماندرين الصينية", answered: false },
        { points: 400, text: "ما معنى كلمة 'مرحبا' باللغة اليابانية؟", answer: "كونيتشيوا", answered: false },
        { points: 600, text: "ما هي اللغة الرسمية في سويسرا؟", answer: "الألمانية والفرنسية والإيطالية والرومانشية", answered: false },
        { points: 600, text: "ما هي أقدم لغة مكتوبة لا تزال مستخدمة حتى اليوم؟", answer: "اللغة الصينية", answered: false }
      ]
    },
    {
      id: 18,
      title: "الأفلام والمسلسلات",
      image: "", 
      questions: [
        { points: 200, text: "من هو بطل فيلم 'المصارع' (Gladiator)؟", answer: "راسل كرو", answered: false },
        { points: 200, text: "ما هو الفيلم الأعلى إيراداً في التاريخ؟", answer: "أفاتار", answered: false },
        { points: 400, text: "من هو مخرج سلسلة أفلام 'حرب النجوم'؟", answer: "جورج لوكاس", answered: false },
        { points: 400, text: "ما هو اسم الدب في فيلم 'كتاب الأدغال'؟", answer: "بالو", answered: false },
        { points: 600, text: "من الممثل الذي فاز بأكبر عدد من جوائز الأوسكار كأفضل ممثل؟", answer: "دانيال داي لويس (3 مرات)", answered: false },
        { points: 600, text: "ما هو أول فيلم رسوم متحركة طويل أنتجته ديزني؟", answer: "سنو وايت والأقزام السبعة", answered: false }
      ]
    },
    {
      id: 19,
      title: "الحيوانات الغريبة",
      image: "", 
      questions: [
        { points: 200, text: "ما هو الحيوان الذي ينام واقفاً؟", answer: "الحصان", answered: false },
        { points: 200, text: "أي حيوان له بصمات فريدة مثل الإنسان؟", answer: "الكوالا", answered: false },
        { points: 400, text: "ما هو الحيوان الوحيد الذي لا يستطيع القفز؟", answer: "الفيل", answered: false },
        { points: 400, text: "ما هو الحيوان الذي يموت إذا لم يأكل لمدة 24 ساعة؟", answer: "الفأر", answered: false },
        { points: 600, text: "ما هو الحيوان الذي يتنفس من خلال جلده؟", answer: "الضفدع", answered: false },
        { points: 600, text: "ما هو الحيوان الذي يقوم بتغيير جنسه خلال دورة حياته؟", answer: "سمك المهرج", answered: false }
      ]
    },
    {
      id: 20,
      title: "العمارة والمباني",
      image: "", 
      questions: [
        { points: 200, text: "ما هو أطول مبنى في العالم؟", answer: "برج خليفة", answered: false },
        { points: 200, text: "في أي مدينة يقع تاج محل؟", answer: "أغرا، الهند", answered: false },
        { points: 400, text: "من صمم برج إيفل؟", answer: "غوستاف إيفل", answered: false },
        { points: 400, text: "في أي مدينة توجد البتراء؟", answer: "معان، الأردن", answered: false },
        { points: 600, text: "ما هو اسم المهندس المعماري الذي صمم متحف جوجنهايم في بلباو؟", answer: "فرانك جيري", answered: false },
        { points: 600, text: "ما هو المبنى الذي استغرق بناؤه 200 عام؟", answer: "كاتدرائية نوتردام", answered: false }
      ]
    }
  ],
  teams: [
    { id: 1, name: "فريق 1", score: 0 },
    { id: 2, name: "فريق 2", score: 0 }
  ]
};

let currentTopicId = null;
let currentQuestionPoints = null;
let activeTeam = null;

document.addEventListener("DOMContentLoaded", function() {
  // تحقق مما إذا كانت هناك بيانات محفوظة
  const savedData = localStorage.getItem('gameData');
  if (savedData) {
    // إذا كانت هناك بيانات محفوظة، استخدمها بدلاً من البيانات الافتراضية
    Object.assign(gameData, JSON.parse(savedData));
  } else {
    // إذا لم تكن هناك بيانات محفوظة، احفظ البيانات الافتراضية
    saveGameData();
  }

  // عرض شاشة البداية لمدة 2 ثانية ثم إخفاؤها
  setTimeout(() => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.style.opacity = '0';
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 500);
    }
  }, 2000);

  // تهيئة اللوحة
  initializeBoard();
});

// حفظ بيانات اللعبة في التخزين المحلي
function saveGameData() {
  localStorage.setItem('gameData', JSON.stringify(gameData));
}

// تهيئة لوحة اللعبة
function initializeBoard() {
  // إنشاء الجدول
  const board = document.getElementById('game-board');
  board.innerHTML = '';

  // إنشاء صف العناوين
  const headerRow = document.createElement('tr');
  headerRow.className = 'board-header';

  // عرض المواضيع المحددة (بحد أقصى 6)
  const activeTopics = getActiveTopics();

  activeTopics.forEach(topic => {
    const th = document.createElement('th');
    th.textContent = topic.title;
    if (topic.image) {
      const img = document.createElement('img');
      img.src = topic.image;
      img.alt = topic.title;
      img.className = 'topic-image';
      th.prepend(img);
    }
    headerRow.appendChild(th);
  });

  board.appendChild(headerRow);

  // إنشاء صفوف النقاط
  const pointValues = [200, 400, 600];

  pointValues.forEach(points => {
    const row = document.createElement('tr');

    activeTopics.forEach(topic => {
      const td = document.createElement('td');
      const question = topic.questions.find(q => q.points === points);

      if (question && !question.answered) {
        td.textContent = points;
        td.onclick = function() {
          openQuestion(topic.id, points);
        };
      }

      row.appendChild(td);
    });

    board.appendChild(row);
  });

  // تحديث لوحة النقاط
  updateScoreboard();
}

// الحصول على المواضيع النشطة (بحد أقصى 6)
function getActiveTopics() {
  // استخدم المواضيع الستة الأولى أو أقل إذا كان هناك أقل من 6 مواضيع
  return gameData.topics.slice(0, 6);
}

// فتح السؤال المحدد
function openQuestion(topicId, points) {
  currentTopicId = topicId;
  currentQuestionPoints = points;

  const topic = gameData.topics.find(t => t.id === topicId);
  const question = topic.questions.find(q => q.points === points);

  document.getElementById('question-topic-title').textContent = topic.title;
  document.getElementById('question-points').textContent = points;
  
  // تحديد عنصر عرض السؤال والوسائط
  const questionTextElement = document.getElementById('question-text');
  const mediaContainer = document.getElementById('question-media');
  
  // إفراغ حاويات الوسائط والنص
  questionTextElement.textContent = '';
  mediaContainer.innerHTML = '';
  
  // عرض نص السؤال
  questionTextElement.textContent = question.text;
  
  // إذا كان السؤال يحتوي على وسائط، قم بعرضها
  if (question.mediaType && question.mediaUrl) {
    if (question.mediaType === 'image') {
      const img = document.createElement('img');
      img.src = question.mediaUrl;
      img.alt = 'صورة السؤال';
      img.className = 'question-image';
      mediaContainer.appendChild(img);
    } else if (question.mediaType === 'video') {
      const video = document.createElement('video');
      video.src = question.mediaUrl;
      video.controls = true;
      video.autoplay = true;
      video.className = 'question-video';
      mediaContainer.appendChild(video);
    } else if (question.mediaType === 'audio') {
      const audio = document.createElement('audio');
      audio.src = question.mediaUrl;
      audio.controls = true;
      audio.autoplay = true;
      mediaContainer.appendChild(audio);
    }
  }

  // إظهار نافذة السؤال
  document.getElementById('question-modal').style.display = 'flex';
  
  // إذا لم يكن هناك فريق نشط وهناك أكثر من فريق، أظهر قائمة اختيار الفريق
  if (!activeTeam && gameData.teams.length > 1) {
    document.getElementById('team-selector').style.display = 'block';
    document.getElementById('answer-controls').style.display = 'none';
    
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';
    
    gameData.teams.forEach(team => {
      const button = document.createElement('button');
      button.textContent = team.name;
      button.className = 'team-button';
      button.onclick = function() {
        selectTeam(team.id);
      };
      teamList.appendChild(button);
    });
  } else {
    // إذا كان هناك فريق واحد فقط أو تم تحديد فريق بالفعل
    if (gameData.teams.length === 1) {
      activeTeam = gameData.teams[0].id;
    }
    document.getElementById('team-selector').style.display = 'none';
    document.getElementById('answer-controls').style.display = 'flex';
  }
}

// اختيار الفريق النشط
function selectTeam(teamId) {
  activeTeam = teamId;
  document.getElementById('team-selector').style.display = 'none';
  document.getElementById('answer-controls').style.display = 'flex';
  
  // عرض اسم الفريق المختار
  const team = gameData.teams.find(t => t.id === teamId);
  document.getElementById('active-team-name').textContent = team.name;
  document.getElementById('active-team-container').style.display = 'block';
}

// معالجة الإجابة الصحيحة
function correctAnswer() {
  const topic = gameData.topics.find(t => t.id === currentTopicId);
  const question = topic.questions.find(q => q.points === currentQuestionPoints);
  
  // وضع علامة على السؤال بأنه تمت الإجابة عليه
  question.answered = true;
  
  // إضافة النقاط للفريق النشط
  const team = gameData.teams.find(t => t.id === activeTeam);
  team.score += currentQuestionPoints;
  
  // حفظ البيانات
  saveGameData();
  
  // إغلاق النافذة
  closeQuestionModal();
  
  // تحديث اللوحة
  initializeBoard();
}

// معالجة الإجابة الخاطئة
function wrongAnswer() {
  const topic = gameData.topics.find(t => t.id === currentTopicId);
  const question = topic.questions.find(q => q.points === currentQuestionPoints);
  
  // وضع علامة على السؤال بأنه تمت الإجابة عليه
  question.answered = true;
  
  // خصم النقاط من الفريق النشط
  const team = gameData.teams.find(t => t.id === activeTeam);
  team.score -= currentQuestionPoints;
  
  // حفظ البيانات
  saveGameData();
  
  // إغلاق النافذة
  closeQuestionModal();
  
  // تحديث اللوحة
  initializeBoard();
}

// إظهار الإجابة
function showAnswer() {
  const topic = gameData.topics.find(t => t.id === currentTopicId);
  const question = topic.questions.find(q => q.points === currentQuestionPoints);
  
  document.getElementById('answer-text').textContent = question.answer;
  document.getElementById('answer-container').style.display = 'block';
  document.getElementById('show-answer-btn').style.display = 'none';
}

// إغلاق نافذة السؤال
function closeQuestionModal() {
  document.getElementById('question-modal').style.display = 'none';
  document.getElementById('answer-container').style.display = 'none';
  document.getElementById('show-answer-btn').style.display = 'inline-block';
  document.getElementById('active-team-container').style.display = 'none';
  activeTeam = null;
}

// تحديث لوحة النقاط
function updateScoreboard() {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';
  
  gameData.teams.forEach(team => {
    const teamScore = document.createElement('div');
    teamScore.className = 'team-score';
    teamScore.innerHTML = `
      <span class="team-name">${team.name}</span>
      <span class="score">${team.score}</span>
    `;
    scoreboard.appendChild(teamScore);
  });
}

// تغيير النقاط يدوياً
function changeScore(teamId, amount) {
  const team = gameData.teams.find(t => t.id === teamId);
  if (team) {
    team.score += amount;
    saveGameData();
    updateScoreboard();
  }
}

// إعادة ضبط جميع الإجابات (للعب مرة أخرى)
function resetAnswers() {
  if (confirm('هل أنت متأكد من إعادة ضبط جميع الإجابات؟')) {
    gameData.topics.forEach(topic => {
      topic.questions.forEach(question => {
        question.answered = false;
      });
    });
    
    saveGameData();
    initializeBoard();
  }
}

// إعادة ضبط النقاط فقط
function resetScores() {
  if (confirm('هل أنت متأكد من إعادة ضبط جميع النقاط؟')) {
    gameData.teams.forEach(team => {
      team.score = 0;
    });
    
    saveGameData();
    updateScoreboard();
  }
}

// فتح لوحة التحكم (للنسخة المستقبلية)
function openDashboard() {
  window.location.href = 'dashboard.html';
}

// الانتقال إلى وضع ملء الشاشة
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
