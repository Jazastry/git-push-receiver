let express = require('express'),
    app = express(),
    logger = require('./app_modules/loger.js'),
    serverPort = 8888,
    createHandler = require('github-webhook-handler'),
    gitPushHandler = createHandler({ path: '/git-push', secret: '' });

try {
    app.use(gitPushHandler)

    gitPushHandler.on('error', function(err) {
        console.error('Error:', err.message)
    })

    gitPushHandler.on('push', function(event) {
        console.log('Received a push event for %s to %s',
            event.payload.repository.name,
            event.payload.ref)
    })

    var server = app.listen(serverPort, function() {
        let data = {
            id: 'INITIALIZATION',
            message: `listening on port ${serverPort}`,
            date: new Date().toString()
        };
        logger.log(data);
    });
} catch (er) {
    logger.err(er);
}
