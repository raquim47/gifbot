class KeywordHistory {
    constructor($target, onSearch) {
        this.data = JSON.parse(localStorage.getItem('keywordHistory') || '[]');
        this.$target = $target;
        this.$list = document.createElement('ul');
        this.$list.className = 'keywordHistory';
        this.$target.appendChild(this.$list);
        this.onSearch = onSearch;
        this.updateList();
    }
    updateList() {
        this.$list.innerHTML = '';
        this.data.forEach((keyword) => this.createItem(keyword));
    }
    createItem(keyword) {
        const $li = document.createElement('li');
        const $button = document.createElement('button');
        $button.innerText = keyword;
        $li.appendChild($button);
        $button.addEventListener('click', () => {
            this.onSearch(keyword);
            this.$target.querySelector('input').value = keyword;
            this.addKeyword(keyword);
        });
        this.$list.appendChild($li);
    }
    addKeyword(keyword) {
        this.data = this.data.filter((item) => item !== keyword);
        this.data.unshift(keyword);
        this.data.splice(5);
        localStorage.setItem('keywordHistory', JSON.stringify(this.data));
        this.updateList();
    }
}
export default KeywordHistory;
