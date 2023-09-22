import AddLinkButton from "../../components/AddLinkButton/AddLinkButton";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "../../styles/HomePage.module.css";
import { useState, useEffect } from "react";
import categoriesList from "../../data/links.json";
import Modal from "../../components/Modal/Modal";

export default function HomePage() {
  const [scrollEffect, setScrollEffect] = useState(
    styles.SearchBarWrapperBeforeScroll
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

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
          {Object.entries(categoriesList).map((category, idx) => {
            return (
              <CategoryBlock
                categoryTitle={category[0]}
                links={category[1]}
                key={idx}
              />
            );
          })}
        </div>
        <div className={styles.AddLinkWrapper}>
          <AddLinkButton onOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </div>
        <Modal isOpen={isModalOpen} onClose={setIsModalOpen} />
      </div>
    </div>
  );
}
