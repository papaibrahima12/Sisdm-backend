const mongoose = require('mongoose');

const user = new mongoose.Schema({
    prenom : {
        type:String,
        required:true,
        minLength : [4,'Le prenom doit etre au minimum 4 caracteres']
    },
    nom : {
        type:String,
        required:true,
        minLength : [3,'Le nom doit etre au minimum 4 caracteres']
    },
    email : {
        type:String,
        required:true,
        minLength : [4,'Le mail doit etre au minimum 4 caracteres']
    },
    telephone : {
        type:Number,
        required:true,
        minLength : [7,'Le telephone doit etre au minimum 7 chiffres']
    },
    groupeSanguin:{
        type:String,
        required:true,
        minLength:[2,'Le groupe sanguin doit etre au minimum deux caracteres']
    },
    password : {
        type:String,
        required:true,
        minLength : [8,'Le mot de passe doit etre au minimum 8 caracteres']
    },
    token : {
        type : String
    }

})

const userModel = mongoose.model('user',user);
module.exports = userModel;