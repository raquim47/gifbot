console.log('app is running!');
import api from './utils/api.js';
import Header from './components/Header.js';
import SearchResult from './components/SearchResult.js';
import Loading from './components/Loading.js';
class App {
    constructor($target) {
        this.DEFAULT_PAGE = 0;
        this.state = {
            data: [],
            page: this.DEFAULT_PAGE,
            isOnSearch: true,
        };
        this.loading = new Loading({ $target });
        this.header = new Header({
            $target,
            onSearch: (keyword) => {
                this.loading.show();
                api.fetchGif(keyword).then(({ data }) => {
                    this.setState({
                        data: data || [],
                        page: this.DEFAULT_PAGE,
                        isOnSearch: true,
                    });
                    this.loading.hide();
                    // 로컬 스토레지에 저장
                    localStorage.setItem('lastResult', JSON.stringify(data));
                });
            },
            onTrendSearch: () => {
                this.loading.show();
                api.fetchTrendGif(this.state.page).then(({ data }) => {
                    this.setState({
                        data: data || [],
                        page: this.DEFAULT_PAGE,
                        isOnSearch: false,
                    });
                    this.loading.hide();
                });
            },
        });
        this.searchResult = new SearchResult({
            $target,
            loadMoreOnScroll: () => {
                var _a;
                console.log('다음');
                const nextPage = this.state.page + 1;
                this.loading.show();
                if (this.state.isOnSearch) {
                    const lastkeyword = JSON.parse((_a = localStorage.getItem('keywordHistory')) !== null && _a !== void 0 ? _a : '[]')[0];
                    api.fetchGif(lastkeyword, nextPage).then(({ data }) => {
                        if (data.length === 0) {
                            console.log('데이터가 없습니다.');
                            this.loading.hide();
                            return;
                        }
                        const newData = this.state.data.concat(data);
                        this.setState({
                            data: newData,
                            page: nextPage,
                            isOnSearch: true,
                        });
                        this.loading.hide();
                    });
                }
                else {
                    api.fetchTrendGif(nextPage).then(({ data }) => {
                        if (data.length === 0) {
                            console.log('데이터가 없습니다.');
                            this.loading.hide();
                            return;
                        }
                        const newData = this.state.data.concat(data);
                        this.setState({
                            data: newData,
                            page: nextPage,
                            isOnSearch: false,
                        });
                        this.loading.hide();
                    });
                }
            },
        });
        this.initLastResult();
    }
    setState(newState) {
        this.state = newState;
        this.searchResult.setState(newState.data);
    }
    initLastResult() {
        var _a;
        const lastResult = JSON.parse((_a = localStorage.getItem('lastResult')) !== null && _a !== void 0 ? _a : '[]');
        this.setState({
            data: lastResult,
            page: this.DEFAULT_PAGE,
            isOnSearch: true,
        });
    }
}
export default App;
