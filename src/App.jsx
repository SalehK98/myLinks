import "./App.css";
import LinkEditorModalForm from "./components/LinkEditorModalForm/LinkEditorModalForm";
import Playground from "./components/Playground";
import HomePage from "./views/Home/HomePage";
import LoginPage from "./views/Login/LoginPage";
import NotSubscribedPage from "./views/NotSubscribed/NotSubscribedPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserDataProvider } from "./contexts/userDataContext";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <>Error...</>,
    },
    {
      path: "/home",
      element: (
        <UserDataProvider>
          <ModalProvider>
            <HomePage />
          </ModalProvider>
        </UserDataProvider>
      ),
      errorElement: <>Error...</>,
    },
    {
      path: "/not-subscribed",
      element: <NotSubscribedPage />,
      errorElement: <>Error...</>,
    },
    {
      path: "/modal",
      element: <LinkEditorModalForm />,
      errorElement: <>Error...</>,
    },
    {
      path: "/firebase",
      element: <Playground />,
      errorElement: <>Error...</>,
    },
    { errorElement: <>Error...</> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
