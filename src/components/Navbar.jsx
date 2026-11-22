// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-marca">
        ✈ Agencia de Viajes
      </Link>
      <nav className="navbar-enlaces">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/destinos">Destinos</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;