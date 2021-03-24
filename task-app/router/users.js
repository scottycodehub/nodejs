const express = require('express')

require('../db/mongoose')
const User = require('../db/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users',  async (req,res) => {
    console.log(req.body)
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthenticateToken()
        
        res.status(201)
        res.send({user,token})
    }catch(e){
        res.status(400)
        res.send(e)
    }
})
router.post('/users/logout', auth, async (req,res) =>{
    try{
        const token = req.token
        req.user.tokens = req.user.tokens.filter((t)=>{
            return t.token !== token
        })
        await req.user.save()
        res.send('logout successfully')
    }catch(e){
        console.log(e)
        res.status(500)
        res.send(e) 
    }
})

router.post('/users/logoutall', auth, async (req,res) =>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('logout all successfully')
    }catch(e){
        console.log(e)
        res.status(500)
        res.send(e) 
    }
})

router.post('/users/login',  async (req,res) =>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthenticateToken()
        res.send({user,token})
    }catch(e){
        console.log(e)
        res.status(400)
        e.reason = "Unable to identify user!"
        res.send(e) 
    }
})
router.get('/users/me', auth, async (req,res) => {
    try{
        res.send(req.user)
    }catch(e){
        res.status(500)
        res.send(e)
    }
})
router.get('/users/:id', async (req,res) => {
    const _id = req.params.id
    console.log(_id)
    try{
        const user = await User.findById(_id)
        if(!user){
            console.log("no user found")
            res.status(404).send() 
        }
        else
            res.send(user)
    }catch(e){
        res.status(500)
        error.reason = "Unable to identify record using the provided ID: " + _id
        res.send(e)
    }
})





router.patch('/users/:id',async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedAtt = ['name','email','password','age']
    const isvalid = updates.every((update) => allowedAtt.includes(update))
    if(!isvalid){
        res.status(400)
        return res.send("invalid updates") 
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update) =>{
            user[update] = req.body[update]
        })
        await user.save()
        if(!user){
            return res.status(404).send("No user can be updated")
        }
        res.status(201)
        res.send(user)
    }catch(e){
        res.status(400)
        res.send(e)
    }
})



router.delete('/users/:id', async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send("No user can be deleted")
        }
        res.status(201)
        res.send(user)
    }catch(e){
        res.status(400)
        res.send(e)
    }
    
})



module.exports = router

