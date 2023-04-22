class SearchResult {
  $resultList = null;
  data = [];

  constructor({ $target, initialData }) {
    console.log(initialData);
    this.data = initialData;
    const $wrapper = document.createElement('section');
    $wrapper.className = 'searchResult';
    this.$resultList = document.createElement('ul');
    $wrapper.appendChild(this.$resultList);
    $target.appendChild($wrapper);
  }

  setState(newData) {
    this.data = newData;
    this.render();
  }

  render() {
    console.log(this.data);
    this.$resultList.innerHTML = this.data
      .map(
        (gifData, index) => `
          <li class="item" data-index=${index}>
            <img src=${gifData.images.original.url} data-src=${gifData.url} alt=${gifData.title}>
          </li>
        `
      )
      .join('');
  }
}
export default SearchResult;
