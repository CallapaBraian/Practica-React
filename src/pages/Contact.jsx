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
        import.meta.env.VITE_EMAILJS_SERVICE_ID,     // service_bgtfb4r
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,    // template_k4pzaz9 (A VOS)
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY } // gAK3E9K-J2nEVms11
      );

      // Si el Contact Us está linkeado a Auto-Reply, EmailJS manda el reply al usuario automáticamente.
      setEstado({ tipo: "ok", msg: "✅ Correo enviado. Te llegará una confirmación al correo." });
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setEstado({ tipo: "err", msg: "❌ Ocurrió un error al enviar el correo. Intentá de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ maxWidth: 720 }}>
      <h1>Contacto</h1>
      <p className="dz-sub" style={{ marginBottom: 16 }}>
        Completá el formulario y te responderé a la brevedad.
      </p>

      <form ref={formRef} onSubmit={onSubmit} className="card" noValidate>
        <label className="field">
          <span>Nombre</span>
          <input type="text" name="from_name" placeholder="Tu nombre" autoComplete="name" required />
        </label>

        <label className="field">
          <span>Dirección de correo</span>
          <input type="email" name="reply_to" placeholder="tunombre@correo.com" autoComplete="email" required />
        </label>

        <label className="field">
          <span>Mensaje</span>
          <textarea name="message" rows={5} placeholder="Escribí tu mensaje..." required></textarea>
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {estado.msg && (
        <p className={`result ${estado.tipo}`} style={{ marginTop: 12 }}>
          {estado.msg}
        </p>
      )}
    </main>
  );
}
