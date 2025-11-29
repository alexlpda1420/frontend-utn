import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UpdateProduct from "../components/UpdateProduct";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../constants/categories.js";
import { ToastMessage } from "../components/ToastMessage.jsx";



const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = useAuth()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filters, setFilters] = useState({
    name: "",
    stock: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  })

  const fetchingProducts = async (query = "") => {
    setError(null)
    try {

      const response = await fetch(`https://backend-utn-1gp5.onrender.com/products?${query}`);
      const dataProducts = await response.json();

      if (!response.ok) {
        throw new Error("Error al traer los productos");
      }

      setProducts(dataProducts.data.reverse());  // tu API devuelve { data: [...] }
    } catch (error) {
      console.log(error);
      setError("Error al traer los productos");
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
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const dataResponse = await response.json()

      if (dataResponse.error) {
        alert(dataResponse.error)
        return
      }

      setProducts(products.filter((p) => p._id !== idProduct))

      alert(`${dataResponse.data.name} borrado con éxito`)
      
    } catch (error) {
      setError("Error al borrar el producto")
    
      // console.log("Error al borrar el producto")
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
    e.preventDefault();

    const query = new URLSearchParams();

    if (filters.name.trim() !== "") query.append("name", filters.name.trim());
    if (filters.stock !== "") query.append("stock", Number(filters.stock));
    if (filters.category !== "") query.append("category", filters.category);
    if (filters.minPrice !== "") query.append("minPrice", Number(filters.minPrice));
    if (filters.maxPrice !== "") query.append("maxPrice", Number(filters.maxPrice));

    fetchingProducts(query.toString());
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      stock: "",
      category: "",
      minPrice: "",
      maxPrice: ""
    })
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
            Bienvenido {user && user.id} En nuestra tienda encontrarás productos seleccionados con cuidado y dedicación.
            Ofrecemos calidad, variedad y un enfoque pensado para brindarte la mejor experiencia.
            Este es solo un texto de ejemplo hasta conectar la API real.
          </p>
        </section>

        <section>
          <form className="filters-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Buscar por nombre" onChange={handleChange} value={filters.name} />
            <input type="number" name="stock" placeholder="Ingrese el stock" onChange={handleChange} value={filters.stock} />
            <select name="category" onChange={handleChange} value={filters.category}>
              <option defaultValue>Todas las categorías</option>
              {
                CATEGORIES.map((category) => <option key={category.id} value={category.value}>{category.content}</option>)
              }
            </select>
            <input type="number" name="minPrice" placeholder="Precio mínimo" onChange={handleChange} value={filters.minPrice} />
            <input type="number" name="maxPrice" placeholder="Precio máximo" onChange={handleChange} value={filters.maxPrice} />
            <button type="submit">Aplicar filtros</button>
            <button type="button" onClick={handleResetFilters}>Cancelar</button>

          </form>
        </section>

        {/* GRID DE PRODUCTOS */}
        <section className="product-grid">
          <h2>Listado de Productos</h2>

          {/* ESTADOS */}
          {loading && <p>Cargando productos...</p>}
          {error && <p>Error al cargar los productos</p>}

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

      {error && <ToastMessage error={error} color={"red"} />}
      
    </Layout>
    
  );
};

export default Home;
