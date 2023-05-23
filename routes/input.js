const input = require('express').Router();
const fs = require("fs");
const dbNotes = require("../db/db.json")


// GET Route for retrieving all the notes
input.get("/notes", (req, res) => {
    res.json(dbNotes);
})

// POST Route for submitting notes
input.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newInput = {
      title,
      text,
      // feedback_id: uuidv4(),
    };

   dbNotes.push(newInput);

   let notesString = JSON.stringify(dbNotes, null, 3);

   fs.writeFile(`../db/db.json`, notesString, (err) =>
     err ? console.error(err) : console.log(`New note has been added!`)
   );

    const response = {
      status: 'success',
      body: newInput,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

module.exports = input;
