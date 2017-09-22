try {
    // express initialization
    var express = require('express');
    let bodyParser = require('body-parser');
    var app = express();
    let logger = require('./app_modules/loger.js');
    var serverPort = 8888;
    app.use(bodyParser.json());
    app.post('/git-push', function(req, res) {
        let data = {
            id: 'REQUEST',
            METHOD: req.method,
            HEAD: req.headers,
            BODY: req.body
        };
        logger.log(data);
        res.send('OK');
    });

    var server = app.listen(serverPort, function() {
        let data = {
            id: 'INITIALIZATION',
            message: `listening on port ${serverPort}`
        };
        logger.log(data);
    });
} catch (er) {
    logger.err(er);
}
