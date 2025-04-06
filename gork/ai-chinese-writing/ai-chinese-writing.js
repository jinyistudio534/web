class AIChineseWriting extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['line-spacing'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const lineSpacing = parseInt(this.getAttribute('line-spacing')) || 15;
        const styleSheet = document.createElement('style');
        const container = document.createElement('div');

        styleSheet.textContent = `
            .container {
                height: 100%;
                width: 100%;
                position: relative; /* 作為絕對定位的基準 */
            }
            .chinese-line {
                writing-mode: vertical-rl;
                height: 100%;
                min-height: 400px;
                display: inline-block; /* 根據內容展開寬度 */
                text-align: center;
                padding: 5px;
                box-sizing: border-box;
                position: absolute; /* 使用絕對定位控制位置 */
                top: 0;
            }
            .text-content {
                display: block;
                width: 100%;
                white-space: nowrap;
                position: absolute;
                top: 0; /* 預設從頂部開始 */
                left: 0;
                right: 0;
            }
        `;

        container.className = 'container';

        const chineseWritings = this.querySelectorAll('chinese-writing');
        let rightOffset = 0; // 從右邊開始計算偏移

        chineseWritings.forEach((writing, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'chinese-line';

            const textDiv = document.createElement('div');
            textDiv.className = 'text-content';

            const color = writing.getAttribute('color') || 'black';
            const size = parseInt(writing.getAttribute('size')) || 100;
            const spacing = writing.getAttribute('spacing') || '0';

            lineDiv.style.color = color;
            textDiv.style.fontSize = `${size}px`;

            // 重置樣式
            textDiv.style.top = '';
            textDiv.style.bottom = '';
            textDiv.style.transform = '';

            // 處理 spacing
            const spacingValue = parseInt(spacing, 10);
            if (spacing === 'center') {
                textDiv.style.top = '50%';
                textDiv.style.transform = 'translateY(-50%)';
                console.log(`Line ${index + 1}: Applied top: 50%, transform: translateY(-50%)`);
            } else if (spacing === 'end') {
                textDiv.style.top = 'auto';
                textDiv.style.bottom = '0px';
                console.log(`Line ${index + 1}: Applied bottom: 0px`);
            } else if (!isNaN(spacingValue) && spacingValue >= 0) {
                textDiv.style.top = `${spacingValue}px`;
                console.log(`Line ${index + 1}: Applied top: ${spacingValue}px`);
            } else {
                textDiv.style.top = '0px';
                console.log(`Line ${index + 1}: Applied default top: 0px`);
            }

            textDiv.textContent = writing.textContent.trim();
            lineDiv.appendChild(textDiv);
            container.appendChild(lineDiv);

            // 計算並設置水平位置
            lineDiv.style.right = `${rightOffset}px`;
            rightOffset += size + lineSpacing; // 根據字體大小和行距累加偏移
        });

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(styleSheet);
        this.shadowRoot.appendChild(container);
    }
}

class ChineseWriting extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('ai-chinese-writing', AIChineseWriting);
customElements.define('chinese-writing', ChineseWriting);