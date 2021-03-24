const express = require('express')
require('../db/mongoose')
const Task = require('../db/task')
const router = new express.Router()


router.patch('/tasks/:id', async (req,res) =>{
    console.log(req.body)
    const updates = Object.keys(req.body)
    const allowedAtt = ['desc','date','complete']
    const isvalid = updates.every((update) => allowedAtt.includes(update))
    if(!isvalid){
        res.status(400)
        return res.send("invalid updates") 
    }
    try{
        const task = Task.findById(req.params.id)
        console.log(task)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        if(!task){
            return res.status(404).send("No task can be updated")
        }
        res.status(201)
        res.send(task)
    }catch(e){
        res.status(400)
        res.send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send("No user can be deleted")
        }
        res.status(201)
        res.send(task)
    }catch(e){
        res.status(400)
        res.send(e)
    }
    
})


router.get('/tasks', async (req,res) => {
    try{
        const tasks =  await Task.find({})
        res.send(tasks)
    }catch(e){
        res.send(e)
    }
})


router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
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




router.post('/tasks', async (req,res) => {
    console.log(req.body)
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201)
        res.send(task)
    }catch(e){
        res.status(400)
        res.send(error)
    }
})


module.exports = router