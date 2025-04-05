以下是針對您提供的數字鍵盤 Web Component 的使用說明，涵蓋如何設置、呼叫以及處理其功能的步驟：

---

### 使用說明：數字鍵盤 Web Component

#### 檔案結構
確保以下三個檔案位於同一目錄下：
1. `index.html` - 主頁面檔案，包含鍵盤元件和觸發按鈕。
2. `number-pad.js` - JavaScript 檔案，定義數字鍵盤的 Web Component。
3. `styles.css` - CSS 檔案，提供頁面基本樣式。

#### 設置步驟
1. **準備環境**：
   - 將上述三個檔案儲存到您的專案目錄中。
   - 確保使用支援 Web Component 的現代瀏覽器（如 Chrome、Firefox、Edge 等）。

2. **HTML 結構**：
   - 在 `index.html` 中，已包含一個 `<number-pad>` 自訂元素和一個觸發按鈕。
   - 您可以根據需求修改觸發方式或新增其他元素。

3. **引入檔案**：
   - `index.html` 已正確引入 `styles.css` 和 `number-pad.js`，無需額外修改。

#### 使用方法
1. **顯示數字鍵盤**：
   - 呼叫 `<number-pad>` 元素的 `show` 方法，並可選擇傳入初始值。
   - 示例：
     ```javascript
     document.querySelector('number-pad').show('123');
     ```
   - 這會顯示數字鍵盤，並將初始值 "123" 顯示在輸入框中。如果不傳入參數，輸入框將為空。

2. **隱藏數字鍵盤**：
   - 呼叫 `hide` 方法：
     ```javascript
     document.querySelector('number-pad').hide();
     ```
   - 通常不需要手動呼叫，因為 ESC 和 Enter 按鈕會自動隱藏鍵盤。

3. **監聽事件**：
   - 數字鍵盤會觸發自訂事件 `numpad-action`，用於處理 ESC 和 Enter 的動作。
   - 示例監聽程式碼（已在 `index.html` 中提供）：
     ```javascript
     document.querySelector('number-pad').addEventListener('numpad-action', (e) => {
         const { action, value } = e.detail;
         if (action === 'enter') {
             console.log('Confirmed value:', value); // 取得輸入值
         } else if (action === 'esc') {
             console.log('Input cancelled'); // 取消輸入
         }
     });
     ```
   - `action` 參數：`"enter"` 表示確認輸入，`"esc"` 表示取消輸入。
   - `value` 參數：僅在 `action` 為 `"enter"` 時提供，表示當前輸入框的值。

#### 按鈕功能說明
- **數字鍵 (0-9)**：將對應數字追加到輸入框的最後面。
- **DEL**：刪除輸入框中最右邊的一個字符。
- **ESC**：取消輸入，觸發 `numpad-action` 事件（`action: 'esc'`），並隱藏鍵盤。
- **Enter**：確認輸入，觸發 `numpad-action` 事件（`action: 'enter'`，附帶 `value`），並隱藏鍵盤。

#### 樣式與佈局
- 鍵盤寬度固定為 300px，垂直置中靠下顯示。
- 輸入框寬度調整為不超出框架，字體大小 24px，靠右對齊。
- 按鈕分為 6 列，寬度比例符合需求（ESC/DEL 各 50%，數字鍵 30%，0 為 40%，Enter 為 60%）。
- 所有元素使用 bevel 樣式邊框（3px），左上右上圓角 15px。

#### 示例操作
1. 打開 `index.html`。
2. 點擊 "Show Numpad" 按鈕，鍵盤出現，初始值為 "123"。
3. 輸入數字（例如按 "456"），輸入框顯示 "123456"。
4. 按 "DEL"，輸入框變為 "12345"。
5. 按 "Enter"，控制台顯示 "Confirmed value: 12345"，鍵盤隱藏。
6. 再次點擊按鈕顯示鍵盤，按 "ESC"，控制台顯示 "Input cancelled"，鍵盤隱藏。

#### 注意事項
- 輸入框為唯讀，只能通過按鈕操作修改值。
- 如果需要自訂鍵盤寬度，修改 `.numpad-container` 的 `width` 屬性，並適當調整按鈕寬度百分比。
- 事件處理邏輯可根據需求擴展，例如將輸入值儲存到變數或更新頁面元素。

---

希望這份使用說明清楚且完整！如果有任何問題或需要進一步協助，請隨時告訴我。js-numpad
