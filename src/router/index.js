import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Index from "../pages/LandingPage/Index";
import MotifPage from "../pages/LandingPage/Motif/MotifPage";
import { GalleryPage } from "../pages/LandingPage/Gallery/GalleryPage";
import BlogPage from "../pages/LandingPage/Blogs/BlogPage";
import MotifBatik from "../pages/admin/motif/Index";
import Home from "../pages/LandingPage/Model_3D";
import AdminLayout from "../layout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Index />,
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
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "motif-batik",
        element: <MotifBatik />,
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
