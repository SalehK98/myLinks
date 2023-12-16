import "./App.css";
// import { lazy, Suspense } from "react";
import LinkEditorModalForm from "./components/LinkEditorModalForm/LinkEditorModalForm";
// import Playground from "./components/Playground";
import HomePage from "./views/Home/HomePage";
import LoginPage from "./views/Login/LoginPage";
import NotSubscribedPage from "./views/NotSubscribed/NotSubscribedPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserDataProvider } from "./contexts/userDataContext";
import { ModalProvider } from "./contexts/ModalContext";
import { useLoginContext } from "./contexts/LoginContext";
import withAccessControl from "./hocs/withAccessControl";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  const { loginState } = useLoginContext();
  const WrappedHomeComponent = withAccessControl(HomePage);
  const WrappedNotSubscribedComponent = withAccessControl(NotSubscribedPage);
  const WrappedLoginComponent = withAccessControl(LoginPage);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WrappedLoginComponent />,
      errorElement: <>Error...sus4</>,
    },
    {
      path: "/home",
      element: (
        // <UserDataProvider>
        <ModalProvider>
          {/* {loginState.isLogged && ( */}
          {/* <Suspense fallback={<>Loading...</>}> */}
          <SearchProvider>
            <WrappedHomeComponent />
          </SearchProvider>
          {/* <HomePage /> */}
          {/* </Suspense> */}
          {/* )} */}
        </ModalProvider>
        // </UserDataProvider>
      ),
      errorElement: <>Error...</>,
    },
    {
      path: "/not-subscribed",
      element: <WrappedNotSubscribedComponent />,
      errorElement: <>Error... sus2</>,
    },
    {
      path: "/modal",
      element: <LinkEditorModalForm />,
      errorElement: <>Error... sus1</>,
    },
    // {
    //   path: "/firebase",
    //   element: <Playground />,
    //   errorElement: <>Error...</>,
    // },
    { errorElement: <>Error... sus</> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
