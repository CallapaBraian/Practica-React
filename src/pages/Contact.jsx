// src/pages/Contact.jsx
import { useState } from "react";
import "../styles.css";

const EMAIL_RE = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;

export default function Contact() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [estado, setEstado] = useState({ tipo: "", msg: "" }); // "ok" | "err" | ""

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validar = () => {
    if (!form.nombre.trim() || form.nombre.trim().length < 2)
      return "El nombre es obligatorio (mín. 2 caracteres).";
    if (!EMAIL_RE.test(form.email))
      return "Ingresá un correo electrónico válido.";
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10)
      return "El mensaje es obligatorio (mín. 10 caracteres).";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEstado({ tipo: "", msg: "" });
    const error = validar();
    if (error) return setEstado({ tipo: "err", msg: error });

    console.log("ENVIADO:", form); // simulación de envío
    setEstado({ tipo: "ok", msg: "✅ Correo enviado correctamente." });
    alert("Correo enviado correctamente. ¡Gracias!");
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <main className="container" style={{ maxWidth: 720 }}>
      <h1>Contacto</h1>

      <form onSubmit={onSubmit} className="card" noValidate>
        <label className="field">
          <span>Nombre</span>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={onChange}
            required
          />
        </label>

        <label className="field">
          <span>Dirección de correo</span>
          <input
            type="email"
            name="email"
            placeholder="tunombre@correo.com"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label className="field">
          <span>Mensaje</span>
          <textarea
            name="mensaje"
            rows={5}
            placeholder="Escribí tu mensaje..."
            value={form.mensaje}
            onChange={onChange}
            required
          />
        </label>

        <div className="actions">
          <button type="submit" className="btn">Enviar</button>
        </div>

        {estado.msg && (
          <p className={`result ${estado.tipo}`} style={{ marginTop: 12 }}>
            {estado.msg}
          </p>
        )}
      </form>
    </main>
  );
}
