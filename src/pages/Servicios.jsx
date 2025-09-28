import { asset } from "../utils/assets"; // importás el helper

const habitaciones = [
  {
    id: 1,
    nombre: "Habitación Simple",
    desc: "Cómoda habitación para una persona, incluye desayuno.",
    precio: "$50/noche",
    img: asset("assets/hab-simple.jpg"),
  },
  {
    id: 2,
    nombre: "Habitación Doble",
    desc: "Perfecta para dos personas, incluye wifi y TV.",
    precio: "$80/noche",
    img: asset("assets/hab-doble.jpg"),
  },
  {
    id: 3,
    nombre: "Suite Junior",
    desc: "Suite elegante con sala de estar y minibar.",
    precio: "$120/noche",
    img: asset("assets/suite-junior.jpg"),
  },
  {
    id: 4,
    nombre: "Suite Premium",
    desc: "Suite de lujo con jacuzzi privado y vista panorámica.",
    precio: "$200/noche",
    img: asset("assets/suite-premium.jpg"),
  },
];

export default function Servicios() {
  return (
    <main className="container">
      <h1>Servicios</h1>
      <p>Conocé nuestras habitaciones y precios.</p>

      <div className="servicios-grid">
        {habitaciones.map((hab) => (
          <div className="card servicio-card" key={hab.id}>
            <img src={hab.img} alt={hab.nombre} className="servicio-img" />
            <div className="servicio-body">
              <h3>{hab.nombre}</h3>
              <p>{hab.desc}</p>
              <p className="precio">{hab.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
