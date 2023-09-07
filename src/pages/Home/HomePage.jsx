import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "../../styles/HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.sidePanel}>
          {/* Content for the side panel */}
          <SideMenu />
        </div>
        <div className={styles.mainContent}>
          {/* Content for the main content area */}
          <CategoryBlock />
          <CategoryBlock />
          <CategoryBlock />
        </div>
      </div>
    </>
  );
}
