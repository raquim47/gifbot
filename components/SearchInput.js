class SearchInput {
  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;
    this.render();
  }
  // 폼 그리기
  createForm() {
    const $form = document.createElement('form');
    const $input = document.createElement('input');
    $input.placeholder = '움짤을 검색해보세요!';
    const $submitBtn = document.createElement('button');
    $submitBtn.innerText = '검색';

    $form.appendChild($input);
    $form.appendChild($submitBtn);
    $form.appendChild(this.createRandomButton());
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      const keyword = $input.value.trim();

      if (keyword.length > 0) {
        this.onSearch(keyword);
      }
    });

    return $form;
  }
  // 랜덤 버튼
  createRandomButton() {
    const $randomBtn = document.createElement('button');
    $randomBtn.type = 'button';
    $randomBtn.innerText = 'random';
    return $randomBtn;
  }

  render() {
    const $wrapper = document.createElement('section');
    $wrapper.className = 'searchInput';

    const $form = this.createForm();
    $wrapper.appendChild($form);
    this.$target.appendChild($wrapper);
  }
}
export default SearchInput;
