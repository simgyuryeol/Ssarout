import React from "react";
import Test from "./Test";
import "./style.css";
import Header from "../components/commonUse/Header";
import { useParams } from "react-router-dom";
import Api from "../Api/Api";

const SingTest = (rerecordlyrics, mrFile) => {
  const songId = useParams(); // songId에 담겨있음!
  React.useEffect(() => {
    const appContainer = document.querySelector("#Singtest");
    const test = new Test(
      appContainer,
      songId,
      rerecordlyrics.rerecordlyrics,
      mrFile
    );
  }, [songId]);

  return (
    <div>
      {Object.keys(rerecordlyrics).length === 0 ? <Header /> : null}
      <div class="box" id="Singtest">
        <br />
      </div>
    </div>
  );
};

export default SingTest;
