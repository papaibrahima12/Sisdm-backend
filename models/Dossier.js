const mongoose = require('mongoose');
const user = require('./User')
const dossier = new mongoose.Schema({
    // idDossier:{
    //     type:mongoose.Types.ObjectId,
    //     required:true,
    //     index:true
    // },
    patient:{
        type:[user.schema],
    },
    antecedents:{
        type:String,
        required:true,
    },
    examensMedicaux:{
        type:String,
        required:true
    },
    listeTraitements : {
        type:String,
        required:true
    },
    listeConsultations:{
        type:[String],
        required:true
    }
})

const dossierModel = mongoose.model('dossier',dossier);
module.exports = dossierModel;