import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

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
        alert(dataResponse.error || "❌ Error al enviar el formulario")
        return
      }

      alert(dataResponse.message || "✅ Formulario enviado con éxito")
      navigate("/")

    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      alert("❌ Error al enviar el formulario")
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
