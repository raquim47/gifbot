class Loading {
    constructor({ $target }) {
        this.$target = $target;
        this.$wrapper = document.createElement('div');
        this.$wrapper.className = 'loading';
        const $spinner = document.createElement('div');
        $spinner.className = 'spinner';
        this.$wrapper.appendChild($spinner);
    }
    show() {
        if (this.$target) {
            this.$target.appendChild(this.$wrapper);
        }
    }
    hide() {
        if (this.$target) {
            this.$target.removeChild(this.$wrapper);
        }
    }
}
export default Loading;
