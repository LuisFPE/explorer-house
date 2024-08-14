import { useState, useEffect } from "react";
import { getPropiedad } from "../api/apiPropiedad.js"
import { getCita, citaCreate } from "../api/apiCita.js"
import { userLogin } from "../api/apiUser.js";
import { mensajeCreate } from "../api/apiMensaje.js"

import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import { activeLogin } from "../funciones/activeLogin.js"
import { FormatearFecha } from "../funciones/fecha.js"
import { Modal } from "../modal.jsx"

import "../scss/index.scss"




function Index() {
    const [listado, setListado] = useState('')
    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')
    const [mensajeEnviado, setMensajeEnviado] = useState('')
    const [mensajeRechazado, setMensajeRechazado] = useState('')
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
                        <div id='buttons-index'>
                            <input id={data[0]} className="button-pisos" type="button" value={data[10] != undefined ? data[10] : (sha256(data[9]) == Cookies.get('username') ? 'Es tu propiedad' : 'Pedir cita') } onClick={newCita} />
                            {sha256(data[9]) != Cookies.get('username') ? <input id={data[0]} className="button-mensaje" type="button" value="Mensaje al vendedor" onClick={async ()=>{setData(data)}} /> : <></>}
                        </div>
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
        const vendor = e.target.parentElement.parentNode.childNodes[3].childNodes[4].childNodes[1].data
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



    async function enviar(e) {
        setMensajeRechazado('')
        let userList = await userLogin()
        userList = await userList.data

        let userFiltrar = await userList.filter((dato) => sha256(dato.username) == user)
        userFiltrar = await userFiltrar[0].username

        console.log(e.target.attributes[3].value)

        const userMensaje = userFiltrar
        const textoMensaje = e.target.offsetParent.children[0].childNodes[3].lastChild.value
        const propiedadMensaje = e.target.attributes[3].value
        const dateMensaje = Date.now()
        const vendorMensaje = e.target.attributes[2].value

        
        const mensajeArrayNew = {'username': userMensaje, 
                                    'destino': vendorMensaje, 
                                    'propiedad': propiedadMensaje, 
                                    'mensaje': textoMensaje, 
                                    'date': dateMensaje,
                                    'estado': 'Pendiente' }

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeArrayNew),
        };


        if (textoMensaje !== undefined && textoMensaje.length > 5) {
            const mensajeCrear = await mensajeCreate(data)
            setMensajeEnviado('Su mensaje se ha enviado de forma correcta')

            setTimeout(() => {
                setData(null)
                setMensajeEnviado('')
            }, 5000);
            
        } else {
            setMensajeRechazado('Su mensaje no ha podido ser entregado, recargue la pagina y vuelva a intentarlo')
        }
    }



    async function cerrar() {
        setData(null)
        setMensajeRechazado('')
    }




    return (
        <div id='index-cuerpo'>
            <Navbar />
            <h2 id="titulo-pagina">Pisos Disponibles:</h2>

            {data && 
            <Modal isOpen={true}>

                <div id='completo'>
                    <h1 id='modal-enviado'>{mensajeEnviado}</h1>
                    <h1 id='modal-rechazado'>{mensajeRechazado}</h1>
                    <h1 id='modal-rotulo'>Enviar mensaje a {data[9]} sobre {data[1]} en {data[2]}</h1>
                    <div id='modal-form'>
                        <textarea id="modal-mensaje" placeholder="Escriba su mensaje" rows='20' cols='130' />
                    </div>
                    <div id='modal-buttons'>
                        <button className='buttonModal' onClick={cerrar}>Cerrar</button>
                        <button className='buttonModal' onClick={enviar} id={data[0]} vendor={data[9]} propiedad={`${data[1]} en ${data[2]}`}>Enviar</button>
                    </div>
                </div>

              </Modal>
            }

            <div id='div-body'>
                {listado}
            </div>
            <div className='div-circular' id="circulo-forma"></div>
            <div className='div-circular' id="circulo-forma2"></div>
            <div className='div-circular' id="circulo-forma3"></div>
            <div className='div-circular' id="circulo-forma4"></div>
        </div>
    )
}




export {
    Index
}