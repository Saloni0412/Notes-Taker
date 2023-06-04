const input = require('express').Router();
const fs = require("fs");
const dbNotes = require("../db/db.json")
const { v4: uuidv4 } = require('uuid');
const newUUID = uuidv4();
const path = "..\db\db.json";



// GET Route for retrieving all the notes
input.get("/notes", (req, res) => {
    res.json(dbNotes);
})

// POST Route for submitting notes
input.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text ) {
    const newInput = {
      title,
      text,
      id: newUUID,
    };

   dbNotes.push(newInput);

   let notesString = JSON.stringify(dbNotes, null, 3);

   fs.writeFile("./db/db.json", notesString, (err) =>
     err ? console.error("error") : console.log(`New note is saved`)
   );

    const response = {
      status: 'success',
      body: newInput,
    };
console.log(newInput)
    res.json(response);
  } else {
    res.json('Error in saving note');
  }
});

module.exports = input;
