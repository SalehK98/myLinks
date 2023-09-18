import styles from "../../styles/SideMenu.module.css";
import CategoriesBox from "../CategoriesBox/CategoriesBox";
import Footer from "../Footer/Footer";
import MemberCard from "../MemberCard/MemberCard";

export default function SideMenu() {
  return (
    <div className={styles.sidePanel}>
      <div className={styles.MemberCardWrapper}>
        <MemberCard />
      </div>
      <div className={styles.CategoriesBoxWrapper}>
        <CategoriesBox />
      </div>
      <div className={styles.FooterWrapper}>
        <Footer />
      </div>
    </div>
  );
}
