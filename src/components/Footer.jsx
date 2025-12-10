import { Link } from "react-router-dom"
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Enlaces útiles */}
        <div className="footer-column">
          <h5>Enlaces Útiles</h5>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/sobre-nosotros">Sobre Nosotros</Link>
            </li>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/registro">Registrate</Link>
            </li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="footer-column">
          <h5>Redes Sociales</h5>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/alexlpda1420"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/aeroldan7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/alexlpda1420/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/alexis-esteban-roldan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/alexlpda1420"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Contacto */}
        <div className="footer-column">
          <h5>Contacto</h5>
          <p>
            Desarrollado por <strong>Alexis Roldan</strong>. Podés contactarte
            conmigo{" "}
            <a
              href="https://github.com/alexlpda1420"
              target="_blank"
              rel="noopener noreferrer"
            >
              desde aquí
            </a>
            .
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright - Alexis Roldan - 2025</p>
      </div>
    </footer>
  )
}

export default Footer
