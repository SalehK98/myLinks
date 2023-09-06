import styles from "../../styles/CategoryBlock.module.css"; // Assuming you have a LinkCard module CSS
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
