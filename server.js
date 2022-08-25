const express = require('express');
const fs = require('fs');
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

app.get('/api/notes',(req,res) => {
    res.json(notes)
})

// GET request for a specific note
app.get('/api/upvotes/:note_id', (req, res) => {
    let target = notes.filter((el) => el.id == req.params.id)
    res.json(target);
  });

// post request
app.post('/api/notes',(req,res) => {
    // console.log(notes)
    // console.log(req.body)
    // console.log(res.body)
    const { title, text, id} = req.body
    console.log()
    if ( title && text && id) {
      // Variable for the object we will save
      const newNote = {
        title: title,
        text: text,
        id: id
      };
      // Write the string to a file
      console.log('newNote', newNote)
      notes.push(newNote)
      let updatedList = JSON.stringify(notes)
      fs.writeFile(__dirname + '/db/db.json',updatedList, function(err){
        if (err) throw err
        console.log('The "data to append" was appended to file!')
      })
    //   console.log(response);
      res.status(201).json(JSON.stringify(notes));
    } else {
      res.status(500).json('Error in posting review');
    }
})
  
app.delete('/api/notes',(req,res) => {
    res.json(notes) 
})
  
// TODO: Have the app listen on port 3001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});