import { useState, useEffect } from "react";
import React from "react";
import { sha256 } from 'js-sha256'
import Cookies from 'js-cookie'
import { Navbar } from "../componentes/navbar.jsx";
import { getPropiedad } from "../api/apiPropiedad";
import { getCita } from "../api/apiCita.js";
import { activeLogin } from "../funciones/activeLogin.js"

import "../scss/propiedad.scss"



function Propiedad() {
    const [listado, setListado] = useState('')
    const username = Cookies.get('username')

    activeLogin()


    useEffect(() => {
            Propiedades()
            async function Propiedades() {
                setListado('')

                let getArray = await getPropiedad()
                getArray = await getArray.data
                getArray.reverse()

                let getCitas = await getCita()
                getCitas = getCitas.data

                
                let arrayFiltrado = getArray.filter((dato) => sha256(dato.vendor) == username)
                let arrayFiltradoCitas = getCitas.filter((dato) => sha256(dato.vendor) == username)

                let resultado = [];
                for (let i = 0; arrayFiltradoCitas.length > i; i++) {
                    resultado.push(arrayFiltradoCitas[i].propiedad)
                }

                let contador = {}
                resultado.forEach((valor) => {
                    contador[valor] = (contador[valor] || 0) + 1;
                  });


                const propiedadesDiv = await arrayFiltrado.map((data) =>
                    <div id='div-propiedad-cuadro' key={data._id}>
                        <h1 id='div-cuadro-rotulo'>{data.tipo} en {data.ciudad}</h1>
                        <p id='descripcion-propiedad'>{data.descripcion}</p>
                        <img id='img-propiedades' src={data.imagen != null ? data.imagen: '../../public/noPhoto.avif'} />
                        <ul>
                            <li>Habitaciones: {data.habitaciones}</li>
                            <li>Metros: {data.metros}</li>
                            <li>Altura: {data.altura}</li>
                            <li>Precio: {data.precio} €</li>
                            <li>Citas totales: {contador[data._id] > 0 ? contador[data._id] : '0'}</li>
                        </ul>
                    </div>
                )
                setListado(propiedadesDiv)
            }
    }, []); 




    return (
        <>
            <Navbar />
            <div id='propiedad-cuerpos'>
                <h1 id='rotulo-h1'>Tus propiedades</h1>
                <div id='div-propiedad-html'>
                    {listado}
                </div>
            </div>
        </>
    )
}



export {
    Propiedad
}