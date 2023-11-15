import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext";

const withAccessControl = (WrappedComponent) => {
  const ControlledComponent = (props) => {
    const { loginState } = useLoginContext();
    const { isLogged, isPaid } = loginState;
    console.log("here", isLogged, isPaid);

    const navigate = useNavigate();

    useEffect(() => {
      if (!isLogged) navigate("/");
      if (isLogged && !isPaid && WrappedComponent.name === "NotSubscribedPage")
        navigate("/not-subscribed");
      if (isLogged && !isPaid) navigate("/not-subscribed");
      if (isLogged && isPaid && WrappedComponent.name === "NotSubscribedPage")
        navigate("/home");
    }, [isLogged, isPaid, WrappedComponent.name, navigate]);

    if (!isLogged) return <Navigate to="/" />;
    if (isLogged && !isPaid && WrappedComponent.name === "NotSubscribedPage")
      return <WrappedComponent {...props} />;

    if (isLogged && !isPaid) return <Navigate to="/not-subscribed" />;
    if (isLogged && isPaid && WrappedComponent.name === "NotSubscribedPage")
      return <Navigate to="/home" />;

    return <WrappedComponent {...props} />;
  };

  return ControlledComponent;
};

export default withAccessControl;
