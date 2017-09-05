var data = require('./links');

var url = "https://api.instagram.com/oauth/authorize/?client_id=" + data['insta']['client-id'] + "&redirect_uri=" + data['insta']['redirect-uri'] + "&response_type=code";

module.exports = url;