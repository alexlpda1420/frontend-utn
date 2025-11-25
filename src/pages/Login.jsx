import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Login.jsx
const Login = () => {
  const { login } = useAuth()
  const navigateUser = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
    navigateUser("/")
  }
  return (
    <Layout>
      <div className="auth-container">

        <h1>Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Contraseña" name="password" />
          <button type="submit" >Iniciar Sesión</button>
        </form>

      </div>
    </Layout>

  );
};

export default Login;
