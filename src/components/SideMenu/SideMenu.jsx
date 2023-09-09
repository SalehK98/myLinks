import styles from "../../styles/SideMenu.module.css";
import CategoriesBox from "../CategoriesBox/CategoriesBox";
import MemberCard from "../MemberCard/MemberCard";

export default function SideMenu() {
  return (
    <div className={styles.sidePanel}>
      <MemberCard />
      <CategoriesBox />
      <div style={{ color: "#fff" }}>
        <span>
          <b>MyLinks</b> <i>Web app v1.00</i>
        </span>
        <h3></h3>
        <span>&copy; All copyrights reserved</span>
      </div>
    </div>
  );
}
