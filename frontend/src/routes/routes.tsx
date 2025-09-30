import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Teste from "../pages/teste";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<Teste />} />
    </Routes>
    );
};

export default AppRoutes;