import { IconContext } from "react-icons";
import styles from "../../styles/AddLinkButton.module.css";
import { BsPlusCircleFill } from "react-icons/bs";

export default function AddLinkButton({ onOpen, isModalOpen }) {
  return (
    <div
      className={styles.AddLinkContainer}
      onClick={() => {
        console.log("addLinkButton clicked");
        console.log(isModalOpen, "isModalOpen");
        onOpen(true);
      }}
    >
      <IconContext.Provider
        value={{ size: "3rem", color: "#018786", style: { cursor: "pointer" } }}
      >
        <BsPlusCircleFill />
      </IconContext.Provider>
    </div>
  );
}
