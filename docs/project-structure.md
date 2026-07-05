# 專案資料夾結構

```text
blackbear-science-encyclopedia/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── data/
│   ├── course-topics.json
│   ├── entries.json
│   └── templates/
│       ├── content-template.md
│       ├── entry-template.json
│       └── image-prompt-template.md
├── pages/
│   ├── about.html
│   ├── entries.html
│   ├── entry.html
│   └── teacher-guide.html
└── docs/
    ├── extension-guide.md
    └── project-structure.md
```

## 核心檔案說明

- `index.html`：網站首頁。
- `assets/css/style.css`：全站 RWD 樣式。
- `assets/js/app.js`：讀取 JSON、搜尋、篩選與條目頁渲染。
- `data/course-topics.json`：課程主題地圖。
- `data/entries.json`：百科條目資料庫。
- `pages/entry.html`：單一條目詳細頁，透過網址參數 `id` 顯示不同條目。
- `pages/teacher-guide.html`：教師使用說明。
- `docs/extension-guide.md`：後續擴充指南。
