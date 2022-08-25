const express = require('express');
const path = require('path');
const notes = require("./db/db.json")

const PORT = 3001

const app = express()
app.use(express.static(__dirname + '/public'));
app.use(express.json())

// get route for homepage
app.get('/',(req,res) => {
    // console.log(path.join(__dirname, '/public/index.html'))
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
// get route for notes page
app.get('/notes',(req,res) => {
    // console.log(path.join(__dirname, '/public/index.html'))
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// we need a get a post and a delete method for the notes
// get is straight forward
app.get('/api/notes',(req,res) => {
    res.json(notes)
})

// post request
app.post('/api/notes',(req,res) => {
    // console.log(notes)
    console.log(req.body)
    // console.log(res.body)
    const { noteTitle, noteText } = req.body

})
  
app.delete('/api/notes',(req,res) => {
    res.json(notes) 
})
  
// TODO: Have the app listen on port 3001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});