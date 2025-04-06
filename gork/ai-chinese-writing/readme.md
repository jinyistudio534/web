### 使用說明：AI Chinese Writing Demo

#### 1. 功能概述

這個工具是一個基於 Web Components 的自定義元件，允許您在網頁上以垂直書寫模式（從右到左）顯示中文文字。您可以通過設置屬性來調整文字的顏色、大小和垂直位置，並通過父元件屬性控制行距。

#### 2. 文件結構

- **HTML 文件**：定義頁面結構並包含自定義元件 `<ai-chinese-writing>` 和 `<chinese-writing>`。
- **CSS 文件**（`ai-chinese-writing.css`）：用於設置元件的基礎樣式。
- **JavaScript 文件**（`ai-chinese-writing.js`）：定義自定義元件的邏輯和渲染行為。

#### 3. 如何使用

以下是逐步使用說明：

##### (1) 引入必要文件

確保您的 HTML 文件中正確引入了 CSS 和 JavaScript 文件：

```html
<link rel="stylesheet" href="ai-chinese-writing.css">
<script src="ai-chinese-writing.js"></script>
```

##### (2) 在 HTML 中使用自定義元件

在 `<body>` 標籤內添加 `<ai-chinese-writing>` 作為父容器，並在其中嵌套多個 `<chinese-writing>` 標籤來顯示文字。例如：

```html
<ai-chinese-writing line-spacing="30">
    <chinese-writing color="red" size="100" spacing="end">默然回首</chinese-writing>
    <chinese-writing color="blue" size="50" spacing="end">往事如煙</chinese-writing>
    <chinese-writing color="green" size="120" spacing="end">時光荏苒</chinese-writing>
</ai-chinese-writing>
```

##### (3) 可配置的屬性

- **`<ai-chinese-writing>` 的屬性**：
  
  - `line-spacing`：設置每行文字之間的水平間距（單位：像素）。預設值為 15。例如：`line-spacing="30"` 表示行距為 30px。
- **`<chinese-writing>` 的屬性**：
  
  - `color`：設置文字顏色，支持 CSS 顏色值（如 `"red"`、`"blue"`、`"#FF0000"`）。預設值為 `"black"`。
  - `size`：設置文字大小（單位：像素）。預設值為 100。例如：`size="50"` 表示字體大小為 50px。
  - `spacing`：控制文字在垂直方向上的位置，支持以下值：
    - `"center"`：文字居中顯示。
    - `"end"`：文字靠底部對齊。
    - 數字值（如 `"20"`）：從頂部開始的偏移量（單位：像素）。
    - 預設值：`"0"`（從頂部開始）。

##### (4) 文字內容

將需要顯示的中文文字直接寫在 `<chinese-writing>` 標籤內，例如：

```html
<chinese-writing color="red" size="100" spacing="end">默然回首</chinese-writing>
```

這裡的文字「默然回首」將以紅色、100px 大小並靠底部顯示。

#### 4. 顯示效果

- 文字將以垂直書寫模式（從右到左）排列。
- 每段文字從頁面右側開始，根據 `size` 和 `line-spacing` 的值依次向左偏移。
- 高度至少為 400px（由 CSS 設置的 `min-height`），並根據父容器高度自適應。

#### 5. 示例

以下是一個完整的示例：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>AI Chinese Writing Demo</title>
    <link rel="stylesheet" href="ai-chinese-writing.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            height: 100vh;
            box-sizing: border-box;
            display: flex;
        }
    </style>
</head>
<body>
    <ai-chinese-writing line-spacing="30">
        <chinese-writing color="red" size="100" spacing="end">默然回首</chinese-writing>
        <chinese-writing color="blue" size="50" spacing="center">往事如煙</chinese-writing>
        <chinese-writing color="green" size="120" spacing="20">時光荏苒</chinese-writing>
    </ai-chinese-writing>
    <script src="ai-chinese-writing.js"></script>
</body>
</html>
```

**效果**：

- 「默然回首」：紅色，100px，靠底部。
- 「往事如煙」：藍色，50px，居中。
- 「時光荏苒」：綠色，120px，距離頂部 20px。

#### 6. 注意事項

- **瀏覽器兼容性**：確保使用支持 Web Components 的現代瀏覽器（如 Chrome、Firefox、Edge）。
- **間距調整**：如果 `line-spacing` 或 `size` 設置過大，可能導致文字超出容器範圍，建議根據實際需求調整。
- **樣式衝突**：內置樣式使用 Shadow DOM 封裝，不會與外部樣式衝突，但需確保父容器有足夠寬度和高度。

#### 7. 自定義擴展

- 若需修改樣式，可調整 `ai-chinese-writing.js` 中的 `styleSheet.textContent`。
- 若需添加新功能（如動畫效果），可在 `render` 方法中擴展邏輯。

---

希望這份使用說明對您有幫助！如果有其他問題或需要進一步協助，請隨時告訴我。
