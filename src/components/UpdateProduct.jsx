import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import Swal from "sweetalert2"


const UpdateProduct = ({ product, onClose, onUpdate }) => {
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
    category: product.category
  })

  const { token } = useAuth()

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataToUpdate = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    }
    try {
      setLoader(true)
      const response = await fetch(`https://backend-utn-1gp5.onrender.com/products/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToUpdate)

      })
      const responseData = await response.json().catch(() => ({}))

      if (!response.ok || responseData.success === false) {
        console.error("Error backend al actualizar:", responseData)
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: responseData.error || "No se pudo actualizar el producto."
        })
        return
      }

      // refresca lista en Home
      onUpdate()

      await Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: "Los cambios se guardaron correctamente.",
        timer: 1500,
        showConfirmButton: false
      })

      // cierra modal
      onClose()

    } catch (error) {
      console.error("Error al actualizar producto:", error)
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor."
      })
    } finally {
      setLoader(false)
    }
  }

  return <section className="modal-overlay">
    <div className="modal-box">
      <h2>Editar producto</h2>
      <form className="form-container contact-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Nombre del producto" value={formData.name} onChange={handleChange} />
        <input name="description" type="text" placeholder="Descripcion del producto" value={formData.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Precio del producto" value={formData.price} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock del producto" value={formData.stock} onChange={handleChange} />
        <input name="category" type="text" placeholder="Categoría del producto" value={formData.category} onChange={handleChange} />

        <button type="submit">{loader ? "Enviando..." : "Enviar"}</button>
      </form>
      <button className="close-btn" type="button" onClick={onClose}>Cancelar</button>
    </div>
  </section>
}

export default UpdateProduct