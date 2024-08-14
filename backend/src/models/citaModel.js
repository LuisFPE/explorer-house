import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    username : {
        type: String,
        required: true
    },

    propiedad : {
        type: String,
        required: true
    },

    date : {
        type: Date,
        required: true
    },

    vendor : {
        type: String,
        required: true
    },

    place : {
        type: String,
    },

    state : {
        type: String
    },
})


const userModel = mongoose.model("cita",userSchema);

export default userModel;