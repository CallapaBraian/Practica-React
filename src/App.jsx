import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Contact from "./pages/Contact";
import "./styles.css";
import APIPage from "./pages/API";

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
            <li>
              <NavLink to="/api" className="nav-link">
                API
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
        <Route path="/api" element={<APIPage />} />
      </Routes>

      <footer className="footer">
        <div className="footer-inner">
          <p>TP2 / TP3 / TP4/TP5 — React + Router + File API + EmailJS + API CLIMA— Lenguaje IV</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}
