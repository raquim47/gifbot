import Empty from './Empty.js';
class SearchResult {
  constructor({ $target, initialData, loadMoreOnScroll }) {
    this.data = initialData;
    this.loadMoreOnScroll = loadMoreOnScroll;
    this.initDOM($target);
  }

  setState(newData) {
    this.data = newData;
    this.updateResultList();
    this.Empty.show(!newData.length);
  }

  initDOM($target) {
    const $wrapper = document.createElement('section');
    $wrapper.className = 'searchResult';
    this.$resultList = document.createElement('ul');
    $wrapper.appendChild(this.$resultList);
    this.Empty = new Empty($wrapper);
    $target.appendChild($wrapper);
  }

  updateResultList() {
    this.$resultList.innerHTML = this.data
      .map(
        (gifData, index) => `
          <li class="item" data-index=${index}>
            <img src=${gifData.images.original_still.url} data-src=${gifData.images.original.url} data-still=${gifData.images.original_still.url} alt=${gifData.title}>
          </li>
        `
      )
      .join('');

    this.$resultList.querySelectorAll('.item').forEach(($item) => {
      this.listObserver.observe($item);
    });
    this.addEventListerToImg();
  }

  // 마우스 오버 이벤트 추가
  addEventListerToImg() {
    const imgs = this.$resultList.querySelectorAll('.item img');
    imgs.forEach(($img) => {
      $img.addEventListener('mouseover', (event) => {
        const animatedSrc = event.target.getAttribute('data-src');
        event.target.setAttribute('src', animatedSrc);
      });

      $img.addEventListener('mouseout', (event) => {
        const stillSrc = event.target.getAttribute('data-still');
        event.target.setAttribute('src', stillSrc);
      });
    });
  }

  // 스크롤 감지
  listObserver = new IntersectionObserver((items) => {
    items.forEach((item) => {
      const itemIndex = Number(item.target.dataset.index);
      if (item.isIntersecting) {
        // item.target.querySelector('img').src =
        //   item.target.querySelector('img').dataset.src;
        if (this.data.length - 1 === itemIndex) {
          this.loadMoreOnScroll();
        }
      }
    });
  });
}
export default SearchResult;
