/**
 * 印象笔记接口模块
 *
 * @author LanceLi
 */

// Module dependencies.
var co       = require('co');
var thunk    = require('thunkify');
var Evernote = require('evernote').Evernote;


// Prototype.
module.exports = {
  getUser: function(callback) {
    var _this = this;
    var getUser = thunk(_this.client.getUserStore().getUser);

    co(function* () {
      try {
        var user = yield getUser();

        callback(null, {
          userName    : user.username,
          createdTime : user.created,
          updatedTime : user.updated
        })

      } catch (e) {
        callback(e);
      }

    })();
  },

  getNote: function(uid, opts, callback) {
    var _this = this;

    if (typeof opts === 'function' && callback === undefined) {
      callback = opts;
      opts = {};
    }

    var getNote = thunk(_this.client.getNoteStore().getNote);

    co(function* () {
      try {
        var note = yield getNote(uid, opts.withContent, opts.withResourcesData,
          opts.withResourcesRecognition, opts.withResourcesAlternateData);

        callback(null, {
          uid         : note.guid,
          title       : note.title,
          author      : note.attributes.author,
          sourceURL   : note.attributes.sourceURL,
          length      : note.contentLength,
          createdTime : note.created,
          updatedTime : note.updated,
          content     : note.content
        });

      } catch (e) {
        callback(e);
      }

    })();
  },

  listNoteUidsFromBook: function(bookUid, offset, maxSize, callback) {
    var _this = this;

    var filter = new Evernote.NoteFilter();
    var nmrs = new Evernote.NotesMetadataResultSpec();

    var findNotesMetadata = thunk(_this.client.getNoteStore().findNotesMetadata);

    filter.notebookGuid = bookUid;

    co(function* () {
      try {
        var metadataList = yield findNotesMetadata(filter, offset || 0, maxSize || 20, nmrs);

        var noteUidsList = [];
        var noteMetadataList = metadataList.notes;
        noteMetadataList.forEach(function(value) {
          noteUidsList.push(value.guid);
        });

        callback(null, noteUidsList);

      } catch (e) {
        callback(e);
      }

    })();
  },

  listAllBooks: function(callback) {
    var _this = this;

    co(function* () {
      try {
        var listNotebooks = thunk(_this.client.getNoteStore().listNotebooks);
        var books = yield listNotebooks();

        var booklist = [];
        books.forEach(function(value, index) {
          booklist.push({
            uid         : value.guid,
            name        : value.name,
            createdTime : value.createdTime,
            updatedTime : value.updatedTime
          });
        });

        callback(null, booklist);

      } catch (e) {
        callback(e);
      }
    })();
  },

  listNotesMetadataFromBook: function(bookUid, offset, maxSize, callback) {
    var _this = this;

    var filter = new Evernote.NoteFilter();
    var nmrs = new Evernote.NotesMetadataResultSpec();

    var findNotesMetadata = thunk(_this.client.getNoteStore().findNotesMetadata);

    filter.notebookGuid = bookUid;

    co(function* () {
      try {
        var metadataList = yield findNotesMetadata(filter, offset || 0, maxSize || 20, nmrs);

        var resultList = [];
        var noteMetadataList = metadataList.notes;
        noteMetadataList.forEach(function(value) {
          resultList.push({
            uid: value.guid,
            title: value.title,
            length: value.contentLength,
            createdTime: value.created,
            updatedTime: value.updated
          });
        });

        callback(null, resultList);

      } catch (e) {
        callback(e);
      }

    })();
  },

  findNoteCounts: function(bookUid, callback) {
    var _this = this;

    var findNoteCounts = thunk(_this.client.getNoteStore().findNoteCounts);
    var filter = new Evernote.NoteFilter();

    filter.notebookGuid = bookUid;

    co(function* () {
      try {
        var noteCollectionCounts = yield findNoteCounts(filter, false);

        callback(null, noteCollectionCounts.notebookCounts[bookUid]);

      } catch (e) {
        callback(e);
      }
    })();
  }


};
