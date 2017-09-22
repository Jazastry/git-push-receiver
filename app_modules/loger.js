module.exports = (function() {
    const path = require('path')
    const fs = require('fs');
    class Logger {
        constructor(logsPath) {
            this.logsPath = logsPath ? logsPath : path.resolve(process.cwd() + '/data', 'logs.txt');
        }

        log(obj) {
            obj.type = 'LOG';
            return this.write(obj);
        }

        err(obj) {
            obj.type = 'ERR';
            return this.write(obj);
        }

        write(obj) {
            return new Promise((resolve, reject) => {
                fs.appendFile(this.logsPath, JSON.stringify(obj, null, 4), (err) => {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                });
            })
        }
    }

    return new Logger();
}())
