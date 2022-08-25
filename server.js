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
// get is straight forward
app.get('/api/notes',(req,res) => {
    res.json(notes)
})

// post request
app.post('/api/notes',(req,res) => {
    // console.log(notes)
    // console.log(req.body)
    // console.log(res.body)
    const { title, text } = req.body
    console.log()
    if ( title && text ) {
      // Variable for the object we will save
      const newNote = {
        title: title,
        text: text
      };
      // Write the string to a file
      console.log('newNote', newNote)
      fs.readFile(__dirname + '/db/db.json', function (err, data) {
        var json = JSON.parse(data);
        json.push(newNote);    
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), function(err){
          if (err) throw err
          console.log('The "data to append" was appended to file!')
        })
      })
    
      const response = {
        status: 'success',
        body: newNote,
      };
  
    //   console.log(response);
      res.status(201).json(response);
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