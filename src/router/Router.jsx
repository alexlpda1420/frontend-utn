// RouterApp.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import AboutUs from "../pages/AboutUs";
import AddProduct from "../pages/AddProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Contact from "../pages/Contact";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
        <Route
          path="/agregar-producto"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>}
        />
        <Route path="/contacto" element={<Contact/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/carrito" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export { RouterApp }