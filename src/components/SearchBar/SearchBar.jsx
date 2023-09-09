import styles from "../../styles/SearchBar.module.css";
import { useState, useEffect } from "react";
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
        {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
        {/* <i class="fa-solid fa-magnifying-glass" style="color: #85878a;"></i> */}
        <input
          type="text"
          placeholder={" Search by name, url or category"}
          className={styles.searchInput}
        />
        {/* <button className={styles.searchButton}> */}
        {/* Font Awesome search icon */}
        {/* <i className="fa fa-search"></i> */}
        <BsSearch />
        {/* </button> */}
      </div>
    </div>
  );
}
