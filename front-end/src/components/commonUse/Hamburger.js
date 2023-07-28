import React, { useState } from 'react';
import styles from "./Hamburger.module.css";
import Sidebar from "./Sidebar";

function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <img
        className={styles.burgerIcon}
        alt="burger"
        src="./burger.png"
        onClick={toggleSide}
      />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Burger;
