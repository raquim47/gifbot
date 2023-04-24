class DarkModeToggle {
    constructor($target) {
        this.isDarkMode = false;
        this.$checkInput = null;
        this.initDOM($target);
        this.initMode();
    }
    initDOM($target) {
        const $wrapper = document.createElement('div');
        $wrapper.className = 'darkModeToggle';
        this.$checkInput = document.createElement('input');
        this.$checkInput.type = 'checkbox';
        this.$checkInput.id = 'darkMode';
        this.$checkInput.addEventListener('change', (e) => {
            const target = e.target;
            this.setMode(target.checked);
        });
        const $checkLabel = document.createElement('label');
        $checkLabel.innerText = '다크모드';
        $checkLabel.htmlFor = 'darkMode';
        $wrapper.appendChild(this.$checkInput);
        $wrapper.appendChild($checkLabel);
        if ($target) {
            $target.appendChild($wrapper);
        }
    }
    initMode() {
        // 초기화 (디바이스에 설정된 다크모드 상태 반영)
        // isDarkMode, checkbox, html attr
        this.isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
        if (this.$checkInput) {
            this.$checkInput.checked = this.isDarkMode;
        }
        this.setMode(this.isDarkMode);
    }
    setMode(isDarkMode) {
        document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
    }
}
export default DarkModeToggle;
