import propiedadController from "../controllers/propiedadController.js";

const getAll = async(req,res)=>{
    const propiedad = await propiedadController.getAll();
    res.json({data:propiedad})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const propiedad = await propiedadController.getById(id);
    res.json({data:propiedad});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const propiedad = await propiedadController.getByProperty(property,value);
    res.json({data:propiedad})
}

const create = async(req,res)=>{
    const propiedad = await propiedadController.create(req.body);
    res.json({data:propiedad})
}

const update = async(req,res)=>{
    const id = eq.params.id;
    const propiedad = await propiedadController.update(id,req.body);
    res.json({data:propiedad})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await propiedadController.remove(id);
    res.json({data:propiedad})
}

export default{
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}