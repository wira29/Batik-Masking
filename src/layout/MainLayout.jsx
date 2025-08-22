import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";

export default function MainLayout() {
  return (
    <div className="w-full h-screen bg-black overflow-x-hidden lg:px-32 md:px-10 sm:px-5">
      <Header />
       <LoadingScreen />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
