import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
      })
      const responseData = await response.json()

      if (!responseData.success) {
        alert(responseData.error)
      }

      alert("✅ Usuario creado con éxito")
      navigate("/login")
    } catch (error) {
      console.log("error al registrar el usuario")
    }
  }

  return (
    <Layout>
      <div className="auth-container">

        <h1>Registro</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
          <button type="submit">Crear Cuenta</button>
        </form>

      </div>
    </Layout>

  );
};

export default Register;
