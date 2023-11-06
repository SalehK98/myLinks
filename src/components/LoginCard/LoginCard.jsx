import styles from "../../styles/LoginCard.module.css";
import googleIcon from "../../assets/icons/google_colored.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import firestoreServices from "../../services/firestoreServices";

export default function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user.email;

      const [userExists, _] = await firestoreServices.checkUserExists(
        userEmail
      );
      const userIsPaid =
        userExists && (await firestoreServices.checkIfUserPaid(userEmail));

      if (userExists && userIsPaid) {
        console.log(result);
        navigator("/home");
      } else {
        navigator("/not-subscribed");
      }
    } catch (error) {
      // Handle sign-in errors
      console.error("Error signing in with Google:", error);
      // Additional error handling logic can be added here
      // For example, check the error code to handle specific error cases
      const errorCode = error.code;
      if (errorCode === "auth/cancelled-popup-request") {
        // Handle user cancelling the sign-in
        navigator("/");
      } else if (errorCode === "auth/popup-closed-by-user") {
        // Handle other errors
        console.error(error.code, error.message);
        navigator("/");
      } else {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("error", credential, error.message, error.code);
        console.error("sth went wrong login card", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginCardContainer}>
      <p className={styles.welcomeText}>Welcome to MyLinks</p>
      <p className={styles.mustLoginText}>
        You must login with you google account to continue
      </p>
      <button
        className={styles.googleLoginButton}
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <img src={googleIcon} className={styles.googleIcon} alt="Google Icon" />
        <span>Log in with Google</span>
      </button>
      <div className={styles.termsContainer}>
        <p className={styles.termsText}>
          By logging in, you agree to our <a href="#">Terms of Service</a> and
          &nbsp;<a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
