import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "./styles.css";

function NotFound() {
  return (
    <main className="container">
      <h1>404</h1>
      <p>Página no encontrada.</p>
    </main>
  );
}

export default function App() {
  return (
    // basename es importante para GitHub Pages (usa el nombre del repo)
    <BrowserRouter basename="/Practica-React">
      <header className="site-header">
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end className="nav-link">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className="nav-link">
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="footer">
        <div className="footer-inner">
          <p>Trabajo Práctico N°3 — Formulario de contacto con React + EmailJS</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}
