# 黑熊老師自然科學繪本百科

面向國小三年級到國中九年級學生、自然科老師、家長與自學者的自然科學科普繪本百科網站。

本專案採用純靜態網站技術：

- HTML
- CSS
- JavaScript
- JSON 資料檔

適合部署到 GitHub Pages，不需要後端伺服器。

## 專案特色

- 繁體中文內容
- 溫暖繪本風視覺
- RWD 響應式設計
- 大字體與舒適行距，適合教室投影
- JSON 管理百科條目，方便擴充
- 條目包含故事、概念、迷思、小實驗、圖像提示詞、教師提醒與跨年級銜接

## 目前收錄條目

1. 國小三年級：植物的身體
2. 國小四年級：昆蟲的一生
3. 國小五年級：熱的傳播

## 專案結構

```text
blackbear-science-encyclopedia/
├── index.html
├── README.md
├── assets/
│   ├── css/style.css
│   └── js/app.js
├── data/
│   ├── course-topics.json
│   ├── entries.json
│   └── templates/
├── pages/
│   ├── about.html
│   ├── entries.html
│   ├── entry.html
│   └── teacher-guide.html
└── docs/
    ├── extension-guide.md
    └── project-structure.md
```

## 本機預覽方式

因為網站會用 JavaScript `fetch()` 讀取 JSON，請不要直接雙擊 `index.html`，建議用本機伺服器。

### 方法一：使用 Python

在專案資料夾中執行：

```bash
python -m http.server 8000
```

然後開啟：

```text
http://localhost:8000
```

### 方法二：使用 VS Code Live Server

1. 用 VS Code 開啟專案資料夾。
2. 安裝 Live Server 擴充套件。
3. 在 `index.html` 按右鍵，選擇 `Open with Live Server`。

## 部署到 GitHub Pages

1. 建立一個 GitHub repository，例如：`blackbear-science-encyclopedia`。
2. 將本專案所有檔案上傳到 repository 根目錄。
3. 到 repository 的 `Settings`。
4. 左側選擇 `Pages`。
5. Source 選擇 `Deploy from a branch`。
6. Branch 選擇 `main`，資料夾選擇 `/root`。
7. 儲存後等待 GitHub Pages 部署完成。
8. 網址通常會是：

```text
https://你的帳號.github.io/blackbear-science-encyclopedia/
```

## 新增條目方式

1. 開啟 `data/templates/entry-template.json`。
2. 依格式撰寫新條目。
3. 將新條目加入 `data/entries.json`。
4. 確認 JSON 格式正確，最後一筆資料後面不要多逗號。
5. 重新整理網站，即可在條目列表與搜尋中看到新條目。

## 課程架構來源

主題地圖參考：

- 115 學年度｜國小三至六年級 + 國中七至九年級自然課程架構
- 課程架構整理康軒、翰林、南一三版本自然科課程

正式教學仍需依學校採用版本、書商原始資料與地方課程計畫核對。

## 擴充方向

- 擴充國小六年級、國中七到九年級條目
- 加入 108 課綱學習表現與學習內容欄位
- 為每個條目補上 SVG 科學圖解
- 增加可列印學習單與教師版教案
- 建立條目審稿流程，避免科學概念錯誤
