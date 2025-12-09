import { useState } from "react"
import Layout from "../components/Layout"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { CATEGORIES } from "../constants/categories"
import Swal from "sweetalert2"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  })

  const [imageFile, setImageFile] = useState(null)

  const navigate = useNavigate()
  const { token } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Armamos FormData porque hay (o puede haber) archivo
    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("price", formData.price)   // el backend hace Number()
    formDataToSend.append("stock", formData.stock)
    formDataToSend.append("category", formData.category)

    if (imageFile) {
      formDataToSend.append("image", imageFile)
    }

    try {
      const response = await fetch(
        "https://backend-utn-1gp5.onrender.com/products",
        {
          method: "POST",
          headers: {
            // NO poner Content-Type, el navegador lo arma solo para multipart
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      )

      const responseData = await response.json().catch(() => ({}))

      if (!response.ok || responseData.success === false) {
        console.log("Error backend:", responseData)
        Swal.fire({
          icon: "error",
          title: "Error al cargar el producto",
          text: responseData.error || "Revisá los datos ingresados.",
        })
        return
      }

      await Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto se creó correctamente.",
        timer: 1500,
        showConfirmButton: false,
      })

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      })
      setImageFile(null)
      navigate("/")
    } catch (error) {
      console.error("Error al crear producto:", error)
      alert("❌ Error al cargar el producto")
    }
  }

  return (
    <Layout>
      <div className="home-container">
        {/* BANNER */}
        <section className="banner">
          <h1>Agregar Nuevo Producto</h1>
        </section>

        {/* FORMULARIO */}
        <section className="form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              minLength={4}
              required
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="text"
              placeholder="Descripción"
              name="description"
              minLength={10}
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="number"
              placeholder="Precio"
              name="price"
              min={0}
              required
              onChange={handleChange}
              value={formData.price}
            />
            <input
              type="number"
              placeholder="Stock"
              name="stock"
              min={0}
              required
              onChange={handleChange}
              value={formData.stock}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.value}>
                  {category.content}
                </option>
              ))}
            </select>


            {/* input para imagen */}
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
            />

            <button type="submit">Agregar Producto</button>
          </form>
        </section>

      </div>
    </Layout>
  )
}

export default AddProduct
