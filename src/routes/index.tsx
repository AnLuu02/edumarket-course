import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import CoursePage from "../pages/CoursePage";
import FavoritesPage from "../pages/FavoritesPage";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "courses", element: <CoursePage /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
