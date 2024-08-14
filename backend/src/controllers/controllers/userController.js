import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const getAll = async()=> {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}


const getById = async(id) =>{
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}


const getByProperty = async(property,value) =>{
    try {
        const user = await userModel.find({[property]:value})
        return user;
    } catch (error) {
        return null;
    }
}



async function login(username,password){
    try {
        if(!password ){
            return {error:"Falta la contraseña"};
        }
        let oldUser = await getByProperty('username', username);
        if(!oldUser){
            return {error:"La combinación de usuario y contraseña no es valida"};
        }

        const isPasswordCorrect = await bcrypt.compare(password,oldUser[0]['password']);
        console.log('contraseña nueva de ahora: ' + hash)
        console.log('contraseña original de antes: ' + oldUser[0]['password'])

        if(isPasswordCorrect){
            const token = jwt.sign({id:oldUser[0]['_id'],username:oldUser[0]['username']},process.env.JWT_SECRET,{expiresIn: 60 * 60})
            console.log('esta linea es todo el token necesario: ' + token)
            return {data:"El usuario se ha logueado correctamente",token};
        }
        else{
            return {error:"la combinación de usuario y contraseña no es valida"}
        }
    } catch (error) {
        console.error(error);
        return {error:"Hay un error en el login"}
    }
}



const create = async(data) =>{
    try {
        const user = await userModel.create(data);
        return user;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}




const register = async(username,password,passwordRepeat) => {
    try {
        if(!password || !passwordRepeat){
            return {error:"Falta la contraseña"};
        }
        if(password !== passwordRepeat){
            return {error:"Las contraseñas no coinciden"};
        }
        const {data:oldUser} = await getByProperty('username', username);
        if(oldUser){
            return {error:"El usuario ya existe"};
        }
        const userData = {
            username,
            password
        }
        const newUser = await create(userData);
        return {data:newUser};
    } catch (error) {
        console.error(error);
        return {error:"Error en el registro"}
    }
}




const update = async(id,data) =>{
    try {
        const oldUser = await userModel.findByIdAndUpdate(id,data);
        const user = await userModel.findById(id);
        console.log("Usuario",user);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}


const remove = async(id) =>{
    try {
        const user = await userModel.findByIdAndDelete(id);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}













export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    login,
    register,
    update,
    remove
}

export default functions;