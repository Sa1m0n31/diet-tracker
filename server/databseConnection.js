const { Pool } = require("pg");
const postgresPort = 5432;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'diet-tracker',
    password: 'admin',
    port: postgresPort
});

module.exports = pool;
