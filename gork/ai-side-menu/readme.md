### `ai-side-menu` 自訂元件使用說明

#### 1. 概述

`ai-side-menu` 是一個自訂的 Web Component，用於創建一個可切換寬度的側邊選單。它支援選單項的動態控制（`disabled` 和 `selected` 狀態）以及狀態檢查功能。選單項可以包含圖標、文字或圖片，並支援點擊事件觸發。

#### 2. 檔案結構

- `ai-side-menu.html`：範例頁面，展示如何使用 `ai-side-menu` 元件。
- `ai-side-menu.js`：定義 `ai-side-menu` 和 `menu-item` 的邏輯，包括方法和樣式。
- `ai-side-menu.css`：全局樣式，確保佈局正確。

#### 3. 基本使用

##### 3.1 引入元件

將以下檔案引入您的專案：

- 在 HTML 中載入 `ai-side-menu.js` 和 `ai-side-menu.css`。
- 引入 Bootstrap 和 Material Icons（用於樣式和圖標）。

範例：

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="ai-side-menu.css">
<script src="ai-side-menu.js"></script>
```

##### 3.2 定義選單結構

在 HTML 中使用 `<ai-side-menu>` 標籤，並透過 `<menu-head>` 和 `<menu-tail>` 定義選單項。選單項使用 `<menu-item>` 標籤。

範例：

```html
<ai-side-menu id="sideMenu" width="200" image="assets/logo.png" margin="3" size="24" click="handleMenuClick">
  <menu-head>
    <menu-item image="assets/001.png" align="center"></menu-item>
    <menu-item align="center" size="16" text bold>功能一</menu-item>
    <menu-item id="id1" icon="home" size="28" bold>首頁</menu-item>
    <menu-item id="id2" icon="format_list_bulleted" size="28" bold>全部清單</menu-item>
  </menu-head>
  <menu-tail>
    <menu-item image="assets/002.png" align="left"></menu-item>
    <menu-item align="center" text bold>功能二</menu-item>
    <menu-item id="item3" icon="search" size="28" bold disabled selected>選單一</menu-item>
    <menu-item id="id4" icon="exit_to_app" bold>登出</menu-item>
  </menu-tail>
</ai-side-menu>
```

##### 3.3 屬性說明

- `<ai-side-menu>` 屬性：
  
  - `width`：選單展開時的寬度（預設 100px）。
  - `image`：選單頂部的 logo 圖片路徑。
  - `margin`：選單項的垂直間距（預設 3px）。
  - `size`：圖標的預設大小（預設 24px）。
  - `click`：點擊選單項時觸發的 JavaScript 函數名。
- `<menu-item>` 屬性：
  
  - `id`：選單項的唯一識別碼，用於動態控制和檢查。
  - `icon`：Material Icons 的圖標名稱（例如 `"home"`）。
  - `size`：圖標或文字的大小（預設為 `ai-side-menu` 的 `size`）。
  - `bold`：是否使用粗體（無值屬性）。
  - `disabled`：是否禁用（無值屬性，禁用時無法點擊，透明度 0.5）。
  - `selected`：是否選用中（無值屬性，選用中時顯示黑光底色和白色文字）。
  - `align`：對齊方式（`left`、`center`、`right`，預設 `left`）。
  - `image`：圖片路徑（用於顯示圖片選單項）。
  - `text`：文字內容（若設置，顯示為純文字選單項）。

#### 4. 動態控制選單項狀態

##### 4.1 控制 `disabled` 狀態

使用 `setMenuItemDisabled(itemId, disabled)` 方法動態設置選單項的 `disabled` 狀態。

範例：

```javascript
const sideMenu = document.querySelector('#sideMenu');
// 禁用選單項
sideMenu.setMenuItemDisabled('item3', true); // 禁用 id="item3"
// 啟用選單項
sideMenu.setMenuItemDisabled('item3', false); // 啟用 id="item3"
```

- 禁用時：選單項透明度設為 0.5，無法點擊。
- 啟用時：恢復正常樣式，可點擊觸發事件。

##### 4.2 控制 `selected` 狀態

使用 `setMenuItemSelected(itemId, selected)` 方法動態設置選單項的 `selected` 狀態。

範例：

```javascript
const sideMenu = document.querySelector('#sideMenu');
// 設為選用中
sideMenu.setMenuItemSelected('item3', true); // 選用 id="item3"
// 取消選用
sideMenu.setMenuItemSelected('item3', false); // 取消選用 id="item3"
```

- 選用中時：選單項顯示黑光底色（`#343a40`）、白色文字（`#ffffff`）、圓角長方形、左右各 2px 空白。
- 取消選用時：恢復原始樣式。

#### 5. 檢查選單項狀態

使用 `getMenuItem(itemId)` 方法檢查指定選單項的狀態，返回一個陣列（例如 `["disabled", "selected"]` 或 `[]`）。

範例：

```javascript
const sideMenu = document.querySelector('#sideMenu');
const status = sideMenu.getMenuItem('item3');
console.log(status); // 例如 ["disabled", "selected"] 或 []
```

- 返回值：
  - 如果選單項為 `disabled` 狀態，陣列包含 `"disabled"`。
  - 如果選單項為 `selected` 狀態，陣列包含 `"selected"`。
  - 如果兩者都不存在，返回空陣列 `[]`。

#### 6. 處理選單項點擊事件

為 `<ai-side-menu>` 設置 `click` 屬性，指定一個 JavaScript 函數來處理選單項的點擊事件。

範例：

```javascript
function handleMenuClick(event) {
  const menuId = event.detail.id;
  console.log(`Menu item clicked: ${menuId}`);
}

const sideMenu = document.querySelector('#sideMenu');
sideMenu.addEventListener('menu-click', handleMenuClick);
```

- 點擊選單項（必須有 `id` 且未被禁用）時，觸發 `menu-click` 事件。
- 事件對象的 `detail.id` 包含被點擊選單項的 `id`。

#### 7. 範例操作說明

範例頁面提供以下按鈕來控制和檢查 `id="item3"` 的選單項：

- **禁用選單一**：調用 `setMenuItemDisabled('item3', true)`，將選單項設為禁用狀態。
- **啟用選單一**：調用 `setMenuItemDisabled('item3', false)`，將選單項設為啟用狀態。
- **設為選用中**：調用 `setMenuItemSelected('item3', true)`，將選單項設為選用中狀態。
- **取消選用中**：調用 `setMenuItemSelected('item3', false)`，取消選單項的選用狀態。
- **檢查選單狀態**：調用 `getMenuItem('item3')`，顯示選單項的狀態（例如 "選單一狀態：disabled, selected" 或 "選單一狀態：無狀態"）。

#### 8. 視覺效果和行為

- **選單切換**：
  - 點擊右上角的切換按鈕（`chevron_left` 或 `chevron_right`）可展開或收合選單。
  - 展開時寬度為 `width`（預設 200px），收合時為 40px。
  - 收合時僅顯示圖標項（圖標居中），其他項隱藏。
- **Hover 效果**：
  - 圖標選單項在 hover 時顯示背景色 `#ffb6c1`，左右邊界各留 2px 空白。
- **切換按鈕**：
  - 展開時位於右上角，顯示 `chevron_left`。
  - 收合時位於垂直居中，顯示 `chevron_right`。
  - Hover 時背景色為 `#ff69b4`。

#### 9. 注意事項

- 確保 `id` 屬性唯一，否則動態控制和檢查可能影響錯誤的選單項。
- 圖片路徑（`image` 屬性）必須正確，否則圖片無法顯示。
- 如果選單項被禁用（`disabled`），點擊事件將不會觸發。
- Bootstrap 和 Material Icons 的 CDN 必須可用，否則樣式或圖標可能無法正確顯示。

---

### 總結

`ai-side-menu` 提供了一個靈活的側邊選單解決方案，支援動態控制選單項的 `disabled` 和 `selected` 狀態，並能檢查選單項的狀態。通過簡單的 API（`setMenuItemDisabled`、`setMenuItemSelected` 和 `getMenuItem`），您可以輕鬆實現選單項的動態行為。如果您有其他問題或需要進一步說明，請隨時告訴我！
