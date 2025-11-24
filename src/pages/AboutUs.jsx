import Layout from "../components/Layout";

// AboutUs.jsx
const AboutUs = () => {
  return (
    <Layout>
    <div className="about-container">

      <section className="about-header">
        <h1>Sobre Nosotros</h1>
        <p>
          Somos una compañía dedicada a ofrecer productos de calidad y una experiencia de compra simple,
          clara y accesible para todos los usuarios.
        </p>
      </section>

      <section className="about-content">
        <h2>Nuestra Misión</h2>
        <p>
          Brindar productos confiables y accesibles, siempre priorizando la satisfacción del cliente.
        </p>

        <h2>Nuestros Valores</h2>
        <ul>
          <li>Compromiso</li>
          <li>Transparencia</li>
          <li>Innovación</li>
          <li>Calidad</li>
        </ul>

        <h2>Nuestro Equipo</h2>
        <p>
          Contamos con un equipo apasionado, enfocado en mejorar día a día. Este texto es provisional
          hasta agregar contenido real.
        </p>
      </section>

    </div>
      
    </Layout>

  );
};

export default AboutUs;
