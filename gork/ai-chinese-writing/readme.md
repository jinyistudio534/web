很高興測試成功！以下是 `ai-chinese-writing` Web Component 的完整使用說明，涵蓋其功能、安裝步驟和使用方式：

---

### `ai-chinese-writing` Web Component 使用說明

#### 功能概述

`ai-chinese-writing` 是一個自訂的 Web Component，用於將多行中文文字轉為從右到左的垂直顯示。每行文字使用 `<chinese-writing>` 標籤封裝，並支援自訂文字顏色 (`color`)、字型大小 (`size`) 和第一個字與畫面頂部的間隔 (`spacing`)。文字從右到左排列，符合傳統中文直書格式。

#### 主要特性

- **文字轉換**：將多行文字垂直顯示，從右到左排列。
- **子元素封裝**：每行文字使用 `<chinese-writing>` 標籤定義。
- **可自訂屬性**：
  - `color`：文字顏色，預設 black
  - `size`：字型大小，預設 100px
  - `spacing`：第一個字與畫面頂部的間隔，預設 0px
- **動態支援**：支援通過 JavaScript 動態添加或修改行。

#### 檔案需求

只需三個檔案：

1. `ai-chinese-writing.js`（包含組件邏輯和內嵌樣式）
2. `ai-chinese-writing.css`（定義外部容器樣式）
3. 您的 HTML 檔案（例如提供的範例）

#### 安裝步驟

1. **準備檔案**：
  
  - 將 `ai-chinese-writing.js` 和 `ai-chinese-writing.css` 放入您的專案目錄。
  - 創建或使用您的 HTML 檔案（例如前述範例）。
2. **引入組件**：
  
  - 在 HTML 中引入 CSS 和 JS 檔案：
    
    ```html
    <link rel="stylesheet" href="ai-chinese-writing.css">
    <script src="ai-chinese-writing.js"></script>
    ```
    
3. **添加組件**：
  
  - 在 HTML 中使用 `<ai-chinese-writing>` 標籤，並內嵌 `<chinese-writing>` 子元素。

#### 使用方式

##### 1. 基本用法（靜態設置）

在 HTML 中使用 `<ai-chinese-writing>` 包裹多個 `<chinese-writing>` 標籤，並為每行指定屬性：

```html
<ai-chinese-writing>
    <chinese-writing color="red" size="120" spacing="0">默然回首</chinese-writing>
    <chinese-writing color="blue" size="100" spacing="20">那人卻在</chinese-writing>
    <chinese-writing color="green" size="80" spacing="40">燈火闌珊處</chinese-writing>
</ai-chinese-writing>
```

- 未指定屬性時，將使用預設值（顏色: black, 大小: 100px, 間距: 0px）。

##### 2. 動態控制（通過 JavaScript）

使用 JavaScript 動態添加或修改 `<chinese-writing>` 元素：

```html
<ai-chinese-writing id="chinese-writing"></ai-chinese-writing>
<script src="ai-chinese-writing.js"></script>
<script>
    const writing = document.getElementById('chinese-writing');
    const newLine = document.createElement('chinese-writing');
    newLine.setAttribute('color', 'purple');
    newLine.setAttribute('size', '90');
    newLine.setAttribute('spacing', '60');
    newLine.textContent = '新的一行';
    writing.appendChild(newLine);
</script>
```

- 添加新行後，組件會自動重新渲染。

##### 3. 範例 HTML（動態控制面板）

使用提供的範例 HTML，提供互動式控制介面：

```html
<ai-chinese-writing id="chinese-writing">
    <chinese-writing color="red" size="120" spacing="0">默然回首</chinese-writing>
    <chinese-writing color="blue" size="100" spacing="20">那人卻在</chinese-writing>
    <chinese-writing color="green" size="80" spacing="40">燈火闌珊處</chinese-writing>
</ai-chinese-writing>
<div class="controls">
    <h3>動態添加一行</h3>
    <label>文字: <input type="text" id="text-input" value="新的一行"></label><br>
    <label>顏色: <input type="color" id="color-input" value="#800080"></label><br>
    <label>字型大小: <input type="number" id="size-input" value="90" min="50" max="200">px</label><br>
    <label>間距: <input type="number" id="spacing-input" value="60" min="0" max="200">px</label><br>
    <button onclick="addLine()">添加</button>
</div>
<script src="ai-chinese-writing.js"></script>
<script>
    function addLine() {
        const writing = document.getElementById('chinese-writing');
        const newLine = document.createElement('chinese-writing');
        newLine.setAttribute('color', document.getElementById('color-input').value);
        newLine.setAttribute('size', document.getElementById('size-input').value);
        newLine.setAttribute('spacing', document.getElementById('spacing-input').value);
        newLine.textContent = document.getElementById('text-input').value;
        writing.appendChild(newLine);
    }
</script>
```

- 此範例展示初始三行文字，並允許通過控制面板動態添加新行。

#### 可設定的屬性（在 `<chinese-writing>` 上）

| 屬性名稱 | 說明  | 預設值 | 範例值 |
| --- | --- | --- | --- |
| `color` | 文字顏色 | "black" | "red" 或 "#ff0000" |
| `size` | 文字大小(px) | "100" | "120" |
| `spacing` | 與頂部間隔(px) | "0" | "40" |

#### 注意事項

1. **高度設置**：
  
  - `<ai-chinese-writing>` 的高度在 CSS 中預設為 600px，根據文字行數、大小和間距可能需要調整。
  - 若間距過大，可能超出容器範圍，需適當增加高度。
2. **瀏覽器支援**：
  
  - 需要支援 Web Components、`writing-mode: vertical-rl` 和 `text-orientation: upright` 的現代瀏覽器（如 Chrome、Firefox、Edge 最新版本）。
3. **樣式調整**：
  
  - 內嵌樣式在 `ai-chinese-writing.js` 中，外部容器樣式在 `ai-chinese-writing.css` 中，可根據需求修改。
4. **動態更新**：
  
  - 組件使用 `MutationObserver` 監聽子元素變化，確保添加或修改 `<chinese-writing>` 時自動更新。

#### 範例專案結構

```
your-project/
├── ai-chinese-writing.js  # 組件邏輯和內嵌樣式
├── ai-chinese-writing.css # 外部容器樣式
└── index.html            # 您的 HTML 檔案
```

#### 測試與運行

1. 將 `ai-chinese-writing.js`、`ai-chinese-writing.css` 和 HTML 檔案放入同一目錄。
2. 使用本地伺服器（如 `Live Server` 或 `python -m http.server`）開啟 HTML 檔案，避免 CORS 問題。
3. 在瀏覽器中檢查：
  - 初始文字是否正確從右到左垂直顯示。
  - 動態添加功能是否正常運作（使用控制面板測試）。

---

如果您需要更詳細的說明或有其他需求（例如添加行間距控制、動畫效果等），請隨時告訴我！
