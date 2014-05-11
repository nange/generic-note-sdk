var express = require('express');
var GenericNote = require('./GenericNote.js');
var Evernote = require('evernote').Evernote;

var app = express();

app.get('/list_notebook', function(req, res) {
  var genNote = new GenericNote();
  var noteStore = genNote.getNoteStore();

  noteStore.listNotebooks(function(err, noteBooks) {
    if (err) {
      console.log(err);
      res.send('get noteBooks error');
      return;
    }

    noteBooks.forEach(function(value, index) {
      console.log('notebook name: ' + value.name);
    });

    res.send('get noteBooks success');

  });

});

app.get('/list_note', function(req, res) {
  var genNote = new GenericNote();
  var noteStore = genNote.getNoteStore();

  noteStore.findNotesMetadata(new Evernote.NoteFilter(), 0, 10,
    new Evernote.NotesMetadataResultSpec(), function(err, nml) {
    if (err) {
      console.log(err);
      res.send('get notes error');
      return;
    }

    var notes = nml.notes;

    notes.forEach(function(value, index) {
      noteStore.getNote(value.guid, true, false, false, false,
        function(err, note) {
        if (err) {
          console.log(err);
          res.send('get notes err');
          return;
        }
        console.log('note title: ' + note.title +
          ' note content: ' + note.content + '\n');

        if (index === notes.length - 1) res.send('get notes success');
      });
    });

  });

});

app.listen(8000);

console.log('Listening on port 8000');
