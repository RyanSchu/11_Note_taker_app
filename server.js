const express = require('express');
const path = require('path');
const notes = require("./db/db.json")

const PORT = 3001

const app = express()
app.use(express.static(__dirname + '/public'));


// get route for homepage
app.get('/',(req,res) => {
    // console.log(path.join(__dirname, '/public/index.html'))
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes',(req,res) => {
    // console.log(path.join(__dirname, '/public/index.html'))
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// we need a get a post and a delete method for the notes
app.get('/api/notes',(req,res) => {
    res.json(notes)
})

app.post('/api/notes',(req,res) => {
    res.json(repos)
})
  
app.delete('/api/notes',(req,res) => {
    res.json(repos) 
})
  
// TODO: Have the app listen on port 3001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});