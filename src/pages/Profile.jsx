import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import ShopLinkLogo from "../assets/images/ShopLink-Logo.png"

const Profile = () => {
  const { user } = useAuth()

  // Lo que realmente tenés en el contexto hoy: email
  const email = user?.email || "usuario@shoplink.com"
  const username = email.split("@")[0]
  const initial = username.charAt(0).toUpperCase()

  return (
    <Layout>
      <section className="profile">
        {/* Encabezado con logo */}
        <div className="profile-header">
          <div className="profile-logo">
            <img src={ShopLinkLogo} alt="Logo ShopLink" />
          </div>

          <div className="profile-title">
            <h1>Mi Perfil</h1>
            <p>
              Este es tu espacio dentro de ShopLink. Acá ves tus datos como usuario
              del sistema y el rol que cumplís en el proyecto para gestionar el
              catálogo de productos.
            </p>
          </div>
        </div>

        <div className="profile-content">
          {/* Tarjeta principal */}
          <div className="profile-main-card">
            <div className="profile-avatar">
              <span>{initial}</span>
            </div>

            <div className="profile-main-info">
              <h2>{username}</h2>
              <p className="profile-email">{email}</p>
              <span className="profile-badge">Administrador de productos</span>
            </div>
          </div>

          {/* Grid de info */}
          <div className="profile-grid">
            <article className="profile-info-card">
              <h3>Datos de la cuenta</h3>
              <ul>
                <li>
                  <span>Correo:</span>
                  <span>{email}</span>
                </li>
                <li>
                  <span>Usuario:</span>
                  <span>{username}</span>
                </li>
                <li>
                  <span>Rol:</span>
                  <span>Usuario de ShopLink</span>
                </li>
                <li>
                  <span>Estado:</span>
                  <span className="status-active">Activo</span>
                </li>
              </ul>
            </article>

            <article className="profile-info-card">
              <h3>Uso dentro del proyecto</h3>
              <p>
                Este usuario se utiliza para probar el flujo completo de la API REST:
                registro, login con JWT, acceso a rutas protegidas y operaciones CRUD
                sobre el catálogo de productos desde el frontend.
              </p>
              <p className="profile-note">
                Podés crear productos de prueba, actualizarlos y eliminarlos para
                demostrar todas las operaciones del trabajo práctico.
              </p>
            </article>

            <article className="profile-info-card">
              <h3>Stack técnico asociado</h3>
              <ul>
                <li>Autenticación con JWT y contraseñas hasheadas con bcrypt.</li>
                <li>Estado de sesión manejado con Context API en React.</li>
                <li>Rutas protegidas en el frontend según si el usuario está logueado.</li>
                <li>SweetAlert2 para feedback de inicio de sesión y acciones clave.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Profile
