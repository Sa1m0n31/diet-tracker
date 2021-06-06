const { Pool } = require("pg");
const postgresPort = 5432;

const pool = new Pool({
    user: 'nigsovgn',
    host: 'hattie.db.elephantsql.com',
    database: 'nigsovgn',
    password: 'C6PWKi5Y88DBx8zF5NL_z23d-hrFWRMy',
    port: postgresPort
});

module.exports = pool;
