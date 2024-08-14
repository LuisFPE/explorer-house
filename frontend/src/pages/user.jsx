import { userLogin } from "../api/apiUser";
import { getCita, citaDelete } from "../api/apiCita.js";
import { getPropiedad } from '../api/apiPropiedad.js'
import { Navbar } from "../componentes/navbar.jsx";
import { useState, useEffect } from "react";
import { activeLogin } from "../funciones/activeLogin.js"

import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import '../scss/user.scss'


function UserPanel() {
    const [listCitas, setListCitas] = useState('')
    const [estadoBoton, setEstadoBoton] = useState(true);
    const [noDelete, setNoDelete] = useState('')

    activeLogin()

    useEffect(() => {
        if (estadoBoton) {
            Cita()
            async function Cita() {
                let listCita = await getCita()
                listCita = await listCita.data
                listCita = listCita.reverse()

                let listPropiedad = await getPropiedad()
                listPropiedad = await listPropiedad.data

                const name_ = Cookies.get('username')
                let listCitaArray = []
                let listCitaUni = []


                for (let i = 0; listCita.length > i; i++) {
                    if (name_ == sha256(listCita[i].username)) {
                        listCitaUni.push(listCita[i].username) //0
                        listCitaUni.push(listCita[i].date) //1
                        listCitaUni.push(listCita[i].vendor) //2
                        listCitaUni.push(listCita[i].state) //3
                        listCitaUni.push(listCita[i]._id) //4

                        for (let j = 0; listPropiedad.length > j; j++) {
                            if (listCita[i].propiedad == listPropiedad[j]._id) {
                                listCitaUni.push(`${listPropiedad[j].tipo} en ${listPropiedad[j].ciudad}`) //5
                                listCitaUni.push(listPropiedad[j].descripcion) //6
                                listCitaUni.push(listPropiedad[j].precio) //7
                                listCitaUni.push(listPropiedad[j].imagen) //8
                            }
                        }
                    }
                    listCitaArray.push(listCitaUni)
                    listCitaUni = []
                }

                let arrayFiltrado = listCitaArray.filter(objeto => Object.keys(objeto).length !== 0);

                const citasDiv = await arrayFiltrado.map((data) => 
                    <div id='div-citas' key={data[4]} className={data[3] == 'Solicitud aceptada' ? 'aceptada' : data[3] == 'Solicitud denegada' ? 'denegada' : 'pendiente'}>
                        <h3>{data[5]}</h3>
                        <p>Fecha: {data[1]}</p>
                        <p>Vendedor: {data[2]}</p>
                        <p>Precio: {data[7]} €</p>
                        <img id='div-img-cita' src={data[8] != null ? data[8]: '../../public/noPhoto.avif'} />
                        <p id='div-estado-cita'>Estado de cita: {data[3]}</p>
                        <input id={data[4]} className="div-button-delete" type="button" value="Eliminar cita" onClick={citaDeleteButton} />
                    </div>
                )
                setListCitas(citasDiv)
                setEstadoBoton(false)
            }
        }
    }, [estadoBoton]);




    async function citaDeleteButton(e) {
        const propiedadID = e.target.id
        let citaEstado = e.target.parentElement.childNodes[5].innerText

        if (citaEstado.includes('pendiente')) {
            const citaCrear = await citaDelete(propiedadID)
            setEstadoBoton(true);        
        } else {
            setNoDelete('No se permite eliminar citas cuando el vendedor ya ha dado una respuesta')

            setTimeout(() => {
                setNoDelete('')
            }, 7500);
        }
    }

    setInterval(() => {
        setEstadoBoton(true)
    }, 5000);




    return (
        <>
            <Navbar />
            <div id='user-html'>
                <div id='datos'>
                    <h1>Citas solicitadas:</h1>
                    <h4 id='div-citas-delete'>{noDelete}</h4>
                </div>
                <div id='citas'>
                    {listCitas}
                </div>
            </div>
        </>
    )
}



export {
    UserPanel
}
