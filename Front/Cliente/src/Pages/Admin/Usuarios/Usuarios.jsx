import Axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";

export default function CrearUsuarios() {
    const { register, handleSubmit } = useForm();
    const [tiposUsuario, setTiposUsuario] = useState([]);

    useEffect(() => {
        getTiposUsuario();
    }, []);

    const onSubmit = (data) => {
        if (Object.keys(data).length === 0) {
            return console.log("Campos vacíos");
        }
        crearUsuario(data);
    };

    const crearUsuario = (usuarioData) => {
        Axios.post("http://localhost:3000/api/usuarios", {
            idTipoUsuario: usuarioData.idTipoUsuario,
            nombreUsuario: usuarioData.nombreUsuario,
            contraseñaUsuario: usuarioData.contraseñaUsuario,
            telefonoUsuario: usuarioData.telefonoUsuario,
            correoUsuario: usuarioData.correoUsuario,
            cargoUsuario: usuarioData.cargoUsuario,
            estadoUsuario: usuarioData.estadoUsuario,
        })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Usuario creado correctamente",
                });
                console.log(response);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un error en la creación del usuario.",
                });
                console.log(error);
            });
    };

    const getTiposUsuario = () => {
        Axios.get("http://localhost:3000/api/tiposUsuarios")
            .then((response) => {
                setTiposUsuario(response.data);
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un error al obtener los tipos de usuario. Por favor, inténtelo de nuevo más tarde.",
                });
            });
    };


    return (
        <div className="vh-100 vw-100 d-flex flex-column" style={{ backgroundColor: "rgb(0, 138, 230)" }}>
            <Navbar></Navbar>

            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 bg-white rounded card shadow p-4">
                    <div className="row my-4 gx-5">
                        <div className="col-12 text-start">
                            <a href="#" className="text-primary d-block mb-2">← Back</a>
                            <h1 className="text-center mb-4">Crear usuario</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="px-3">
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="tipoUsuarioId" className="col-sm-4 col-form-label text-end">
                                Tipo usuario:
                            </label>
                            <div className="col-sm-8">
                                <select
                                    className="form-select"
                                    id="idTipoUsuario"
                                    {...register("idTipoUsuario")}
                                >
                                    <option value="">Seleccionar tipo de usuario</option>
                                    {tiposUsuario.map((tipo) => (
                                        <option key={tipo.id_tipo_usuario} value={tipo.id_tipo_usuario}>
                                            {tipo.nombre_tipo_usuario}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {[
                            { label: "Nombre", id: "nombreUsuario", type: "text" },
                            { label: "Contraseña", id: "contraseñaUsuario", type: "password" },
                            { label: "Teléfono", id: "telefonoUsuario", type: "text" },
                            { label: "Correo", id: "correoUsuario", type: "email" },
                            { label: "Cargo", id: "cargoUsuario", type: "text" },
                            { label: "Estado", id: "estadoUsuario", type: "text" },
                        ].map((field, index) => (
                            <div className="mb-4 row align-items-center" key={index}>
                                <label htmlFor={field.id} className="col-sm-4 col-form-label text-end">
                                    {field.label}:
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type={field.type}
                                        className="form-control"
                                        id={field.id}
                                        {...register(field.id)}
                                    />
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
