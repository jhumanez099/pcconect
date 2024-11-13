import Axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import NavBar from "../../../components/NavBar";
import { useState } from "react";

export default function CrearCliente() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [globalError, setGlobalError] = useState(null);

    const onSubmit = (data) => {
        crearCliente(data);
    };

    const crearCliente = (clienteData) => {
        Axios.post("http://localhost:3000/api/clientes", clienteData)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Cliente creado exitosamente.",
                });
                reset();
                setGlobalError(null);
            })
            .catch(() => {
                setGlobalError("Error al crear el cliente. Intenta nuevamente.");
            });
    };

    return (
        <div className="vh-100 vw-100 d-flex flex-column page-background">
            <NavBar />

            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 bg-white rounded card shadow p-4 m-4">
                    <div className="row my-4 gx-5">
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <button className="btn btn-primary btn-sm">← Regresar</button>
                            <h1 className="text-center w-100 mb-0">Crear cliente</h1>
                        </div>
                    </div>

                    {globalError && <div className="alert alert-danger">{globalError}</div>}

                    <form onSubmit={handleSubmit(onSubmit)} className="px-3">
                        {[
                            { label: "Nombre", id: "nombreCliente", type: "text" },
                            { label: "Dirección", id: "direccionCliente", type: "text" },
                            { label: "Teléfono", id: "telefonoCliente", type: "text" },
                            { label: "Correo", id: "correoCliente", type: "email" },
                            { label: "Responsable", id: "encargadoCliente", type: "text" },
                            { label: "Estado", id: "estadoCliente", type: "select", options: ["Activo", "Inactivo"] },
                        ].map((field, index) => (
                            <div className="mb-4 row align-items-center" key={index}>
                                <label
                                    htmlFor={field.id}
                                    className="col-sm-4 col-form-label text-end"
                                    aria-invalid={errors[field.id] ? "true" : "false"}
                                >
                                    {field.label}:
                                </label>
                                <div className="col-sm-8">
                                    {field.type === "select" ? (
                                        <select
                                            className={`form-control ${errors[field.id] ? "is-invalid" : ""}`}
                                            id={field.id}
                                            {...register(field.id, { required: `${field.label} es obligatorio` })}
                                        >
                                            <option value="">Seleccione...</option>
                                            {field.options.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            className={`form-control ${errors[field.id] ? "is-invalid" : ""}`}
                                            id={field.id}
                                            {...register(field.id, { required: `${field.label} es obligatorio` })}
                                        />
                                    )}
                                    {errors[field.id] && (
                                        <div className="invalid-feedback">{errors[field.id].message}</div>
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
