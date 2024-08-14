import userController from "../controllers/userController.js";


const getAll = async(req,res)=>{
    const users = await userController.getAll();
    res.json({data:users});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const user = await userController.getById(id);
    res.json({data:user});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const users = await userController.getByProperty(property,value);
    res.json({data:users})
}

const registerForm = async(req,res) => {
    res.render('./user/register.pug')
}


const register = async(req,res)=>{
    const {username,password,passwordRepeat} = req.body;
    const {error,data} = await userController.register(username,password,passwordRepeat);
    if(error){
        res.status(400).json({error});
    }
    else{
        res.redirect('/login')
    }
}



const loginForm = async(req,res) => {
    res.render('./user/login.pug')
}


const login = async(req,res) => {    
    const {username,password} = req.body;
    const {error,data} = await userController.login(username,password);
    if(error){
        res.status(400).json({error});
    }
    else{
        res.redirect('/setup')
    }
}


const create = async(req,res)=>{
    const user = await userController.create(req.body);
    res.json({data:user})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const user = await userController.update(id,req.body);
    res.json({data:user})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const user = await userController.remove(id);
    res.json({data:user})
}



export default{
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove,
    registerForm,
    register, 
    loginForm,
    login
}