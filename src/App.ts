interface StateI {
  data: any[];
  page: number;
  isOnSearch: boolean;
}

console.log('app is running!');
import api from './utils/api.js';
import Header from './components/Header.js';
import SearchResult from './components/SearchResult.js';
import Loading from './components/Loading.js';

class App {
  private readonly DEFAULT_PAGE = 0;
  private readonly loading: Loading;
  private readonly header: Header;
  private readonly searchResult: SearchResult;
  
  private state:StateI = {
    data: [],
    page: this.DEFAULT_PAGE,
    isOnSearch: true,
  };

  constructor($target: HTMLElement | null) {
    this.loading = new Loading({ $target });
    this.header = new Header({
      $target,
      onSearch: (keyword:string) => {
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
        console.log('다음');

        const nextPage = this.state.page + 1;
        this.loading.show();
        if (this.state.isOnSearch) {
          const lastkeyword = JSON.parse(
            localStorage.getItem('keywordHistory') ?? '[]'
          )[0];
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
        } else {
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

  setState(newState:StateI) {
    this.state = newState;
    this.searchResult.setState(newState.data);
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
