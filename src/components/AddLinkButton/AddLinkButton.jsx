import { IconContext } from "react-icons";
import styles from "../../styles/AddLinkButton.module.css";
import { BsPlusCircleFill } from "react-icons/bs";

export default function AddLinkButton() {
  return (
    <div className={styles.AddLinkWrapper}>
      <div className={styles.AddLinkContainer}>
        <IconContext.Provider value={{ size: "4rem", color: "#018786" }}>
          <BsPlusCircleFill />
        </IconContext.Provider>
      </div>
    </div>
  );
}
