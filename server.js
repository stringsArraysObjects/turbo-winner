const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express()

//Middleware (what does middleware do?) had to come before we set up server
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log("Connected to MongoDB")
})
// Define a schema and model for the form data
const contactSchema = new mongoose.Schema({
    name: String,
    people: Number,
    date: Date,
    message: String,
})

const Contact = mongoose.model("Contact", contactSchema,)
//Handle Form Submission Request
app.post('/submit', async (req, res) => {
    const formData = {
        name: req.body.Name,
        people: req.body.People,
        date: new Date(req.body.date),
        message: req.body.Message
    }
    try{
        const newContact = new Contact(formData)
        await newContact.save()
        res.redirect('/?success')
    }catch (error) {
        res.redirect('/?error')
    }
})

app.get('/', (req, res) => {
    res.sendFile(_dirname + '/public/index.html')
})

//Start server
const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server connected on ${PORT}`)
})
