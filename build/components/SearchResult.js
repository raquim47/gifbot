import Empty from './Empty.js';
import ImageModal from './ImageModal.js';
class SearchResult {
    constructor({ $target, loadMoreOnScroll }) {
        this.data = [];
        this.loadMoreOnScroll = loadMoreOnScroll;
        this.listObserver = this.initIntersectionObserver();
        if ($target) {
            this.initDOM($target);
        }
    }
    setState(newData) {
        this.data = newData;
        this.updateResultList();
        this.Empty.show(!newData.length);
        console.log(this.data);
    }
    initDOM($target) {
        const $wrapper = document.createElement('section');
        $wrapper.className = 'searchResult';
        this.$resultList = document.createElement('ul');
        $wrapper.appendChild(this.$resultList);
        this.Empty = new Empty($wrapper);
        this.ImageModal = new ImageModal($target);
        $target.appendChild($wrapper);
    }
    updateResultList() {
        this.$resultList.innerHTML = this.data
            .map((gifData, index) => `
          <li class="item" data-index=${index}>
            <img src=${gifData.images.original_still.url} data-src=${gifData.images.original.url} data-still=${gifData.images.original_still.url} alt=${gifData.title}>
          </li>
        `)
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
                const targetElement = event.target;
                const animatedSrc = targetElement.getAttribute('data-src');
                targetElement.setAttribute('src', animatedSrc || '');
            });
            $img.addEventListener('mouseout', (event) => {
                const targetElement = event.target;
                const stillSrc = targetElement.getAttribute('data-still');
                targetElement.setAttribute('src', stillSrc || '');
            });
            $img.addEventListener('click', (event) => {
                const targetElement = event.target;
                const imgUrl = targetElement.getAttribute('data-src');
                this.ImageModal.show(imgUrl || '');
            });
        });
    }
    // 스크롤 감지를 위한 IntersectionObserver 초기화 함수
    initIntersectionObserver() {
        return new IntersectionObserver((items) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    const itemIndex = Number(item.target.dataset.index);
                    if (this.data.length - 1 === itemIndex) {
                        this.loadMoreOnScroll();
                    }
                }
            });
        });
    }
}
export default SearchResult;
