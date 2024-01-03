import AddLinkButton from "../../components/AddLinkButton/AddLinkButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import Modal from "../../components/Modal/Modal";
import styles from "../../styles/HomePage.module.css";
import MainContent from "../../components/MainContent/MainContent";
import useUserDataLoader from "../../hooks/useUserDataLoader";
import useScrollEffect from "../../hooks/useScrollEffect";

export default function HomePage() {
  const scrollEffect = useScrollEffect(
    styles.SearchBarWrapperBeforeScroll,
    styles.SearchBarWrapperAfterScroll
  );

  const [user, data, isLoading, error] = useUserDataLoader();

  if (isLoading) return <>Loading</>;
  if (error) return <>error: {error.message}</>;

  if (data) {
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
            <MainContent />
          </div>
          <div className={styles.AddLinkWrapper}>
            <AddLinkButton />
          </div>
          <Modal />
        </div>
      </div>
    );
  }
}
