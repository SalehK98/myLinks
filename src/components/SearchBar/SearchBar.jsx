import { useState, useRef } from "react";
import styles from "../../styles/SearchBar.module.css";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { useUserDataContext } from "../../contexts/userDataContext";
import { useSearchContext } from "../../contexts/SearchContext";
import * as ActionTypes from "../../contexts/actionTypes";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchDispatch } = useSearchContext();

  const { userDataState, userDataDispatch } = useUserDataContext();
  const categoriesWithLinks = userDataState.categoriesWithLinks;
  const prevActiveCategory = userDataState.prevActiveCategory;
  console.log("here", userDataState.activeCategory, prevActiveCategory);

  const performSearch = (searchTerm) => {
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
    console.log("here2", userDataState.activeCategory, prevActiveCategory);

    const results = {};

    // Iterate through categoriesWithLinks and create categories in the result object only if there are matching links
    Object.keys(categoriesWithLinks).forEach((categoryKey) => {
      const category = categoriesWithLinks[categoryKey];

      // Use Array.filter to get only the links that match the search term
      const matchingLinks = Object.values(category.urls).filter(
        (link) =>
          link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.url.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Only create a category in the result object if there are matching links
      if (matchingLinks.length > 0) {
        results[category.id] = {
          id: category.id,
          urls: matchingLinks,
        };
      }
    });

    searchDispatch({
      type: ActionTypes.SET_SEARCH_RESULT,
      payload: results,
    });
  };

  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    performSearch(newSearchTerm);
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
