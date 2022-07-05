const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const ejs = require('ejs')
const weather = require('./routes/weather')
const { urlencoded } = require('express')

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine','ejs')

app.use('/',weather)

app.listen(port,()=>{
    console.log("Listining on PORT -> "+port)
})
