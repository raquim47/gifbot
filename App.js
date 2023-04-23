console.log('app is running!');
import api from './utils/api.js';
import Header from './components/Header.js';
import SearchResult from './components/SearchResult.js';
import Loading from './components/Loading.js';

class App {
  DEFAULT_PAGE = 0;
  $target = null;
  state = {
    data: [],
    page: this.DEFAULT_PAGE,
    isOnSearch: true,
  };

  constructor($target) {
    this.$target = $target;

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

    this.SearchResult = new SearchResult({
      $target,
      initialData: this.state.data,
      loadMoreOnScroll: () => {
        console.log('다음');

        const nextPage = this.state.page + 1;
        this.loading.show();
        if (this.state.isOnSearch) {
          const lastkeyword = JSON.parse(
            localStorage.getItem('keywordHistory') ?? '[]'
          )[0];
          api.fetchGif(lastkeyword, nextPage).then(({ data }) => {
            const newData = this.state.data.concat(data);
            this.setState({
              data: newData,
              page: nextPage,
              isOnSearch: true,
            });
            this.loading.hide();
          });
        } else {
          api.fetchTrendGif(nextPage).then(({ data }) => {
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
    this.SearchResult.setState(newState.data);
  }

  initLastResult() {
    const lastResult = JSON.parse(localStorage.getItem('lastResult') ?? '[]');
    this.setState({
      data: lastResult,
      page: this.DEFAULT_PAGE,
      isOnSearch: true,
    });
  }
}

export default App;
