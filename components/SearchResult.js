class SearchResult {
  constructor({ $target, initialData }) {
    this.data = initialData;
    this.initDOM($target);
  }

  setState(newData) {
    this.data = newData;
    this.updateResultList();
  }

  initDOM($target) {
    const $wrapper = document.createElement('section');
    $wrapper.className = 'searchResult';
    this.$resultList = document.createElement('ul');
    $wrapper.appendChild(this.$resultList);
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
    this.addEventListerToItem();
  }

  // 마우스 오버 이벤트 추가
  addEventListerToItem() {
    const items = this.$resultList.querySelectorAll('.item img');
    items.forEach((item) => {
      item.addEventListener('mouseover', (event) => {
        const animatedSrc = event.target.getAttribute('data-src');
        event.target.setAttribute('src', animatedSrc);
      });

      item.addEventListener('mouseout', (event) => {
        const stillSrc = event.target.getAttribute('data-still');
        event.target.setAttribute('src', stillSrc);
      });
    });
  }
}
export default SearchResult;
