const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../model/User')
const fileSystem = require('fs')

exports.signin = (req, res, next)=> {

    const saltRound = 10
    bcrypt.hash(req.body.password, saltRound)
    .then(hash=> {
        
        const user = new userModel({...req.body, password : hash, imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}) 
        user.save()
        .then(()=> res.status(201).json({message : "subscribe is ok"}))
        .catch(error => {
            fileSystem.unlink("images/" + req.file.filename, ()=>{
                res.status(401).json({error})
            })
            
        })

    })
    .catch(error => {
        fileSystem.unlink("images/" + req.file, ()=> {
            res.status(401).json({error})
        })
        
    })
}

exports.login = (req, res, next)=> { 
    
    userModel.findOne({username : req.body.username})
    .then(data=> {
        
        if(!data) {
            res.status(401).json({error : "Wrong username"})
            return
        } 

        bcrypt.compare(req.body.password, data.password)
        .then(result=> {
            
            if(!result) {return res.status(401).json({message : "Wrong password"})}

            const token = jwt.sign({username : data.username, avatar : data.imageUrl}, "THIS_IS_MY_CHAT", {expiresIn : "24h"})
            
            res.status(200).json({token})
        })
        .catch(error => res.status(501).json({error}))
    })
    .catch(error => res.status(401).json({message : "Wrong username"}))
}