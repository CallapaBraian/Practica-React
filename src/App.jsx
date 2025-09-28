import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
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
              <NavLink to="/servicios" className="nav-link">
                Servicios
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
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="footer">
        <div className="footer-inner">
          <p>TP2 / TP3 / TP4 — React + Router + File API + EmailJS — Lenguaje IV</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}
