import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

// Login.jsx
const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: "",
    password: ""
  })
  const { login } = useAuth()
  const navigateUser = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://backend-utn-1gp5.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm)
      })
      const responseData = await response.json().catch(() => ({}))

      if (!response.ok || responseData.success === false) {
         Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: responseData.error || "Revisa tu correo y contraseña."
        })
        return
      }

      login(responseData.token)

      await Swal.fire({
        icon: "success",
        title: "Sesión iniciada",
        text: "Inicio de sesión exitoso.",
        timer: 1500,
        showConfirmButton: false
      })

      navigateUser("/")

    } catch (error) {
      console.log(error)
        Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor."
      })
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

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
          <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} required/>
          <button type="submit" >Iniciar Sesión</button>
        </form>

      </div>
    </Layout>

  );
};

export default Login;
