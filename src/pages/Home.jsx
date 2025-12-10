import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UpdateProduct from "../components/UpdateProduct";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../constants/categories.js";
import { ToastMessage } from "../components/ToastMessage.jsx";
import Swal from "sweetalert2";
import ShopLinkLogo from "../assets/images/ShopLink-Logo.png"; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    stock: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  const fetchingProducts = async (query = "") => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://backend-utn-1gp5.onrender.com/products?${query}`
      );
      const dataProducts = await response.json();

      if (!response.ok || dataProducts.success === false) {
        throw new Error("Error al traer los productos");
      }

      setProducts(dataProducts.data.reverse());
    } catch (error) {
      console.log(error);
      setError("Error al traer los productos");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los productos."
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (idProduct) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `https://backend-utn-1gp5.onrender.com/products/${idProduct}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const dataResponse = await response.json();

      if (!response.ok || dataResponse.success === false) {
        Swal.fire({
          icon: "error",
          title: "Error al borrar",
          text: dataResponse.error || "No se pudo borrar el producto."
        });
        return;
      }

      setProducts((prev) => prev.filter((p) => p._id !== idProduct));

      await Swal.fire({
        icon: "success",
        title: "Producto borrado",
        text: dataResponse.message || "El producto se eliminó correctamente.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error(error);
      setError("Error al borrar el producto");
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor."
      });
    }
  };

  useEffect(() => {
    fetchingProducts();
  }, []);

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (filters.name.trim() !== "") query.append("name", filters.name.trim());
    if (filters.stock !== "") query.append("stock", Number(filters.stock));
    if (filters.category !== "") query.append("category", filters.category);
    if (filters.minPrice !== "")
      query.append("minPrice", Number(filters.minPrice));
    if (filters.maxPrice !== "")
      query.append("maxPrice", Number(filters.maxPrice));

    fetchingProducts(query.toString());
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      stock: "",
      category: "",
      minPrice: "",
      maxPrice: ""
    });
    fetchingProducts();
  };

  return (
    <Layout>
      <div className="home-container">
        {/* HERO con logo de ShopLink */}
        <section className="banner hero">
          <div className="hero-content hero-centered">
            <img
              src={ShopLinkLogo}
              alt="Logo de ShopLink"
              className="hero-logo"
            />
            <p className="hero-description">
              La forma más simple y tecnológica de conectar tus productos con las
              personas correctas. Gestioná tu catálogo, filtrá en tiempo real y
              mantené tu inventario siempre bajo control.
            </p>

            {user && (
              <p className="hero-user">
                Hola <strong>{user.id}</strong>, este es tu panel para administrar
                todo lo que ofrece ShopLink.
              </p>
            )}
          </div>
        </section>


        {/* TEXTO DESCRIPTIVO */}
        <section className="intro">
          <p>
            En ShopLink encontrarás un catálogo pensado para crecer: productos
            organizados por categoría, filtros por precio y stock, y herramientas
            para que la experiencia sea ágil tanto para quien compra como para
            quien administra. Explorá, probá los filtros y dejá que la
            plataforma trabaje por vos.
          </p>
        </section>

        {/* FILTROS */}
        <section>
          <form className="filters-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Buscar por nombre"
              onChange={handleChange}
              value={filters.name}
            />
            <input
              type="number"
              name="stock"
              placeholder="Ingrese el stock"
              onChange={handleChange}
              value={filters.stock}
            />
            <select
              name="category"
              onChange={handleChange}
              value={filters.category}
            >
              <option value="">Todas las categorías</option>
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.value}>
                  {category.content}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="minPrice"
              placeholder="Precio mínimo"
              onChange={handleChange}
              value={filters.minPrice}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Precio máximo"
              onChange={handleChange}
              value={filters.maxPrice}
            />
            <button type="submit">Aplicar filtros</button>
            <button type="button" onClick={handleResetFilters}>
              Cancelar
            </button>
          </form>
        </section>

        {/* GRID DE PRODUCTOS */}
        <section className="product-grid">
          <h2>Listado de Productos</h2>

          {loading && <p>Cargando productos...</p>}
          {error && <p>Error al cargar los productos</p>}

          {selectedProduct && (
            <UpdateProduct
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onUpdate={fetchingProducts}
            />
          )}

          <div className="grid">
            {!loading &&
              !error &&
              products.map((product) => {
                const hasImage =
                  product.image &&
                  typeof product.image === "string" &&
                  product.image.startsWith("uploads/");

                return (
                  <div key={product._id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>
                      <strong>Descripción:</strong> {product.description}
                    </p>
                    <p>
                      <strong>Precio:</strong> ${product.price}
                    </p>
                    <p>
                      <strong>Stock:</strong> {product.stock}
                    </p>
                    <p>
                      <strong>Categoría:</strong> {product.category}
                    </p>

                    {hasImage && (
                      <img
                        className="product-image"
                        src={`https://backend-utn-1gp5.onrender.com/${product.image}`}
                        alt={product.name}
                      />
                    )}

                    {user && (
                      <div className="cont-btn">
                        <button onClick={() => handleUpdateProduct(product)}>
                          Actualizar
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                        >
                          Borrar
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

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
