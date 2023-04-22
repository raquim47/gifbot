console.log('app is running!');
import api from './utils/api.js';
import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';

class App {
  $target = null;
  DEFAULT_PAGE = 1;
  state = {
    data: [],
    page: this.DEFAULT_PAGE,
  };

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        api.fetchGif(keyword).then(({ data }) => {
          console.log(data);
          this.setState({
            data: data || [],
            page: this.DEFAULT_PAGE,
          });
        });
      },
      onTrendSearch: () => {
        api.fetchTrendGif().then(({ data }) => {
          this.setState({
            data: data || [],
            page: this.DEFAULT_PAGE,
          });
        });
      },
    });

    this.SearchResult = new SearchResult({
      $target,
      initialData: this.state.data,
    });
  }

  setState(newState) {
    this.state = newState;
    this.SearchResult.setState(newState.data);
  }
}

export default App;
