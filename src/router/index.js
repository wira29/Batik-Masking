import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import ArtikelDashboard from "../pages/admin/artikel";
import GalleryDashboard from "../pages/admin/galery";
import ModelDashboard from "../pages/admin/model";
import MotifBatik from "../pages/admin/motif/Index";
import BlogPage from "../pages/LandingPage/Blogs/BlogPage";
import { GalleryPage } from "../pages/LandingPage/Gallery/GalleryPage";
import Index from "../pages/LandingPage/Index";
import Home from "../pages/LandingPage/Model_3D";
import MotifPage from "../pages/LandingPage/Motif/MotifPage";
import Tutorial from "../pages/tutorial";

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
        path: "/artikel",
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
      {
        path: "artikel",
        element: <ArtikelDashboard />,
      },
      {
        path: "models",
        element: <ModelDashboard />,
      },
    ],
  },
  {
    path: "/model-3d",
    element: <Home />,
  },
  {
    path: "/tutorial",
    element: <Tutorial />,
  },
  {
    path: "*",
    element: <div className="container">404 | Page not found</div>,
  },
]);
