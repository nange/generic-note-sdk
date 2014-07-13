/**
 * 印象笔记OAuth接口模块
 *
 * @author LanceLi
 */

// Module dependencies.

module.exports = {
  getRequestToken: function(callbackUrl, callback) {
    this.authClient.getRequestToken(callbackUrl, callback);
  },

  getAuthorizeUrl: function(oauthToken) {
    return this.authClient.getAuthorizeUrl(oauthToken);
  },

  getAccessToken: function(oauthToken, oauthTokenSecret, oauthVerifier, callback) {
    this.authClient.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, callback);
  }
};
