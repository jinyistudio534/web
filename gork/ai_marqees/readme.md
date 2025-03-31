以下是關於這個跑馬燈程式的使用說明和範例，幫助您理解如何使用它並展示其效果。

---

### 使用說明

#### 檔案結構

您需要以下三個檔案，並將它們放在同一目錄下：

1. `ai_marquees.css` - 定義跑馬燈和背景內容的樣式。
2. `ai_marquees.js` - 包含 `MarqueeManager` 類，實現跑馬燈邏輯。
3. `index.html` - 主頁面檔案，包含背景內容和跑馬燈的初始化。

#### 功能概述

- **跑馬燈特性**：
  - 文字以指定的顏色（預設黑色）從畫面頂部向下移動。
  - 每條訊息固定停留 3 秒。
  - 最多顯示的行數根據容器高度和字型大小動態計算。
  - 當訊息數量超過 6 條時開始播放。
  - DIV 是透明的，疊加在背景內容上方。
- **可調整參數**：
  - `moveSpeed`：移動動畫的速度（單位：秒）。
  - `fontSize`：文字大小（單位：像素）。
  - `lineHeight`：行高（相對於字型大小的倍數）。
  - `color`：每條訊息的文字顏色（支援 CSS 顏色值）。

#### 如何使用

1. **初始化跑馬燈**：
  在 HTML 的 `<script>` 中創建 `MarqueeManager` 實例，指定容器 ID 和配置選項。
  
  ```javascript
  const marquee = new MarqueeManager('msgDiv', {
      moveSpeed: 1,    // 移動速度為 1 秒
      fontSize: 80,    // 字型大小 80px
      lineHeight: 1.2  // 行高為字型的 1.2 倍
  });
  ```
  
2. **添加訊息**：
  使用 `addMessage` 方法添加訊息，支援 `id`（可選）、`text` 和 `color`（可選）參數。
  
  ```javascript
  marquee.addMessage({ id: 'msg1', text: '第一則訊息', color: 'red' });
  ```
  
3. **更新訊息**：
  使用 `updateMessage` 方法更新現有訊息的文字或顏色。
  
  ```javascript
  marquee.updateMessage('msg1', { text: '更新後的訊息', color: 'green' });
  ```
  
4. **移除訊息**：
  使用 `removeMessage` 方法移除指定訊息。
  
  ```javascript
  marquee.removeMessage('msg1');
  ```
  
5. **調整字型大小**：
  使用 `setFontSize` 方法動態更改字型大小。
  
  ```javascript
  marquee.setFontSize(50); // 將字型大小改為 50px
  ```
  

#### 注意事項

- 跑馬燈 DIV 使用 `position: absolute`，因此需要確保背景內容不會被其完全覆蓋（透過 `z-index` 控制層次）。
- 如果背景內容需要互動（例如按鈕），可能需要調整 `z-index` 或跑馬燈的位置。

---

### 範例程式碼

以下是完整的範例檔案，展示如何設置透明跑馬燈並疊加在背景內容上：

**ai_marquees.css**

```css
#msgDiv {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    background: transparent;
    z-index: 10;
}

.marquee {
    position: absolute;
    display: block;
    width: 100%;
    margin-left: 8px;
    text-align: left;
}

@keyframes moveToPosition {
    0% { top: var(--start-y); }
    100% { top: var(--target-y); }
}

#content {
    width: 100%;
    height: 100vh;
    position: relative;
    background: linear-gradient(to bottom, #f0f0f0, #d0d0d0);
    padding: 20px;
    box-sizing: border-box;
}
```

**ai_marquees.js**

```javascript
class MarqueeManager {
    constructor(containerId, options = { 
        moveSpeed: 1,
        fontSize: 20,
        lineHeight: 1.2
    }) {
        this.container = document.getElementById(containerId);
        this.messages = [];
        this.activeMessages = [];
        this.moveSpeed = options.moveSpeed || 1;
        this.fontSize = options.fontSize || 20;
        this.lineHeight = options.lineHeight || 1.2;
        this.currentIndex = 0;
        this.isAnimating = false;
        this.hasStarted = false;

        const baseLineSpacing = this.fontSize * this.lineHeight;
        this.maxLines = Math.floor(this.container.offsetHeight / baseLineSpacing);
        const totalHeight = this.container.offsetHeight;
        const usedHeight = this.maxLines * this.fontSize;
        const remainingSpace = totalHeight - usedHeight;
        const spacingCount = this.maxLines - 1;
        const extraSpacing = spacingCount > 0 ? remainingSpace / spacingCount : 0;
        this.lineSpacing = this.fontSize + extraSpacing;
        this.defaultSeconds = 3;
    }

    addMessage(messageDict) {
        const msgId = messageDict.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const msg = {
            id: msgId,
            text: messageDict.text || '',
            color: messageDict.color || 'black'
        };
        this.messages.push(msg);
        if (this.messages.length === 6 && !this.hasStarted) {
            this.hasStarted = true;
            this.render();
        }
        return msgId;
    }

    updateMessage(id, newMessageDict) {
        const msg = this.messages.find(msg => msg.id === id);
        if (msg) {
            msg.text = newMessageDict.text !== undefined ? newMessageDict.text : msg.text;
            msg.color = newMessageDict.color !== undefined ? newMessageDict.color : msg.color;
            const activeMsg = this.activeMessages.find(m => m.id === msg.id);
            if (activeMsg) {
                activeMsg.text = msg.text;
                activeMsg.color = msg.color;
            }
        }
    }

    removeMessage(id) {
        const index = this.messages.findIndex(msg => msg.id === id);
        if (index !== -1) {
            this.messages.splice(index, 1);
            if (index <= this.currentIndex) {
                this.currentIndex--;
            }
        }
        this.activeMessages = this.activeMessages.filter(msg => msg.id !== id);
    }

    render() {
        if (this.isAnimating || this.messages.length === 0) return;
        this.isAnimating = true;

        if (this.activeMessages.length === 0) {
            this.activeMessages.push({ 
                ...this.messages[this.currentIndex], 
                position: -this.lineSpacing
            });
        }

        this.container.innerHTML = '';
        this.activeMessages.forEach((msg, index) => {
            const span = document.createElement('span');
            span.className = 'marquee';
            span.textContent = msg.text;
            span.dataset.id = msg.id;
            span.style.fontSize = `${this.fontSize}px`;
            span.style.lineHeight = `${this.lineHeight}`;
            span.style.color = msg.color;

            const startY = msg.position;
            const targetY = index * this.lineSpacing;

            span.style.setProperty('--start-y', `${startY}px`);
            span.style.setProperty('--target-y', `${targetY}px`);
            span.style.top = `${startY}px`;
            span.style.animation = `moveToPosition ${this.moveSpeed}s linear forwards`;

            this.container.appendChild(span);

            msg.position = targetY;
        });

        this.activeMessages = this.activeMessages.filter(msg => msg.position < this.maxLines * this.lineSpacing);

        const shouldContinue = this.messages.length > this.maxLines || 
                              this.currentIndex < this.messages.length - 1;
        if (shouldContinue && this.activeMessages.length <= this.maxLines) {
            this.currentIndex = (this.currentIndex + 1) % this.messages.length;
            this.activeMessages.unshift({ 
                ...this.messages[this.currentIndex], 
                position: -this.lineSpacing
            });
        }

        setTimeout(() => {
            this.isAnimating = false;
            if (shouldContinue) {
                this.render();
            }
        }, this.defaultSeconds * 1000);
    }

    setFontSize(newSize) {
        this.fontSize = newSize;
        const baseLineSpacing = this.fontSize * this.lineHeight;
        const newMaxLines = Math.floor(this.container.offsetHeight / baseLineSpacing);

        const totalHeight = this.container.offsetHeight;
        const usedHeight = newMaxLines * this.fontSize;
        const remainingSpace = totalHeight - usedHeight;
        const spacingCount = newMaxLines - 1;
        const extraSpacing = spacingCount > 0 ? remainingSpace / spacingCount : 0;
        this.lineSpacing = this.fontSize + extraSpacing;

        this.activeMessages.forEach(msg => {
            const lineIndex = Math.floor(msg.position / this.lineSpacing);
            if (lineIndex >= newMaxLines) {
                msg.position = -this.lineSpacing;
            } else {
                msg.position = lineIndex * this.lineSpacing;
            }
        });

        this.maxLines = newMaxLines;
        if (!this.isAnimating) this.render();
    }
}
```

**index.html**

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="ai_marquees.css">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <!-- 背景內容 -->
    <div id="content">
        <h1>歡迎體驗跑馬燈效果</h1>
        <p>這是一個展示透明跑馬燈的範例，文字將疊加在背景內容上。</p>
        <p>您可以看到不同顏色的訊息從畫面頂部滑入，每條訊息停留 3 秒。</p>
        <img src="https://via.placeholder.com/300x200" alt="示例圖片" style="margin-top: 20px;">
        <button onclick="alert('點擊測試')">測試按鈕</button>
    </div>

    <!-- 跑馬燈容器 -->
    <div id="msgDiv"></div>

    <script src="ai_marquees.js"></script>
    <script>
        const marquee = new MarqueeManager('msgDiv', { 
            moveSpeed: 1,
            fontSize: 60,  // 調整為 60px 以適應範例
            lineHeight: 1.2
        });

        // 添加範例訊息
        marquee.addMessage({ id: 'msg1', text: '歡迎使用跑馬燈', color: 'black' });
        marquee.addMessage({ id: 'msg2', text: '這是紅色訊息', color: 'red' });
        marquee.addMessage({ id: 'msg3', text: '藍色訊息來了', color: 'blue' });
        marquee.addMessage({ id: 'msg4', text: '預設黑色訊息' });
        marquee.addMessage({ id: 'msg5', text: '第五條訊息', color: 'purple' });
        marquee.addMessage({ id: 'msg6', text: '第六條開始播放', color: 'orange' });
        marquee.addMessage({ id: 'msg7', text: '持續更新中', color: 'green' });

        // 10 秒後更新第一條訊息
        setTimeout(() => {
            marquee.updateMessage('msg1', { text: '訊息已更新！', color: 'pink' });
        }, 10000);

        // 15 秒後移除一條訊息
        setTimeout(() => {
            marquee.removeMessage('msg3');
        }, 15000);

        // 20 秒後調整字型大小
        setTimeout(() => {
            marquee.setFontSize(40);
        }, 20000);
    </script>
</body>
</html>
```

---

### 範例說明

1. **背景內容**：
  
  - 包含標題、文字段落、圖片和一個按鈕，展示跑馬燈疊加效果。
  - 使用漸變背景，讓畫面更有層次感。
2. **跑馬燈行為**：
  
  - 初始化時添加 7 條訊息，使用不同顏色。
  - 第 6 條訊息觸發播放。
  - 10 秒後更新第一條訊息為粉紅色。
  - 15 秒後移除第 3 條訊息（藍色）。
  - 20 秒後將字型大小從 60px 調整為 40px。
3. **效果預覽**：
  
  - 打開 `index.html` 後，您會看到背景內容，跑馬燈文字以透明背景疊加其上。
  - 文字從頂部滑入，停留 3 秒後繼續移動。
  - 背景內容（如按鈕）仍可互動，因為跑馬燈是透明的。

---

### 如何測試

1. 將上述三個檔案儲存到同一目錄。
2. 在瀏覽器中打開 `index.html`。
3. 觀察跑馬燈如何疊加在背景內容上，並體驗更新、移除和調整字型的功能。

如果您需要更多範例（例如不同佈局、動畫效果）或有其他需求，請告訴我！
