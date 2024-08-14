import { useState, useEffect } from "react";
import { mensajeCreate, getmensaje, getmensajeByID, mensajeUpdate } from "../api/apiMensaje.js"
import { getPropiedad } from "../api/apiPropiedad.js"
import { Modal } from "../modal.jsx";

import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import { FormatearFecha } from "../funciones/fecha.js"
import { activeLogin } from "../funciones/activeLogin.js"

import "../scss/mensaje.scss"


function Mensajes() {
    const [recarga, setRecarga] = useState(true)
    const [listaMensajes, setListaMensajes] = useState('')
    const [data, setData] = useState('')
    const [mensajeEnviado, setMensajeEnviado] = useState('')
    const [mensajeRechazado, setMensajeRechazado] = useState('')

    activeLogin()


    useEffect(() => {
        buscarMensajes()
        async function buscarMensajes() {
            if (recarga) {
                let getMensajes = await getmensaje()
                getMensajes = await getMensajes.data 
                getMensajes.reverse()

                let getPropiedades = await getPropiedad()
                getPropiedades = await getPropiedades.data

                let mensajesFiltrados = getMensajes.filter((data) => sha256(data.destino) == Cookies.get('username'))
                
                const mensajesDiv = await mensajesFiltrados.map((data) => 
                    <div key={data._id} id={data.estado == 'Pendiente' ? 'div-mensaje-cuadro-pendiente' : 'div-mensaje-cuadro-visto'}>
                        <ul>
                            <li>Fecha: {data.date}</li>
                            <li>Usuario: {data.username}</li>
                            <li>Estado: {data.estado}</li>
                            <li>Propiedad: {data.propiedad}</li>
                            {data.mensajeOriginal != undefined ? <li>Mensaje anterior: {data.mensajeOriginal}</li> : <></>}
                            <li>Mensaje: {data.mensaje}</li>
                        </ul>
                        <div id='div-mensaje-cuadro-buttons'>
                            <input id={data._id} estado={data.estado} type="button" value="Visto" className="buttons-mensaje" onClick={mensajeVisto}/>
                            <input id={data._id} type="button" value="Contestar" className="buttons-mensaje" onClick={async ()=>{setData(data)}}/>
                        </div>
                    </div>
                
                )

                setListaMensajes(mensajesDiv)
                setRecarga(false)
            }
        }
    }, [recarga]); 




    async function mensajeVisto(e) {
        const buttonID = e.target.id
        const buttonEstado = e.target.attributes.estado.value

        const mensajeArrayUpdate = {'estado': 'Visto'}

        const data = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeArrayUpdate),
            };

            if (buttonEstado === 'Pendiente') {
                const mensajeEstadoCambiar = await mensajeUpdate(buttonID, data)
                setRecarga(true)
            }
    }





    async function enviar(e) {
        setMensajeRechazado('')

        const mensajeOriginalID = e.target.id

        let mensajeContestar = await getmensajeByID(mensajeOriginalID)
        mensajeContestar = mensajeContestar.data

        const textoMensaje = e.target.offsetParent.children[0].childNodes[3].lastChild.value

        const mensajeArrayUpdate = {'estado': 'Respondido'}
      
        const dataActualizar = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeArrayUpdate),
            };        


        
        const mensajeArrayConst = {'username': mensajeContestar.destino, 
                                    'destino': mensajeContestar.username, 
                                    'propiedad': mensajeContestar.propiedad,
                                    'mensaje': textoMensaje, 
                                    'mensajeOriginal': mensajeContestar.mensaje,
                                    'date': Date.now(),
                                    'estado': 'Pendiente' }

        const dataResponder = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeArrayConst),
        }


        if (textoMensaje !== undefined && textoMensaje.length > 5 && mensajeContestar.estado != 'Respondido') {
            const mensajeCrear = await mensajeCreate(dataResponder)
            const mensajeEstadoCambiar = await mensajeUpdate(mensajeOriginalID, dataActualizar)
            setMensajeEnviado('Su mensaje se ha enviado de forma correcta')
            setRecarga(true)

            setTimeout(() => {
                setData(null)
                setMensajeEnviado('')
                setRecarga(true)
            }, 5000);
            
        } else if (mensajeContestar.estado == 'Respondido') {
            setMensajeRechazado('Ya has respondido a este mensaje')
        } else {
            setMensajeRechazado('Su mensaje no ha podido ser entregado, recargue la pagina y vuelva a intentarlo')
        }
    }




    async function cerrar() {
        setData(null)
        setMensajeRechazado('')
        setRecarga(true)
    }

    

    setInterval(() => {
        setRecarga(true)
    }, 5000);







    return (
        <>
            <Navbar />
            <div id='mensajes-cuerpo'>
                <h1>Mensajes recibidos</h1>


                {data &&
                <Modal isOpen={true}>

                    <div id='modal-completo'>
                        <h1 id='modal-enviado'>{mensajeEnviado}</h1>
                        <h1 id='modal-rechazado'>{mensajeRechazado}</h1>
                        <h1 id='modal-rotulo'>Contestar a {data.username}</h1>
                        <div id='modal-form'>
                            <textarea id="modal-mensaje" placeholder="Escriba su mensaje" rows='20' cols='130' />
                        </div>
                        <div id='modal-buttons'>
                            <button className='buttonModal' onClick={cerrar}>Cerrar</button>
                            <button className='buttonModal' onClick={enviar} id={data._id} vendor={data.vendor}>Enviar</button>
                        </div>
                    </div>

                </Modal>
                }


                <div id='div-mensajes'>
                    {listaMensajes}
                </div>
            </div>
        </>
    )
}



export {
    Mensajes
}