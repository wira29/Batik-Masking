import { Route, Routes } from "react-router"
import Home from "../pages/home"
import LandingPage  from "../pages/LandingPage/LandingPage"
import LandingPageV2 from "../pages/LandingPage/LandingPageV2"

export default function AppRoutes()
{
    return <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/landing-page-v1" element={<LandingPage/>} />
        <Route path="/" element={<LandingPageV2/>} />
    </Routes>
}
