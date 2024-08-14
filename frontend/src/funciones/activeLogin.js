import Cookies from 'js-cookie';
import { userLogin } from '../api/apiUser.js';
import { sha256 } from 'js-sha256';
import { useNavigate } from "react-router-dom";




async function activeLogin() {
    const navigate = useNavigate();
    const usernameC = await Cookies.get('username')
    const passC = await Cookies.get('credential')

    let userList = await userLogin()
    userList = await userList.data
    

    for (let i = 0; userList.length > i; i++) {
        if(sha256(userList[i].username) != usernameC && userList[i].password != passC) {
            navigate("/");
        }
    }
}


export {
    activeLogin
}