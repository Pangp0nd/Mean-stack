const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const mongoUrl = "mongodb://localhost:27017"
const dbName = "testmongo"
const colName = "testcollec"


router.get('/show',function(req,res){
    MongoClient.connect(mongoUrl,function (err, client) {
        
        const db = client.db(dbName);  
        db.collection(colName)
        .find().toArray().then(result=>{
            const resp = { 
                result : "ok" , 
                message : result
            }
            res.json(resp)
        })
        client.close()
    })
})

router.post('/add',function(req,res){
    //res.end("HI Add : " + req.body.name)
    MongoClient.connect(mongoUrl,function (err, client) {
        
        const data1 = { name : req.body.name } // 1 Added 1 Param
        const data2 = [{ name : req.body.name ,name2 : req.body.name2}] //1 Added 2 Param
        const data3 = [{ name : req.body.name },{name2 : req.body.name2}] // 2 Added 1 Param

        const db = client.db(dbName);  
        db.collection(colName)
        .insert(data1, (err, result)=>{
            if(err) throw err
            const resp = {
                result : 'ok', 
                message : result.result.n + "Added"
            }
            res.json(resp)
         })
        client.close()
    })
})

router.delete('/delete/:name',function(req,res){
    MongoClient.connect(mongoUrl,function (err, client) {
        
        const query = { name : req.params.name }

        const db = client.db(dbName);  
        db.collection(colName)
        .deleteOne(query, (err, result)=>{
            if(err) throw err
            const resp = {
                result : 'ok', 
                message : result.result.n + "Deletd"
            }
            res.json(resp)
        })
        client.close()
    })
})

module.exports = router