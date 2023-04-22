class SearchResult {
  $resultList = null;
  data = [];

  constructor({ $target, initialData }) {
    this.data = initialData;
    const $wrapper = document.createElement('section');
    $wrapper.className = 'searchResult';
    this.$resultList = document.createElement('ul');
    $wrapper.appendChild(this.$resultList);
    $target.appendChild($wrapper);
    console.log(this.data);
  }

  setState(newData) {
    this.data = newData;
    this.render();
  }

  render() {
    this.$resultList.innerHTML = this.data
      .map(
        (gifData, index) => `
          <li class="item" data-index=${index}>
            <img src=${gifData.images.original_still.url} data-src=${gifData.images.original.url} data-still=${gifData.images.original_still.url} alt=${gifData.title}>
          </li>
        `
      )
      .join('');
    // 추가된 부분: 이미지에 마우스 오버 이벤트를 추가합니다.
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
