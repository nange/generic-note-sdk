/**
 * Module dependencies. 
 */
var express = require('express');
var GenericNote = require('./lib/GenericNote.js');
var config = require('./config.js');

var app = express();

app.get('/list_notebook', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');

  genNote.listAllNotebooks(function(err, books) {
    if (err) {
      console.log(err);
      res.send('get noteBooks error');
      return;
    }

    books.forEach(function(value, index) {
      console.log('notebook name: ' + value.name 
        + ' notebook uid: ' + value.uid + '\n');
    });

    res.send('get noteBooks success');
  });

});

app.get('/get_firstnote', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');

  genNote.listAllNotebooks(function(err, books) {
    if (err) {
      console.log(err);
      res.send('get noteBooks error');
      return;
    }

    genNote.listNoteUidsFromBook(books[0].uid, function(err, noteUidsList) {
      if (err) {
        console.log(err);
        res.send('get noteUids error');
        return;
      }

      genNote.getNote(noteUidsList[0], function(err, note) {
        if (err) {
          console.log(err);
          res.send('get note error');
          return;
        }

        console.log('fist note title: ' + note.title + '\n');

        res.send('get first note success');
      });

    });

  });

});

app.get('/get_user', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');

  genNote.getUser(function(err, user) {
    if (err) {
      console.log(err);
      res.send('get user err');
      return;
    }
    console.log('userName: ' + user.userName 
      + ' createdTime: ' + user.createdTime 
      + ' updatedTime: ' + user.updatedTime + '\n');
    res.send('get user success');
  });

});

app.listen(8000);

console.log('Listening on port 8000');
