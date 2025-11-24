import Layout from "../components/Layout";

// Login.jsx
const Login = () => {
  return (
    <Layout>
 <div className="auth-container">

      <h1>Login</h1>

      <form className="auth-form">
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Contraseña" name="password" />
        <button type="submit">Iniciar Sesión</button>
      </form>

    </div>
    </Layout>
   
  );
};

export default Login;
