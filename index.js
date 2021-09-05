require('dotenv').config();
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
            console.log(`Server has started on ${port}`);
        })
    } else {
        console.log('Database connection has been failed')
    }
}

startServer();

