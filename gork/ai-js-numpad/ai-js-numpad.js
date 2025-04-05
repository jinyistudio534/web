class AiJsNumpad extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
  }

  render() {
      const template = document.createElement('template');
      template.innerHTML = `
          <style>
              :host {
                  display: none;
                  position: fixed;
                  bottom: 20px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 300px;
                  padding: 15px;
                  border: 3px solid #ccc;
                  border-radius: 15px 15px 0 0;
                  background: #f0f0f0;
                  box-shadow: inset 3px 3px 5px #fff, inset -3px -3px 5px #aaa;
              }
              .numpad-input {
                  width: 100%;
                  font-size: 24px;
                  padding: 5px;
                  text-align: right;
                  border: 2px solid #ccc;
                  border-radius: 8px;
                  margin-bottom: 10px;
                  box-sizing: border-box;
                  background: #fff;
              }
              .button-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
              }
              button {
                  font-size: 18px;
                  padding: 10px;
                  border: 3px solid #ccc; /* 明確指定框線寬度為 3px */
                  border-radius: 5px;
                  background: #e0e0e0;
                  /* 加強 bevel 凸出效果 */
                  box-shadow: 3px 3px 6px #aaa, -3px -3px 6px #fff;
                  cursor: pointer;
                  position: relative;
                  outline: none;
              }
              button:active {
                  /* 按下時模擬內凹效果 */
                  box-shadow: inset 3px 3px 6px #aaa, inset -3px -3px 6px #fff;
              }
          </style>
          <input type="text" class="numpad-input" readonly>
          <div class="button-row">
              <button style="width: 50%;" data-action="esc">ESC</button>
              <button style="width: 50%;" data-action="del">DEL</button>
          </div>
          <div class="button-row">
              <button style="width: 30%;" data-value="1">1</button>
              <button style="width: 30%;" data-value="2">2</button>
              <button style="width: 30%;" data-value="3">3</button>
          </div>
          <div class="button-row">
              <button style="width: 30%;" data-value="4">4</button>
              <button style="width: 30%;" data-value="5">5</button>
              <button style="width: 30%;" data-value="6">6</button>
          </div>
          <div class="button-row">
              <button style="width: 30%;" data-value="7">7</button>
              <button style="width: 30%;" data-value="8">8</button>
              <button style="width: 30%;" data-value="9">9</button>
          </div>
          <div class="button-row">
              <button style="width: 40%;" data-value="0">0</button>
              <button style="width: 60%;" data-action="enter">Enter</button>
          </div>
      `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // 綁定按鈕事件
      this.shadowRoot.querySelectorAll('button').forEach(button => {
          button.addEventListener('click', () => this.handleButtonClick(button));
      });
  }

  show(initialValue = '') {
      this.style.display = 'block';
      const input = this.shadowRoot.querySelector('.numpad-input');
      input.value = initialValue;
  }

  hide() {
      this.style.display = 'none';
  }

  handleButtonClick(button) {
      const input = this.shadowRoot.querySelector('.numpad-input');
      const value = button.dataset.value;
      const action = button.dataset.action;

      if (value !== undefined) {
          // 數字按鈕
          input.value += value;
      } else if (action === 'del') {
          // DEL 按鈕
          input.value = input.value.slice(0, -1);
      } else if (action === 'esc') {
          // ESC 按鈕
          this.dispatchEvent(new CustomEvent('numpad-action', {
              detail: { action: 'esc' }
          }));
          this.hide();
      } else if (action === 'enter') {
          // Enter 按鈕
          this.dispatchEvent(new CustomEvent('numpad-action', {
              detail: { action: 'enter', value: input.value }
          }));
          this.hide();
      }
  }
}

customElements.define('ai-js-numpad', AiJsNumpad);