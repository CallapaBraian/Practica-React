import { useEffect, useState } from "react";
import "../styles.css";

// Mapea códigos WMO de Open-Meteo a descripción e icono local
const WMO = [
  { codes: [0], text: "Despejado", icon: "clear.png", emoji: "☀️" },
  { codes: [1, 2], text: "Parcialmente nublado", icon: "partly.png", emoji: "🌤️" },
  { codes: [3], text: "Nublado", icon: "cloudy.png", emoji: "☁️" },
  { codes: [45, 48], text: "Niebla", icon: "fog.png", emoji: "🌫️" },
  { codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], text: "Lluvia", icon: "rain.png", emoji: "🌧️" },
  { codes: [71, 73, 75, 77, 85, 86], text: "Nieve", icon: "snow.png", emoji: "❄️" },
];

function weatherInfo(code) {
  return WMO.find(g => g.codes.includes(code)) ?? { text: "Condición desconocida", icon: "", emoji: "🌡️" };
}

// Helper para resolver la URL correcta en dev/GitHub Pages
const asset = (path) => import.meta.env.BASE_URL + path;

// Coordenadas Salta, AR
const LAT = -24.7883;
const LON = -65.4232;

// Pedimos campos "current" (no requiere API key)
const URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

export default function APIPage() {
  const [data, setData] = useState(null);  // respuesta cruda
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Respuesta no válida");
        const json = await res.json();
        if (alive) setData(json);
      } catch (e) {
        console.error(e);
        if (alive) setErr("No se pudo obtener el clima.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const current = data?.current;
  const info = current ? weatherInfo(current.weather_code) : null;

  return (
    <main className="container">
      <h1>API — Clima en Salta</h1>
      <p className="dz-sub" style={{ marginBottom: 16 }}>
        Datos en tiempo real desde Open-Meteo
      </p>

      {loading && <div className="card">Cargando datos…</div>}
      {err && <div className="card" style={{ color: "var(--danger)" }}>{err}</div>}

      {current && (
        <section
          className="card"
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            alignItems: "center",
          }}
        >
          {/* Imagen obligatoria */}
          <div style={{ textAlign: "center" }}>
            {/* Intentamos cargar icono local; si falla, mostramos emoji */}
            <img
              src={info.icon ? asset(`assets/weather/${info.icon}`) : ""}
              alt={info.text}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              style={{ width: 120, height: 120, objectFit: "contain" }}
            />
            <div style={{ fontSize: 48, lineHeight: 1 }}>{info.emoji}</div>
          </div>

          {/* 4+ campos requeridos */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><strong>Condición:</strong> {info.text}</li>
            <li><strong>Temperatura:</strong> {current.temperature_2m} °C</li>
            <li><strong>Humedad:</strong> {current.relative_humidity_2m} %</li>
            <li><strong>Viento:</strong> {current.wind_speed_10m} km/h</li>
            <li><strong>Ubicación:</strong> Salta, Argentina</li>
          </ul>
        </section>
      )}
    </main>
  );
}
