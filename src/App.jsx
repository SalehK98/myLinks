import "./App.css";
import LinkEditorModalForm from "./components/LinkEditorModalForm/LinkEditorModalForm";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import NotSubscribedPage from "./pages/NotSubscribed/NotSubscribedPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <>Error...</>,
    },
    {
      path: "/home",
      element: <HomePage />,
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
                                     { errorElement: <>Error...</> },

  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
