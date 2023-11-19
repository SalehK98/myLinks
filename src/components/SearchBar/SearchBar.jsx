import { useState } from "react";
import styles from "../../styles/SearchBar.module.css";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { useUserDataContext } from "../../contexts/userDataContext";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});

  console.log("here ", searchTerm, searchResults);
  const { userDataState } = useUserDataContext();
  const categoriesWithLinks = userDataState.categoriesWithLinks;

  const performSearch = (searchTerm) => {
    const results = {};

    for (const categoryKey in categoriesWithLinks) {
      const category = categoriesWithLinks[categoryKey];
      results[category.id] = {
        id: category.id,
        links: [],
      };

      for (const linkKey in category.urls) {
        const link = category.urls[linkKey];
        if (
          link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.url.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results[category.id].links.push(link);
        }
      }
    }

    setSearchResults(results);
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
