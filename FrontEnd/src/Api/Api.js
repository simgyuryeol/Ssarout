import axios from "axios";

axios.defaults.withCredentials = true;
const Api = axios.create({
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
        Api.defaults.headers.common.Authorization = `Bearer ${response.data.data}`;
        localStorage.setItem("token", response.data.data);
        error.config.headers.Authorization = `Bearer ${response.data.data}`;
        console.log("error.config : ", error.config);
        if (error.config.url === "/api/v1/result") {
          error.config.headers["Content-Type"] = "multipart/form-data";
        }
        return Api.request(error.config);
      } catch (error) {
        alert("다시 로그인해주세요.");
        localStorage.removeItem("token");
        window.location.href="/login";
      }
    } else if (error.response.status === 403) {
      alert("권한이 없습니다.");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
export default Api;
