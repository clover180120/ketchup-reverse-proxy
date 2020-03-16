const url = require('url');
const https = require('https');

exports.kkboxApiRequest = function (req, res) {
  const reqUrl = url.parse(req.url, true);
  const params = new URLSearchParams(reqUrl.query);
  const options = {
    headers: {
      'accept': 'application/json',
      'authorization': 'Bearer KKBOX_API_TOKEN'
    }
  }
  const proxyUrl = 'https://api.kkbox.com/v1.1' + reqUrl.pathname.replace('/kkbox', '') + '?' + params.toString();
  https.get(proxyUrl, options, function (proxyResponse) {
      let data = '';

      proxyResponse.on('data', function (chunk) {
        data += chunk;
      });

      proxyResponse.on('end', function () {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(data);
      });
  }).on("error", function (err) {
    res.statusCode = 400;
    res.end(JSON.stringify(err));
  });
};

exports.youtubeRequest = function (req, res) {
  const reqUrl = url.parse(req.url, true);
  const params = new URLSearchParams(reqUrl.query);
  params.append('key', 'YOUTUBE_API_KEY');
  const proxyUrl = 'https://www.googleapis.com/youtube/v3' + reqUrl.pathname.replace('/youtube', '') + '?' + params.toString();
  const options = {
    headers: {
      'accept': 'application/json'
    }
  }
  https.get(proxyUrl, options, function (proxyResponse) {
      let data = '';

      proxyResponse.on('data', function (chunk) {
        data += chunk;
      });

      proxyResponse.on('end', function () {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(data);
      });
  }).on("error", function (err) {
    res.statusCode = 400;
    res.end(JSON.stringify(err));
  });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};
