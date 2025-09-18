import { useRef, useState, useCallback } from "react";
import "./styles.css";

export default function App() {
  const inputRef = useRef(null);
  const imgRef   = useRef(null);

  const [src, setSrc] = useState("");
  const [meta, setMeta] = useState("");
  const [msg, setMsg] = useState("");
  const [tipo, setTipo] = useState(""); // "ok" | "err" | ""

  const TAM_MAXIMO = 10 * 1024 * 1024; // 10 MB

  const limpiar = useCallback(() => {
    setSrc(""); setMeta(""); setMsg(""); setTipo("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const mostrarError = useCallback((m) => { setMsg(m); setTipo("err"); }, []);
  const mostrarOk    = useCallback((m) => { setMsg(m); setTipo("ok");  }, []);

  const manejarArchivo = useCallback((archivo) => {
    limpiar();

    // Validaciones File API
    if (!archivo?.type || !archivo.type.startsWith("image/")) {
      return mostrarError("El archivo seleccionado no es una imagen.");
    }
    if (archivo.size > TAM_MAXIMO) {
      return mostrarError("La imagen supera el máximo permitido (10 MB).");
    }

    // Vista previa
    const lector = new FileReader();
    lector.addEventListener("error", () => mostrarError("No se pudo leer el archivo."));
    lector.addEventListener("load", (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === "string") {
        setSrc(dataUrl);
        mostrarOk("Imagen cargada correctamente.");
      }
    });
    lector.readAsDataURL(archivo);
  }, [limpiar, mostrarError, mostrarOk]);

  const onChange = (e) => {
    const archivo = e.target.files?.[0];
    if (archivo) manejarArchivo(archivo);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const archivo = dt?.items?.[0]?.getAsFile?.() ?? dt?.files?.[0];
    if (archivo) manejarArchivo(archivo);
  };

  const onImgLoad = () => {
    if (!imgRef.current) return;
    const w = imgRef.current.naturalWidth;
    const h = imgRef.current.naturalHeight;
    const f = inputRef.current?.files?.[0];
    const nombre = f?.name ?? "imagen";
    const tamKB = f ? (f.size / 1024).toFixed(1) : "";
    setMeta(`${nombre}${tamKB ? ` • ${tamKB} KB` : ""} • ${w}×${h}px`);
  };

  return (
    <div className="page">
      <main className="container">
        <h1>Subir y previsualizar imagen (File API)</h1>

        <section
          className="uploader"
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={onDrop}
        >
          <div
            id="dropzone"
            tabIndex={0}
            aria-label="Arrastrá y soltá una imagen o hacé clic para elegir"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
          >
            <div className="dz-icon" aria-hidden>🖼️</div>
            <p className="dz-title">Arrastrá y soltá una imagen aquí</p>
            <p className="dz-sub">o hacé clic para seleccionar desde tu dispositivo</p>

            <input
              id="fileInput"
              ref={inputRef}
              type="file"
              accept="image/*"
              aria-label="Elegir una imagen"
              onChange={onChange}
            />
            <small id="hint">Formatos: PNG, JPG, GIF, SVG, WebP. Máx. 10 MB.</small>
          </div>
        </section>

        <output id="result" role="status" aria-live="polite" className={`result ${tipo}`}>
          {msg}
        </output>

        {src && (
          <figure id="figure">
            <img id="preview" ref={imgRef} src={src} alt="Vista previa" onLoad={onImgLoad} />
            <figcaption id="meta">{meta}</figcaption>
          </figure>
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p>
            TP2 — React + File API (File, FileReader) + Drag & Drop — Lenguaje IV
          </p>
          <button type="button" className="btn" onClick={limpiar} disabled={!src}>
            Limpiar imagen
          </button>
        </div>
      </footer>
    </div>
  );
}
