import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

// Register.jsx
const Register = () => {

  const [formData, setFormData] = useState(
    {
      email: "",
      password: ""
    }
  )

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://backend-utn-1gp5.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const responseData = await response.json().catch(() => ({}))

      if (!response.ok || !responseData.success) {
        Swal.fire({
          icon: "error",
          title: "Error al registrarse",
          text: responseData.error || "No se pudo crear el usuario."
        })
        return
      }

      await Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: "Tu cuenta fue creada con éxito.",
        timer: 1500,
        showConfirmButton: false
      })
      navigate("/login")
    } catch (error) {
      console.log("Error al registrar el usuario:", error)
       Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor."
      })
    }
  }

  return (
    <Layout>
      <div className="auth-container">

        <h1>Registro</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
          <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} required />
          <button type="submit">Crear Cuenta</button>
        </form>

      </div>
    </Layout>

  );
};

export default Register;
