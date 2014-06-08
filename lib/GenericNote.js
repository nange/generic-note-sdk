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
var notetype = require('./notetype');
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
    case notetype.EVERNOTE:
      this.client = new Evernote.Client({
        token   : this.devToken,
        sandbox : this.isSandbox
      });

      this[this.type] = Object.create(evernote);
      break;

    case notetype.YOUDAO:
      this.client = null;

      this[this.type] = Object.create(youdao);
      break;
  }
}

proto.getUser = function(callback) {
  this[this.type].getUser.call(this, callback);
};

proto.getNote = function(uid, opts, callback) {
  this[this.type].getNote.call(this, uid, opts, callback);
};

proto.listNoteUidsFromBook = function(bookUid, callback) {
  this[this.type].listNoteUidsFromBook.call(this, bookUid, callback);
};

proto.listAllNotebooks = function(callback) {
  this[this.type].listAllNotebooks.call(this, callback);
};
