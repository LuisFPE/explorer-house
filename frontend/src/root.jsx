import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sha256 } from 'js-sha256';
import Cookies from 'js-cookie';

import { userLogin, userCreate } from './api/apiUser';


import './scss/login.scss'

const Root = () => {
    const [mensaje, setMensaje] = useState('')

    const navigate = useNavigate();

    async function login(e) {
        setMensaje('')
        const username_ = e.target.form[0].value
        const password = sha256(e.target.form[1].value)

        let userList = await userLogin()
        userList = await userList.data
        

        for (let i = 0; userList.length > i; i++) {
            if(userList[i].username == username_ && userList[i].password == password) {
                setMensaje('')
                Cookies.set('username', sha256(username_));
                Cookies.set('credential', password);
                Cookies.set('id', userList[i]._id)
                Cookies.set('role', userList[i].role)
                navigate("/index");
            } else {
                setMensaje('Su usuario o contraseña no coinciden')
            }
        }
    }



    async function create(e) {
        setMensaje('')
        const username = e.target.form[0].value
        const password = sha256(e.target.form[1].value)
        const repeatPassword = sha256(e.target.form[2].value)

        let userList = await userLogin()
        userList = await userList.data

        let userUser = false;
        for (let i = 0; userList.length > i; i++) {
            if(userList[i].username == username) {
                userUser = true;
            }
        }

        if (username.length < 1 || password.lenght < 1 || repeatPassword < 1) {
            setMensaje('Debe rellenar todos los campos para poder crear un nuevo usuario')
        } else if (userUser) {
            setMensaje('El username elegido ya existe, debe elegir otro')
        } else if (password != repeatPassword) {
            setMensaje('Las contraseñas elegidas no coinciden entre ellas')
        } else {

            let form_name = document.getElementById('form-name')
            form_name.value = ''     
            let form_pass = document.getElementById('form-pass')
            form_pass.value = ''  
            let form_repass = document.getElementById('form-repass')
            form_repass.value = ''                                 

            setMensaje('Su usuario se ha creado correctamente')

            const userArrayNew = {'username':username, 'password':password, 'role':'user'}

            const data = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(userArrayNew),
                };

            const userCrear = await userCreate(data)
        }
    }






    return (
        <div>
            <div id='login-header'>
                <div id='login-center'>
                    <h1>Bienvenido a <i>Explorer House</i></h1>
                    <p>Plataforma especializada en la intermediación de operaciones de compra y venta de propiedades inmobiliarias, donde garantizamos el contacto directo con los legítimos propietarios. Además, ofrecemos la posibilidad de gestionar citas personalizadas con los propietarios para que puedan mostrar personalmente la propiedad a los interesados.</p>
                    <p>Para acceder a nuestra plataforma, le invitamos a crear una cuenta de usuario que nos permitirá contar con sus datos y ofrecerle una atención más personalizada. Si ya dispone de una cuenta, simplemente inicie sesión para explorar nuestra extensa selección de propiedades inmobiliarias disponibles.</p>
                    <p id='mensaje'>{mensaje}</p>
                </div>
            </div>

            <div id='login-html'>
                <div id='login-cuadro-inicio'>
                    <form id='login-inicio'>
                        <h2>Iniciar sesion</h2>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <input id='login-submit' type="button" value="Iniciar sesion" onClick={login} />
                    </form>
                </div>
                <div id='login-cuadro-nuevo'>
                    <form id='login-nuevo'>
                        <h2>Crear nuevo usuario</h2>
                        <input type="text" id='form-name' placeholder='Username' />
                        <input type="password" id='form-pass' name="Password" placeholder='Password' />
                        <input type="password" id='form-repass' name="RepeatPassword" placeholder='Repeat Password' />
                        <input id='login-submit' type="button" value="Crear usuario" onClick={create} />
                    </form>
                </div>
            </div>
            <div className='div-circular' id="circulo-forma"></div>
            <div className='div-circular' id="circulo-forma2"></div>
            <div className='div-circular' id="circulo-forma3"></div>
            <div className='div-circular' id="circulo-forma4"></div>
        </div>
    )
};

export {
    Root
}