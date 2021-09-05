const mongoose = require('mongoose');

class Database {
    constructor() {
        const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD } = process.env;
        this.connectionString = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/blogUser`;
        this.options = { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true        }
    }

    async initConnection() {
        if (this.connection) {
            return false;
        }
        try {
            this.connection = await mongoose.connect(this.connectionString, this.options);
            return true;
        } catch (error) {
            console.log(error);
            return false
        }
    }

    getConnection() {
        return this.connection;
    }

    destroyConnection() {
        this.conenction && this.connection.close();
        this.conenction = null;
    }

}

const database = new Database();

module.exports = database;