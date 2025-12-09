
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Cart = () => {
  return (
    <Layout>
      <div className="cart-container">
        <h1 className="cart-title">
          <span role="img" aria-label="carrito" className="cart-icon">
            🛒
          </span>
          Tu carrito de compras
        </h1>

        <div className="cart-card">
          <div className="cart-illustration">
            <p className="cart-coming-title">PRÓXIMAMENTE</p>
            <p className="cart-coming-text">
              Podrás realizar la compra de tus productos desde esta sección.
            </p>
          </div>

          <p className="cart-description">
            Aquí aparecerán los productos que agregues a tu carrito.
          </p>

          <Link to="/" className="cart-back-btn">
            Volver al inicio
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
