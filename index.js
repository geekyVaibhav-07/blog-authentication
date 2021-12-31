require('dotenv').config();
const chalk = require('chalk');

const errorLog = (log) => console.log(chalk.bold.red(log));
const warningLog = (log) =>  console.log(chalk.bold.yellow(log));
const successLog = (log) =>  console.log(chalk.bold.green(log));

console.errorLog = errorLog;
console.warningLog = warningLog;
console.successLog = successLog;

const db = require('./db.js');
const app = require('./app.js');

const port = process.env[`${process.env.NODE_ENV.toUpperCase()}_PORT`];
let server;

process.on('unhandledRejection', () => {
    server &&
    server.close(() => {
        db.destroyConnection();
        process.exit(1);
    });
});

process.on('uncaughtException', () => {
    server &&
    server.close(() => {
        db.destroyConnection();
        process.exit(1);
    });
});

const startServer = async () => {
    if (await db.initConnection()) {
        server = app.listen(port, () => {
            console.successLog(`Server has started on ${port}`);
        })
    } else {
        console.errorLog('Database connection has been failed')
    }
}

startServer();

