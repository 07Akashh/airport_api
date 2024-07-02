const express = require('express');
const app = express();
require('dotenv').config();

const airportRoute = require('./routes/airport');

app.use(express.json());

app.use('/api/airport', airportRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});



exports.handler = async (event, context) => {
    const req = {
        method: event.httpMethod,
        body: event.body,
        query: event.queryStringParameters,
        headers: event.headers,
    };
    const res = {
        headers: {},
        statusCode: 200,
        body: '',
    };

    try {
        await new Promise((resolve, reject) => {
            app(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return {
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.body,
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: {},
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
