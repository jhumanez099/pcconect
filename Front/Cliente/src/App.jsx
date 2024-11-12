import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login.jsx'
import CrearClientes from './Pages/Admin/Clientes/CrearCliente.jsx'
import CrearEquipo from './Pages/Admin/Equipo/crearEquipo.jsx'
import CrearTipoEquipo from './Pages/Admin/Equipo/TipoEquipo.jsx'


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/CrearCliente' element={<CrearClientes />} />
        <Route path='/CrearEquipo' element={<CrearEquipo />} />
        <Route path='/CrearTipoEquipo' element={<CrearTipoEquipo />} />
      </Routes>
    </BrowserRouter>
    
  )
}

