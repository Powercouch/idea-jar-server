const mongoose = require('mongoose');

module.exports = () => {
    const host = process.env.MONGO_HOST;
    const name = process.env.MONGO_DBNAME;
    const port = process.env.MONGO_PORT || 27017;
    if (!host || !name) {
        throw new Error('Missing Mongo enviroment variable MONGO_HOST or MONGO_DBNAME!');
    }

    const user = process.env.MONGO_USER;
    const pass = process.env.MONGO_PASSWORD;

    if (!user || !pass) {
        console.log('Running Mongo unauthenticated!');
    }

    const url = `mongodb://${host}:${port}/${name}`;

    const options = user && pass && { user, pass };

    return mongoose.connect(url, options, () => console.log(`Connected to DB: ${url}`));
};
