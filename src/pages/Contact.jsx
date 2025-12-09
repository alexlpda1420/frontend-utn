import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export default function Contact() {
  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: ""
  });

  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      const dataResponse = await response.json().catch(() => ({}))

      if (!response.ok || dataResponse.success === false) {
        console.error("Error backend contacto:", dataResponse)
        Swal.fire({
          icon: "error",
          title: "Error al enviar",
          text: dataResponse.error || "No se pudo enviar el formulario."
        })
        return
      }

      await Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        text: dataResponse.message || "Formulario enviado con éxito.",
        timer: 1500,
        showConfirmButton: false
      })
      navigate("/")

    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor."
      })
    }
  };

  return (
    <Layout>
      <h1>Contacto</h1>

      <form className="contact-form" onSubmit={handleSubmit}>


        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Asunto</label>
          <input
            type="text"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mensaje</label>
          <textarea
            name="message"
            required
            rows="4"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </Layout>
  );
}
