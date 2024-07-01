const { Pool } = require('pg');

const pool = new Pool({
    user: 'default',
    host: 'ep-quiet-grass-a4buaqpp-pooler.us-east-1.aws.neon.tech',
    database: 'airport_db',
    password: 'z2auKrgC7vWZ',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = pool;
