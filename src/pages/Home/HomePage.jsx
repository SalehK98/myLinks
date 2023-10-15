import { useState, useEffect } from "react";
import AddLinkButton from "../../components/AddLinkButton/AddLinkButton";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import Modal from "../../components/Modal/Modal";
import firestoreServices from "../../services/firestoreServices";
import transformAllUserData from "../../helpers/transformFirestoreData";
import styles from "../../styles/HomePage.module.css";
import * as ActionTypes from "../../contexts/actionTypes";
import { useUserDataContext } from "../../contexts/userDataContext";

export default function HomePage() {
  const [scrollEffect, setScrollEffect] = useState(
    styles.SearchBarWrapperBeforeScroll
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useUserDataContext();

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

  useEffect(() => {
    const fetchCollectionData = async () => {
      setIsLoading(true);
      try {
        const [user, rawCollectionData] =
          await firestoreServices.getAllDataForSingleUser();
        const [categories, categoriesWithLinks] =
          transformAllUserData(rawCollectionData);
        // setData(transformedData);
        dispatch({ type: ActionTypes.SET_USER, payload: user });
        dispatch({ type: ActionTypes.SET_CATEGORIES, payload: categories });
        dispatch({
          type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
          payload: categoriesWithLinks,
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionData();
  }, []);

  if (isLoading) return <>Loading</>;
  if (error) return <>error: {error.message}</>;

  if (state.user) {
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
            {Object.values(state.categoriesWithLinks).map((category, idx) => {
              {
                return (
                  <CategoryBlock
                    categoryTitle={category.id}
                    links={category.urls}
                    key={idx}
                  />
                );
              }
            })}
          </div>
          <div className={styles.AddLinkWrapper}>
            <AddLinkButton onOpen={setIsModalOpen} isModalOpen={isModalOpen} />
          </div>
          <Modal isOpen={isModalOpen} onCloseModal={setIsModalOpen} />
        </div>
      </div>
    );
  }
}
