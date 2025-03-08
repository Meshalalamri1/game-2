
// DOM Elements
const dashboardNav = document.querySelector('.dashboard-nav');
const dashboardSections = document.querySelectorAll('.dashboard-section');

// Topic form elements
const addTopicForm = document.getElementById('add-topic-form');
const topicTitleInput = document.getElementById('topic-title');
const topicsTable = document.getElementById('topics-table').querySelector('tbody');

// Question form elements
const addQuestionForm = document.getElementById('add-question-form');
const questionTopicSelect = document.getElementById('question-topic');
const questionPointsSelect = document.getElementById('question-points');
const questionTextInput = document.getElementById('question-text');
const questionAnswerInput = document.getElementById('question-answer');
const filterTopicSelect = document.getElementById('filter-topic');
const questionsTable = document.getElementById('questions-table').querySelector('tbody');

// Team form elements
const updateTeamsForm = document.getElementById('update-teams-form');
const teamsContainer = document.getElementById('teams-container');

// Game Management elements
const gameTeamsContainer = document.getElementById('game-teams-container');
const topicSelectionContainer = document.getElementById('topic-selection-container');
const saveGameSettingsBtn = document.getElementById('save-game-settings');

// Reset buttons
const resetScoresBtn = document.getElementById('reset-scores');
const resetAnswersBtn = document.getElementById('reset-answers');
const resetAllBtn = document.getElementById('reset-all');
const restoreDefaultTopicsBtn = document.getElementById('restore-topics');

// Game data
let gameData = {
  topics: [],
  teams: [],
  activeTopics: [] // IDs of topics to display in the game
};

// Initialize the dashboard
function initDashboard() {
  loadGameData();
  setupEventListeners();
  renderTopicsTable();
  renderQuestionTopicSelect();
  renderFilterTopicSelect();
  renderQuestionsTable();
  renderTeamsForm();
  renderGameManagement();

  // Ensure we have teams data
  if (!gameData.teams || gameData.teams.length === 0) {
    gameData.teams = [
      { id: 1, name: "فريق 1", score: 0 },
      { id: 2, name: "فريق 2", score: 0 }
    ];
    saveGameData();
  }

  // Initialize activeTopics if empty
  if (!gameData.activeTopics || gameData.activeTopics.length === 0) {
    // By default, use all topic IDs (up to 6)
    gameData.activeTopics = gameData.topics.slice(0, 6).map(topic => topic.id);
    saveGameData();
  }
}

// Load game data from localStorage
function loadGameData() {
  const savedData = localStorage.getItem('gameData');
  if (savedData) {
    gameData = JSON.parse(savedData);
  } else {
    // Initialize with default data if nothing is saved
    gameData = {
      topics: [],
      teams: [
        { id: 1, name: "فريق 1", score: 0 },
        { id: 2, name: "فريق 2", score: 0 }
      ],
      activeTopics: []
    };
  }
}

// Save game data to localStorage
function saveGameData() {
  localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Google Gemini API Key
const GEMINI_API_KEY = "AIzaSyAf-5Km13EuT5AtE8DHRHPsUEQd5b8pTWk";
// Gemini API URL
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Setup event listeners
function setupEventListeners() {
  // Dashboard navigation
  dashboardNav.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn')) {
      const sectionName = e.target.dataset.section;

      // Update active button
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');

      // Show selected section
      dashboardSections.forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(`${sectionName}-section`).classList.add('active');
    }
  });

  // Add topic form
  addTopicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTopic();
  });

  // Add question form
  addQuestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addQuestion();
  });

  // Filter topics for questions
  filterTopicSelect.addEventListener('change', () => {
    renderQuestionsTable();
  });

  // Update teams form
  updateTeamsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateTeams();
  });

  // Game settings form
  saveGameSettingsBtn.addEventListener('click', saveGameSettings);

  // Reset buttons
  resetScoresBtn.addEventListener('click', resetScores);
  resetAnswersBtn.addEventListener('click', resetAnswers);
  resetAllBtn.addEventListener('click', resetAll);
  restoreDefaultTopicsBtn.addEventListener('click', restoreDefaultTopics);

  // حذف المكررات
  document.getElementById('remove-duplicate-topics').addEventListener('click', removeTopicDuplicates);
  document.getElementById('remove-duplicate-questions').addEventListener('click', removeQuestionDuplicates);

  // AI Question Generator buttons
  document.getElementById('toggle-ai-section').addEventListener('click', toggleAISection);
  document.getElementById('ai-topic-select').addEventListener('change', updateAITopicInput);
  document.getElementById('generate-easy').addEventListener('click', () => generateAIQuestions(200));
  document.getElementById('generate-medium').addEventListener('click', () => generateAIQuestions(400));
  document.getElementById('generate-hard').addEventListener('click', () => generateAIQuestions(600));
  document.getElementById('generate-all').addEventListener('click', generateAllCategories);
  document.getElementById('save-ai-questions').addEventListener('click', saveAIQuestions);
  
  // Media type selection
  const mediaTypeSelect = document.getElementById('media-type');
  const mediaUrlContainer = document.getElementById('media-url-container');
  const mediaUploadInput = document.getElementById('media-upload');
  const mediaUrlInput = document.getElementById('media-url');
  const uploadStatus = document.getElementById('upload-status');

  mediaTypeSelect.addEventListener('change', function() {
    if (this.value) {
      mediaUrlContainer.style.display = 'block';
    } else {
      mediaUrlContainer.style.display = 'none';
    }
  });

  // Handle file upload and convert to Data URL
  mediaUploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type based on selected media type
    const mediaType = mediaTypeSelect.value;
    let isValidType = false;

    if (mediaType === 'image' && file.type.startsWith('image/')) {
      isValidType = true;
    } else if (mediaType === 'video' && file.type.startsWith('video/')) {
      isValidType = true;
    } else if (mediaType === 'audio' && file.type.startsWith('audio/')) {
      isValidType = true;
    }

    if (!isValidType) {
      alert(`الرجاء اختيار ملف من نوع ${mediaType}`);
      return;
    }

    uploadStatus.textContent = 'جاري التحميل...';

    const reader = new FileReader();
    reader.onload = function(event) {
      // Store the Data URL in the URL input
      mediaUrlInput.value = event.target.result;
      uploadStatus.textContent = 'تم التحميل بنجاح!';
    };
    reader.onerror = function() {
      uploadStatus.textContent = 'حدث خطأ أثناء التحميل';
    };
    reader.readAsDataURL(file);
  });
}

// Render topics table
function renderTopicsTable() {
  topicsTable.innerHTML = '';

  gameData.topics.forEach((topic, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${topic.title}</td>
      <td class="action-cell">
        <button class="edit-btn" data-id="${topic.id}">تعديل</button>
        <button class="delete-btn" data-id="${topic.id}">حذف</button>
      </td>
    `;

    // Edit topic
    row.querySelector('.edit-btn').addEventListener('click', () => {
      editTopic(topic);
    });

    // Delete topic
    row.querySelector('.delete-btn').addEventListener('click', () => {
      deleteTopic(topic.id);
    });

    topicsTable.appendChild(row);
  });
}

// Render question topic select
function renderQuestionTopicSelect() {
  questionTopicSelect.innerHTML = '';

  gameData.topics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic.id;
    option.textContent = topic.title;
    questionTopicSelect.appendChild(option);
  });
  
  // Also update AI topic select
  updateAITopicSelect();
}

// Render filter topic select
function renderFilterTopicSelect() {
  // Keep the "All topics" option
  filterTopicSelect.innerHTML = '<option value="all">جميع المواضيع</option>';

  gameData.topics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic.id;
    option.textContent = topic.title;
    filterTopicSelect.appendChild(option);
  });
}

// Render questions table
function renderQuestionsTable() {
  questionsTable.innerHTML = '';

  const selectedTopicId = filterTopicSelect.value;

  gameData.topics.forEach(topic => {
    if (selectedTopicId !== 'all' && topic.id.toString() !== selectedTopicId) {
      return;
    }

    if (!topic.questions) {
      topic.questions = [];
    }

    topic.questions.forEach((question, qIndex) => {
      const row = document.createElement('tr');

      let mediaInfo = 'لا يوجد';
      if (question.mediaType) {
        const mediaTypes = {
          'image': 'صورة',
          'video': 'فيديو',
          'audio': 'صوت'
        };
        mediaInfo = `${mediaTypes[question.mediaType]}`;
      }

      row.innerHTML = `
        <td>${topic.title}</td>
        <td>${question.points}</td>
        <td>${question.text}</td>
        <td>${question.answer}</td>
        <td>${mediaInfo}</td>
        <td class="action-cell">
          <button class="edit-btn" data-topic-id="${topic.id}" data-question-index="${qIndex}">تعديل</button>
          <button class="delete-btn" data-topic-id="${topic.id}" data-question-index="${qIndex}">حذف</button>
        </td>
      `;

      // Edit question
      row.querySelector('.edit-btn').addEventListener('click', () => {
        editQuestion(topic.id, qIndex);
      });

      // Delete question
      row.querySelector('.delete-btn').addEventListener('click', () => {
        deleteQuestion(topic.id, qIndex);
      });

      questionsTable.appendChild(row);
    });
  });
}

// Render teams form
function renderTeamsForm() {
  teamsContainer.innerHTML = '';

  gameData.teams.forEach((team, index) => {
    const teamGroup = document.createElement('div');
    teamGroup.className = 'form-group';

    teamGroup.innerHTML = `
      <label for="team-name-${index}">اسم الفريق ${index + 1}</label>
      <input type="text" id="team-name-${index}" value="${team.name}" required>

      <label for="team-score-${index}">نقاط الفريق</label>
      <input type="number" id="team-score-${index}" value="${team.score}" min="0" required>
    `;

    teamsContainer.appendChild(teamGroup);
  });
}

// Add new topic
function addTopic() {
  const title = topicTitleInput.value.trim();

  if (!title) return;

  const newTopic = {
    id: Date.now(),
    title,
    questions: []
  };

  gameData.topics.push(newTopic);
  saveGameData();

  // Reset form
  topicTitleInput.value = '';

  // Update UI
  renderTopicsTable();
  renderQuestionTopicSelect();
  renderFilterTopicSelect();
  renderGameManagement();
}

// Edit topic
function editTopic(topic) {
  topicTitleInput.value = topic.title;

  // Remove existing topic
  deleteTopic(topic.id, false);

  // Focus on form for editing
  topicTitleInput.focus();
}

// Delete topic
function deleteTopic(topicId, confirm = true) {
  if (confirm && !window.confirm('هل أنت متأكد من حذف هذا الموضوع؟')) {
    return;
  }

  gameData.topics = gameData.topics.filter(topic => topic.id !== topicId);
  saveGameData();

  // Update UI
  renderTopicsTable();
  renderQuestionTopicSelect();
  renderFilterTopicSelect();
  renderQuestionsTable();
  renderGameManagement();
}

// Add new question
function addQuestion() {
  const topicId = parseInt(questionTopicSelect.value);
  const points = parseInt(questionPointsSelect.value);
  const text = questionTextInput.value.trim();
  const answer = questionAnswerInput.value.trim();
  const mediaType = document.getElementById('media-type').value;
  const mediaUrl = document.getElementById('media-url').value.trim();

  if (!topicId || !points || !text || !answer) return;

  // Validate media URL if media type is selected
  if (mediaType && !mediaUrl) {
    alert('الرجاء إدخال رابط للوسائط المختارة');
    return;
  }

  const topicIndex = gameData.topics.findIndex(t => t.id === topicId);

  if (topicIndex === -1) return;

  // Ensure questions array exists
  if (!gameData.topics[topicIndex].questions) {
    gameData.topics[topicIndex].questions = [];
  }

  // Check if we already have two questions with this point value
  const pointQuestions = gameData.topics[topicIndex].questions.filter(q => q.points === points);

  if (pointQuestions.length >= 2) {
    alert(`لا يمكن إضافة أكثر من سؤالين بنفس النقاط (${points}) للموضوع الواحد`);
    return;
  }

  const newQuestion = {
    points,
    text,
    answer,
    answered: false,
    mediaType,
    mediaUrl
  };

  gameData.topics[topicIndex].questions.push(newQuestion);
  saveGameData();

  // Reset form
  questionTextInput.value = '';
  questionAnswerInput.value = '';
  document.getElementById('media-type').value = '';
  document.getElementById('media-url').value = '';
  document.getElementById('media-url-container').style.display = 'none';

  // Update UI
  renderQuestionsTable();
}

// Edit question
function editQuestion(topicId, questionIndex) {
  const topicIndex = gameData.topics.findIndex(t => t.id === topicId);

  if (topicIndex === -1) return;

  const question = gameData.topics[topicIndex].questions[questionIndex];

  // Set form values
  questionTopicSelect.value = topicId;
  questionPointsSelect.value = question.points;
  questionTextInput.value = question.text;
  questionAnswerInput.value = question.answer;

  const mediaTypeSelect = document.getElementById('media-type');
  const mediaUrlContainer = document.getElementById('media-url-container');
  const mediaUrlInput = document.getElementById('media-url');

  mediaTypeSelect.value = question.mediaType || '';

  if (question.mediaType && question.mediaUrl) {
    mediaUrlContainer.style.display = 'block';
    mediaUrlInput.value = question.mediaUrl;
  } else {
    mediaUrlContainer.style.display = 'none';
    mediaUrlInput.value = '';
  }

  // Remove question
  deleteQuestion(topicId, questionIndex, false);

  // Focus on form for editing
  questionTextInput.focus();
}

// Delete question
function deleteQuestion(topicId, questionIndex, confirm = true) {
  if (confirm && !window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
    return;
  }

  const topicIndex = gameData.topics.findIndex(t => t.id === topicId);

  if (topicIndex === -1) return;

  // Remove question at specified index
  gameData.topics[topicIndex].questions.splice(questionIndex, 1);
  saveGameData();

  // Update UI
  renderQuestionsTable();
}

// Update teams
function updateTeams() {
  for (let i = 0; i < gameData.teams.length; i++) {
    const nameInput = document.getElementById(`team-name-${i}`);
    const scoreInput = document.getElementById(`team-score-${i}`);

    if (nameInput && scoreInput) {
      gameData.teams[i].name = nameInput.value.trim();
      gameData.teams[i].score = parseInt(scoreInput.value) || 0;
    }
  }

  saveGameData();
  alert('تم حفظ بيانات الفرق بنجاح');
}

// Reset scores
function resetScores() {
  if (!window.confirm('هل أنت متأكد من إعادة ضبط نقاط جميع الفرق إلى صفر؟')) {
    return;
  }

  gameData.teams.forEach(team => {
    team.score = 0;
  });

  saveGameData();
  alert('تم إعادة ضبط نقاط الفرق بنجاح');
  renderTeamsForm();
}

// Reset answers (so questions can be asked again)
function resetAnswers() {
  if (!window.confirm('هل أنت متأكد من إعادة ضبط حالة جميع الأسئلة؟')) {
    return;
  }

  gameData.topics.forEach(topic => {
    if (topic.questions) {
      topic.questions.forEach(question => {
        question.answered = false;
      });
    }
  });

  saveGameData();
  alert('تم إعادة ضبط حالة الأسئلة بنجاح');
}

// Reset all game data
function resetAll() {
  if (!window.confirm('تحذير: سيتم حذف جميع بيانات اللعبة! هل أنت متأكد من المتابعة؟')) {
    return;
  }

  // Confirm again for safety
  if (!window.confirm('هل أنت متأكد بشكل قاطع؟ لا يمكن التراجع عن هذا الإجراء!')) {
    return;
  }

  localStorage.removeItem('gameData');

  // Reset to default data
  gameData = {
    topics: [],
    teams: [
      { id: 1, name: "فريق 1", score: 0 },
      { id: 2, name: "فريق 2", score: 0 }
    ],
    activeTopics: []
  };

  saveGameData();
  alert('تم إعادة ضبط جميع بيانات اللعبة بنجاح');

  // Update all UI
  renderTopicsTable();
  renderQuestionTopicSelect();
  renderFilterTopicSelect();
  renderQuestionsTable();
  renderTeamsForm();
  renderGameManagement();
}

// حذف المواضيع المكررة
function removeTopicDuplicates() {
  // تخزين العناوين الفريدة التي تمت معالجتها
  const uniqueTitles = new Set();
  // قائمة بالمواضيع الفريدة
  const uniqueTopics = [];

  // تحقق من كل موضوع
  for (const topic of gameData.topics) {
    // إذا لم يكن هناك موضوع بنفس العنوان، أضفه إلى القائمة الفريدة
    if (!uniqueTitles.has(topic.title.toLowerCase())) {
      uniqueTitles.add(topic.title.toLowerCase());
      uniqueTopics.push(topic);
    } else {
      console.log(`تم حذف موضوع مكرر: ${topic.title}`);
    }
  }

  // تحديث قائمة المواضيع
  gameData.topics = uniqueTopics;

  // حفظ التغييرات
  saveGameData();

  // تحديث واجهة المستخدم
  renderTopicsTable();
  renderQuestionTopicSelect();
  renderFilterTopicSelect();
  renderQuestionsTable();
  renderGameManagement();
}

// حذف الأسئلة المكررة داخل نفس الموضوع
function removeQuestionDuplicates() {
  // تكرار لكل موضوع
  for (const topic of gameData.topics) {
    // تخزين نصوص الأسئلة الفريدة التي تمت معالجتها
    const uniqueQuestionsText = new Set();
    // قائمة بالأسئلة الفريدة
    const uniqueQuestions = [];

    // التأكد من أن topic.questions موجود
    if (!topic.questions) {
      topic.questions = [];
      continue;
    }

    // تحقق من كل سؤال
    for (const question of topic.questions) {
      // استخدم نص السؤال كمفتاح فريد
      if (!uniqueQuestionsText.has(question.text.toLowerCase())) {
        uniqueQuestionsText.add(question.text.toLowerCase());
        uniqueQuestions.push(question);
      } else {
        console.log(`تم حذف سؤال مكرر في موضوع ${topic.title}: ${question.text}`);
      }
    }

    // تحديث قائمة الأسئلة للموضوع
    topic.questions = uniqueQuestions;
  }

  // حفظ التغييرات
  saveGameData();

  // تحديث واجهة المستخدم
  renderQuestionsTable();
}

// مفتاح قابل للتبديل لإظهار/إخفاء قسم الذكاء الاصطناعي
function toggleAISection() {
  const aiSection = document.getElementById('ai-generator-section');
  const toggleBtn = document.getElementById('toggle-ai-section');

  if (aiSection.classList.contains('hidden')) {
    aiSection.classList.remove('hidden');
    toggleBtn.textContent = 'إخفاء توليد الأسئلة الذكية';
    // تحديث قائمة المواضيع عند فتح القسم
    updateAITopicSelect();
  } else {
    aiSection.classList.add('hidden');
    toggleBtn.textContent = 'توليد أسئلة باستخدام الذكاء الاصطناعي';
  }
}

// تحديث قائمة المواضيع الموجودة في نموذج الذكاء الاصطناعي
function updateAITopicSelect() {
  const topicSelect = document.getElementById('ai-topic-select');
  topicSelect.innerHTML = '<option value="">-- اختر موضوعاً موجوداً أو أدخل موضوعاً جديداً --</option>';

  // إضافة المواضيع الموجودة للقائمة
  gameData.topics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic.title;
    option.textContent = topic.title;
    topicSelect.appendChild(option);
  });
}

// تحديث حقل الإدخال عند اختيار موضوع من القائمة
function updateAITopicInput() {
  const selectedTopic = document.getElementById('ai-topic-select').value;
  const topicInput = document.getElementById('ai-topic');

  if (selectedTopic) {
    topicInput.value = selectedTopic;
  }
}

// توليد جميع الفئات
function generateAllCategories() {
  generateAIQuestions("all");
}

// حفظ الأسئلة المولدة
function saveAIQuestions() {
  const aiQuestionsContainer = document.getElementById('ai-questions-container');
  const questions = aiQuestionsContainer.querySelectorAll('.ai-question-item');
  const topic = document.getElementById('ai-topic').value.trim();
  
  if (questions.length === 0) {
    alert('لا توجد أسئلة لحفظها');
    return;
  }
  
  // ابحث عن الموضوع الحالي أو أنشئ واحداً جديداً
  let topicObj = gameData.topics.find(t => t.title.toLowerCase() === topic.toLowerCase());
  
  if (!topicObj) {
    // إنشاء موضوع جديد
    topicObj = {
      id: Date.now(),
      title: topic,
      questions: []
    };
    gameData.topics.push(topicObj);
  }
  
  // التأكد من وجود مصفوفة الأسئلة
  if (!topicObj.questions) {
    topicObj.questions = [];
  }
  
  // إضافة كل سؤال إلى الموضوع
  questions.forEach(questionEl => {
    if (questionEl.classList.contains('to-save')) {
      const pointsEl = questionEl.querySelector('.ai-question-points');
      const textEl = questionEl.querySelector('.ai-question-text');
      const answerEl = questionEl.querySelector('.ai-question-answer');
      const imageUrlEl = questionEl.querySelector('.ai-question-image-url');
      
      const points = parseInt(pointsEl.textContent.replace('النقاط: ', ''));
      const text = textEl.textContent.replace('السؤال: ', '');
      const answer = answerEl.textContent.replace('الإجابة: ', '');
      const imageUrl = imageUrlEl ? imageUrlEl.textContent : '';
      
      // تحقق من عدد الأسئلة بنفس النقاط
      const pointQuestions = topicObj.questions.filter(q => q.points === points);
      if (pointQuestions.length < 2) {
        const newQuestion = {
          points,
          text,
          answer,
          answered: false,
          mediaType: imageUrl ? 'image' : '',
          mediaUrl: imageUrl
        };
        
        topicObj.questions.push(newQuestion);
      } else {
        alert(`تم تجاوز الحد الأقصى (2) للأسئلة بقيمة ${points} نقطة في الموضوع "${topic}"`);
      }
    }
  });
  
  // حفظ التغييرات
  saveGameData();
  
  // تحديث واجهة المستخدم
  renderQuestionsTable();
  renderQuestionTopicSelect();
  renderFilterTopicSelect();
  renderGameManagement();
  
  alert('تم حفظ الأسئلة بنجاح');
  
  // إخفاء نتائج الذكاء الاصطناعي
  document.getElementById('ai-result').classList.add('hidden');
}

// توليد الأسئلة باستخدام الذكاء الاصطناعي
async function generateAIQuestions(difficulty) {
  const topic = document.getElementById('ai-topic').value.trim();
  const includeImages = document.getElementById('ai-include-images').checked;
  const addDirectly = document.getElementById('ai-add-directly').checked;
  const explainGeneration = document.getElementById('ai-explain-generation').checked;

  if (!topic) {
    alert('الرجاء إدخال موضوع للأسئلة');
    return;
  }

  // إظهار التحميل
  document.getElementById('ai-loading').classList.remove('hidden');
  document.getElementById('ai-result').classList.add('hidden');

  // تحديد مستوى الصعوبة
  let difficultyLevel = '';
  let points = 0;
  
  if (difficulty === 200) {
    difficultyLevel = 'سهل';
    points = 200;
  } else if (difficulty === 400) {
    difficultyLevel = 'متوسط';
    points = 400;
  } else if (difficulty === 600) {
    difficultyLevel = 'صعب';
    points = 600;
  } else if (difficulty === "all") {
    difficultyLevel = 'متنوع';
  }

  try {
    // إعداد الطلب للـ API
    let prompt = '';
    
    if (difficulty === "all") {
      prompt = `أنشئ 6 أسئلة عن "${topic}" بمستويات صعوبة مختلفة للعبة مسابقات:
      - 2 أسئلة سهلة (200 نقطة)
      - 2 أسئلة متوسطة (400 نقطة)
      - 2 أسئلة صعبة (600 نقطة)
      لكل سؤال، قدم الإجابة الصحيحة أيضًا.`;
    } else {
      prompt = `أنشئ 3 أسئلة عن "${topic}" بمستوى صعوبة ${difficultyLevel} (${points} نقطة) للعبة مسابقات.
      لكل سؤال، قدم الإجابة الصحيحة أيضًا.`;
    }

    if (includeImages) {
      prompt += `
      أيضاً، قم بإضافة رابط يحتوي على صورة مناسبة من Wikimedia Commons لكل سؤال.`;
    }
    
    if (explainGeneration) {
      prompt += `
      قم أيضاً بتوفير شرح مفصل عن كيفية بناء هذه الأسئلة، والمنهجية التي اتبعتها في صياغتها، ومناسبتها لمستوى الصعوبة المطلوب.`;
    }
    
    prompt += `
    قم بتقديم الإجابة بتنسيق سهل القراءة.`;

    try {
      // استدعاء API
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048
          }
        })
      });

      if (!response.ok) {
        throw new Error(`خطأ في استجابة API: ${response.status}`);
      }

      const data = await response.json();
      
      // معالجة الرد من API
      const aiResponse = data.candidates && data.candidates[0]?.content?.parts[0]?.text;
      
      if (!aiResponse) {
        throw new Error('لم يتم استلام استجابة صالحة من API');
      }
      
      // عرض النتائج
      displayAIQuestions(aiResponse, topic, explainGeneration);
      
      // إضافة الأسئلة مباشرة إذا تم اختيار هذا الخيار
      if (addDirectly) {
        saveAIQuestions();
      }
      
    } catch (error) {
      console.error("خطأ في استدعاء API:", error);
      alert(`خطأ في استدعاء API: ${error.message}`);
    }
    
  } catch (error) {
    console.error("خطأ:", error);
    alert(`حدث خطأ: ${error.message}`);
  } finally {
    // إخفاء التحميل
    document.getElementById('ai-loading').classList.add('hidden');
  }
}

// عرض الأسئلة المولدة
function displayAIQuestions(response, topic, hasExplanation) {
  const aiQuestionsContainer = document.getElementById('ai-questions-container');
  aiQuestionsContainer.innerHTML = '';
  
  // البحث عن الأسئلة والإجابات في الاستجابة
  const questions = [];
  let explanation = '';
  
  // تحليل النص للعثور على الأسئلة وعلاماتها وإجاباتها
  const lines = response.split('\n');
  let currentQuestion = null;
  let isInExplanation = false;
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    // التحقق من بداية قسم الشرح
    if (line.includes('شرح') || line.includes('المنهجية') || line.includes('كيفية بناء')) {
      isInExplanation = true;
      explanation += line + '\n';
      continue;
    }
    
    if (isInExplanation) {
      explanation += line + '\n';
      continue;
    }
    
    // البحث عن الأسئلة والنقاط والإجابات
    if (line.match(/^(سؤال|#|\d+\.|السؤال)\s*\d*:?\s*/) || line.match(/^نقاط:?\s*\d+/i) || line.startsWith('س:')) {
      const pointsMatch = line.match(/(\d+)\s*نقطة/);
      const pointsMatch2 = line.match(/نقاط:?\s*(\d+)/i);
      
      if (pointsMatch || pointsMatch2 || line.includes('200') || line.includes('400') || line.includes('600')) {
        // بدء سؤال جديد
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        
        let points = 0;
        if (pointsMatch) {
          points = parseInt(pointsMatch[1]);
        } else if (pointsMatch2) {
          points = parseInt(pointsMatch2[1]);
        } else if (line.includes('سهل') || line.includes('200')) {
          points = 200;
        } else if (line.includes('متوسط') || line.includes('400')) {
          points = 400;
        } else if (line.includes('صعب') || line.includes('600')) {
          points = 600;
        }
        
        const questionText = line.replace(/^(سؤال|#|\d+\.|السؤال)\s*\d*:?\s*/, '')
                              .replace(/\(\d+\s*نقطة\)/, '')
                              .replace(/نقاط:?\s*\d+/i, '')
                              .replace(/س:\s*/, '')
                              .trim();
        
        currentQuestion = {
          points: points,
          text: questionText,
          answer: '',
          imageUrl: ''
        };
      } else if (currentQuestion && currentQuestion.text === '') {
        // هذا هو نص السؤال
        currentQuestion.text = line.replace(/^(سؤال|#|\d+\.|السؤال):?\s*/, '').trim();
      }
    } else if (line.match(/^(الإجابة|الجواب|ج)[\s:]*/) || line.includes('لإجابة:')) {
      if (currentQuestion) {
        currentQuestion.answer = line.replace(/^(الإجابة|الجواب|ج)[\s:]*/, '')
                                    .replace(/لإجابة:/, '')
                                    .trim();
      }
    } else if (line.includes('http') && line.includes('commons') && currentQuestion) {
      // هذا هو رابط الصورة
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        currentQuestion.imageUrl = urlMatch[1];
      }
    } else if (currentQuestion && currentQuestion.answer === '') {
      // قد يكون هذا هو الإجابة
      if (line.startsWith('-') || line.includes(':')) {
        currentQuestion.answer = line.replace(/^-\s*/, '').replace(/^.*?:\s*/, '').trim();
      }
    }
  }
  
  // إضافة السؤال الأخير إذا لم تتم إضافته
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  // عرض الأسئلة
  if (questions.length > 0) {
    questions.forEach((q, index) => {
      const questionElement = document.createElement('div');
      questionElement.className = 'ai-question-item to-save';
      
      let html = `
        <p class="ai-question-points">النقاط: ${q.points}</p>
        <p class="ai-question-text">السؤال: ${q.text}</p>
        <p class="ai-question-answer">الإجابة: ${q.answer}</p>
      `;
      
      if (q.imageUrl) {
        html += `
          <p class="ai-question-image-url">${q.imageUrl}</p>
          <div class="ai-question-image">
            <img src="${q.imageUrl}" alt="صورة توضيحية" style="max-width: 200px; max-height: 150px;">
          </div>
        `;
      }
      
      questionElement.innerHTML = html;
      aiQuestionsContainer.appendChild(questionElement);
    });
    
    // إضافة الشرح إذا كان موجودًا
    if (hasExplanation && explanation) {
      const explanationElement = document.createElement('div');
      explanationElement.className = 'ai-explanation';
      explanationElement.innerHTML = `
        <h4>شرح آلية توليد الأسئلة:</h4>
        <div class="explanation-content">${explanation.replace(/\n/g, '<br>')}</div>
      `;
      aiQuestionsContainer.appendChild(explanationElement);
    }
    
    // إظهار النتائج
    document.getElementById('ai-result').classList.remove('hidden');
  } else {
    aiQuestionsContainer.innerHTML = '<p>لم يتم العثور على أسئلة في الاستجابة</p>';
    document.getElementById('ai-result').classList.remove('hidden');
  }
}

// Render Game Management Section
function renderGameManagement() {
  // Render teams for game management
  renderGameTeamsSection();

  // Render topic selection
  renderTopicSelectionSection();
}

// Render teams for game management
function renderGameTeamsSection() {
  gameTeamsContainer.innerHTML = '';

  gameData.teams.forEach((team, index) => {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'form-group';

    teamDiv.innerHTML = `
      <label for="game-team-name-${index}">اسم الفريق ${index + 1}</label>
      <input type="text" id="game-team-name-${index}" value="${team.name}" required>
    `;

    gameTeamsContainer.appendChild(teamDiv);
  });
}

// Render topic selection
function renderTopicSelectionSection() {
  topicSelectionContainer.innerHTML = '';

  if (gameData.topics.length === 0) {
    topicSelectionContainer.innerHTML = '<p>لا توجد مواضيع متاحة. أضف المواضيع أولاً.</p>';
    return;
  }

  // Initialize activeTopics array if it doesn't exist
  if (!gameData.activeTopics) {
    gameData.activeTopics = [];
  }

  // Create a checkbox for each topic
  gameData.topics.forEach(topic => {
    const topicDiv = document.createElement('div');
    topicDiv.className = 'topic-checkbox-container';

    // Check if topic.id exists in activeTopics array (convert both to numbers)
    const isChecked = gameData.activeTopics.includes(Number(topic.id));

    topicDiv.innerHTML = `
      <label>
        <input type="checkbox" class="topic-checkbox" data-topic-id="${topic.id}" ${isChecked ? 'checked' : ''}>
        ${topic.title}
      </label>
    `;

    topicSelectionContainer.appendChild(topicDiv);
  });

  // Add event listener to limit selection to 6 topics
  const checkboxes = document.querySelectorAll('.topic-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checked = document.querySelectorAll('.topic-checkbox:checked');
      if (checked.length > 6) {
        checkbox.checked = false;
        alert('يمكنك اختيار 6 مواضيع كحد أقصى');
      }
    });
  });
}

// Save game settings
function saveGameSettings() {
  // Update team names
  gameData.teams.forEach((team, index) => {
    const nameInput = document.getElementById(`game-team-name-${index}`);
    if (nameInput) {
      team.name = nameInput.value.trim();
    }
  });

  // Update active topics
  const checkedTopics = document.querySelectorAll('.topic-checkbox:checked');
  gameData.activeTopics = Array.from(checkedTopics).map(checkbox =>
    parseInt(checkbox.dataset.topicId)
  );

  // Make sure we have at least one topic
  if (gameData.activeTopics.length === 0 && gameData.topics.length > 0) {
    alert('يجب اختيار موضوع واحد على الأقل');
    return;
  }

  // Save data and show confirmation
  saveGameData();
  alert('تم حفظ إعدادات اللعبة بنجاح');
}

// Validate URL function
function isValidUrl(url) {
  // Also accept data URLs
  if (url.startsWith('data:')) {
    return true;
  }
  
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Restore default topics
function restoreDefaultTopics() {
  if (!window.confirm('هل تريد استعادة المواضيع الافتراضية؟ سيتم إضافتها بجانب المواضيع الحالية')) {
    return;
  }

  const defaultTopics = [
    {
      id: Date.now() + 1,
      title: "عالم الساعات",
      questions: [
        { points: 200, text: "ما هي أشهر ماركة ساعات سويسرية؟", answer: "رولكس (Rolex)", answered: false, mediaType: "image", mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rolex_logo.svg/800px-Rolex_logo.svg.png" },
        { points: 200, text: "ما اسم أول ساعة رقمية في العالم؟", answer: "هاميلتون بالسار (Hamilton Pulsar)", answered: false, mediaType: "", mediaUrl: "" },
        { points: 400, text: "في أي عام صنعت أول ساعة يد؟", answer: "عام 1868", answered: false, mediaType: "", mediaUrl: "" },
        { points: 400, text: "ما هي الساعة التي استخدمها رواد الفضاء في مهمة أبولو 11؟", answer: "أوميغا سبيدماستر (Omega Speedmaster)", answered: false, mediaType: "image", mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/Buzz_Aldrin_Apollo_Spacesuit.jpg" },
        { points: 600, text: "ما هو مصطلح 'توربيون' في صناعة الساعات؟", answer: "آلية تدور لمكافحة تأثير الجاذبية على دقة الساعة", answered: false, mediaType: "image", mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Tourbillon_anim.gif/330px-Tourbillon_anim.gif" },
        { points: 600, text: "ما اسم أول ساعة ذكية تم إنتاجها تجارياً؟", answer: "سيكو بالسار (Seiko Pulsar)", answered: false, mediaType: "", mediaUrl: "" }
      ]
    },
    {
      id: Date.now() + 2,
      title: "أهل البر",
      questions: [
        { points: 200, text: "ما هو اسم البيت التقليدي المصنوع من الشعر في البادية؟", answer: "بيت الشعر", answered: false, mediaType: "image", mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/Bedouin_tent.jpg" },
        { points: 200, text: "ما اسم مهرجان الإبل السنوي في السعودية؟", answer: "مهرجان الملك عبدالعزيز للإبل", answered: false, mediaType: "", mediaUrl: "" },
        { points: 400, text: "ما هي القبيلة العربية التي اشتهرت بتربية الإبل منذ مئات السنين؟", answer: "قبيلة شمر", answered: false, mediaType: "", mediaUrl: "" },
        { points: 400, text: "ما هو النوع المفضل من القهوة لدى أهل البادية؟", answer: "القهوة العربية (السادة)", answered: false, mediaType: "image", mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Arabic_coffee.jpg" },
        { points: 600, text: "ما هي الطريقة التقليدية للبحث عن الماء في الصحراء؟", answer: "اتباع النباتات الصحراوية وآثار الحيوانات", answered: false, mediaType: "", mediaUrl: "" },
        { points: 600, text: "ما هو الفن الشعري البدوي الذي يتغنى به الشعراء في المناسبات؟", answer: "النبطي", answered: false, mediaType: "", mediaUrl: "" }
      ]
    },
    {
      id: Date.now() + 3,
      title: "أهل البحر",
      questions: [
        { points: 200, text: "ما اسم المركب الشراعي التقليدي الذي اشتهر به أهل الخليج؟", answer: "البوم", answered: false, mediaType: "image", mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/8/83/Dow_traditional_Kuwait_wooden_boat.JPG" },
        { points: 200, text: "ما هي مهنة الغوص التقليدية في الخليج العربي؟", answer: "الغوص على اللؤلؤ", answered: false, mediaType: "", mediaUrl: "" },
        { points: 400, text: "ما اسم الآلة الموسيقية التي استخدمها البحارة للغناء أثناء الإبحار؟", answer: "المرواس", answered: false, mediaType: "image", mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Mirwas.jpg" },
        { points: 400, text: "ما هو النوع الأكثر قيمة من اللؤلؤ في الخليج العربي؟", answer: "اللؤلؤ الدانة", answered: false, mediaType: "", mediaUrl: "" },
        { points: 600, text: "ما اسم القائد البحري الذي يقود السفينة في رحلات الغوص التقليدية؟", answer: "النوخذة", answered: false, mediaType: "", mediaUrl: "" },
        { points: 600, text: "ما هي الطريقة التقليدية لصيد السمك المسماة بـ 'الحضرة'؟", answer: "بناء حواجز من سعف النخيل على الشاطئ لاصطياد الأسماك عند انحسار المد", answered: false, mediaType: "", mediaUrl: "" }
      ]
    }
  ];

  // Add default topics to the existing topics
  gameData.topics = [...gameData.topics, ...defaultTopics];
  saveGameData();

  alert('تم استعادة المواضيع الافتراضية بنجاح');

  // Update UI
  renderTopicsTable();
  renderQuestionTopicSelect();
  renderFilterTopicSelect();
  renderQuestionsTable();
  renderGameManagement();
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
  initDashboard();
});
