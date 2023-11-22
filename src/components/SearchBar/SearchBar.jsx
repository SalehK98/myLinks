import styles from "../../styles/SearchBar.module.css";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { useUserDataContext } from "../../contexts/userDataContext";
import { useSearchContext } from "../../contexts/SearchContext";
import * as ActionTypes from "../../contexts/actionTypes";
import preformLinkSearch from "../../helpers/preformSearch";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchDispatch } = useSearchContext();

  const { userDataState, userDataDispatch } = useUserDataContext();
  const categoriesWithLinks = userDataState.categoriesWithLinks;
  const prevActiveCategory = userDataState.prevActiveCategory;

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      userDataDispatch({
        type: ActionTypes.SET_ACTIVE_CATEGORY,
        payload: prevActiveCategory,
      });
      return;
    }
    userDataDispatch({
      type: ActionTypes.SET_ACTIVE_CATEGORY,
      payload: "search",
    });

    const results = preformLinkSearch(
      categoriesWithLinks,
      searchTerm,
      prevActiveCategory
    );

    searchDispatch({
      type: ActionTypes.SET_SEARCH_RESULT,
      payload: results,
    });
  };

  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm);
  };

  return (
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
        type="search"
        placeholder={" Search by name or url"}
        className={styles.searchInput}
        // size="15"
        // spellCheck
        // autoCorrect="on"
        onChange={handleSearchTermChange}
        value={searchTerm}
      />
    </div>
  );
}
