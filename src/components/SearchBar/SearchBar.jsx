import styles from "../../styles/SearchBar.module.css";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
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
        type="text"
        placeholder={" Search by name or url"}
        className={styles.searchInput}
      />
    </div>
  );
}
