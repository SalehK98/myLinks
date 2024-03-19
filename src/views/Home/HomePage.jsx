import AddLinkButton from "../../components/AddLinkButton/AddLinkButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import Modal from "../../components/Modal/Modal";
import styles from "../../styles/HomePage.module.css";
import MainContent from "../../components/MainContent/MainContent";
import useUserDataLoader from "../../hooks/useUserDataLoader";
import useScrollEffect from "../../hooks/useScrollEffect";

import { useEffect, useState } from "react";
import { useUserDataContext } from "../../contexts/userDataContext";
import firestoreServices from "../../services/firestoreServices";
import {
  URLS_SUB_COLLECTION,
  CATEGORY_SUB_COLLECTION,
} from "../../firebase/constants";
import handleSubCollectionsLiveUpdates from "../../helpers/handleSubCollectionsLiveUpdates";

export default function HomePage({
  counter,
  loader_counter,
  fetch_counter,
  cleanup_counter,
  ui_counter,
}) {
  console.log("entered home page");
  const scrollEffect = useScrollEffect(
    styles.SearchBarWrapperBeforeScroll,
    styles.SearchBarWrapperAfterScroll
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("here before dataloader ", counter);
  // counter += 1;
  const [user, data] =
    useUserDataLoader();
    //   setIsLoading,
    //   setError,
    //   loader_counter,
    //   fetch_counter,
    //   cleanup_counter

  // const { userDataState, userDataDispatch } = useUserDataContext();

  // useEffect(() => {
  //   // let urlsCollectionUnsubscribe
  //   // let categoriesCollectionUnsubscribe
  //   const userEmail = userDataState.user.email;
  //   // setIsLoading(true);

  //   const categoriesCollectionUnsubscribe =
  //     firestoreServices.subscribeToSubCollectionsUpdates(
  //       userEmail,
  //       CATEGORY_SUB_COLLECTION,
  //       handleSubCollectionsLiveUpdates,
  //       userDataState,
  //       userDataDispatch,
  //       setIsLoading
  //     );
  //   const urlsCollectionUnsubscribe =
  //     firestoreServices.subscribeToSubCollectionsUpdates(
  //       userEmail,
  //       URLS_SUB_COLLECTION,
  //       handleSubCollectionsLiveUpdates,
  //       userDataState,
  //       userDataDispatch
  //     );

  //   // setIsLoading(false);

  //   return () => {
  //     console.log(
  //       "entered clean up fore live updates ////////////////////////"
  //     );
  //     if (categoriesCollectionUnsubscribe) categoriesCollectionUnsubscribe();
  //     if (urlsCollectionUnsubscribe) urlsCollectionUnsubscribe();
  //   };
  // }, [userDataState.user.email]);

  if (isLoading) return <>Loading</>;
  if (error) return <>error: {error.message}</>;

  if (data) {
    console.log("entered render ui", ui_counter);
    ui_counter += 1;
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
