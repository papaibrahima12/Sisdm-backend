const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const userModel = require('../models/User');
const dossierModel = require('../models/Dossier');
const isAuthenticated = require('../middleware/auth');

const dossierController = require("../controllers/DossierController");

routes.put("/folders/update/:id",async(folder,id)=>{
    return dossierController.updateFolder(folder,id);
})

routes.delete("/folders/folder/:id",async(id)=>{
    return dossierController.deleteFolder(id);
})

routes.post("/addUser",async (req,res)=> {
    try {
        const { prenom,nom,email,telephone,password } = req.body;
        if (!prenom || !nom|| !email || !telephone || !password) {
            return res.json({ message: 'Please enter all the details' })
        }

        const userExist = await userModel.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({ message: 'User already exist with the given email' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new userModel(req.body);
        await user.save();
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.cookie({ 'token': token }).json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        return res.json({ error: error });
    }
})

routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        const userExist = await userModel.findOne({email:req.body.email});
        if(!userExist){
            return res.json({message:'Wrong credentials'})
        }
        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched){
            return res.json({message:'Wrong credentials pass'});
        }
        const token = await jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.cookie({"token":token}).json({success:true,message:'LoggedIn Successfully'})
    } catch (error) {
        return res.json({ error: error });
    }

})

routes.get('/user',isAuthenticated, async (req, res) => {
    try {
        const user  = await userModel.find();
        if(!user){
            return res.json({message:'No user found'})
        }
        return res.json({user:user})
    } catch (error) {
        return res.json({ error: error });  
    }
})

routes.get('/folders', async (req, res) => {
    try {
        const dossier  = await dossierModel.find();
        if(!dossier){
            return res.json({message:'No dossier found'})
        }
        return res.json({dossier:dossier})
    } catch (error) {
        return res.json({ error: error.message });  
    }
})

routes.get('/folders/:id', async (req,res) => {
    try {
        const dossier  = await dossierModel.findById(req.params.idDossier);
        if(!dossier){
            return res.json({message:'No dossier found with this id'})
        }
        return res.json({dossier:dossier})
    } catch (error) {
        return res.json({ error: error.message });  
    }
})

routes.post('/addFolder',async(req,res)=>{
    try {
        const { idDossier,patient,antecedents,examensMedicaux,listeTraitements,listeConsultations } = req.body;
        const dossierExist = await dossierModel.findOne({ idDossier: req.body.idDossier });
        if (dossierExist) {
            return res.json({ message: 'Dossier already exist with the given id' })
        }
        const dossier = new dossierModel(req.body);
        await dossier.save();
        
        return res.json({ success: true, message: 'Folder successfully added', data: dossier })
    } catch (error) {
        return res.json({ error: error });
    }
})
routes.put('/folders/update/:id',async(req,res)=>{
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
})

routes.delete('/folders/:id',async(req,res)=>{
    try {
        const dossier  = await dossierModel.findById(req.params.idDossier);
        if(!dossier){
            return res.json({message:'No dossier found with this id'})
        }
        await dossier.delete();
    } catch (error) {
        return res.json({ error: error });
    }
})
module.exports = routes