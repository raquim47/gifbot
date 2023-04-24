var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = 'z0YquS2TBnQLjaVNvgWMXKDdTXYupsiQ';
const REQUEST_ERROR = {
    400: '잘못된 요청입니다.',
    401: '인증 실패입니다.',
    404: '데이터를 찾을 수 없습니다.',
    500: '서버 에러입니다.',
};
const request = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fetch(url);
        if (result.status === 200) {
            return result.json();
        }
        else {
            throw REQUEST_ERROR[result.status];
        }
    }
    catch (error) {
        // throw가 넘어옴
        console.log(error);
        alert(error.msg);
        return { data: null };
    }
});
const api = {
    fetchGif: (keyword, page = 0) => {
        return request(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=15&offset=${page * 15}&rating=g&lang=ko`);
    },
    fetchTrendGif: (page) => {
        return request(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=${page * 15}&rating=g&lang=ko`);
    },
};
export default api;
