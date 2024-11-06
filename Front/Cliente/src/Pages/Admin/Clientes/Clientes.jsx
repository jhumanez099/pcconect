import Axios from "axios";
import InputField from "../../../components/InputField";
import Title from "../../../components/Title";
import Buttons from "../../../components/button";
import Navbar from "../../../components/Navbar";
import { useForm} from "react-hook-form";

export default function Clientes() {
    const {register}=useForm()
    return (
        <div className="container vh-100 d-flex justify-content-center alling items-center">
            <div className="row">
                    <Navbar> </Navbar>
            </div>
            <div className="row"> 
                <h1>a</h1>
                <form>
                    <label> 
                        Nombre del cliente:
                        <input useForm="NombreCliente"/>
                    
                    </label>
                
                </form>
            </div>
                {/* <div className="mb-5 d-flex justify-content-center">
                    <Title title="Clientes" />
                </div>
                <div className="row">
                    <div className="col-1 ms-4">
                        <InputField
                            label="Nombre"
                            type="text"
                            id="Nombre-Cliente"
                            placeholder="Nombre del Cliente"
                        />
                    </div>
                    <div className="col-2">
                        <Buttons
                            title="Consultar"
                            color="white"
                            colorbutton="black"
                        />
                    </div>
                    <div className="col-3 me-3">
                        <InputField
                            label="Direccion"
                            type="text"
                            id="Direccion-edit"
                            placeholder="Direccion"
                        />
                    </div>

                    <div className="container-fluid mt-4 d-flex justify-content-center">
                        <div className="col-2 d-flex justify-content-center">
                            <Buttons
                                title="Guardar Cambios"
                                color="white"
                                colorbutton="black"
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <InputField
                            label="Telefono"
                            type="text"
                            id="Telefono-edit"
                            placeholder="Telefono"
                        />
                    </div>
                    <div className="col-5">
                        <InputField
                            label="Correo"
                            type="text"
                            id="Correo-edit"
                            placeholder="Correo"
                        />
                    </div>


                </div> */}
            </div>
        

    );



}