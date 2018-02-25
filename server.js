const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname,'dist')))

app.use('/api', require('./server/api.js'))

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))
})


const server = app.listen(3000, () => {
    console.log('App listening on port 3000!')
});