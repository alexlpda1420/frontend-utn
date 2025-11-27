import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Login.jsx
const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: "",
    password: ""
  })
  const { login } = useAuth()
  const navigateUser = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm)
      })
      const responseData = await response.json()

      if (responseData.error)
      {
        alert(responseData.error)
        return
      }

      login(responseData.token)
      navigateUser("/")
 
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout>
      <div className="auth-container">

        <h1>Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
          <button type="submit" >Iniciar Sesión</button>
        </form>

      </div>
    </Layout>

  );
};

export default Login;
