import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ShopLinkLogo from "../assets/images/ShopLink-Logo.png"

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header>
      <nav>
        {/* Marca: logo + nombre */}
        <Link to="/" className="navbar-brand">
          <img
            src={ShopLinkLogo}
            alt="Logo ShopLink"
            className="navbar-logo"
          />
          <span className="navbar-title">ShopLink</span>
        </Link>

        {/* Links de navegación */}
        <div className="nav-links">
          <Link to="/">Nuestros Productos</Link>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
          <Link to="/contacto">Contacto</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registro</Link>
            </>
          ) : (
            <>
              <Link to="/agregar-producto">Agregar Producto</Link>
              <Link to="/perfil">Mi Perfil</Link>
              <Link to="/carrito">Mi Carrito</Link>
              <button type="button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
