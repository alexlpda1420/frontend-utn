// Layout.jsx
import { Children } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav >
          <Link to="/">Nuestros Productos</Link>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
          <Link to="/agregar-producto">Agregar Producto</Link>
          <Link to="/login">Login</Link>
          <Link to="/registro">Registro</Link>
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
