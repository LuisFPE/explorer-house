import { useState, useEffect } from "react";
import { getPropiedad } from "../api/apiPropiedad.js"
import { getCita, citaCreate } from "../api/apiCita.js"
import { userLogin } from "../api/apiUser.js";

import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import { activeLogin } from "../funciones/activeLogin.js"
import { FormatearFecha } from "../funciones/fecha.js"

import "../scss/index.scss"




function Index() {
    const [listado, setListado] = useState('')
    const [recarga, setRecarga] = useState(true)
    const user = Cookies.get('username')

    
    activeLogin()


    useEffect(() => {
        if (recarga) {
            Propiedades()
            async function Propiedades() {
                setListado('')
                const getAll = await getPropiedad()
                let getArray = await getAll.data
                getArray.reverse()

                const getCitas = await getCita()
                let getArrayCitas = await getCitas.data

                let userCitas = [];
                let userCitasUni = [];
                

                for (let i = 0; getArrayCitas.length > i; i++) {
                    if (sha256(getArrayCitas[i].username) == user) {
                        userCitasUni.push(getArrayCitas[i].propiedad)
                        userCitasUni.push(getArrayCitas[i].state)
                    }
                    userCitas.push(userCitasUni)
                    userCitasUni = []
                }

                let userCitasFiltrado = userCitas.filter(objeto => Object.keys(objeto).length !== 0);

                let propiedadesArray = []
                let propiedadesArrayUni = []

                for (let i = 0; getArray.length > i; i++) {
                    propiedadesArrayUni.push(getArray[i]._id) //0
                    propiedadesArrayUni.push(getArray[i].tipo) //1
                    propiedadesArrayUni.push(getArray[i].ciudad) //2
                    propiedadesArrayUni.push(getArray[i].descripcion) //3
                    propiedadesArrayUni.push(getArray[i].imagen) //4
                    propiedadesArrayUni.push(getArray[i].habitaciones) //5
                    propiedadesArrayUni.push(getArray[i].metros) //6
                    propiedadesArrayUni.push(getArray[i].altura) //7
                    propiedadesArrayUni.push(getArray[i].precio) //8
                    propiedadesArrayUni.push(getArray[i].vendor) //9
                    
                    for (let j = 0; userCitasFiltrado.length > j; j++) {
                        if (userCitasFiltrado[j][0] == getArray[i]._id) {
                            propiedadesArrayUni.push(userCitasFiltrado[j][1])
                        }
                    }
                    propiedadesArray.push(propiedadesArrayUni)
                    propiedadesArrayUni = []
                }
                

                const propiedadesDiv = await propiedadesArray.map((data) =>
                    <div id='div-pisos' key={data[0]}>
                        <h1>{data[1]} en {data[2]}</h1>
                        <p id='descripcion'>{data[3]}</p>
                        <img id='img-pisos' src={data[4] != null ? data[4]: '../../public/noPhoto.avif'} />
                        <ul>
                            <li>Habitaciones: {data[5]}</li>
                            <li>Metros: {data[6]}</li>
                            <li>Altura: {data[7]}</li>
                            <li>Precio: {data[8]} €</li>
                            <li>Vendedor: {data[9]}</li>
                        </ul>
                        <input id={data[0]} className="button-pisos" type="button" value={data[10] != undefined ? data[10] : (sha256(data[9]) == Cookies.get('username') ? 'Es tu propiedad' : 'Pedir cita') } onClick={newCita} />
                    </div>
                )
                setListado(propiedadesDiv)
                setRecarga(false)
            }
        }
    }, [recarga]); 
 



    async function newCita(e) {
        const citaPedida = e.target.attributes.value.value
        const propiedadID = e.target.id
        const vendor = e.target.parentElement.childNodes[4].previousElementSibling.childNodes[4].lastChild.data
        const id = Cookies.get('id')
        
        
        let listUser = await userLogin()
        listUser = listUser.data

        const fechaNow = await FormatearFecha(Date.now())

        let username;

        for (let i = 0; listUser.length > i; i++) {
            if(listUser[i]._id == id) {
                username = listUser[i].username
            }
        }

        const citaArrayNew = await {'username': username, 
                            'propiedad': propiedadID, 
                            'date': fechaNow, 
                            'vendor': vendor, 
                            'place': 'Plaza', 
                            'state': 'Solicitud pendiente de verificar'}

        const data = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaArrayNew),
            };

        if (citaPedida == 'Pedir cita') {
            const citaCrear = await citaCreate(data)
            setTimeout(() => {
                setRecarga(true)
            }, 300);
        }
    }




    return (
        <div id='index-cuerpo'>
            <Navbar />
            <h2 id="titulo-pagina">Pisos Disponibles:</h2>
            <div id='div-body'>
                {listado}
            </div>
            <div id="circulo-decoracion"></div>
            <div id="circulo-decoracion2"></div>
        </div>
    )
}




export {
    Index
}