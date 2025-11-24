import Layout from "../components/Layout"

// Home.jsx
const Home = () => {
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
        <div className="grid">
          {/* Productos de prueba estáticos */}
          <div className="product-card">
            <h3>Producto de Ejemplo 1</h3>
            <p>Descripción: Texto de prueba.</p>
            <p>Precio: $100</p>
            <p>Stock: 20</p>
            <p>Categoría: General</p>
          </div>

          <div className="product-card">
            <h3>Producto de Ejemplo 2</h3>
            <p>Descripción: Texto de prueba.</p>
            <p>Precio: $250</p>
            <p>Stock: 5</p>
            <p>Categoría: Hogar</p>
          </div>

          <div className="product-card">
            <h3>Producto de Ejemplo 3</h3>
            <p>Descripción: Texto de prueba.</p>
            <p>Precio: $80</p>
            <p>Stock: 12</p>
            <p>Categoría: Electrónica</p>
          </div>
        </div>
      </section>
    </div>
    </Layout>
   
  );
};

export default Home;
