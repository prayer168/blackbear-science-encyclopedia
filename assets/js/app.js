const DATA_URL = './data/entries.json';
const TOPIC_URL = './data/course-topics.json';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`無法讀取 ${url}`);
  return response.json();
}

function escapeHTML(text = '') {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function entryLink(entry) {
  return `pages/entry.html?id=${encodeURIComponent(entry.id)}`;
}

function pageEntryLink(entry) {
  return `entry.html?id=${encodeURIComponent(entry.id)}`;
}

function renderEntryCard(entry, insidePages = false) {
  const link = insidePages ? pageEntryLink(entry) : entryLink(entry);
  const keywords = entry.keywords.slice(0, 4).map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('');
  return `
    <article class="card entry-card">
      <div class="pill-row"><span class="pill">${escapeHTML(entry.grade)}</span><span class="pill">${escapeHTML(entry.topic)}</span></div>
      <h3>${escapeHTML(entry.title)}</h3>
      <p>${escapeHTML(entry.summary)}</p>
      <div class="pill-row">${keywords}</div>
      <a class="button" href="${link}">閱讀條目</a>
    </article>
  `;
}

function populateSelect(select, values, label) {
  if (!select) return;
  select.innerHTML = `<option value="">${label}</option>` + values.map(v => `<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join('');
}

function setupSearch(entries, insidePages = false) {
  const list = $('#entryList');
  if (!list) return;
  const searchInput = $('#searchInput');
  const gradeFilter = $('#gradeFilter');
  const topicFilter = $('#topicFilter');
  const stageFilter = $('#stageFilter');

  populateSelect(gradeFilter, [...new Set(entries.map(e => e.grade))], '全部年級');
  populateSelect(topicFilter, [...new Set(entries.map(e => e.topic))], '全部主題');
  populateSelect(stageFilter, [...new Set(entries.map(e => e.stage))], '全部階段');

  function render() {
    const q = (searchInput?.value || '').trim().toLowerCase();
    const grade = gradeFilter?.value || '';
    const topic = topicFilter?.value || '';
    const stage = stageFilter?.value || '';
    const filtered = entries.filter(entry => {
      const haystack = [entry.title, entry.grade, entry.stage, entry.topic, entry.subtopic, entry.summary, ...(entry.keywords || [])].join(' ').toLowerCase();
      return (!q || haystack.includes(q)) && (!grade || entry.grade === grade) && (!topic || entry.topic === topic) && (!stage || entry.stage === stage);
    });
    list.innerHTML = filtered.length ? filtered.map(e => renderEntryCard(e, insidePages)).join('') : '<div class="empty">找不到符合的百科條目。可以換個關鍵字，或先新增更多 JSON 條目。</div>';
  }

  [searchInput, gradeFilter, topicFilter, stageFilter].forEach(el => el?.addEventListener('input', render));
  render();
}

function renderHome(entries, topics) {
  const recommended = $('#recommendedEntries');
  if (recommended) recommended.innerHTML = entries.map(e => renderEntryCard(e)).join('');

  const gradeQuick = $('#gradeQuick');
  if (gradeQuick) {
    const grades = [...new Set(entries.map(e => e.grade))];
    gradeQuick.innerHTML = grades.map(g => `<a class="card" href="#entries" data-grade-jump="${escapeHTML(g)}"><h3>${escapeHTML(g)}</h3><p class="tagline">從熟悉的生活現象開始，慢慢長出科學眼睛。</p></a>`).join('');
    $$('[data-grade-jump]').forEach(a => a.addEventListener('click', () => {
      setTimeout(() => { const filter = $('#gradeFilter'); if (filter) { filter.value = a.dataset.gradeJump; filter.dispatchEvent(new Event('input')); } }, 10);
    }));
  }

  const topicQuick = $('#topicQuick');
  if (topicQuick && topics?.stages) {
    topicQuick.innerHTML = topics.stages.map(stage => `
      <article class="card">
        <div class="pill">${escapeHTML(stage.name)}</div>
        <h3>${escapeHTML(stage.focus)}</h3>
        <div class="pill-row">${stage.topics.slice(0, 8).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>
      </article>
    `).join('');
  }

  setupSearch(entries);
}

function section(title, id, content) {
  return `<section id="${id}"><h2>${title}</h2>${content}</section>`;
}

function list(items) {
  return `<ul>${items.map(i => `<li>${escapeHTML(i)}</li>`).join('')}</ul>`;
}

function ordered(items) {
  return `<ol>${items.map(i => `<li>${escapeHTML(i)}</li>`).join('')}</ol>`;
}

function renderEntryPage(entries) {
  const article = $('#entryArticle');
  if (!article) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || entries[0]?.id;
  const entry = entries.find(e => e.id === id);
  if (!entry) {
    article.innerHTML = '<div class="empty">找不到這個條目。請回條目列表重新選擇。</div>';
    return;
  }
  document.title = `${entry.title}｜黑熊老師自然科學繪本百科`;

  const misconceptions = entry.misconception.map(m => `<li><strong>迷思：</strong>${escapeHTML(m.myth)}<br><strong>正確理解：</strong>${escapeHTML(m.truth)}</li>`).join('');
  const questions = entry.student_questions.map(q => `<li><strong>${escapeHTML(q.type)}：</strong>${escapeHTML(q.question)}</li>`).join('');
  const prompts = `
    <h3>封面圖</h3><div class="prompt-box">${escapeHTML(entry.image_prompts.cover)}</div>
    <h3>繪本內頁圖</h3><div class="prompt-box">${escapeHTML(entry.image_prompts.storybook_page)}</div>
    <h3>科學示意圖</h3><div class="prompt-box">${escapeHTML(entry.image_prompts.science_diagram)}</div>
  `;

  article.innerHTML = `
    <div class="pill-row"><span class="pill">${escapeHTML(entry.grade)}</span><span class="pill">${escapeHTML(entry.stage)}</span><span class="pill">${escapeHTML(entry.topic)}</span></div>
    <h1>${escapeHTML(entry.title)}</h1>
    <p class="lead">${escapeHTML(entry.summary)}</p>
    ${section('1. 適合年級', 'grade', `<p>${escapeHTML(entry.grade)}</p>`)}
    ${section('2. 對應課程主題', 'topic', `<p>${escapeHTML(entry.topic)}／${escapeHTML(entry.subtopic)}</p><p>版本參考：${entry.version_reference.map(escapeHTML).join('、')}</p>`)}
    ${section('3. 黑熊老師開場', 'opening', `<p>${escapeHTML(entry.opening)}</p>`)}
    ${section('4. 繪本故事', 'story', `<p>${escapeHTML(entry.story)}</p>`)}
    ${section('5. 科學概念解釋', 'explanation', `<p>${escapeHTML(entry.explanation)}</p>`)}
    ${section('6. 用一句話說懂', 'one', `<div class="quote">${escapeHTML(entry.one_sentence)}</div>`)}
    ${section('7. 生活中的例子', 'life', list(entry.life_examples))}
    ${section('8. 常見迷思', 'myths', `<ul>${misconceptions}</ul>`)}
    ${section('9. 小實驗或觀察任務', 'activity', `<h3>${escapeHTML(entry.activity.name)}</h3><p><strong>材料：</strong></p>${list(entry.activity.materials)}<p><strong>步驟：</strong></p>${ordered(entry.activity.steps)}<p><strong>觀察重點：</strong>${escapeHTML(entry.activity.observation_focus)}</p><p><strong>思考問題：</strong></p>${list(entry.activity.thinking_questions)}<p><strong>安全提醒：</strong>${escapeHTML(entry.activity.safety)}</p>`)}
    ${section('10. 圖像生成提示詞', 'prompts', prompts)}
    ${section('11. 給學生的三個問題', 'questions', `<ul>${questions}</ul>`)}
    ${section('12. 給老師的教學提醒', 'teacher', `<p>${escapeHTML(entry.teacher_notes)}</p>`)}
    ${section('13. 跨年級銜接', 'cross', `<p>${escapeHTML(entry.cross_grade_connection)}</p>`)}
    ${section('14. 關鍵字', 'keywords', `<div class="pill-row">${entry.keywords.map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('')}</div>`)}
  `;
}

async function init() {
  try {
    const [entries, topics] = await Promise.all([loadJSON(DATA_URL).catch(() => loadJSON('../data/entries.json')), loadJSON(TOPIC_URL).catch(() => loadJSON('../data/course-topics.json'))]);
    if ($('#recommendedEntries')) renderHome(entries, topics);
    if ($('#entryList') && !$('#recommendedEntries')) setupSearch(entries, true);
    renderEntryPage(entries);
  } catch (error) {
    console.error(error);
    const target = $('#entryList') || $('#recommendedEntries') || $('#entryArticle');
    if (target) target.innerHTML = `<div class="empty">資料讀取失敗：${escapeHTML(error.message)}。請確認使用本機伺服器預覽，而不是直接雙擊 HTML。</div>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
