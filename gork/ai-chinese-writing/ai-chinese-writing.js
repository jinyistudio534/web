class AIChineseWriting extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.setupComponent();
      this.mutationObserver(); // 啟用觀察器
    }
  
    setupComponent() {
      // 動態創建樣式
      const style = document.createElement('style');
      style.textContent = `
        .writing-container {
          display: flex;
          flex-direction: row-reverse;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        chinese-writing {
          writing-mode: vertical-rl;
          text-orientation: upright;
          white-space: nowrap;
          margin-left: 10px;
          display: inline-block;
          position: relative;
        }
      `;
      this.shadowRoot.appendChild(style);
  
      // 創建容器
      const container = document.createElement('div');
      container.className = 'writing-container';
      this.shadowRoot.appendChild(container);
  
      // 處理子元素
      this.renderLines(container);
    }
  
    renderLines(container) {
      // 清空現有內容
      container.innerHTML = '';
  
      // 獲取所有 <chinese-writing> 子元素
      const lines = this.querySelectorAll('chinese-writing');
      
      lines.forEach(line => {
        const lineElement = document.createElement('chinese-writing');
        const text = line.textContent.trim();
        const color = line.getAttribute('color') || 'black'; // 預設黑色
        const size = line.getAttribute('size') || '100';     // 預設 100px
        const spacing = line.getAttribute('spacing') || '0'; // 預設 0px
  
        lineElement.textContent = text;
        lineElement.style.color = color;
        lineElement.style.fontSize = `${size}px`;
        lineElement.style.top = `${spacing}px`; // 設定與頂部的間隔
        container.appendChild(lineElement);
      });
    }
  
    // 監聽子元素變化
    mutationObserver() {
      const observer = new MutationObserver(() => {
        this.renderLines(this.shadowRoot.querySelector('.writing-container'));
      });
      observer.observe(this, { childList: true, subtree: true, attributes: true });
    }
  }
  
  // 定義主組件
  customElements.define('ai-chinese-writing', AIChineseWriting);
  
  // 定義子元素
  customElements.define('chinese-writing', class extends HTMLElement {});