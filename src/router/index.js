import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import GalleryDashboard from "../pages/admin/galery";
import MotifBatik from "../pages/admin/motif/Index";
import BlogPage from "../pages/LandingPage/Blogs/BlogPage";
import { GalleryPage } from "../pages/LandingPage/Gallery/GalleryPage";
import Index from "../pages/LandingPage/Index";
import Home from "../pages/LandingPage/Model_3D";
import MotifPage from "../pages/LandingPage/Motif/MotifPage";

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
      {
        path: "gallery",
        element: <GalleryDashboard />,
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
