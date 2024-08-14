import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import { FaShoppingCart, FaHome, FaUser, FaUserPlus, FaBuilding, FaMapMarkerAlt, FaWarehouse, FaAddressBook, FaCoins, FaUserMinus } from 'react-icons/fa';
const NavBar = () => {


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [allInmuebles, setInmuebles] = useState([{
    "_id": {
      "$oid": "666707f7ba0808dc296a3cbf"
    },
    "tipo": "piso",
    "ciudad": "Bilbao",
    "descripcion": "Piso amueblado y exterior",
    "habitaciones": 3,
    "metros": 80,
    "altura": 4,
    "precio": 180000,
    "__v": 0,
    "imagen": "../../public/piso.jpg"
  },
  {
    "_id": {
      "$oid": "666709b26237d39fc8cbaa06"
    },
    "tipo": "altillo",
    "ciudad": "Olabeaga",
    "descripcion": "Piso amueblado, recien reformado, interior",
    "habitaciones": 2,
    "metros": 60,
    "altura": 4,
    "precio": 150000,
    "__v": 0,
    "imagen": "../../public/altillo.webp"
  },
  {
    "_id": {
      "$oid": "666709e66237d39fc8cbaa08"
    },
    "tipo": "casa",
    "ciudad": "Zorroza",
    "descripcion": "Casa rustica, buena comunicacion",
    "habitaciones": 6,
    "metros": 110,
    "altura": 2,
    "precio": 220000,
    "__v": 0,
    "imagen": "../../public/casa.jpg"
  }]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (url) => {
    window.location.href = url;
  };

  const buscarporprecio = (rango1,rango2) => {

    const filteredInmuebles = allInmuebles.filter(inmueble => inmueble.precio >= rango1 && inmueble.precio <= rango2);
    
    setInmuebles(filteredInmuebles);

    setDropdownOpen(false);

   

  };

  const handlelogout = () => {
    // Lógica para el logout
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <header className="cabecera">
      <ul className="cabecera__nav">
        <li className="cabecera__left">
          <img src="src/components/navbar/explorerhouselogo.jpg" alt="Logo" className="cabecera_icon" />
        </li>
        <li>
          <button className="boton"onClick={() => handleNavigation('/')}><FaHome /> Inicio</button>
        </li>
        <li className="dropdown">
  <button onClick={toggleDropdown} className="dropdown__toggle boton">
    <FaBuilding /> Inmuebles
  </button>
  {dropdownOpen && (
    <ul className="dropdown__menu">
      <li><b><p  className="texto">Buscar por precio</p></b></li>
      <li><button onClick={() => buscarporprecio(70000,150000)}><FaCoins /> 70000-150000</button></li>
      <li><button onClick={() => buscarporprecio(150001,300000)}><FaCoins /> 150001-300000</button></li>
      <li><button onClick={() => buscarporprecio(300001,500000)}><FaCoins /> 300001-500000</button></li>
      <li><button onClick={() => buscarporprecio(500001,2000000)}><FaCoins /> 500001 +</button></li>
    </ul>
  )}
</li>
        <li>
          <button className="boton" onClick={() => handleNavigation('/login')}><FaUserPlus /> Login/Register </button>
        </li>
        <li>
          <button className="boton" onClick={() => handlelogout()}><FaUserMinus />Logout</button>
        </li>
        <li>
        <button className="boton" onClick={() => handleNavigation('/usuario')}>
          <img src="src/components/navbar/usuario.png" alt="Usuario" className="usuario" />
          </button>
        </li>
        <li>
        <img src="src/components/navbar/explorerhouselogo.jpg" alt="Logo" className="cabecera_icon" />
        </li>
      </ul>
      
    </header>
    <img src="src/components/navbar/linea.jpg" alt="" className="linea"/>
    <br></br>
    <br></br>
    </>
  );
}

export default NavBar;
