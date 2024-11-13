import Axios from "axios";
import Swal from "sweetalert2";
import NavBar from "../../../components/NavBar";
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from "react";

function ClienteRow({ cliente, onEliminar, onEditar }) {
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
          <button
            className="btn btn-primary btn-sm mb-2 w-100"
            onClick={() => onEditar(cliente)}
          >
            Editar
          </button>
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

// Definir las PropTypes
ClienteRow.propTypes = {
  cliente: PropTypes.shape({
    id_cliente: PropTypes.number.isRequired,
    nombre_cliente: PropTypes.string.isRequired,
    direccion_cliente: PropTypes.string.isRequired,
    telefono_cliente: PropTypes.string.isRequired,
    correo_cliente: PropTypes.string.isRequired,
    encargado_cliente: PropTypes.string.isRequired,
    estado_cliente: PropTypes.string.isRequired
  }).isRequired,
  onEliminar: PropTypes.func.isRequired,
  onEditar: PropTypes.func.isRequired
};

export default function ConsultarCliente() {
  const [clientes, setClientes] = useState([]);
  const [consultar, setConsultar] = useState("");
  const [editingCliente, setEditingCliente] = useState(null);
  const [error, setError] = useState(null);

  const consultarClientes = () => {
    Axios.get("http://localhost:3000/api/clientes")
      .then((response) => {
        setClientes(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error en la consulta de clientes:", error);
        setError(
          "Hubo un error al cargar los clientes. Por favor, intenta nuevamente."
        );
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

  const iniciarEdicion = (cliente) => {
    // Crear una copia profunda del cliente para edición
    setEditingCliente(JSON.parse(JSON.stringify(cliente)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCliente(prevState => {
      // Si el valor está vacío, mantener el valor anterior
      if (value.trim() === "") {
        return prevState;
      }
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const guardarCambios = async (e) => {
    e.preventDefault();

    try {
      // Verificar que editingCliente existe y tiene un id
      if (!editingCliente || !editingCliente.id_cliente) {
        throw new Error('Cliente no válido');
      }

      // Obtener el cliente original para comparar
      const clienteOriginal = clientes.find(c => c.id_cliente === editingCliente.id_cliente);
      if (!clienteOriginal) {
        throw new Error('Cliente no encontrado');
      }

      // Crear objeto solo con los campos modificados
      const cambios = {};
      Object.keys(editingCliente).forEach(key => {
        if (editingCliente[key] !== clienteOriginal[key] &&
          editingCliente[key] !== "" &&
          editingCliente[key] !== null) {
          cambios[key] = editingCliente[key];
        }
      });

      // Si no hay cambios, cerrar el modal y no hacer nada más
      if (Object.keys(cambios).length === 0) {
        setEditingCliente(null);
        return;
      }

      // Mantener el ID en los cambios
      cambios.id_cliente = editingCliente.id_cliente;

      const response = await Axios.put(
        `http://localhost:3000/api/clientes/${editingCliente.id_cliente}`,
        cambios
      );

      // Actualizar el estado local solo si la petición fue exitosa
      setClientes(prevClientes =>
        prevClientes.map(cliente =>
          cliente.id_cliente === editingCliente.id_cliente
            ? { ...cliente, ...cambios }
            : cliente
        )
      );

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Cliente actualizado exitosamente.",
      });

      setEditingCliente(null);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el cliente. Por favor, inténtelo de nuevo más tarde.",
      });
    }
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
            <span className="input-group-text" id="icon-input">
              🔍︎
            </span>
            <input
              value={consultar}
              onChange={(e) => setConsultar(e.target.value)}
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
                <th>Responsable</th>
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
                    onEditar={iniciarEdicion}
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

      {editingCliente && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Cliente</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditingCliente(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={guardarCambios}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre_cliente"
                      value={editingCliente?.nombre_cliente || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion_cliente"
                      value={editingCliente?.direccion_cliente || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefono_cliente"
                      value={editingCliente?.telefono_cliente || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      className="form-control"
                      name="correo_cliente"
                      value={editingCliente?.correo_cliente || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Encargado</label>
                    <input
                      type="text"
                      className="form-control"
                      name="encargado_cliente"
                      value={editingCliente?.encargado_cliente || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <input
                      type="text"
                      className="form-control"
                      name="estado_cliente"
                      value={editingCliente?.estado_cliente || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}