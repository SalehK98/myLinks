import AddLinkButton from "../../components/AddLinkButton/AddLinkButton";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "../../styles/HomePage.module.css";
import { useState, useEffect } from "react";

export default function HomePage() {
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
    <div className={styles.pageContainer}>
      <div className={styles.sideMenuWrapper}>
        {/* Content for the side panel */}
        <SideMenu />
      </div>
      <div className={styles.mainContent}>
        {/* Content for the main content area */}
        <div className={scrollEffect}>
          <SearchBar />
        </div>
        <div>
          <CategoryBlock />
          <CategoryBlock />
          <CategoryBlock />
        </div>
        <div className={styles.AddLinkWrapper}>
          <AddLinkButton />
        </div>
      </div>
    </div>
  );
}
