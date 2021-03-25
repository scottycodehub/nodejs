const express = require('express')
require('../db/mongoose')
const Task = require('../db/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.patch('/tasks/:id', auth, async (req,res) =>{
    console.log(req.body)
    const updates = Object.keys(req.body)
    const allowedAtt = ['desc','date','complete']
    const isvalid = updates.every((update) => allowedAtt.includes(update))
    if(!isvalid){
        res.status(400)
        return res.send("invalid updates") 
    }
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user.id})
        if(!task){
            return res.status(404).send("No task can be updated")
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        res.status(201)
        res.send(task)
    }catch(e){
        res.status(400)
        res.send(e)
    }
})

router.delete('/tasks/:id', auth, async (req,res) => {
    try{
        const task = await Task.findOne({_id:req.params.id,owner: req.user.id})
        if(!task){
            return res.status(404).send("No user can be deleted")
        }
        await task.deleteOne()
        res.status(201)
        res.send(task)
    }catch(e){
        res.status(400)
        res.send(e)
    }
    
})

//GET tasks/?completed=true&limit=3&sortedBy=createAt+desc
router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}
    if(req.query.completed)
        match.complete = req.query.completed === 'true'
    if(req.query.sortedBy){
        const parts = req.query.sortedBy.split(':')
        sort[parts[0]] = (parts[1] === 'desc') ? -1 : 1
        console.log(sort)
    }

    try{
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
         }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.send(e)
    }
})


router.get('/tasks/:id', auth, async (req,res) => {

    const _id = req.params.id
    try{
        const task = await Task.findOne({_id,owner: req.user._id})
        if(!task){
            res.status(400)
            return res.send("no task  found for id " + _id)
        }
        res.send(task)
    }catch(e){
        res.status(500)
        error.reason = "Unable to identify record using the provided ID: " + _id
        res.send(error)
    }
})




router.post('/tasks', auth,async (req,res) => {
    console.log(req.body)
    
    const task = new Task({
        ...req.body, //copy all request field to this object
        owner:req.user._id //add use id to the owner's field
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(error)
    }
})


module.exports = router