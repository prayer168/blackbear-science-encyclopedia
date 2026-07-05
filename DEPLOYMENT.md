# GitHub Pages 部署說明

Repository：`prayer168/blackbear-science-encyclopedia`

## 方法一：GitHub 網頁上傳

1. 到 GitHub 建立 repository：`blackbear-science-encyclopedia`。
2. 將本專案所有檔案上傳到 repository 根目錄。
3. 進入 `Settings` → `Pages`。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`，Folder 選 `/root`。
6. 網站網址：`https://prayer168.github.io/blackbear-science-encyclopedia/`。

## 方法二：Git 指令

```bash
cd blackbear-science-encyclopedia
git init
git add .
git commit -m "Initial blackbear science encyclopedia site"
git branch -M main
git remote add origin https://github.com/prayer168/blackbear-science-encyclopedia.git
git push -u origin main
```

接著到 GitHub Pages 設定 `main` / `/root`。
