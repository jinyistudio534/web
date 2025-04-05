class NumberPad extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <style>
              .numpad-container {
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
                  box-shadow: 0 0 10px rgba(0,0,0,0.3);
                  font-family: Arial, sans-serif;
                  box-sizing: border-box; /* 確保邊框和內邊距包含在寬度內 */
              }
              .numpad-container.show {
                  display: block;
              }
              .display {
                  width: calc(100% - 4px); /* 減去左右邊框的 2px * 2 */
                  padding: 10px;
                  font-size: 24px;
                  text-align: right;
                  border: 2px solid #999;
                  border-radius: 8px;
                  margin-bottom: 10px;
                  background: white;
                  outline: none;
                  box-sizing: border-box; /* 包含邊框和內邊距 */
              }
              .button-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
              }
              button {
                  font-size: 18px;
                  padding: 10px;
                  border: 3px solid #999;
                  border-radius: 5px;
                  background: #e0e0e0;
                  cursor: pointer;
                  outline: none;
                  box-sizing: border-box; /* 包含邊框和內邊距 */
              }
              button:hover {
                  background: #d0d0d0;
              }
              .esc-btn, .del-btn {
                  width: 48%;
              }
              .num-btn {
                  width: 30%;
              }
              .zero-btn {
                  width: 40%;
              }
              .enter-btn {
                  width: 58%;
              }
          </style>
          <div class="numpad-container">
              <input type="text" class="display" readonly>
              <div class="button-row">
                  <button class="esc-btn">ESC</button>
                  <button class="del-btn">DEL</button>
              </div>
              <div class="button-row">
                  <button class="num-btn">1</button>
                  <button class="num-btn">2</button>
                  <button class="num-btn">3</button>
              </div>
              <div class="button-row">
                  <button class="num-btn">4</button>
                  <button class="num-btn">5</button>
                  <button class="num-btn">6</button>
              </div>
              <div class="button-row">
                  <button class="num-btn">7</button>
                  <button class="num-btn">8</button>
                  <button class="num-btn">9</button>
              </div>
              <div class="button-row">
                  <button class="zero-btn">0</button>
                  <button class="enter-btn">Enter</button>
              </div>
          </div>
      `;

      this.container = this.shadowRoot.querySelector('.numpad-container');
      this.display = this.shadowRoot.querySelector('.display');
      this.buttons = this.shadowRoot.querySelectorAll('button');

      this.buttons.forEach(button => {
          button.addEventListener('click', () => this.handleButtonClick(button.textContent));
      });
  }

  show(initialValue = '') {
      this.display.value = initialValue;
      this.container.classList.add('show');
  }

  hide() {
      this.container.classList.remove('show');
  }

  handleButtonClick(value) {
      switch (value) {
          case 'ESC':
              this.dispatchEvent(new CustomEvent('numpad-action', { detail: { action: 'esc' } }));
              this.hide();
              break;
          case 'Enter':
              this.dispatchEvent(new CustomEvent('numpad-action', { 
                  detail: { action: 'enter', value: this.display.value } 
              }));
              this.hide();
              break;
          case 'DEL':
              this.display.value = this.display.value.slice(0, -1);
              break;
          default:
              this.display.value += value;
              break;
      }
  }
}

customElements.define('number-pad', NumberPad);