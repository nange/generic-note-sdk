/**
 * 印象笔记OAuth接口模块
 *
 * @author LanceLi
 */

// Module dependencies.

module.exports = {
  getRequestToken: function(callbackUrl, callback) {
    this.authClient.getRequestToken(
      callbackUrl,
      function(error, oauthToken, oauthTokenSecret, results) {

        callback(error, {
          oauthToken: oauthToken,
          oauthTokenSecret: oauthTokenSecret,
          results: results
        });

      }
    );
  },

  getAuthorizeUrl: function(oauthToken) {
    return this.authClient.getAuthorizeUrl(oauthToken);
  },

  getAccessToken: function(oauthToken, oauthTokenSecret, oauthVerifier, callback) {
    this.authClient.getAccessToken(
      oauthToken,
      oauthTokenSecret,
      oauthVerifier,
      function(error, oauthAccessToken, oauthAccessTokenSecret, results) {

        callback(error, {
          oauthAccessToken: oauthAccessToken,
          oauthAccessTokenSecret: oauthAccessTokenSecret,
          results: results
        });

      }
    );
  }
};
