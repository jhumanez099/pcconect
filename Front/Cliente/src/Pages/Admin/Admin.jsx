import './Admin.css'

import Clientes from "../Admin/Clientes/Clientes"

export default function Admin() {

    const componentsContext ={
        Clientes: <Clientes>  </Clientes>

    };


    return (
        <div className="container-fluid">
        <div className="row">
        <nav id="sidebar" className='col-md-3 col-lg-2 d-md-block sidebar p-0'>
            <div className="position-sticky bg-lista">
                <ul className="nav flex-column fs-5">
                <li className="nav-item lista-items">
                    <a className="nav-link nav-admin active bg-white text-dark">
                    ADMINISTRADOR
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Document_type')} >
                    <span>Tipo Documento</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('User_Type')}>
                    <span>Tipo Usuario</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Proyect_Type')} >
                    <span>Tipo de proyecto</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Event_Types')}>
                    <span>Tipo Evento</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Headquarters')}>
                    <span>Sedes</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Programas')}>
                    <span>Programas</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Faculties')}>
                    <span>Facultades</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Conferences')}>
                    <span>Conferencias</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Proyects')}>
                    <span>Proyectos</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Proyect_User')}>
                    <span>Usuarios por proyecto</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Project_Role')}>
                    <span>Rol por proyecto</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('User_Conferences')}>
                    <span>Usuarios por conferencia</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('User_Events')}>
                    <span>Usuarios por Evento</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-dark" onClick={() => showPagesContext('Other_Events')}>
                    <span>Otros Eventos</span>
                    </a>
                </li>
                <li className="nav-item lista-items">
                    <a className="nav-link nl text-black" style={{ backgroundColor: 'red' }} onClick={() => logout()} >
                    <span>Logout</span>
                    </a>
                </li> 
                </ul>
            </div>
            </nav>
            <Context componentPage={componentsContext} stadePage={currentView}/>
        </div>
        </div>
    )
    }