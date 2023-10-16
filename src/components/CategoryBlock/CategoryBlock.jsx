import styles from "../../styles/CategoryBlock.module.css";
import LinkCard from "../LinkCard/LinkCard";

function CategoryBlock({ categoryTitle, links }) {
  return (
    <div className={styles.categoryBlock}>
      <h2 className={styles.categoryTitle}>{categoryTitle}</h2>
      <div className={styles.linkCardsContainer}>
        {links.length > 0 &&
          links.map((link, index) => <LinkCard key={index} link={link} />)}
      </div>
    </div>
  );
}

export default CategoryBlock;
