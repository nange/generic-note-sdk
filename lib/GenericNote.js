/**
 * 通用云笔记访问入口.
 * 封装了所有数据访问接口，包括笔记数据和用户信息数据.
 *
 * @author LanceLi
 */

/**
 * Module dependencies.
 */
var Evernote = require('evernote').Evernote;
var notetype = require('./notetype.js');
var User 		 = require('./User.js');
var NoteBook = require('./NoteBook.js');
var Note		 = require('./Note.js');

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
		    token 	: this.devToken,
		    sandbox : this.isSandbox
		  });
		  break;
		case notetype.YOUDAO:
			this.client = null;
			break;
	}

}


proto.getUser = function(callback) {
	var _this = this;

	switch (this.type) {
		case notetype.EVERNOTE:
		  _this.client.getUserStore().getUser(function(err, user) {
		  	if (err) return callback(err, null);

		  	callback(err, new User({
		  		userName 		: user.username,
		  		createdTime : user.created,
		  		updatedTime : user.updated
		  	}));

		  });
		  break;
		case notetype.YOUDAO:
			break;
	}

};

proto.getNote = function(uid, opts, callback) {
  var _this = this;

  if (typeof opts === 'function' && callback === undefined) {
  	callback = opts;
  	opts = {};
  }

  switch (this.type) {
  	case notetype.EVERNOTE:
  		_this.client.getNoteStore().getNote(uid, opts.withContent, 
  			opts.withResourcesData, opts.withResourcesRecognition, 
  			opts.withResourcesAlternateData, 
  		function(err, note) {
  			if (err) return callback(err, null);

  			callback(err, new Note({
  				uid 				: note.guid,
  				title 			: note.title,
  				author 			: note.attributes.author,
  				sourceURL 	: note.attributes.sourceURL,
  				length 			: note.contentLength,
  				createdTime : note.created,
  				updatedTime : note.updated,
  				content 		: note.content
  			}));

  		});
  		break;
  	case notetype.YOUDAO:
  		break;
  }

};

proto.listNoteUidsFromBook = function(bookUid, callback) {
	var _this = this;

	switch (this.type) {
		case notetype.EVERNOTE:
			var filter = new Evernote.NoteFilter();
			filter.notebookGuid = bookUid;

			_this.client.getNoteStore().findNotesMetadata(filter, 0, 10, 
				new Evernote.NotesMetadataResultSpec, function(err, metadataList) {
				if (err) return callback(err, null);

				var noteUidsList = [];
				var noteMetadataList = metadataList.notes;
				noteMetadataList.forEach(function(value) {
					noteUidsList.push(value.guid);
				});

				callback(err, noteUidsList);

			});
			break;
		case notetype.YOUDAO:
			break;
	}

};

proto.listAllNotebooks = function(callback) {
	var _this = this;

	switch (this.type) {
		case notetype.EVERNOTE:
			_this.client.getNoteStore().listNotebooks(function(err, books) {
				if (err) return callback(err, null);

				var booklist = [];
				books.forEach(function(value, index) {
					booklist.push(new NoteBook({
						uid 				: value.guid,
						name 				: value.name,
						createdTime : value.createdTime,
						updatedTime : value.updatedTime
					}));
				});

				callback(err, booklist);
			});
			break;
		case notetype.YOUDAO:
  		break;
	}

};
