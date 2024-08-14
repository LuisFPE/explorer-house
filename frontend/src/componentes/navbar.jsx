import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie'
import { sha256 } from 'js-sha256'
import { FaHome, FaUser, FaBuilding, FaMapMarkerAlt, FaWarehouse, FaAddressBook, FaUserMinus, FaUserAltSlash, FaPlusCircle, FaSearch, FaInbox } from 'react-icons/fa';


import '../scss/navbar.scss'
import { useState, useEffect } from "react";

import { getCita } from "../api/apiCita.js"
import { userLogin } from "../api/apiUser.js"
import { getmensaje } from "../api/apiMensaje.js";


const Navbar = () => {
    const [aviso, setAviso] = useState('')
    const [navClass, setNavClass] = useState('link-admin')
    const [navEmergente, setNavEmergente] = useState('')
    const [user, setUser] = useState('')

    const [mensajes, setMensajes] = useState('')
    const [navMensaje, setNavMensaje] = useState('')
    const [avisoMensaje, setAvisoMensaje] = useState('')
    const [navClassMensaje, setNavClassMensaje] = useState('link-admin')

    const [recarga, setRecarga] = useState('true')

    const role = Cookies.get('role')

    async function logout() {
        Cookies.remove('username')
        Cookies.remove('credential')
        Cookies.remove('id')
        Cookies.remove('role')
    }

    useEffect(() => {
        if (recarga) {
            revisarAviso()
            async function revisarAviso() {
                let allCitas = await getCita()
                allCitas = await allCitas.data

                let arrayFiltrado = allCitas.filter((citas) => sha256(citas.vendor) == Cookies.get('username'));
                arrayFiltrado = arrayFiltrado.filter((citas2) => citas2.state == 'Solicitud pendiente de verificar')

                if (arrayFiltrado.length > 0) {
                    setAviso('nav-aviso') 
                    setNavClass('')
                    setNavEmergente(`Tiene ${arrayFiltrado.length} nuevas solicitudes de citas`)
                } else {
                    setAviso('') 
                    setNavClass('link-admin');
                    setNavEmergente('')
                } 
            }
            setRecarga(false)
        }
    }, [recarga]);


    usuarioLogin()
    async function usuarioLogin() {
        let getUsuarios = await userLogin()
        getUsuarios = getUsuarios.data

        let usuarioFiltrado = getUsuarios.filter((dato) => sha256(dato.username) == Cookies.get('username'))

        if (usuarioFiltrado.length > 0) {
            usuarioFiltrado = usuarioFiltrado[0].username
            setUser(usuarioFiltrado)
        }

    }

    useEffect(() => {
        if (recarga) {
            revisarMensajes()
            async function revisarMensajes() {
                let getMensajes = await getmensaje()
                getMensajes = getMensajes.data

                let mensajesFiltrados = getMensajes.filter((data) => sha256(data.destino) == Cookies.get('username') && data.estado == 'Pendiente')
                
                if (mensajesFiltrados.length > 0) {
                    setAvisoMensaje('nav-aviso') 
                    setNavClassMensaje('')
                    setNavMensaje(`Tiene ${mensajesFiltrados.length} mensajes nuevos`)
                } else {
                    setAvisoMensaje('') 
                    setNavClassMensaje('link-admin');
                    setNavMensaje('')
                } 
            }
            setRecarga(false)
        }
    }, [recarga]);


    setInterval(() => {
        setRecarga(true)
    }, 10000);




    return (
        <div id='navbar-global'>
            <nav>
                <div id='div-links'>
                    <img id='logo-navbar' src="../../public/explorerhouselogo.jpg" />

                    <NavLink to="/index" className='link'><FaHome /> Index</NavLink>
                    {/* <NavLink to="/buscador" className='link'><FaSearch /> Buscador</NavLink> */}
                    <NavLink to="/user" className='link'><FaUser /> User panel</NavLink>
                    {role == 'admin' ? <NavLink to="/new" className={navClass} id={aviso} title={navEmergente}><FaBuilding /> Alta y Citas</NavLink> : <></>}
                    {role == 'admin' ? <NavLink to="/propiedades" className='link'><FaBuilding /> Propiedades</NavLink> : <></>}
                

                    <NavLink to="/mensajes" className={navClassMensaje} id={avisoMensaje} title={navMensaje}><FaInbox /> Inbox</NavLink>
                    <NavLink to="/" className='link' onClick={logout}><FaUserAltSlash /> Logout {user}</NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};



export {
    Navbar
}