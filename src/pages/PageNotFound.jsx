
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>
          La ruta que intentaste visitar no existe o ya no está disponible.
        </p>

        <Link to="/" className="not-found-link">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
