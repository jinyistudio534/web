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
        this.defaultSeconds = 3; // 固定停留時間為 3 秒
    }

    addMessage(messageDict) {
        const msgId = messageDict.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const msg = {
            id: msgId,
            text: messageDict.text || '',
            color: messageDict.color || 'black' // 預設顏色為黑色
        };
        this.messages.push(msg);
        if (this.messages.length === 6 && !this.hasStarted) {
            this.hasStarted = true;
            this.render();
        }
        return msgId; // 返回 ID 以便後續使用
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
            span.style.color = msg.color; // 設置文字顏色

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