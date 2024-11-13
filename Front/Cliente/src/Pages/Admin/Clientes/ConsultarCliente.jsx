import Axios from "axios";
import Swal from "sweetalert2";
import NavBar from "../../../components/NavBar";
import { useEffect, useState, useMemo } from "react";

function ClienteRow({ cliente, onEliminar }) {
  return (
    <tr>
      <td className="text-truncate">{cliente.nombre_cliente}</td>
      <td className="text-truncate">{cliente.direccion_cliente}</td>
      <td>{cliente.telefono_cliente}</td>
      <td className="text-truncate">{cliente.correo_cliente}</td>
      <td>{cliente.encargado_cliente}</td>
      <td>{cliente.estado_cliente}</td>
      <td>
        <div className="d-flex flex-column align-items-center">
          <button className="btn btn-primary btn-sm mb-2 w-100">Editar</button>
          <button
            className="btn btn-danger btn-sm w-100"
            onClick={() => onEliminar(cliente.id_cliente)}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function ConsultarCliente() {
  const [clientes, setClientes] = useState([]);
  const [consultar, setConsultar] = useState("");
  const [error, setError] = useState(null);

  const consultarClientes = () => {
    Axios.get("http://localhost:3000/api/clientes")
      .then((response) => {
        setClientes(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error en la consulta de clientes:", error);
        setError("Hubo un error al cargar los clientes. Por favor, intenta nuevamente.");
      });
  };

  const eliminarCliente = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3000/api/clientes/${id}`)
          .then(() => {
            setClientes((prevClientes) =>
              prevClientes.filter((cliente) => cliente.id_cliente !== id)
            );
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "Cliente eliminado exitosamente.",
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al eliminar el cliente. Por favor, inténtelo de nuevo más tarde.",
            });
          });
      }
    });
  };

  const buscar = (e) => {
    setConsultar(e.target.value);
  };

  const resultadoFiltrado = useMemo(() => {
    return consultar
      ? clientes.filter((dato) =>
        dato.nombre_cliente.toLowerCase().includes(consultar.toLowerCase())
      )
      : clientes;
  }, [consultar, clientes]);

  useEffect(() => {
    consultarClientes();
  }, []);

  return (
    <div className="vh-100 vw-100 d-flex flex-column page-background">
      <NavBar />
      <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 bg-white rounded card shadow p-4 m-4">
          <div className="row gx-5">
            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-primary btn-sm">← Regresar</button>
              <h1 className="text-center w-100 mb-0">Consultar cliente</h1>
            </div>
          </div>
          <div className="text-center d-flex justify-content-center input-group mb-1">
            <span className="input-group-text" id="icon-input">🔍︎</span>
            <input
              value={consultar}
              onChange={buscar}
              type="text"
              placeholder="Consulta los clientes"
              className="form-control"
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
      <div className="container-fluid px-3">
        <div className="table-responsive">
          <table className="table table-striped table-hover mt-5 shadow-lg align-items-center text-center">
            <thead>
              <tr className="bg-white text-dark">
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Encargado</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {resultadoFiltrado.length > 0 ? (
                resultadoFiltrado.map((cliente) => (
                  <ClienteRow
                    key={cliente.id_cliente}
                    cliente={cliente}
                    onEliminar={eliminarCliente}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7">No hay clientes creados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
