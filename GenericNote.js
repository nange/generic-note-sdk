/**
 * 通用云笔记访问类
 *
 * @author LanceLi
 */

var Evernote = require('evernote').Evernote;
var config = require('./config.js');

function GenericNote() {
  this.client = new Evernote.Client({
    token: config.devToken,
    sandbox: config.SANDBOX
  });

}

module.exports = GenericNote;

GenericNote.prototype.getUserStore = function() {
  return this.client.getUserStore();
};

GenericNote.prototype.getNoteStore = function() {
  return this.client.getNoteStore();
};
