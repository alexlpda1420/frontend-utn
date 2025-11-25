import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(true)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchingProducts = async () => {
    try {
      const response = await fetch("https://backend-utn-1gp5.onrender.com/products");
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

  const deleteProduct = async(idProduct) => {

    if (!confirm("Estas seguro de que quieres borrar el producto")) {
      return
    }
try {
  
  const resposnse = await fetch(`https://backend-utn-1gp5.onrender.com/products/${idProduct}`, {
    method: "DELETE"
  })

  const dataResponse = await resposnse.json()

setProducts(products.filter((p) => p._id !== idProduct))

  alert(`${dataResponse.data.name} borrado con exito`)
} catch (error) {
  console.log("Error al borrar el producto")
}
  }
  useEffect(() => {
    fetchingProducts();
  }, []);

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

        {/* GRID DE PRODUCTOS */}
        <section className="product-grid">
          <h2>Listado de Productos</h2>

          {/* ESTADOS */}
          {loading && <p>Cargando productos...</p>}
          {error && <p>Error al cargar los productos.</p>}

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
                  {user && <button onClick={() => deleteProduct(product._id)}>Borrar</button>}
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
