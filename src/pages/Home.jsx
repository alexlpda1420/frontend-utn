import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UpdateProduct from "../components/UpdateProduct";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../constants/categories.js"



const Home = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filters, setFilters] = useState({
    name: "",
    stock: 0,
    category: "",
    minPrice: 0,
    maxPrice: 0
  })

  const fetchingProducts = async (query = "") => {
    try {
      const response = await fetch(`https://backend-utn-1gp5.onrender.com/products?${query}`);
      const dataProducts = await response.json();

      if (!response.ok) {
        throw new Error("Error al traer los productos");
      }

      setProducts(dataProducts.data.reverse());  // tu API devuelve { data: [...] }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (idProduct) => {

    if (!confirm("Estas seguro de que quieres borrar el producto")) {
      return
    }
    try {

      const response = await fetch(`https://backend-utn-1gp5.onrender.com/products/${idProduct}`, {
        method: "DELETE"
      })

      const dataResponse = await response.json()

      setProducts(products.filter((p) => p._id !== idProduct))

      alert(`${dataResponse.data.name} borrado con éxito`)
    } catch (error) {
      console.log("Error al borrar el producto")
    }
  }
  useEffect(() => {
    fetchingProducts();
  }, []);

  const handleUpdateProduct = (product) => {
    console.log(product, "producto a actualizar")
    setSelectedProduct(product)
  }

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefaults()
    const query = new URLSearchParams()

    if (filter.name) query.append("name", filters.name)
    if (filter.stock) query.append("stock", filters.stock)
    if (filter.category) query.append("category", filters.category)
    if (filter.minPrice) query.append("minPrice", filters.minPrice)
    if (filter.maxPrice) query.append("maxPrice", filters.maxPrice)
    console.log(query.toString())
    fetchingProducts()
  }

  return (
    <Layout>
      <div className="home-container">

        {/* BANNER */}
        <section className="banner">
          <h1>Nuestros Productos</h1>
        </section>

        {/* TEXTO DESCRIPTIVO */}
        <section className="intro">
          <p>
            En nuestra tienda encontrarás productos seleccionados con cuidado y dedicación.
            Ofrecemos calidad, variedad y un enfoque pensado para brindarte la mejor experiencia.
            Este es solo un texto de ejemplo hasta conectar la API real.
          </p>
        </section>

        <section>
          <form className="filters-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Buscar por nombre" onChange={handleChange} />
            <input type="number" name="stock" placeholder="Ingrese el stock" onChange={handleChange} />
            <select name="category" onChange={handleChange}>
              {
                CATEGORIES.map((category) => <option key={category.id} value={category.value}>{category.content}</option>)
              }
            </select>
            <input type="number" name="minPrice" placeholder="Precio mínimo" onChange={handleChange} />
            <input type="number" name="maxPrice" placeholder="Precio máximo" onChange={handleChange} />
            <button type="submit">Aplicar filtros</button>
            <button type="button">Cancelar</button>

          </form>
        </section>

        {/* GRID DE PRODUCTOS */}
        <section className="product-grid">
          <h2>Listado de Productos</h2>

          {/* ESTADOS */}
          {loading && <p>Cargando productos...</p>}
          {error && <p>Error al cargar los productos.</p>}

          {
            selectedProduct &&
            <UpdateProduct
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onUpdate={fetchingProducts}
            />
          }
          <div className="grid">
            {!loading &&
              !error &&
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <h3>{product.name}</h3>
                  <p><strong>Descripción:</strong> {product.description}</p>
                  <p><strong>Precio:</strong> ${product.price}</p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                  <p><strong>Categoría:</strong> {product.category}</p>
                  {
                    user && <div className="cont-btn">
                      <button onClick={() => handleUpdateProduct(product)}>Actualizar</button>
                      <button onClick={() => deleteProduct(product._id)}>Borrar</button>
                    </div>
                  }
                </div>
              ))}

            {/* Si no hay productos */}
            {!loading && products.length === 0 && !error && (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
