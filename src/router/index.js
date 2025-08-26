import Home from "../pages/home";
import LandingPage from "../pages/LandingPage/LandingPage";
import LandingPageV2 from "../pages/LandingPage/LandingPageV2";
import { createBrowserRouter } from "react-router-dom";
import MotifPage from "../pages/MotifPage";
import BlogPage from "../pages/BlogPage";
import { GalleryPage } from "../pages/GalleryPage";

import MainLayout from "../layout/MainLayout";
import { Index } from "../pages/tutorial";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPageV2 />,
      },
      {
        path: "/landing-page-v1",
        element: <LandingPage />,
      },
      {
        path: "/motif",
        element: <MotifPage />,
      },
      {
        path: "/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },
    ],
  },
  {
    path: "/model-3d",
    element: <Home />,
  },
  {
    path: "/tutorial",
    element: <Index />,
  },
  {
    path: "*",
    element: <div className="container">404 | Page not found</div>,
  },
]);
