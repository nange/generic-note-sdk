/**
 * Module dependencies. 
 */
var co          = require('co');
var thunk       = require('thunkify');
var express     = require('express');
var GenericNote = require('./../lib/GenericNote');
var config      = require('./../config');

var app = express();

app.get('/list_notebook', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');
  var listAllBooks = thunk(genNote.listAllBooks);

  co(function* () {
    try {
      var books = yield listAllBooks.call(genNote);

      books.forEach(function(value, index) {
        console.log('notebook name: ' + value.name
          + ' notebook uid: ' + value.uid + '\n');
      });

      res.send('get noteBooks success');

    } catch (e) {
      console.log(err);
      res.send('get noteBooks error');
    }

  })();
});

app.get('/get_firstnote', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');

  var listAllBooks = thunk(genNote.listAllBooks);
  var listNoteUidsFromBook = thunk(genNote.listNoteUidsFromBook);
  var getNote = thunk(genNote.getNote);

  co(function* () {
    try {
      var books = yield listAllBooks.call(genNote);
      var noteUidsList = yield listNoteUidsFromBook.call(genNote, books[0].uid, 0, 20);
      var note = yield getNote.call(genNote, noteUidsList[0]);

      console.log('fist note title: ' + note.title + '\n');
      res.send('get first note success');

    } catch (e) {
      console.log(e);
      res.send('get note error');
    }

  })();
});

app.get('/get_user', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');
  var getUser = thunk(genNote.getUser);

  co(function* () {
    try {
      var user = yield getUser.call(genNote);
      console.log('userName: ' + user.userName 
        + ' createdTime: ' + user.createdTime 
        + ' updatedTime: ' + user.updatedTime + '\n');
      res.send('get user success');

    } catch (e) {
      console.log(e);
      res.send('get user err');
    }
  })();
});

app.get('/get_notecounts', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');
  var listAllBooks = thunk(genNote.listAllBooks);
  var findNoteCounts = thunk(genNote.findNoteCounts);

  co(function* () {
    try {
      var books = yield listAllBooks.call(genNote);
      var counts = yield findNoteCounts.call(genNote, books[0].uid);

      console.log(counts);
      res.send('get notecounts success: ' + counts);
    } catch (e) {
      console.log(e);
      res.send('get notecounts err');
    }
  })();
});

app.get('/get_notesmetadata', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');
  var listAllBooks = thunk(genNote.listAllBooks);
  var listNotesMetadataFromBook = thunk(genNote.listNotesMetadataFromBook);

  co(function* () {
    try {
      var books = yield listAllBooks.call(genNote);
      var metadata = yield listNotesMetadataFromBook.call(genNote, books[0].uid, 0, 10);

      console.log(metadata);
      res.send('get notesmetadata success: ' + metadata);

    } catch (e) {
      console.log(e);
      res.send('get notesmetadata err');
    }

  })();

});

app.listen(8000);

console.log('Listening on port 8000');
