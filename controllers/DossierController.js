const dossierModel = require('../models/Dossier')
const mongoose = require('mongoose'),
Dossier = mongoose.model('Dossier');
  
exports.findAllDossiers = async(req, res) => {
  try {
    const dossier  = await dossierModel.find();
    if(!dossier){
        return res.json({message:'No dossier found'})
    }
    return res.json({dossier:dossier})
} catch (error) {
    return res.json({ error: error.message });  
}
};

exports.addDossier = async(req, res) => {
  try {
    const { idDossier,patient,antecedents,examensMedicaux,listeTraitements,listeConsultations } = req.body;
    const dossierExist = await dossierModel.findOne({ idDossier: req.body.idDossier });
    if (dossierExist) {
        return res.json({ message: 'Dossier already exist with the given id' })
    }
    const dossier = new dossierModel(req.body);
    await dossier.save();
    
    return res.json({ success: true, message: 'Dossier successfully added', data: dossier })
} catch (error) {
    return res.json({ error: error });
}
};

exports.findDossierById = async(req, res) => {
  try {
    const dossier  = await dossierModel.findById(req.params.idDossier);
    if(!dossier){
        return res.json({message:'No dossier found with this id'})
    }
    return res.json({dossier:dossier})
} catch (error) {
    return res.json({ error: error.message });  
}
};

exports.updateDossier = async(req, res) => {
  try {
            const dossier  = await dossierModel.findById(req.params.idDossier);
            if(!dossier){
                return res.json({message:'No dossier found with this id'})
            }
            dossier.$getAllSubdocs = req.body;
            await dossier.save();
        } catch (error) {
            return res.json({ error: error });
        }
};

exports.deleteDossier = async(req, res) => {
  try {
          const dossier  = await dossierModel.findById(req.params.idDossier);
          if(!dossier){
                return res.json({message:'No dossier found with this id'})
          }
          await dossier.delete();
        } catch (error) {
            return res.json({ error: error });
        }
};