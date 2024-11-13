import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export default function ConsultarEquipos() {
    const [ListaEquipos, setListaEquipos] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEquipos = () => {
        Axios.get("http://localhost:3000/api/equipos")
            .then((response) => {
                console.log(response.data)
                setListaEquipos(response.data);
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al obtener los equipos. Por favor, inténtelo de nuevo más tarde.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEdit = (id) => {
        Swal.fire({
            title: 'Editar equipo',
            text: `Editar equipo con ID: ${id}`,
            icon: 'info',
        });
        // Aquí puedes agregar la lógica para editar.
    };

    const handleDelete = (id) => {
        console.log(id, "primer id")

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes hacer la solicitud de eliminación
                console.log(id)
                Axios.delete(`http://localhost:3000/api/equipos/${id}`)
                    .then(() => {
                        getEquipos();
                        Swal.fire('Eliminado', 'El equipo ha sido eliminado.', 'success');
                        setListaEquipos(ListaEquipos.filter((equipo) => equipo.id_equipos !== id));
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'No se pudo eliminar el equipo.', 'error');
                        console.error(error);
                    });
            }
        });
    };

    useEffect(() => {
        getEquipos();
    }, []);

    return (
        <div className="vh-100 vw-100 d-flex flex-column" style={{ backgroundColor: 'rgb(0, 138, 230)' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                <div className="container">
                    <a className="navbar-brand" href="#">PCCONECT</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Clientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Entregas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Recogidas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Productos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Soporte</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="row my-4 gx-5">
                    <div className="col-12 text-start">
                        <a href="#" className="text-primary d-block mb-2">← Back</a>
                        <h1 className="text-center mb-4 text-white">Consultar Equipo</h1>
                    </div>
                </div>
                <div className="col-10">
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Cargando...</span>
                            </div>
                        </div>
                    ) : ListaEquipos.length > 0 ? (
                        <div className="table-responsive" style={{ maxHeight: "20rem", overflowY: "auto" }}>
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Tipo de Equipo</th>
                                        <th>Modelo</th>
                                        <th>Marca</th>
                                        <th>Especificaciones</th>
                                        <th>Estado</th>
                                        <th>Fecha de Compra</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListaEquipos.map((equipo) => (
                                        <tr key={equipo.id_equipo}>
                                            <td>{equipo.id_tipo_equipo}</td>
                                            <td>{equipo.modelo_equipo}</td>
                                            <td>{equipo.marca_equipo}</td>
                                            <td>{equipo.especificaciones_equipo}</td>
                                            <td>{equipo.estado_equipo}</td>
                                            <td>{new Date(equipo.fecha_compra_equipo).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-prima btn-sm mr-2"
                                                    onClick={() => handleEdit(equipo.id_equipo)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(equipo.id_equipo)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-muted">No se encontraron equipos.</p>
                    )}
                </div>
            </div>
        </div>
    );
}