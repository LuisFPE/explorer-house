import citaController from "../controllers/citaController.js";

const getAll = async(req,res)=>{
    const cita = await citaController.getAll();
    res.json({data:cita})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const cita = await citaController.getById(id);
    res.json({data:cita});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const cita = await citaController.getByProperty(property,value);
    res.json({data:cita})
}

const create = async(req,res)=>{
    const cita = await citaController.create(req.body);
    res.json({data:cita})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const cita = await citaController.update(id,req.body);
    res.json({data:cita})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const cita = await citaController.remove(id);
    res.json({data:cita})
}

export default{
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}