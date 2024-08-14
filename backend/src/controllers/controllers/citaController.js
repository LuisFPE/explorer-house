import citaModel from "../../models/citaModel.js";


const getAll = async(userId=null)=> {
    try {
            const cita = await citaModel.find();
            return cita;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async(id) =>{
    try {
            const cita = await citaModel.findById(id);
            return cita;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const getByProperty = async(property,value) =>{
    try {
            const cita = await citaModel.find({[property]:value})
            return cita;
    } catch (error) {
        return null;
    }
}

const create = async(data) =>{
    try {
        const cita = await citaModel.create(data);
        return cita;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const oldcita = await citaModel.findByIdAndUpdate(id,data);
        const cita = await citaModel.findById(id);
        console.log("cita",cita);
        return cita;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const cita = await citaModel.findByIdAndDelete(id);
        return cita;
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