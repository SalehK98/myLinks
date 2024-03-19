import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext";

const withAccessControl = (WrappedComponent) => {
  console.log("i am in access control", WrappedComponent.name);
  const ControlledComponent = (props) => {
    console.log("i am in controlled component", WrappedComponent.name);
    const { loginState } = useLoginContext();
    const { isLogged, isAuthorized } = loginState;

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);

      if (isLogged == false) {
        navigate("/");
        return;
      }

      // Check conditions and navigate accordingly
      if (isAuthorized) {
        navigate("/home");
      } else if (WrappedComponent.name === "NotSubscribedPage") {
        navigate("/not-subscribed");
      }
      setLoading(false);
    }, [isLogged, isAuthorized, WrappedComponent.name, navigate]);

    if (!isLogged && WrappedComponent.name === "LoginPage") {
      return <WrappedComponent {...props} />;
    } else if (!isLogged) {
      return <Navigate to="/" />;
    }

    if (!isAuthorized && WrappedComponent.name === "NotSubscribedPage") {
      return <WrappedComponent {...props} />;
    } else if (!isAuthorized) {
      return <Navigate to="/not-subscribed" />;
    }

    if (
      isAuthorized &&
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
