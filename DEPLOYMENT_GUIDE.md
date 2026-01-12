# 部署指南 / Deployment Guide

## 🐛 Bug 修正說明

### 修正的問題

1. **Chess.js 初始化時機錯誤**
   - 原本在外部庫載入前就嘗試創建 `new Chess()`
   - 修正：將初始化移到 `initializeChessboard()` 函數中

2. **腳本載入順序問題**
   - JavaScript 庫在 `<head>` 中載入可能導致競態條件
   - 修正：將所有 JavaScript 庫移到 `<body>` 底部，確保 DOM 完全載入

3. **Chess.js 版本更新**
   - 從 v0.10.3 升級到 v0.12.1
   - 移除已棄用的 `sloppy` 參數
   - 增加錯誤處理機制

### 修正後的載入順序

```
1. HTML 結構
2. CSS 樣式
3. jQuery (必須首先載入，因為 Chessboard.js 依賴它)
4. Chart.js
5. Chess.js
6. Chessboard.js
7. chess-data.js (我們的數據)
8. app.js (我們的應用邏輯)
```

## 🚀 快速測試

### 本地測試

目前伺服器已在運行：
```
http://localhost:8000
```

在瀏覽器中打開此網址，你應該能看到：
- ✅ 完整的論文網頁
- ✅ 可互動的棋盤（帶有前進/後退按鈕）
- ✅ 四個動態圖表顯示數據分析
- ✅ 自動播放功能

### 測試清單

- [ ] 棋盤正確顯示初始位置
- [ ] 點擊 "Next" 按鈕能正確移動棋子
- [ ] 點擊 "Previous" 按鈕能正確回退
- [ ] 點擊 "Autoplay" 能自動播放整局
- [ ] 所有四個圖表正確顯示
- [ ] 響應式設計在手機上正常工作

## 📤 部署到 GitHub Pages

### 步驟 1: 初始化 Git 倉庫

```bash
cd "/Users/shintinglin/Desktop/STL/Coding/Harmonic Gambit"

# 初始化 git（如果還沒初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Harmonic Gambit chess-music research paper"
```

### 步驟 2: 創建 GitHub 倉庫

1. 前往 https://github.com/new
2. 倉庫名稱：`Harmonic-Gambit` 或 `harmonic-gambit`
3. 選擇 Public（如果要公開）或 Private
4. **不要**初始化 README、.gitignore 或 license（我們已經有了）
5. 點擊 "Create repository"

### 步驟 3: 推送到 GitHub

```bash
# 添加遠端倉庫（替換 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/Harmonic-Gambit.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步驟 4: 啟用 GitHub Pages

1. 在你的 GitHub 倉庫頁面
2. 點擊 **Settings**（設定）
3. 左側選單找到 **Pages**
4. 在 "Source" 下：
   - Branch: 選擇 `main`
   - Folder: 選擇 `/ (root)`
5. 點擊 **Save**
6. 等待 1-2 分鐘

你的網站將發布在：
```
https://YOUR_USERNAME.github.io/Harmonic-Gambit/
```

### 步驟 5: 驗證部署

訪問你的 GitHub Pages 網址，確認：
- [ ] 頁面正確載入
- [ ] 棋盤正常運作
- [ ] 圖表正確顯示
- [ ] 所有互動功能正常

## 🔧 常見問題排解

### 問題：棋盤不顯示

**原因：** JavaScript 庫載入失敗或順序錯誤

**解決方案：**
1. 檢查瀏覽器開發者工具的 Console（按 F12）
2. 確認沒有 404 錯誤（庫載入失敗）
3. 確認腳本在 `<body>` 底部而非 `<head>`

### 問題：棋子移動後消失

**原因：** Chess.js 和 Chessboard.js 狀態不同步

**解決方案：**
- 現在已在 `makeNextMove()` 中加入錯誤處理
- 檢查 Console 是否有 "Invalid move" 錯誤

### 問題：圖表不顯示

**原因：** Chart.js 載入失敗或數據格式錯誤

**解決方案：**
1. 確認 Chart.js CDN 正常
2. 檢查 `chess-data.js` 中的數據格式
3. 確認所有數組長度一致（應為 42 個元素）

### 問題：GitHub Pages 顯示 404

**原因：** 分支或資料夾設定錯誤

**解決方案：**
1. 確認在 Settings → Pages 中選擇了正確的分支（`main`）
2. 確認選擇了 `/ (root)` 資料夾
3. 等待幾分鐘讓 GitHub 建置完成
4. 檢查 Actions 標籤頁看是否有錯誤

## 📝 更新網站

當你修改代碼後：

```bash
# 添加變更
git add .

# 提交變更
git commit -m "Update: description of changes"

# 推送到 GitHub
git push

# GitHub Pages 會自動重新部署（需要 1-2 分鐘）
```

## 🎨 自訂化建議

### 更改配色

編輯 `styles.css` 中的 CSS 變數：

```css
:root {
	--primary-color: #2c3e50;    /* 主要標題顏色 */
	--secondary-color: #3498db;  /* 連結和強調色 */
	--accent-color: #e74c3c;     /* 重點標示色 */
}
```

### 添加更多棋局

1. 在 `chess-data.js` 中添加新的棋局數據
2. 在 `app.js` 中創建切換棋局的功能
3. 在 `index.html` 中添加選擇器 UI

### 整合音訊播放

未來可以使用 Web Audio API：

```javascript
// 範例：根據棋局參數生成音訊
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
// ... 根據 EVALUATION_DATA 調整頻率
```

## 📊 文件結構說明

```
.
├── index.html          # 主頁面結構（論文內容）
├── styles.css          # 所有樣式（學術論文風格）
├── app.js             # 應用邏輯（棋盤控制、圖表初始化）
├── chess-data.js      # 棋局數據（移動序列、評估值、音樂參數）
├── README.md          # 專案說明
├── DEPLOYMENT_GUIDE.md # 本文件
├── .gitignore         # Git 忽略文件
└── Reference_File/    # 參考資料
    ├── Brief_concept.txt
    └── 棋譜.txt
```

## 🎯 效能優化建議

### CDN 備援

目前使用的 CDN：
- jQuery: code.jquery.com
- Chart.js: cdn.jsdelivr.net
- Chess.js: cdnjs.cloudflare.com
- Chessboard.js: unpkg.com

如果某個 CDN 失敗，可以考慮：
1. 下載庫到本地
2. 使用其他 CDN 作為備援
3. 使用 npm + bundler（Webpack/Vite）

### 圖片優化

棋子圖片來自：
```
https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png
```

可以考慮：
- 下載到本地以加快載入
- 使用 WebP 格式減小檔案大小
- 實作 lazy loading

## 📱 行動裝置測試

測試不同螢幕尺寸：
- 📱 手機 (< 768px)
- 📱 平板 (768px - 1024px)
- 💻 桌面 (> 1024px)

Chrome DevTools：
1. 按 F12
2. 點擊 Toggle Device Toolbar（Ctrl+Shift+M）
3. 選擇不同裝置測試

## 🔐 安全性檢查

- [x] 使用 HTTPS CDN
- [x] 沒有內聯 JavaScript（符合 CSP）
- [x] 沒有用戶輸入（避免 XSS）
- [x] 靜態內容（無伺服器端漏洞）

## 📈 分析與追蹤（選擇性）

如果想追蹤訪客，可以加入：

### Google Analytics

在 `</head>` 前加入：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## ✅ 完成清單

部署前確認：

- [x] 所有 bug 已修正
- [x] 本地測試通過
- [ ] Git 倉庫已創建
- [ ] 代碼已推送到 GitHub
- [ ] GitHub Pages 已啟用
- [ ] 線上版本測試通過
- [ ] README.md 已更新（加入你的 GitHub 用戶名）
- [ ] 社交分享設定完成（Optional）

## 🎉 下一步

1. **分享你的研究**
   - 在社交媒體分享連結
   - 提交到學術論壇或社群
   - 考慮寫部落格文章介紹

2. **收集反饋**
   - 開啟 GitHub Issues 讓人回報問題
   - 收集使用者體驗建議

3. **持續改進**
   - 添加更多棋局案例
   - 實作實際音訊生成
   - 增加互動功能

---

**🎼 祝你的 Harmonic Gambit 專案成功！**

如有任何問題，請查看 GitHub Issues 或參考原始概念文件。
