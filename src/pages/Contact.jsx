import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles.css";

const EMAIL_RE = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;

export default function Contact() {
  const formRef = useRef(null);
  const [estado, setEstado] = useState({ tipo: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const validar = (data) => {
    if (!data.from_name || data.from_name.trim().length < 2)
      return "El nombre es obligatorio (mín. 2 caracteres).";
    if (!EMAIL_RE.test(data.reply_to))
      return "Ingresá un correo electrónico válido.";
    if (!data.message || data.message.trim().length < 10)
      return "El mensaje es obligatorio (mín. 10 caracteres).";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setEstado({ tipo: "", msg: "" });

    const datos = {
      from_name: formRef.current?.from_name?.value || "",
      reply_to: formRef.current?.reply_to?.value || "",
      message: formRef.current?.message?.value || "",
    };

    const error = validar(datos);
    if (error) return setEstado({ tipo: "err", msg: error });

    try {
      setLoading(true);
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      // Si en EmailJS vinculaste un Auto-Reply al template "Contact Us", el usuario recibirá confirmación automática.
      setEstado({ tipo: "ok", msg: "✅ Correo enviado. Te llegará una confirmación al email." });
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setEstado({ tipo: "err", msg: "❌ Ocurrió un error al enviar el correo. Intentá de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ maxWidth: 1000 }}>
      <h1>Contacto</h1>
      <p className="dz-sub" style={{ marginBottom: 16 }}>
        Completá el formulario y te responderé a la brevedad.
      </p>

      {/* Grid responsiva: 1 columna en móvil / 2 columnas en pantallas anchas */}
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "start",
        }}
      >
        {/* Columna izquierda: Formulario */}
        <form ref={formRef} onSubmit={onSubmit} className="card" noValidate>
          <label className="field">
            <span>Nombre</span>
            <input
              type="text"
              name="from_name"
              placeholder="Tu nombre"
              autoComplete="name"
              required
            />
          </label>

          <label className="field">
            <span>Dirección de correo</span>
            <input
              type="email"
              name="reply_to"
              placeholder="tunombre@correo.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Mensaje</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Escribí tu mensaje..."
              required
            ></textarea>
          </label>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>

          {estado.msg && (
            <p className={`result ${estado.tipo}`} style={{ marginTop: 12 }}>
              {estado.msg}
            </p>
          )}
        </form>

        {/* Columna derecha: Mapa */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: 16 }}>
            <h2 style={{ margin: "0 0 8px" }}>Ubicación</h2>
            <p className="dz-sub" style={{ margin: 0 }}>
              Nos encontramos en Salta, Argentina.
            </p>
          </div>

          {/* Reemplazá el src con tu ubicación (Google Maps → Compartir → Insertar un mapa) */}
          <iframe
            title="Mapa ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3377.302105034447!2d-65.42319722403098!3d-24.78831960696464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc2c0a23e3c8b%3A0x7c39b0d1d3b6c5e6!2sPlaza%209%20de%20Julio%2C%20Salta!5e0!3m2!1ses-419!2sar!4v1696000000000!5m2!1ses-419!2sar"
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
