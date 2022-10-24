const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const { db } = require('./firebase.js')

app.use(express.json())

const employee = {
    'john':"15000",
    "lilly":"40300",
    "hagrid":"100000",
}
app.get('/employee',async(req,res)=>{
    const ref = db.collection('people').doc('associates')
    const doc = await ref.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})

app.get('/employee/:name',(req,res) =>{
    const { name } = req.params
    if (!name || !(name in employee)){
        return res.sendStatus(404)
    }
    res.status(200).send({[name]:employee[name]})
})

app.post('/addemp',async (req,res)=>{
    const{ name, salary } = req.body
    const ref = db.collection('people').doc('associates')
    const res2 = await ref.set({
        [name] : salary
    },{merge : true})
    // employee[name] = salary
    res.status(200).send(employee)
})

app.patch('/changesalary',async(req,res)=>{
    const{name,newsalary} = req.body
    const ref = db.collection('people').doc('associates')
    const res2 = await ref.set({
        [name] : newsalary
    },{merge : true})
    //employee[name] = newsalary
    res.status(200).send(employee)
})

app.delete('/employee',async(req,res)=>{
    const{name} = req.body
    const ref = db.collection('people').doc('associates')
    const res2 = await ref.update({
        [name] : FieldValue.delete()
    })
    //delete employee[name] 
    res.status(200).send(employee)
})

app.listen(3300,()=>console.log("server has started!!!!!!"))