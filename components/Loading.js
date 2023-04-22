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
    this.$target.appendChild(this.$wrapper);
  }

  hide() {
    this.$target.removeChild(this.$wrapper);
  }
}

export default Loading;
