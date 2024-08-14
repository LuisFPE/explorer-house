  async function getPropiedad() {
    let propiedad = await fetch(`http://localhost:3015/propiedad`);
    propiedad = await propiedad.json();
    return (propiedad)
  }


  
/*   const createPropiedad = async(propiedadData)=>{
    const result = await fetchData("http://localhost:3015/propiedad","post",propiedadData);
    return result;
  } */


  async function createPropiedad(data) {
    fetch('http://localhost:3015/propiedad', data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
        //console.log(update);
        }).catch(e => {
        console.log(e);
        });
  }

    

  async function findPropiedad(data) {
    fetch('http://localhost:3015/propiedad/find', data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
        //console.log(update);
        }).catch(e => {
        console.log(e);
        });
  }




  export {
    getPropiedad,
    createPropiedad,
    findPropiedad
  }