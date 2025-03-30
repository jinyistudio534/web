以下是關於你修改後的 `float_kanban` 元件的完整使用說明，涵蓋如何設置、嵌入內容以及自訂樣式。這份說明假設你已經有 `float_kanban.html`、`float_kanban.css` 和 `float_kanban.js` 三個檔案，並且已經修正了之前的語法錯誤。

---

## Float Kanban 元件使用說明

`float_kanban` 是一個可展開/收起的浮動面板元件，支援從頁面左側、右側、頂部或底部滑出。以下是如何使用它的步驟與細節。

### 檔案結構
確保你的專案包含以下三個檔案，並放在同一目錄下（或根據需要調整路徑）：
- `float_kanban.html`：主 HTML 文件。
- `float_kanban.css`：樣式文件，控制按鈕與面板的外觀。
- `float_kanban.js`：邏輯文件，處理按鈕與面板的行為。

### 步驟 1：設置 HTML 結構
在 `float_kanban.html` 中，你需要：
1. **引入 CSS 和 JS 文件**：確保 `<head>` 和 `<body>` 末尾正確載入樣式與腳本。
2. **定義容器**：使用 `<div id="kanban-container">` 來放入你想要顯示的內容。

#### 示例 HTML
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Float Kanban Component</title>
    <link rel="stylesheet" href="float_kanban.css">
</head>
<body>
    <!-- 面板內容容器 -->
    <div id="kanban-container">
        <div class="float-kanban-panel-content">
            <h2>自定義內容</h2>
            <p>這是我想要顯示的內容，直接寫在 HTML 中。</p>
            <ul>
                <li>自訂項目 1</li>
                <li>自訂項目 2</li>
                <li>自訂項目 3</li>
            </ul>
        </div>
    </div>
    <!-- 其他頁面內容 -->
    <div style="padding: 20px;">
        <h1>主頁內容</h1>
        <p>這是一些測試文字，用來展示 overlay 效果。</p>
        <button>測試按鈕</button>
    </div>
    <!-- 引入 JS 並初始化 -->
    <script src="float_kanban.js"></script>
    <script>
        float_kanban('kanban-container', 'left', 400);
    </script>
</body>
</html>
```

#### 說明
- `<div id="kanban-container">`：這是你要顯示的面板內容，直接在這裡放入任何 HTML（文字、圖片、列表等）。
- `<script>`：在頁面底部引入 `float_kanban.js`，並調用 `float_kanban` 函數進行初始化。

---

### 步驟 2：初始化元件
在 `<script>` 標籤中調用 `float_kanban` 函數，傳入以下參數：
```javascript
float_kanban(containerId, position, panelSize);
```

#### 參數說明
1. **`containerId` (字串)**：
   - 必填，指定包含面板內容的 `<div>` 的 `id`。
   - 示例：`'kanban-container'`。
2. **`position` (字串，可選)**：
   - 指定面板展開的位置，可選值：`'left'`（左）、`'right'`（右）、`'top'`（上）、`'bottom'`（下）。
   - 預設值：`'left'`。
3. **`panelSize` (數字，可選)**：
   - 指定面板的寬度（左右展開時）或高度（上下展開時），單位為像素。
   - 預設值：`150`。

#### 示例
- 從左側展開，面板寬度 400px：
  ```javascript
  float_kanban('kanban-container', 'left', 400);
  ```
- 從頂部展開，面板高度 200px：
  ```javascript
  float_kanban('kanban-container', 'top', 200);
  ```

---

### 步驟 3：自訂內容與樣式
#### 內容
- 你可以在 `<div id="kanban-container">` 中放入任何 HTML 內容，例如：
  ```html
  <div id="kanban-container">
      <div class="float-kanban-panel-content">
          <h2>我的任務</h2>
          <p>這裡是今天的待辦事項：</p>
          <ul>
              <li>完成報告</li>
              <li>參加會議</li>
              <li>回覆郵件</li>
          </ul>
          <img src="https://placehold.co/100x100" alt="示例圖片">
      </div>
  </div>
  ```

#### 樣式
- **預設樣式**：`float_kanban.css` 已經定義了按鈕與面板的基本樣式，例如半透明背景、白色文字等。
- **自訂樣式**：你可以修改 `float_kanban.css` 或在 HTML 中添加內聯樣式。
  - 修改面板背景色：
    ```css
    .float-kanban-panel {
        background-color: rgba(0, 128, 255, 0.7); /* 藍色半透明 */
    }
    ```
  - 修改內容文字樣式：
    ```css
    .float-kanban-panel-content {
        padding: 20px;
        color: #fff;
        font-size: 18px;
    }
    ```

---

### 功能說明
- **展開與收起**：點擊浮動按鈕即可切換面板的顯示狀態。
- **位置適應**：按鈕與面板會根據窗口大小自動調整位置（例如居中）。
- **滾動支持**：如果面板內容超出範圍，可以滾動查看（由 CSS 的 `overflow: auto` 實現）。

---

### 注意事項
1. **檔案路徑**：
   - 確保 `float_kanban.css` 和 `float_kanban.js` 的路徑正確。如果不在同一目錄，調整 `<link>` 和 `<script>` 的 `href` 和 `src`。
2. **調試**：
   - 如果元件未顯示，打開瀏覽器開發者工具（F12），檢查是否有錯誤訊息（例如檔案未找到）。
3. **相容性**：
   - 此元件使用現代 JavaScript 和 CSS，適用於大多數現代瀏覽器（如 Chrome、Firefox、Edge）。

---

### 示例應用
假設你想創建一個從右側展開的任務面板：
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>任務面板</title>
    <link rel="stylesheet" href="float_kanban.css">
</head>
<body>
    <div id="kanban-container">
        <div class="float-kanban-panel-content">
            <h2>任務列表</h2>
            <p>今日任務：</p>
            <ul>
                <li>設計 UI</li>
                <li>撰寫文件</li>
                <li>測試程式</li>
            </ul>
        </div>
    </div>
    <div style="padding: 20px;">
        <h1>主頁</h1>
        <p>歡迎使用浮動面板元件！</p>
    </div>
    <script src="float_kanban.js"></script>
    <script>
        float_kanban('kanban-container', 'right', 300);
    </script>
</body>
</html>
```

---

希望這份使用說明能幫助你順利使用 `float_kanban` 元件！如果有任何問題或需要進一步自訂，隨時告訴我！
