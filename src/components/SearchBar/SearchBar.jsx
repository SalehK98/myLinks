import styles from "../../styles/SearchBar.module.css";
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
  const [scrollEffect, setScrollEffect] = useState(
    styles.SearchBarWrapperBeforeScroll
  );

  const onScroll = () => {
    if (window.scrollY >= 1) {
      console.log("scrolled");
      setScrollEffect(styles.SearchBarWrapperAfterScroll);
    } else {
      console.log("not scrolled");
      setScrollEffect(styles.SearchBarWrapperBeforeScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  });

  return (
    <div className={scrollEffect}>
      <div className={styles.searchContainer}>
        <div className={styles.iconWrapper}>
          <IconContext.Provider
            value={{
              size: "1.7rem",
              color: "#878787",
              // className: ".reactSearchIcon",
            }}
          >
            <BsSearch />
          </IconContext.Provider>
        </div>
        <input
          type="text"
          placeholder={" Search by name, url or category"}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
