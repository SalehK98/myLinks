import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext";
import firestoreServices from "../services/firestoreServices";
import { useUserDataContext } from "../contexts/userDataContext";

const withAccessControl = (WrappedComponent) => {
  const ControlledComponent = (props) => {
    const { loginState } = useLoginContext();
    const { isLogged, isPaid } = loginState;
    const { userDataState } = useUserDataContext();
    const userEmail = userDataState.user.email;

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);
      let userUnsubscribe; // Declare the variable outside the conditions

      if (!isLogged) {
        navigate("/");
      } else {
        // Subscribe to user updates
        userUnsubscribe = firestoreServices.subscribeToUserDocumentUpdates(
          userEmail,
          navigate
        );

        // Check conditions and navigate accordingly
        if (isPaid) {
          navigate("/home");
        } else if (WrappedComponent.name === "NotSubscribedPage") {
          navigate("/not-subscribed");
        }
      }
      setLoading(false);
      // Clean up the subscription when the component unmounts
      return () => {
        if (userUnsubscribe) userUnsubscribe();
      };
    }, [isLogged, isPaid, WrappedComponent.name, navigate]);

    if (!isLogged && WrappedComponent.name === "LoginPage") {
      return <WrappedComponent {...props} />;
    } else if (!isLogged) {
      return <Navigate to="/" />;
    }

    if (!isPaid && WrappedComponent.name === "NotSubscribedPage") {
      return <WrappedComponent {...props} />;
    } else if (!isPaid) {
      return <Navigate to="/not-subscribed" />;
    }

    if (
      isPaid &&
      (WrappedComponent.name === "NotSubscribedPage" ||
        WrappedComponent.name === "LoginPage")
    ) {
      return <Navigate to="/home" />;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ControlledComponent;
};

export default withAccessControl;
