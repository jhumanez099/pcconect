import Axios from "axios";
import Navbar from "../../../components/Navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function tipoUsuarios() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (Object.keys(data).length === 0) {
            return console.log("Campos vacíos");
        }

        crearTipoUsuario(data);
    };

    const crearTipoUsuario = (tipoUsuarioData) => {
        Axios.post("http://localhost:3000/api/tiposUsuarios", {
            nombreTipoUsuario: tipoUsuarioData.nombreTipoUsuario,
        })
            .then((response) => {
                console.log("Tipo usuario creado", response.status);
            })
            .catch((error) => {
                console.log("Error al crear el tipo de usuario:", error);
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
                        <h1 className="text-center">Crear tipo de usuario</h1>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="NombreTipoUsuario" className="col-sm-3 col-form-label text-end">Nombre:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreTipoUsuario"
                                    style={{ maxWidth: "250px" }}
                                    {...register("nombreTipoUsuario")}
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