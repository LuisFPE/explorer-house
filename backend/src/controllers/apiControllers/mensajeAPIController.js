import mensajeController from "../controllers/mensajeController.js";

const getAll = async(req,res)=>{
    const mensaje = await mensajeController.getAll();
    res.json({data:mensaje})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const mensaje = await mensajeController.getById(id);
    res.json({data:mensaje});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const mensaje = await mensajeController.getByProperty(property,value);
    res.json({data:mensaje})
}

const create = async(req,res)=>{
    const mensaje = await mensajeController.create(req.body);
    res.json({data:mensaje})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const mensaje = await mensajeController.update(id,req.body);
    res.json({data:mensaje})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const mensaje = await mensajeController.remove(id);
    res.json({data:mensaje})
}

export default{
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}