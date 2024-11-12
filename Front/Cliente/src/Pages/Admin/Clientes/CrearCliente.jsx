import Axios from "axios";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import NavBar from "../../../components/NavBar";

export default function CrearClientes() {
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
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Cliente creado correctamente'
                })
                console.log(response)
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error en la creacion del cliente.'
                })
                console.log(error)
            });
    };

    return (
        <div className="vh-100 vw-100 d-flex flex-column" style={{ backgroundColor: 'rgb(0, 138, 230)' }}>
            <NavBar />

            {/* Formulario */}
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 bg-white rounded card shadow p-4">
                    <div className="row my-4 gx-5">
                        <div className="col-12 text-start">
                            <a href="#" className="text-primary d-block mb-2">← Back</a>
                            <h1 className="text-center mb-4">Crear cliente</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="px-3">
                        {[
                            { label: "Nombre", id: "nombreCliente", type: "text" },
                            { label: "Dirección", id: "direccionCliente", type: "text" },
                            { label: "Teléfono", id: "telefonoCliente", type: "text" },
                            { label: "Correo", id: "correoCliente", type: "email" },
                            { label: "Encargado", id: "encargadoCliente", type: "text" },
                            { label: "Estado", id: "estadoCliente", type: "text" }
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