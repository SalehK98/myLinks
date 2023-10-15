import userImg from "../../assets/download.png";
import styles from "../../styles/MemberCard.module.css";
import { useUserDataContext } from "../../contexts/userDataContext";

export default function MemberCard() {
  const { state } = useUserDataContext();
  const user = state.user;
  return (
    <div className={styles.MemberCard}>
      <div className={styles.userImage}>
        <img src={userImg} alt="imageOfUser" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.truncate}>
          <h2 className={styles.truncate}>John Smith</h2>
          <p className={styles.truncate}>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
