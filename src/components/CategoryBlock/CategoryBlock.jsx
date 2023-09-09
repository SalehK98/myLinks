import styles from "../../styles/CategoryBlock.module.css";
import LinkCard from "../LinkCard/LinkCard";

function CategoryBlock({ categoryTitle, links }) {
  return (
    <div className={styles.categoryBlock}>
      <h2 className={styles.categoryTitle}>Category One</h2>
      <div className={styles.linkCardsContainer}>
        {/* {links.map((link, index) => (
          <LinkCard key={index} {...link} />
        ))} */}
        <LinkCard />
        <LinkCard />
        <LinkCard />
        <LinkCard />
      </div>
    </div>
  );
}

export default CategoryBlock;
