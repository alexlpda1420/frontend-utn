import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ShopLinkLogo from "../assets/images/ShopLink-Logo.png"

// Icons
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa"

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
    setIsOpen(false)
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <header>
      <nav>
   
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img
            src={ShopLinkLogo}
            alt="Logo ShopLink"
            className="navbar-logo"
          />
          <span className="navbar-title">ShopLink</span>
        </Link>

   
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú de navegación"
        >
          <FaBars />
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
  
          <Link to="/" onClick={closeMenu}>
            <FaHome className="nav-icon" />
            Inicio
          </Link>

          <Link to="/sobre-nosotros" onClick={closeMenu}>
            <FaInfoCircle className="nav-icon" />
            Sobre Nosotros
          </Link>

          <Link to="/contacto" onClick={closeMenu}>
            <FaEnvelope className="nav-icon" />
            Contacto
          </Link>

          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu}>
                <FaSignInAlt className="nav-icon" />
                Login
              </Link>

              <Link to="/registro" onClick={closeMenu}>
                <FaUserPlus className="nav-icon" />
                Registrate
              </Link>
            </>
          ) : (
            <>
              <Link to="/agregar-producto" onClick={closeMenu}>
                <FaShoppingCart className="nav-icon" />
                Agregar Producto
              </Link>

              <Link to="/perfil" onClick={closeMenu}>
                <FaUser className="nav-icon" />
                Mi Perfil
              </Link>

              <Link to="/carrito" onClick={closeMenu}>
                <FaShoppingCart className="nav-icon" />
                Mi Carrito
              </Link>

              <button type="button" onClick={handleLogout}>
                <FaSignOutAlt className="nav-icon" />
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
