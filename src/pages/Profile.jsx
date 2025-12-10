
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  // Por si alguien entra a /perfil sin estar logueado
  if (!user) {
    return (
      <Layout>
        <div className="profile-container">
          <div className="profile-card">
            <h1>Mi perfil</h1>
            <p>No hay sesión activa.</p>
            <p>Iniciá sesión para ver tu perfil.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const email = user.email || "";
  const username = email ? email.split("@")[0] : "usuario";

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-card">
          <h1>Mi Perfil</h1>

          <p>
            <span className="profile-label">Usuario:</span> {username}
          </p>
          <p>
            <span className="profile-label">Email:</span> {email}
          </p>

          {/* Si más adelante guardás más datos en el contexto, los agregás acá */}
          <p>
            <span className="profile-label">Rol:</span> Usuario de ShopLink
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
