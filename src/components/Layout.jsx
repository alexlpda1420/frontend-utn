// Layout.jsx
import { Children, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigateUser = useNavigate()
  const handleLogout = () => {
    logout()
    navigateUser("./login")
  }

  return (
    <>
      <header>
        <nav >
          <Link to="/">Nuestros Productos</Link>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          {
            !user ?
              <>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
              </>
              :
              <>
                <Link to="/agregar-producto">Agregar Producto</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>

          }

        </nav>
      </header>
      <main >
        {children}
      </main>
      <footer>
        <p>Sitio desarrollado por UTN</p>
      </footer>
    </>
  );
};

export default Layout;
