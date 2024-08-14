import propiedadModel from "../../models/casasModel.js";


const getAll = async(userId=null)=> {
    try {
            const propiedad = await propiedadModel.find();
            return propiedad;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async(id) =>{
    try {
            const propiedad = await propiedadModel.findById(id);
            return propiedad;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const getByProperty = async(property,value) =>{
    try {
            const propiedad = await propiedadModel.find({[property]:value})
            return propiedad;
    } catch (error) {
        return null;
    }
}

const create = async(data) =>{
    try {
        const propiedad = await propiedadModel.create(data);
        return propiedad;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const oldpropiedad = await propiedadModel.findByIdAndUpdate(id,data);
        const propiedad = await propiedadModel.findById(id);
        console.log("propiedad",propiedad);
        return propiedad;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const propiedad = await propiedadModel.findByIdAndDelete(id);
        return propiedad;
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