import "./App.css";
import LinkEditorModalForm from "./components/LinkEditorModalForm/LinkEditorModalForm";
// import FirestoreDataComponent from "./components/playground";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import NotSubscribedPage from "./pages/NotSubscribed/NotSubscribedPage";
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
    // {
    //   path: "/firebase",
    //   element: (
    //     <UserDataProvider>
    //       <FirestoreDataComponent />
    //     </UserDataProvider>
    //   ),
    //   errorElement: <>Error...</>,
    // },
    { errorElement: <>Error...</> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
