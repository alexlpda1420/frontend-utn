import Layout from "../components/Layout"
import ShopLinkLogo from "../assets/images/ShopLink-Logo.png"

const AboutUs = () => {
  return (
    <Layout>
      <section className="about">
        {/* Introducción */}
        <header className="about-header">
          <h1>Acerca de ShopLink</h1>
          <p>
            ShopLink nace como parte del Trabajo Práctico de Desarrollo y Deploy de una
            API REST en TypeScript. El objetivo fue construir una plataforma completa:
            backend robusto y tipado, frontend moderno y un flujo real de gestión de
            productos, autenticación y despliegue en producción.
          </p>
          <p>
            Lo que ves acá no es solo una tienda: es un laboratorio de buenas prácticas,
            donde se combinan arquitectura MVC, validaciones, seguridad, logs, filtros
            avanzados y un deploy funcional en Render, todo integrado con este frontend
            hecho en React y Vite.
          </p>
        </header>

        {/* 3 columnas: sobre el proyecto / a quién va dirigido / tecnologías */}
        <section className="about-columns">
          <article className="about-card">
            <h3>🎯 Sobre el Proyecto</h3>
            <p>
              El backend parte de un código base y se completa siguiendo el patrón MVC,
              con controladores, modelos, rutas, middlewares y servicios separados. La
              API REST permite administrar productos y usuarios, aplicar filtros por
              query params, y exponer endpoints listos para ser consumidos por el
              frontend de ShopLink.
            </p>
          </article>

          <article className="about-card">
            <h3>👥 A Quién Está Dirigida</h3>
            <p>
              Este proyecto está pensado para el entorno académico de la Diplomatura
              Full Stack y para cualquier persona que quiera ver cómo se construye una
              API profesional: autenticación con JWT, autorización por middleware,
              validaciones con Zod, carga de archivos, envío de correos y deploy real
              en la nube.
            </p>
          </article>

          <article className="about-card">
            <h3>⚡ Tecnologías y Herramientas</h3>
            <p>
              <strong>Backend:</strong> Node.js, Express, TypeScript, MongoDB, Mongoose,
              JWT, bcrypt, Zod, Multer, Resend, dotenv, morgan. <br />
              <br />
              <strong>Frontend:</strong> React, Vite, React Router DOM, Context API,
              Fetch API y SweetAlert2 para feedback al usuario. <br />
              <br />
              <strong>Deploy:</strong> Backend en Render, frontend en Vercel, variables
              de entorno y scripts para desarrollo, build y producción.
            </p>
          </article>
        </section>

        {/* Logo centrado */}
        <section className="about-logo-wrapper">
          <img
            src={ShopLinkLogo}
            alt="Logo ShopLink"
            className="about-logo"
          />
        </section>

        {/* Historia / relato del TP */}
        <section className="about-history">
          <h2>Nuestra Historia</h2>
          <p>
            ShopLink surge a partir de un desafío concreto: tomar un backend base y
            transformarlo en una API REST funcional, segura y desplegada en la nube. A
            partir de los requerimientos del trabajo práctico, se implementaron scripts
            de ejecución, estructura MVC, logger con morgan, rate limit en rutas de
            autenticación, middleware de autorización y filtros avanzados sobre la base
            de datos. 
          </p>
          <p>
            En paralelo, se construyó este frontend en React, pensado como panel de
            administración de productos: alta, baja, modificación, filtros por
            categoría, precio y nombre, subida de imágenes, validación de formularios y
            feedback visual con SweetAlert2.
          </p>
          <p>
            El resultado es un proyecto integral que conecta teoría y práctica: código
            tipado, arquitectura clara, buenas prácticas de seguridad y una interfaz
            cuidada que permite presentar el trabajo final de forma profesional.
          </p>
        </section>

        {/* Características técnicas */}
        <section className="about-tech">
          <h2>Características Técnicas</h2>

          <div className="about-tech-grid">
            <article className="about-tech-card">
              <h3>🧩 Arquitectura y API REST</h3>
              <ul>
                <li>Patrón MVC con controladores, modelos, rutas y middlewares.</li>
                <li>Endpoints REST para CRUD de productos y autenticación.</li>
                <li>Tipado completo en TypeScript y uso de interfaces.</li>
                <li>Scripts de dev, build y start para distintos entornos.</li>
              </ul>
            </article>

            <article className="about-tech-card">
              <h3>🔐 Seguridad y Autenticación</h3>
              <ul>
                <li>Login y registro con hash de contraseñas usando bcrypt.</li>
                <li>JWT para autenticación y middleware para proteger rutas.</li>
                <li>Rate limit aplicado a las rutas de autenticación.</li>
                <li>Manejo consistente de errores y respuestas JSON.</li>
              </ul>
            </article>

            <article className="about-tech-card">
              <h3>🔎 Filtros, Validaciones y Uploads</h3>
              <ul>
                <li>
                  Filtros por categoría, rango de precio y nombre, ejecutados en la
                  consulta a la base de datos.
                </li>
                <li>Validación de inputs con Zod (body, params y query).</li>
                <li>Carga de imágenes de productos con Multer.</li>
                <li>
                  Envío de correos (registro y contacto) integrando Resend como
                  proveedor externo.
                </li>
              </ul>
            </article>

            <article className="about-tech-card">
              <h3>☁️ Deploy y Observabilidad</h3>
              <ul>
                <li>Backend desplegado en Render con URL pública de la API.</li>
                <li>Frontend desplegado en Vercel consumiendo la API remota.</li>
                <li>Uso de variables de entorno y archivo .env.example.</li>
                <li>Logs http con morgan y manejo de estados en frontend.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* CTA final */}
        <section className="about-cta">
          <h2>¿Tenés alguna pregunta?</h2>
          <p>
            ShopLink fue desarrollado como proyecto integrador para practicar
            arquitectura backend, desarrollo frontend y deploy en la nube. Si querés
            ver más detalles del código o usarlo como referencia para tus propios
            proyectos, podés visitar mi GitHub.
          </p>
          <a
            href="https://github.com/alexlpda1420"
            target="_blank"
            rel="noopener noreferrer"
            className="about-button"
          >
            Ver más proyectos
          </a>
        </section>
      </section>
    </Layout>
  )
}

export default AboutUs
