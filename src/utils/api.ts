const API_KEY = 'z0YquS2TBnQLjaVNvgWMXKDdTXYupsiQ';

interface RequestError {
  [key: number]: string;
}

const REQUEST_ERROR: RequestError = {
  400: '잘못된 요청입니다.',
  401: '인증 실패입니다.',
  404: '데이터를 찾을 수 없습니다.',
  500: '서버 에러입니다.',
};

const request = async (url: string) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error: any) {
    // throw가 넘어옴
    console.log(error);
    alert(error.msg);
    return { data: null };
  }
};

const api = {
  fetchGif: (keyword: string, page: number = 0) => {
    return request(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=15&offset=${
        page * 15
      }&rating=g&lang=ko`
    );
  },
  fetchTrendGif: (page: number) => {
    return request(
      `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=${
        page * 15
      }&rating=g&lang=ko`
    );
  },
};
export default api;
