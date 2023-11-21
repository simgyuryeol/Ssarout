import React from "react";
import Header from "../components/commonUse/Header"
import Footer from "../components/commonUse/Footer"
import SearchResult from "../components/search/SearchResult"
import styles from "./SearchResult.module.css"

const Result = () => {
    return(
      <>
        <div className={styles.container}>
          <Header/>
          <SearchResult/></div>
          <Footer/>
      </>
  )
}
export default Result