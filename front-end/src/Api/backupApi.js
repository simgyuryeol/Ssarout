import axios from "axios";

axios.defaults.withCredentials = true;
const Api = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://i9e203.p.ssafy.io/",
  headers: {
    "Content-Type": "application/json",
  },
});
const token = localStorage.getItem("token");
if (token) {
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.response.status === 401) {
      try {
        const response = await Api.get("/api/v1/auth/refresh");
        console.log("나중에 밑에 바꿔야함 : ", response.data);
        Api.defaults.headers.common.Authorization = `Bearer ${response.data.data}`;
        localStorage.setItem("token", response.data.data);
        error.config.headers.Authorization = `Bearer ${response.data.data}`;
        return Api(error.config);
      } catch (error) {
        alert("다시 로그인해주세요.");
        // localStorage.removeItem("token");
      }
    } else if (error.response.status === 403) {
      alert("권한이 없습니다.");
      // localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export const getSongs = (keyword) => {
  // /api/v1/song 엔드포인트에 GET 요청
  console.log("검색 키워드 전송:", keyword);
  return Api.get('/api/v1/song', {
    params: { keyword },
  });
};

export default Api;
