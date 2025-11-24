import Layout from "../components/Layout";

// Register.jsx
const Register = () => {
  return (
    <Layout>
 <div className="auth-container">

      <h1>Registro</h1>

      <form className="auth-form">
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Contraseña" name="password" />
        <button type="submit">Crear Cuenta</button>
      </form>

    </div>
    </Layout>
   
  );
};

export default Register;
