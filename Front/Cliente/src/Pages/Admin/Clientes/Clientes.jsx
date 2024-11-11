import Axios from "axios";
import Navbar from "../../../components/Navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Clientes() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (Object.keys(data).length === 0) {
            return console.log("Campos vacíos");
        } 

        crearCliente(data);
    };

    const crearCliente = (clienteData) => {
        Axios.post("http://localhost:3000/api/clientes", {
            nombreCliente: clienteData.nombreCliente,
            direccionCliente: clienteData.direccionCliente,
            telefonoCliente: clienteData.telefonoCliente,
            correoCliente: clienteData.correoCliente,
            encargadoCliente: clienteData.encargadoCliente,
            estadoCliente: clienteData.estadoCliente
        })
        .then((response) => {
            console.log("Cliente creado", response.status);
        })
        .catch((error) => {
            console.log("Error al crear cliente:", error);
        });
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0a6e76" }}>
            <div className="row p-5">
                <Navbar />
            </div>
            <div className="rounded card shadow p-5" style={{ width: "650px", height: "auto" }}>
                <div className="row my-5 gx-5">
                    <div className="col-4 col-md-4">
                        <a href="#" className="text-primary">← Back</a>
                    </div>
                    <div className="col-md-6 col-sm-9">
                        <h1 className="text-center">Crear cliente</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="NombreCliente" className="col-sm-3 col-form-label text-end">Nombre:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreCliente"
                                    style={{ maxWidth: "250px" }}
                                    {...register("nombreCliente")}
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="DireccionCliente" className="col-sm-3 col-form-label text-end">Dirección:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="direccionCliente"
                                    style={{ maxWidth: "250px" }}
                                    {...register("direccionCliente")}
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="TelefonoCliente" className="col-sm-3 col-form-label text-end">Teléfono:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telefonoCliente"
                                    style={{ maxWidth: "250px" }}
                                    {...register("telefonoCliente")}
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="CorreoCliente" className="col-sm-3 col-form-label text-end">Correo:</label>
                            <div className="col-sm-9">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="correoCliente"
                                    style={{ maxWidth: "250px" }}
                                    {...register("correoCliente")}
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="EncargadoCliente" className="col-sm-3 col-form-label text-end">Encargado:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="encargadoCliente"
                                    style={{ maxWidth: "250px" }}
                                    {...register("encargadoCliente")}
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="EstadoCliente" className="col-sm-3 col-form-label text-end">Estado:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="estadoCliente"
                                    style={{ maxWidth: "250px" }}
                                    {...register("estadoCliente")}
                                />
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-block text-center">
                            <button type="submit" className="btn" style={{ backgroundColor: "#c8e6c9", color: "black" }}>Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
