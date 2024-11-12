import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login.jsx'
import CrearCliente from './Pages/Admin/Clientes/CrearCliente.jsx'
import CrearEquipo from './Pages/Admin/Equipo/crearEquipo.jsx'
import CrearTipoEquipo from './Pages/Admin/Equipo/TipoEquipo.jsx'
import ConsultarCliente from './Pages/Admin/Clientes/ConsultarCliente.jsx'


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/CrearCliente' element={<CrearCliente />} />
        <Route path='/CrearEquipo' element={<CrearEquipo />} />
        <Route path='/CrearTipoEquipo' element={<CrearTipoEquipo />} />
        <Route path='/ConsultarCliente' element={<ConsultarCliente />} />
      </Routes>
    </BrowserRouter>
    
  )
}

