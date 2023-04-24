class ImageModal {
  $target: HTMLElement;
  $wrapper!: HTMLDivElement;
  $img!: HTMLImageElement;
  constructor($target:HTMLElement) {
    this.$target = $target;
    this.initDOM();
  }

  initDOM() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'modal';
    this.bindEventClickOutSide(this.$wrapper);
    const $box = document.createElement('div');
    $box.className = 'modalBox';
    this.$img = document.createElement('img');
    this.$img.alt = '모달이미지';
    $box.appendChild(this.createCloseBtn());
    $box.appendChild(this.createDownloadBtn());
    $box.appendChild(this.$img);
    this.$wrapper.appendChild($box);
  }
  
  createDownloadBtn(){
    const $downloadBtn = document.createElement('button');
    $downloadBtn.className = 'downloadBtn';
    $downloadBtn.innerText = '다운로드';
    $downloadBtn.addEventListener('click', () => {
      fetch(this.$img.src)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'image.gif'; // 이미지 파일명
          link.click();
        });
    });
    return $downloadBtn;
  }

  createCloseBtn() {
    const $closeBtn = document.createElement('button');
    $closeBtn.addEventListener('click', () => this.hide());
    $closeBtn.setAttribute('aria-label', '모달 닫기');
    $closeBtn.className = 'closeBtn';
    $closeBtn.innerText = '✕';
    return $closeBtn;
  }

  bindEventClickOutSide(el:HTMLElement) {
    el.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.hide();
      }
    });
  }

  show(imgUrl:string) {
    this.$target.appendChild(this.$wrapper);
    this.$img.src = imgUrl;
    setTimeout(() => {
      this.$wrapper.style.opacity = '1';
      this.$wrapper.style.visibility = 'visible';
    }, 100);
  }

  hide() {
    this.$wrapper.style.opacity = '0';
    this.$wrapper.style.visibility = 'hidden';
    setTimeout(() => {
      this.$target.removeChild(this.$wrapper);
    }, 300);
  }
}
export default ImageModal;
