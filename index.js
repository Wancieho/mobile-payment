const https = require('https');
const querystring = require('querystring');

function request(callback) {
  const path = '/v1/checkouts';
  const data = querystring.stringify({
    'entityId': '8a8294174e735d0c014e78cf26461790',
    'amount': '92.00',
    'currency': 'ZAR',
    'paymentType': 'DB'
  });

  const options = {
    port: 443,
    host: 'https://test.oppwa.com',
    path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
      'Authorization': 'Bearer OGE4Mjk0MTc0ZTczNWQwYzAxNGU3OGNmMjY2YjE3OTR8cXl5ZkhDTjgzZQ=='
    }
  };

  try {
    const postRequest = https.request(options, res => {
      res.setEncoding('utf8');

      res.on('data', chunk => {
        const jsonRes = JSON.parse(chunk);

        return callback(jsonRes);
      });

      res.on('error', error => {
        console.debug(error);
      });
    });

    postRequest.write(data);
    postRequest.end();
  } catch (error) {
    console.debug(error);
  }
}

setTimeout(() => request((responseData) => {
  console.log(responseData);
}), 2000);
