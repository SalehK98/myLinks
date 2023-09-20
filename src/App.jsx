import "./App.css";
import LinkModal from "./components/LinkEditorModal/LinkEditorModal";
// import LinkEditorModal from "./components/LinkEditorModal/LinkEditorModal";
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
