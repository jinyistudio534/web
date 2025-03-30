function float_kanban(containerId, position = 'left', panelSize = 150) {
    // 根據 ID 獲取容器元素
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    // 創建按鈕和面板元素
    const button = document.createElement('div');
    button.className = 'float-kanban-button';

    const panel = document.createElement('div');
    panel.className = 'float-kanban-panel';
    
    // 加入範例內容到面板
    panel.innerHTML = `
        <div class="float-kanban-panel-content">
            <h2>Float Kanban 面板</h2>
            <p>這是一個 overlay 面板，點擊按鈕可展開或收起。</p>
            <ul>
                <li>項目 1</li>
                <li>項目 2</li>
                <li>項目 3</li>
            </ul>
        </div>
    `;

    // 初始狀態
    let isOpen = false;

    // 設置按鈕和面板位置及樣式
    function setPositionStyles() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 重置樣式
        button.style.borderRadius = '8px';
        button.classList.remove('horizontal', 'vertical');

        switch (position) {
            case 'left':
                button.classList.add('vertical');
                button.style.width = '32px';
                button.style.height = '64px';
                button.style.left = '0';
                button.style.top = `${(windowHeight - 64) / 2}px`;
                button.style.borderTopLeftRadius = '0';
                button.style.borderBottomLeftRadius = '0';
                panel.style.width = `${panelSize}px`;
                panel.style.height = `${windowHeight}px`;
                panel.style.left = `-${panelSize}px`;
                panel.style.top = '0';
                break;
            case 'right':
                button.classList.add('vertical');
                button.style.width = '32px';
                button.style.height = '64px';
                button.style.right = '0';
                button.style.top = `${(windowHeight - 64) / 2}px`;
                button.style.borderTopRightRadius = '0';
                button.style.borderBottomRightRadius = '0';
                panel.style.width = `${panelSize}px`;
                panel.style.height = `${windowHeight}px`;
                panel.style.right = `-${panelSize}px`;
                panel.style.top = '0';
                break;
            case 'top':
                button.classList.add('horizontal');
                button.style.width = '64px';
                button.style.height = '32px';
                button.style.left = `${(windowWidth - 64) / 2}px`;
                button.style.top = '0';
                button.style.borderTopLeftRadius = '0';
                button.style.borderTopRightRadius = '0';
                panel.style.width = `${windowWidth}px`;
                panel.style.height = `${panelSize}px`;
                panel.style.left = '0';
                panel.style.top = `-${panelSize}px`;
                break;
            case 'bottom':
                button.classList.add('horizontal');
                button.style.width = '64px';
                button.style.height = '32px';
                button.style.left = `${(windowWidth - 64) / 2}px`;
                button.style.bottom = '0';
                button.style.borderBottomLeftRadius = '0';
                button.style.borderBottomRightRadius = '0';
                panel.style.width = `${windowWidth}px`;
                panel.style.height = `${panelSize}px`;
                panel.style.left = '0';
                panel.style.bottom = `-${panelSize}px`;
                break;
        }
    }

    // 點擊事件處理
    button.addEventListener('click', () => {
        if (isOpen) {
            // 關閉
            switch (position) {
                case 'left':
                    panel.style.left = `-${panelSize}px`;
                    button.style.left = '0';
                    break;
                case 'right':
                    panel.style.right = `-${panelSize}px`;
                    button.style.right = '0';
                    break;
                case 'top':
                    panel.style.top = `-${panelSize}px`;
                    button.style.top = '0';
                    break;
                case 'bottom':
                    panel.style.bottom = `-${panelSize}px`;
                    button.style.bottom = '0';
                    break;
            }
        } else {
            // 打開
            switch (position) {
                case 'left':
                    panel.style.left = '0';
                    button.style.left = `${panelSize}px`;
                    break;
                case 'right':
                    panel.style.right = '0';
                    button.style.right = `${panelSize}px`;
                    break;
                case 'top':
                    panel.style.top = '0';
                    button.style.top = `${panelSize}px`;
                    break;
                case 'bottom':
                    panel.style.bottom = '0';
                    button.style.bottom = `${panelSize}px`;
                    break;
            }
        }
        isOpen = !isOpen;
    });

    // 初始設置樣式
    setPositionStyles();

    // 窗口大小改變時重新計算位置
    window.addEventListener('resize', setPositionStyles);

    // 添加到容器
    container.appendChild(panel);
    container.appendChild(button);
}

// 示例用法：
// float_kanban('kanban-container', 'top', 150);