import { IconContext } from "react-icons";
import styles from "../../styles/AddLinkButton.module.css";
import { BsPlusCircleFill } from "react-icons/bs";

export default function AddLinkButton() {
  return (
    <div className={styles.AddLinkContainer}>
      <IconContext.Provider
        value={{ size: "3rem", color: "#018786", style: { cursor: "pointer" } }}
      >
        <BsPlusCircleFill />
      </IconContext.Provider>
    </div>
  );
}
