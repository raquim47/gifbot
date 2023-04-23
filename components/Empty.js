class Empty {
  constructor($target) {
    this.$target = $target;
    this.initDOM();
  }

  initDOM() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'empty';
    const $text = document.createElement('p');
    $text.innerText = '요청 결과가 없습니다.';
    this.$wrapper.appendChild($text);
  }

  show(isShow) {
    if (isShow) {
      if (!this.$target.contains(this.$wrapper)) {
        this.$target.appendChild(this.$wrapper);
      }
    } else {
      if (this.$target.contains(this.$wrapper)) {
        this.$target.removeChild(this.$wrapper);
      }
    }
  }
}

export default Empty;
