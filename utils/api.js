const API_KEY = 'z0YquS2TBnQLjaVNvgWMXKDdTXYupsiQ';

const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    // throw가 넘어옴
    console.log(error);
    alert(error.msg);
    return { data: null };
  }
};

const api = {
  fetchGif: (keyword) => {
    return request(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=15&offset=1&rating=g&lang=ko`
    );
  },
  fetchTrendGif: () => {
    return request(
      `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=1&rating=g&lang=ko`
    );
  },
};
export default api;
// https://api.giphy.com/v1/gifs/search?api_key=z0YquS2TBnQLjaVNvgWMXKDdTXYupsiQ&q=%EC%95%84%EC%9D%B4&limit=25&offset=1&rating=g&lang=en
// https://api.giphy.com/v1/gifs/search?$z0YquS2TBnQLjaVNvgWMXKDdTXYupsiQ&q=kid&limit=25&offset=1&rating=g&lang=ko

// api.giphy.com/v1/gifs/random?api_key=z0YquS2TBnQLjaVNvgWMXKDdTXYupsiQ&limit=25&offset=1&rating=g&lang=ko

// https://api.giphy.com/v1/gifs/trending?api_key=z0YquS2TBnQLjaVNvgWMXKDdTXYupsiQ&limit=25&offset=1&rating=g&lang=ko