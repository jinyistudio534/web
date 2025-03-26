class MarqueeManager {
    constructor(containerId, options = { borders: ['all'], width: 2, color: 'blue', moveSpeed: 1 }) {
        this.container = document.getElementById(containerId);
        this.messages = []; // 訊息陣列，改用 id 查找
        this.maxMessages = 10;
        this.moveSpeed = options.moveSpeed || 1; // 移動速度（秒）
        this.currentIndex = 0; // 當前顯示的訊息索引
        this.isAnimating = false; // 防止重複觸發
        this.pendingUpdates = false; // 記錄是否有待處理的更新
        this.onButtonClick = options.onButtonClick || null; // 回調函數

        this.applyBorder(options);
        this.startMarquee();
    }

    applyBorder(options) {
        const { borders = ['all'], width = 2, color = 'blue' } = options;
        const borderStyle = `${width}px solid ${color}`;
        if (borders.includes('all')) {
            this.container.style.border = borderStyle;
        }
    }

    setSpeed(newSpeed) {
        this.moveSpeed = newSpeed;
        this.pendingUpdates = true;
        if (!this.isAnimating) this.render();
    }

    addMessage(messageDict) {
        if (this.messages.length >= this.maxMessages) {
            this.messages.shift(); // 移除最早的訊息
            if (this.currentIndex > 0) this.currentIndex--;
        }
        // 使用使用者提供的 id，如果未提供則生成唯一 id
        const msgId = messageDict.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const msg = {
            id: msgId, // 唯一 id
            text: messageDict.text || '',
            seconds: messageDict.seconds !== undefined ? messageDict.seconds : 2, // 預設停留 2 秒
            button: messageDict.button || '', // 預設為空白字串，無按鈕
            onClick: messageDict.onClick || null
        };
        this.messages.push(msg);
        if (!this.isAnimating) {
            this.startMarquee();
        }
        return msgId; // 返回 id 以便後續操作
    }

    removeMessage(id) {
        const index = this.messages.findIndex(msg => msg.id === id);
        if (index !== -1) {
            this.messages.splice(index, 1);
            if (this.currentIndex >= this.messages.length) {
                this.currentIndex = this.messages.length - 1;
            }
            if (this.currentIndex < 0) this.currentIndex = 0;
            this.pendingUpdates = true;
            if (!this.isAnimating && this.messages.length > 0) {
                this.render();
            } else if (this.messages.length === 0) {
                this.isAnimating = false;
                this.container.innerHTML = '';
            }
        }
    }

    updateMessage(id, newMessageDict) {
        const msg = this.messages.find(msg => msg.id === id);
        if (msg) {
            msg.text = newMessageDict.text !== undefined ? newMessageDict.text : msg.text;
            msg.seconds = newMessageDict.seconds !== undefined ? newMessageDict.seconds : msg.seconds;
            msg.button = newMessageDict.button !== undefined ? newMessageDict.button : msg.button;
            msg.onClick = newMessageDict.onClick || msg.onClick;
            this.pendingUpdates = true;
            if (!this.isAnimating) this.render();
        }
    }

    render() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.container.innerHTML = '';
        this.pendingUpdates = false;

        if (this.messages.length === 0) {
            this.isAnimating = false;
            return;
        }

        const currentIndex = this.currentIndex;
        const currentMsg = this.messages[currentIndex];
        if (!currentMsg) {
            this.isAnimating = false;
            return;
        }

        const currentSpan = document.createElement('span');
        currentSpan.className = 'marquee';
        currentSpan.textContent = currentMsg.text || '';
        currentSpan.dataset.id = currentMsg.id; // 將 id 存入 dataset
        if (currentMsg.onClick) {
            currentSpan.addEventListener('click', () => currentMsg.onClick(currentMsg.text));
        }

        currentSpan.style.animation = `marqueeMoveIn ${this.moveSpeed}s linear forwards`;
        this.container.appendChild(currentSpan);

        // 處理按鈕
        if (currentMsg.button === 'Enter') {
            const enterButton = document.createElement('button');
            enterButton.textContent = 'Enter';
            enterButton.className = 'skip-button';
            currentSpan.appendChild(enterButton);

            enterButton.addEventListener('click', () => {
                if (this.onButtonClick) {
                    this.onButtonClick(currentMsg.id, 'enter'); // 使用 id 而非 index
                }
                this.handleMoveOut(currentSpan, currentIndex);
            });
        } else if (currentMsg.button === 'YesNo') {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'yes-no-buttons';

            const yesButton = document.createElement('button');
            yesButton.textContent = 'Yes';
            yesButton.className = 'yes-button';
            buttonContainer.appendChild(yesButton);

            const noButton = document.createElement('button');
            noButton.textContent = 'No';
            noButton.className = 'no-button';
            buttonContainer.appendChild(noButton);

            currentSpan.appendChild(buttonContainer);

            yesButton.addEventListener('click', () => {
                if (this.onButtonClick) {
                    this.onButtonClick(currentMsg.id, 'yes');
                }
                this.handleMoveOut(currentSpan, currentIndex);
            });
            noButton.addEventListener('click', () => {
                if (this.onButtonClick) {
                    this.onButtonClick(currentMsg.id, 'no');
                }
                this.handleMoveOut(currentSpan, currentIndex);
            });
        } else if (currentMsg.button === 'YesNoCan') {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'yes-no-buttons';

            const yesButton = document.createElement('button');
            yesButton.textContent = 'Yes';
            yesButton.className = 'yes-button';
            buttonContainer.appendChild(yesButton);

            const noButton = document.createElement('button');
            noButton.textContent = 'No';
            noButton.className = 'no-button';
            buttonContainer.appendChild(noButton);

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.className = 'cancel-button';
            buttonContainer.appendChild(cancelButton);

            currentSpan.appendChild(buttonContainer);

            yesButton.addEventListener('click', () => {
                if (this.onButtonClick) {
                    this.onButtonClick(currentMsg.id, 'yes');
                }
                this.handleMoveOut(currentSpan, currentIndex);
            });
            noButton.addEventListener('click', () => {
                if (this.onButtonClick) {
                    this.onButtonClick(currentMsg.id, 'no');
                }
                this.handleMoveOut(currentSpan, currentIndex);
            });
            cancelButton.addEventListener('click', () => {
                if (this.onButtonClick) {
                    this.onButtonClick(currentMsg.id, 'cancel');
                }
                this.handleMoveOut(currentSpan, currentIndex);
            });
        }

        currentSpan.addEventListener('animationend', () => {
            if (currentMsg.button === '') {
                setTimeout(() => {
                    this.handleMoveOut(currentSpan, currentIndex);
                }, currentMsg.seconds * 1000);
            }
        });
    }

    handleMoveOut(currentSpan, currentIndex) {
        currentSpan.style.animation = `marqueeMoveOut ${this.moveSpeed}s linear forwards`;
        currentSpan.addEventListener('animationend', () => {
            if (currentSpan.parentNode) currentSpan.parentNode.removeChild(currentSpan);
            this.isAnimating = false;
            if (this.messages.length > 0) {
                this.currentIndex = (currentIndex + 1) % this.messages.length;
                this.render();
            }
        }, { once: true });
    }

    startMarquee() {
        if (this.messages.length === 0 || this.isAnimating) return;
        this.currentIndex = 0;
        this.render();
    }
}