import React from 'react';
import styles from "./MainPage.module.css";
import Header from '../components/commonUse/Header';
import Footer from '../components/commonUse/Footer';

const MainPage = () => {

  return (
    <div className={styles.div}>
      <Header />
      <div className={styles.child} />
      <div className={styles.item} />
      <div className={styles.inner} />
      <div className={styles.aiContainer}>
        <p className={styles.ai}>AI로 분석한 리포트를 통해</p>
        <p className={styles.ai}>보컬 능력을 향상 시킬 수 있습니다.</p>
      </div>
      <div className={styles.ellipseDiv} />
      <div className={styles.child1} />
      <div className={styles.searchBar}>
        <div className={styles.stateLayer}>
          <div className={styles.leadingIcon}>
            <div className={styles.container}>
              <div className={styles.stateLayer1}>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.supportingText}>
              {" "}
                노래명, 가수명을 입력하세요.
            </div>
          </div>
          <div className={styles.trailingElements}>
            <div className={styles.stTrailingIcon}>
              <div className={styles.container}>
                <div className={styles.stateLayer1}>
                </div>
              </div>
            </div>
            <div className={styles.leadingIcon}>
              <div className={styles.container}>
                <div className={styles.stateLayer1}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
