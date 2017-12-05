var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.use(express.bodyParser());
app.use(function (req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});


app.get('/heors', function (req, res) {
    res.send([
        { id: 1, name: 'doudi' },
        { id: 2, name: 'amine' }
    ])
});
server.listen(8080);
console.log('Express server listening on port', server.address().port);
