import AddLinkButton from "../../components/AddLinkButton/AddLinkButton";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "../../styles/HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.sideMenuWrapper}>
          {/* Content for the side panel */}
          <SideMenu />
        </div>
        <div className={styles.mainContent}>
          {/* Content for the main content area */}
          <SearchBar />
          <CategoryBlock />
          <CategoryBlock />
          <CategoryBlock />
          <AddLinkButton />
        </div>
      </div>
    </>
  );
}
