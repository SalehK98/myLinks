import styles from "../../styles/SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.SearchBarWrapper}>
      <div className={styles.searchContainer}>
        {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
        {/* <i class="fa-solid fa-magnifying-glass" style="color: #85878a;"></i> */}
        <input
          type="text"
          placeholder={" Search by name, url or category"}
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          {/* Font Awesome search icon */}
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}
