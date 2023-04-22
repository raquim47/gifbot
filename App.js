console.log('app is running!');
import api from './utils/api.js';
import Header from './components/Header.js';
import SearchResult from './components/SearchResult.js';
import Loading from './components/Loading.js';

class App {
  $target = null;
  state = {
    data: [],
    page: 1,
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
          });
          this.loading.hide();
          // 로컬 스토레지에 저장
          localStorage.setItem('lastResult', JSON.stringify(data));
        });
      },
      onTrendSearch: () => {
        this.loading.show();
        api.fetchTrendGif().then(({ data }) => {
          this.setState({
            data: data || [],
            page: this.DEFAULT_PAGE,
          });
          this.loading.hide();
        });
      },
    });

    this.SearchResult = new SearchResult({
      $target,
      initialData: this.state.data,
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
    });
  }
}

export default App;
