/**
 * NoteBook 相关信息 
 *
 * @atuhor LanceLi
 */
var proto = NoteBook.prototype;

module.exports = NoteBook;

function NoteBook(opts) {
	this.uid = opts.uid;
	this.name = opts.name;
	this.createdTime = opts.createdTime;
	this.updatedTime = opts.updatedTime;
}
