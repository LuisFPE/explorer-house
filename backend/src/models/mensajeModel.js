import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    username : {
        type: String,
        required: true
    },

    destino : {
        type: String,
        required: true
    },

    propiedad : {
        type: String,
        required: true
    },

    mensaje : {
        type: String,
        required: true
    },

    date : {
        type: Date,
        required: false
    },

    estado : {
        type: String
    },

    mensajeOriginal : {
        type: String
    }



})


const userModel = mongoose.model("mensajes",userSchema);

export default userModel;