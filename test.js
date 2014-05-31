/**
 * Module dependencies. 
 */
var co          = require('co');
var thunk       = require('thunkify');
var express     = require('express');
var GenericNote = require('./lib/GenericNote.js');
var config      = require('./config.js');

var app = express();

app.get('/list_notebook', function(req, res) {
  var genNote = GenericNote(config.devToken, config.SANDBOX, 'evernote');
  var listAllNotebooks = thunk(genNote.listAllNotebooks);

  co(function* () {
    try {
      var books = yield listAllNotebooks.call(genNote);

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

  var listAllNotebooks = thunk(genNote.listAllNotebooks);
  var listNoteUidsFromBook = thunk(genNote.listNoteUidsFromBook);
  var getNote = thunk(genNote.getNote);

  co(function* () {
    try {
      var books = yield listAllNotebooks.call(genNote);
      var noteUidsList = yield listNoteUidsFromBook.call(genNote, books[0].uid);
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
      console.log(err);
      res.send('get user err');
    }
  })();

});

app.listen(8000);

console.log('Listening on port 8000');
