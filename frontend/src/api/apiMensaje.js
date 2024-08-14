async function getmensaje() {
  let mensaje = await fetch(`http://localhost:3015/mensaje`);
  mensaje = await mensaje.json();
  return (mensaje)
}


async function getmensajeByID(id) {
  let mensaje = await fetch(`http://localhost:3015/mensaje/${id}`);
  mensaje = await mensaje.json();
  return (mensaje)
}



async function mensajeCreate(data) {
    fetch('http://localhost:3015/mensaje', data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
        //console.log(update);
        }).catch(e => {
        //console.log(e);
        });
  }




  async function mensajeDelete(id) {
    try {
      const response = await fetch(`http://localhost:3015/mensaje/remove/${id}`, {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el mensaje (HTTP ${response.status})`);
      }
  
      const result = await response.json();
      //console.log('mensaje eliminado:', result);
    } catch (error) {
      //console.error('Error al eliminar el mensaje:', error);
    }
  }


  async function mensajeUpdate(id, data) {
    fetch(`http://localhost:3015/mensaje/update/${id}`, data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
        //console.log(update);
        }).catch(e => {
        //console.log(e);
        });
  }




  export {
    getmensaje,
    getmensajeByID,
    mensajeCreate,
    mensajeDelete,
    mensajeUpdate
  }