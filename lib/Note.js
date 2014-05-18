/**
 * Note 相关信息
 *
 * @atuhor LanceLi
 */
var proto = Note.prototype;

module.exports = Note;

function Note(opts) {
	this.uid = opts.uid;
	this.title = opts.title;
	this.author = opts.author;
	this.sourceURL = opts.sourceURL;
	this.length = opts.length;
	this.createdTime = opts.createTime;
	this.updatedTime = opts.modifyTime;
	this.content = opts.content;
}
