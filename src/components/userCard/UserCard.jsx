import React from "react";
import userImg from "../../assets/download.png";
import styles from "../../styles/UserCard.module.css";

export default function UserCard() {
  return (
    <div className={styles.userCard}>
      <div className={styles.userImage}>
        <img src={userImg} alt="imageOfUser" />
      </div>
      <div className={styles.userInfo}>
        <h2>John Doe</h2>
        <p>JohnDoes@gmail.com</p>
      </div>
    </div>
  );
}
