/**
 * 通用云笔记访问入口.
 * 封装了所有数据访问接口，包括笔记数据和用户信息数据. 
 *
 * @author LanceLi
 */

/**
 * Module dependencies.
 */
var co       = require('co');
var thunk    = require('thunkify');
var Evernote = require('evernote').Evernote;

var evernote = require('./evernote');
var youdao   = require('./youdao');

/**
 * GenericNote prototype.
 */
var proto = GenericNote.prototype;

/**
 * Expose `GenericNote`.
 */
module.exports = GenericNote;


/**
 * Initialize a new `GenericNote`.
 *
 * @api public
 */
function GenericNote(devToken, isSandbox, type) {
  if (!(this instanceof GenericNote)) {
    return new GenericNote(devToken, isSandbox, type);
  }

  this.devToken = devToken;
  this.isSandbox = isSandbox;
  this.type = type;

  switch (this.type) {
    case GenericNote.notetype.EVERNOTE:
      this.client = new Evernote.Client({
        token   : this.devToken,
        sandbox : this.isSandbox
      });
      this[this.type] = Object.create(evernote);
      break;

    case GenericNote.notetype.YOUDAO:
      this.client = null;
      this[this.type] = Object.create(youdao);
      break;

    default:
      throw new Error('Note type is not supported !');
  }
}

GenericNote.notetype = {
  EVERNOTE: 'evernote',
  YOUDAO: 'youdao'
};

proto.getUser = function(callback) {
  this[this.type].getUser.call(this, callback);
};

proto.getNote = function(uid, opts, callback) {
  this[this.type].getNote.call(this, uid, opts, callback);
};

proto.listNoteUidsFromBook = function(bookUid, offset, maxSize, callback) {
  this[this.type].listNoteUidsFromBook.call(this, bookUid, offset, maxSize, callback);
};

proto.listAllBooks = function(callback) {
  this[this.type].listAllBooks.call(this, callback);
};

proto.findNoteCounts = function(bookUid, callback) {
  this[this.type].findNoteCounts.call(this, bookUid, callback);
};

proto.listNotesMetadataFromBook = function(bookUid, offset, maxSize, callback) {
  this[this.type].listNotesMetadataFromBook.call(this, bookUid, offset, maxSize, callback);
};
