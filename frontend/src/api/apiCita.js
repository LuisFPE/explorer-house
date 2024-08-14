async function getCita() {
  let cita = await fetch(`http://localhost:3015/cita`);
  cita = await cita.json();
  return (cita)
}


async function getCitaByID(id) {
  let cita = await fetch(`http://localhost:3015/cita/${id}`);
  cita = await cita.json();
  return (cita)
}



async function citaCreate(data) {
    fetch('http://localhost:3015/cita', data)
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




  async function citaDelete(id) {
    try {
      const response = await fetch(`http://localhost:3015/cita/remove/${id}`, {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar la cita (HTTP ${response.status})`);
      }
  
      const result = await response.json();
      //console.log('Cita eliminada:', result);
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
  }


  async function citaUpdate(id, data) {
    fetch(`http://localhost:3015/cita/update/${id}`, data)
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
    getCita,
    getCitaByID,
    citaCreate,
    citaDelete,
    citaUpdate
  }