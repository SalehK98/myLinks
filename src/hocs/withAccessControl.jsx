import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext";

const withAccessControl = (WrappedComponent) => {
  const ControlledComponent = (props) => {
    const { loginState } = useLoginContext();
    const { isLogged, isPaid } = loginState;

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);

      if (isLogged == false) {
        navigate("/");
        return;
      }

      // Check conditions and navigate accordingly
      if (isPaid) {
        navigate("/home");
      } else if (WrappedComponent.name === "NotSubscribedPage") {
        navigate("/not-subscribed");
      }
      setLoading(false);
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
