# 全美江西同鄉會 40 週年慶典邀請函生成器

這是一個為全美江西同鄉會（Jiangxi Kinship Association, USA）40 週年慶典開發的邀請函定制系統。用戶可以輸入受邀人姓名，系統將自動將姓名嵌入到精美的慶典模板中，並支持導出為高品質圖片（PNG）或 PDF 格式。

### 🌐 線上訪問
**[https://40th-gala.jiangxi-kinship-association-usa.org](https://40th-gala.jiangxi-kinship-association-usa.org)**

## 功能特點

- **實時預覽**：輸入姓名時，邀請函預覽會實時更新。
- **高品質導出**：使用原生 Canvas 繪圖技術，確保導出的圖片和 PDF 保持原始模板的高分辨率（1536x2752）。
- **中英雙語支持**：界面和字體均優化了繁體中文的顯示效果，確保排版與字體權重的一致性。
- **簡單易用**：一鍵保存，方便通過微信、電子郵件等方式發送。

## 技術棧

- **HTML5/CSS3**：構建界面與佈局。
- **JavaScript (ES6+)**：處理交互與 Canvas 繪圖邏輯。
- **html2canvas & jsPDF**：輔助進行複雜的文檔導出。

## 使用方法

1. 在輸入框中輸入受邀人的姓名。
2. 點擊「保存為圖片」或「保存為 PDF」。
3. 文件將自動下載到您的設備中。

## 部署與使用指南

如果您想在自己的環境中部署此項目，請參考以下步驟：

### 1. 本地開發
此項目為純前端項目，不需要後端環境。
1. **複製項目**：
   ```bash
   git clone https://github.com/您的用戶名/您的項目名.git
   cd 您的項目名
   ```
2. **啟動本地服務**（推薦使用 `serve` 或 VS Code 的 Live Server）：
   ```bash
   npx serve .
   ```
3. 在瀏覽器訪問 `http://localhost:3000` 即可。

### 2. 生產環境部署 (Ubuntu VM + Nginx/Docker + Cloudflare)
項目目前部署於自定義域名 `40th-gala.jiangxi-kinship-association-usa.org`。
1. **準備環境**：確保 Ubuntu 服務器已安裝 Docker 或 Nginx。
2. **配置 Nginx**：將靜態文件目錄指向本項目文件夾，並配置對應的 `server_name`。
3. **域名解析**：在 Cloudflare 中配置 DNS A 記錄指向服務器 IP。
4. **SSL 證書**：通過 Cloudflare 邊緣證書或 Let's Encrypt 配置 HTTPS 確保安全訪問。

## 開發者信息

由 Antigravity AI 協助開發。
