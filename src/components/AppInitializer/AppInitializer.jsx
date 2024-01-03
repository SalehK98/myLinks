import { useEffect } from "react";
import { useLoginContext } from "../../contexts/LoginContext";
import firestoreServices from "../../services/firestoreServices";
import { useUserDataContext } from "../../contexts/userDataContext";
import { isValidPaymentDate } from "../../services/utilityServices";
import * as ActionTypes from "../../contexts/actionTypes";

export default function AppInitializer() {
  const { loginState, loginDispatch } = useLoginContext();
  const { userDataState } = useUserDataContext();
  const { isLogged, isPaid } = loginState;

  const handleSubscription = (isSubscribed, paymentDate) => {
    const isValidDate = isValidPaymentDate(paymentDate);
    // console.log("is valid date", isValidDate);
    if (isSubscribed && isValidDate) {
      loginDispatch({ type: ActionTypes.SET_IS_PAID, payload: true });
    } else if (!isSubscribed || !isValidDate) {
      loginDispatch({ type: ActionTypes.SET_IS_PAID, payload: false });
    }
  };

  useEffect(() => {
    let userUnsubscribe; // Declare the variable outside the conditions
    // console.log("isPaid in appInit", isPaid);

    if (isLogged) {
      const userEmail = userDataState.user.email;
      // Subscribe to user updates
      userUnsubscribe = firestoreServices.subscribeToUserDocumentUpdates(
        userEmail,
        handleSubscription
      );
    }

    return () => {
      if (userUnsubscribe) userUnsubscribe();
    };
  }, [isLogged]);

  return null; // This component doesn't render anything
}
