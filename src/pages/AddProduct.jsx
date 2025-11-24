import Layout from "../components/Layout";

// AddProduct.jsx
const AddProduct = () => {
  return (
    <Layout>
<div className="add-container">

      {/* BANNER */}
      <section className="banner">
        <h1>Agregar Nuevo Producto</h1>
      </section>

      {/* FORMULARIO */}
      <section className="form-section">
        <form className="product-form">

          <input type="text" placeholder="Nombre" name="name" />
          <input type="text" placeholder="Descripción" name="description" />
          <input type="number" placeholder="Precio" name="price" />
          <input type="number" placeholder="Stock" name="stock" />
          <input type="text" placeholder="Categoría" name="category" />

          <button type="submit">Agregar Producto</button>
        </form>
      </section>

    </div>
    </Layout>
    
  );
};

export default AddProduct;
