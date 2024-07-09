const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../db');

router.get('/keep-alive', (req, res) => {
    res.status(200).send('OK');
});

const pingDatabase = () => {
    pool.query('SELECT 1')
        .then(result => {
            console.log('Database ping successful:', result.rows);
        })
        .catch(error => {
            console.error('Database ping failed:', error);
        });
};

const keepAlive = () => {
    try {
        pingDatabase();
    } catch (error) {
        console.error('Keep-alive ping failed:', error);
    }
};

setInterval(keepAlive, 2000);

module.exports = { router, keepAlive };
