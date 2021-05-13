const express = require("express");
const router = express.Router();
const { Pool, Client } = require("pg");
const crypto = require('crypto');
const postgresPort = 5432;


/* Polaczenie z baza danych PostgreSQL */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'diet-tracker',
    password: 'admin',
    port: postgresPort
});

router.get("/get-product-kinds", (request, response) => {
    /* Wybieramy wszystkie rodzaje produktow z bazy danych */
    pool.query("SELECT nazwa FROM rodzaje_produktow", (err, res) => {
       response.send({
           kinds: res.rows
       });
    });
});

module.exports = router;