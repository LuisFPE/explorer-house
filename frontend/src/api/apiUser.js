async function userLogin() {
    let login = await fetch(`http://localhost:3015/user`);
    login = await login.json();
    return (login)
}



async function userCreate(data) {
  fetch('http://localhost:3015/user', data)
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
    userLogin,
    userCreate
  }