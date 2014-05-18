/**
 * User 相关信息
 * 
 * @author LanceLi
 */

var proto = User.prototype;

module.exports = User;

function User(opts) {
	this.userName = opts.userName;
	this.createdTime = opts.createdTime;
	this.updatedTime = opts.updatedTime;
}
