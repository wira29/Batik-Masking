import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="w-full h-screen bg-black overflow-x-hidden">
      <LoadingScreen />
      <AdminHeader />
      <main className="lg:px-32 md:px-10 sm:px-5">
        <Outlet />
      </main>
    </div>
  );
}
