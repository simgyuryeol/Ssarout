import React, { useEffect } from "react";
import Api from "../Api/Api";
import styles from "./MyPage.module.css";


const Redirecion = () => {
  const searchParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    f1();
  }, []);
  let profileImg;
  const f1 = async () => {
    try {
      await Api.get("/api/v1/users").then((response) => {
        console.log(response.data);
        profileImg = response.data.data.profileImg;
        if (response.data.data.nickname != null) {
          window.location.replace("/mypage");
        }
      });
    } catch (error) {
      alert.error(error);
    }
  };

  const f2 = async () => {
    try {
      const nn = document.querySelector("#nickname").value;
      console.log(nn);
      await Api.put("/api/v1/users", {
        nickname: nn,
        profileImg: profileImg,
      }).then((response) => {
        console.log(response);

        // window.location.replace("/");
      });
    } catch (error) {
      alert.error(error);
    }
  };
  const f3 = async () => {
    try {
      await Api.delete("/api/v1/users").then((response) => {
        console.log(response);

        window.location.replace("/");
      });
    } catch (error) {
      alert.error(error);
    }
  };
  const f4 = async () => {
    try {
      await Api.post("/logout").then((response) => {
        localStorage.removeItem("token");
        console.log(response);
      });
    } catch (error) {
      localStorage.removeItem("token");
      alert.error(error);
    }
  };
  return (
    <div>
      <form>
        <input className={styles.nicknameSet} id="nickname" type="text"></input>
        <button id="btn1" type="button" onClick={f2}>
          프로필 등록
        </button>
        <button id="btn2" type="button" onClick={f3}>
          삭제
        </button>
        <button type="button" onClick={f4}>
          로그아웃
        </button>
      </form>
    </div>
  );
};
export default Redirecion;
