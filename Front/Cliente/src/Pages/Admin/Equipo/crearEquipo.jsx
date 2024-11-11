import Axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function crearEquipo() {
  const { register, handleSubmit } = useForm();
  const [GetEquipos, setGetEquipos] = useState([]);

  useEffect(() => {
    getEquipos();
  }, []);

  const onSubmit = (data) => {
    if (Object.keys(data).length === 0) {
      return console.log("Campos vacíos");
    }
    crearEquipo(data);
  };

  const crearEquipo = (equipoData) => {
    Axios.post("http://localhost:3000/api/equipos", {
      nombreTipoEquipo: equipoData.tipoEquipo,
      modeloEquipo: equipoData.modeloEquipo,
      marcaEquipo: equipoData.marcaEquipo,
      especificacionesEquipo: equipoData.especificacionesEquipo,
      estadoEquipo: equipoData.estadoEquipo,
      fechaCompraEquipo: equipoData.fechaCompraEquipo,
    })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Cliente creado correctamente",
        });
        console.log(response);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error en la creación del cliente.",
        });
        console.log(error);
      });
  };

  const getEquipos = () => {
    Axios.get("http://localhost:3000/api/tiposEquipos")
      .then((response) => {
        setGetEquipos(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al obtener los programas. Por favor, inténtelo de nuevo más tarde.",
        });
      });
  };

  return (
    <div
      className="vh-100 vw-100 d-flex flex-column"
      style={{ backgroundColor: "rgb(0, 138, 230)" }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
        {/* Navbar aquí */}
      </nav>

      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 bg-white rounded card shadow p-4">
          <h1 className="text-center mb-4">Crear Equipo</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="px-3">
            {[
              { label: "Modelo", id: "modeloEquipo", type: "text" },
              {
                label: "Tipo",
                id: "tipoEquipo",
                type: "select", // Cambio a select
              },
              { label: "Marca", id: "marcaEquipo", type: "text" },
              {
                label: "Especificaciones",
                id: "especificacionesEquipo",
                type: "text",
              },
              { label: "Estado", id: "estadoEquipo", type: "text" },
              { label: "FechaCompra", id: "fechaCompraEquipo", type: "date" },
            ].map((field, index) => (
              <div className="mb-4 row align-items-center" key={index}>
                <label
                  htmlFor={field.id}
                  className="col-sm-4 col-form-label text-end"
                >
                  {field.label}:
                </label>
                <div className="col-sm-8">
                  {field.type === "select" ? (
                    <select
                    className="form-select"
                    id="tipoEquipo"
                    {...register("tipoEquipo")} // Captura el ID del select
                  >
                    <option value="">Seleccionar tipo de equipo</option>
                    {GetEquipos.map((option) => (
                      <option key={option.id_tipo_equipo} value={option.id_tipo_equipo}>
                        {option.nombre_tipo_equipo}
                      </option>
                    ))}
                  </select>
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      id={field.id}
                      {...register(field.id)}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="text-center">
              <button type="submit" className="btn btn-success px-4 py-2">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}