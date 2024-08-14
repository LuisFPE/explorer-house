import mensajeModel from "../../models/mensajeModel.js";


const getAll = async(userId=null)=> {
    try {
            const mensaje = await mensajeModel.find();
            return mensaje;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async(id) =>{
    try {
            const mensaje = await mensajeModel.findById(id);
            return mensaje;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const getByProperty = async(property,value) =>{
    try {
            const mensaje = await mensajeModel.find({[property]:value})
            return mensaje;
    } catch (error) {
        return null;
    }
}

const create = async(data) =>{
    try {
        const mensaje = await mensajeModel.create(data);
        return mensaje;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const oldmensaje = await mensajeModel.findByIdAndUpdate(id,data);
        const mensaje = await mensajeModel.findById(id);
        console.log("mensaje",mensaje);
        return mensaje;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const mensaje = await mensajeModel.findByIdAndDelete(id);
        return mensaje;
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
    update,
    remove
}

export default functions;