var https = require('https');
var querystring = require('querystring');

function request(callback) {
  var path = '/v1/checkouts';
  var data = querystring.stringify({
    'entityId': '8a8294174e735d0c014e78cf26461790',
    'amount': '92.00',
    'currency': 'ZAR',
    'paymentType': 'DB'
  });
  var options = {
    port: 443,
    host: 'https://test.oppwa.com',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
      'Authorization': 'Bearer OGE4Mjk0MTc0ZTczNWQwYzAxNGU3OGNmMjY2YjE3OTR8cXl5ZkhDTjgzZQ=='
    }
  };
  var postRequest = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      jsonRes = JSON.parse(chunk);
      return callback(jsonRes);
    });
  });
  postRequest.write(data);
  postRequest.end();
}

request(function (responseData) {
  console.log(responseData);
});