### `float_kanban` 元件概覽

- **功能**: 在網頁中創建一個浮動面板，按鈕點擊後展開或收起，面板位置和大小可自訂。
- **組成**:
  - **按鈕 (`float-kanban-button`)**: 固定位置的觸發按鈕，根據方向顯示水平或垂直的兩條線。
  - **面板 (`float-kanban-panel`)**: 可展開的內容區域，初始隱藏在視窗外。
- **CSS**: 使用 `position: fixed` 和 `transition` 實現平滑動畫，支援半透明背景和立體邊框效果。
- **JavaScript**: 動態設置樣式、處理點擊事件和窗口調整。

---

### 使用方式

1. **引入必要的檔案**:
   
   - 將 CSS 樣式存為 `float_kanban.css`。
   - 將 JavaScript 函數存為 `float_kanban.js`。
   - 在 HTML 中引入這兩個檔案並調用 `float_kanban` 函數。

2. **函數參數**:
   
   - `float_kanban(containerId, position = 'left', panelSize = 150)`
     - `containerId` (string): 目標容器的 ID，元件將附加到此元素。
     - `position` (string, 可選): 面板展開方向，可選值為 `'left'`、`'right'`、`'top'`、`'bottom'`，預設為 `'left'`。
     - `panelSize` (number, 可選): 面板的寬度（左右方向）或高度（上下方向），單位為像素，預設為 `150`。

3. **初始化**:
   
   - 在 `<script>` 標籤中調用 `float_kanban`，傳入容器 ID 和所需參數。

---

### 範例說明

#### 範例 1：左側浮動面板（預設）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Float Kanban - Left</title>
    <link rel="stylesheet" href="float_kanban.css">
</head>
<body>
    <div id="kanban-container"></div>
    <div style="padding: 20px;">
        <h1>主要內容</h1>
        <p>這是頁面內容，面板將從左側展開。</p>
    </div>
    <script src="float_kanban.js"></script>
    <script>
        float_kanban('kanban-container', 'left', 400);
    </script>
</body>
</html>
```

- **效果**: 一個寬 400px 的面板從左側滑出，按鈕位於視窗左邊緣中間，點擊後面板展開並將按鈕推至右側 400px。

#### 範例 2：頂部浮動面板

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Float Kanban - Top</title>
    <link rel="stylesheet" href="float_kanban.css">
</head>
<body>
    <div id="kanban-container"></div>
    <div style="padding: 20px;">
        <h1>主要內容</h1>
        <p>這是頁面內容，面板將從頂部展開。</p>
    </div>
    <script src="float_kanban.js"></script>
    <script>
        float_kanban('kanban-container', 'top', 200);
    </script>
</body>
</html>
```

- **效果**: 一個高 200px 的面板從頂部滑下，按鈕位於視窗頂部中央，展開後按鈕下移 200px。

#### 範例 3：右側浮動面板

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Float Kanban - Right</title>
    <link rel="stylesheet" href="float_kanban.css">
</head>
<body>
    <div id="kanban-container"></div>
    <div style="padding: 20px;">
        <h1>主要內容</h1>
        <p>這是頁面內容，面板將從右側展開。</p>
    </div>
    <script src="float_kanban.js"></script>
    <script>
        float_kanban('kanban-container', 'right', 300);
    </script>
</body>
</html>
```

- **效果**: 一個寬 300px 的面板從右側滑出，按鈕位於視窗右邊緣中間，展開後按鈕左移 300px。

#### 範例 4：底部浮動面板

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Float Kanban - Bottom</title>
    <link rel="stylesheet" href="float_kanban.css">
</head>
<body>
    <div id="kanban-container"></div>
    <div style="padding: 20px;">
        <h1>主要內容</h1>
        <p>這是頁面內容，面板將從底部展開。</p>
    </div>
    <script src="float_kanban.js"></script>
    <script>
        float_kanban('kanban-container', 'bottom', 250);
    </script>
</body>
</html>
```

- **效果**: 一個高 250px 的面板從底部滑上，按鈕位於視窗底部中央，展開後按鈕上移 250px。

---

### 自訂與擴展

#### 1. 修改面板內容

- 預設面板內容是硬編碼的 HTML（在 `panel.innerHTML` 中）。你可以修改 `float_kanban.js` 中的這部分，加入自訂內容：
  
  ```javascript
  panel.innerHTML = `
      <div class="float-kanban-panel-content">
          <h2>自訂標題</h2>
          <p>這是自訂內容。</p>
          <button onclick="alert('點擊我！')">測試按鈕</button>
      </div>
  `;
  ```

#### 2. 動態控制

- 如果需要外部控制面板的展開/收起，可以暴露一個 API。例如修改 `float_kanban` 函數返回控制方法：
  
  ```javascript
  function float_kanban(containerId, position = 'left', panelSize = 150) {
      // ... 原有代碼 ...
  
      const togglePanel = () => {
          button.click(); // 模擬按鈕點擊
      };
  
      return { togglePanel }; // 返回控制方法
  }
  
  // 使用方式
  const kanban = float_kanban('kanban-container', 'left', 400);
  kanban.togglePanel(); // 展開或收起
  ```

#### 3. 改變樣式

- 編輯 `float_kanban.css` 中的 `.float-kanban-panel` 或 `.float-kanban-button`，例如更改背景色：
  
  ```css
  .float-kanban-panel {
      background-color: rgba(0, 128, 255, 0.7); /* 藍色半透明 */
  }
  ```

---

### 注意事項

1. **容器必須存在**: 若 `containerId` 無效，會在控制台報錯。確保 HTML 中有對應的 `<div>`。
2. **響應式**: 元件會隨窗口大小調整位置，但內容若超出 `panelSize`，需要滾動（已內建 `overflow: auto`）。
3. **Z-index**: 按鈕和面板的 `z-index` 分別為 1001 和 1000，確保它們位於其他內容之上。

---

### 總結

`float_kanban` 是一個簡單但實用的浮動面板元件，適合用於側邊欄、工具列或資訊提示等場景。透過參數調整位置和大小，並可進一步自訂內容與行為。如果你有具體需求（例如整合 SVG 或更複雜的交互），請告訴我，我可以提供更針對性的範例！
