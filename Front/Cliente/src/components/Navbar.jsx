import React from 'react';
export default function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <div className="navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mx-3">
                <a className="nav-link active" href="#">Clientes</a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">Entregas</a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">Recogidas</a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">Productos</a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">Soporte</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
