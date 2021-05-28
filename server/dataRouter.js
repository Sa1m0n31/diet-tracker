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

router.post("/get-weekly-stats", (request, response) => {
    const userId = request.body.userId;

    pool.query(`SELECT s.data, SUM(w.kilokalorie) kilokalorie, SUM(w.tluszcze) tluszcze, 
SUM(w.cukry) cukry, SUM(w.weglowodany) weglowodany, SUM(w.bialka) bialka, SUM(w.sole) sole, SUM(w.blonnik) blonnik, 
SUM(m.chlor) chlor, SUM(m.wapn) wapn, SUM(m.magnez) magnez, SUM(m.fosfor) fosfor, SUM(m.potas) potas, SUM(s.ilosc) ilosc
FROM wartosci_odzywcze w 
JOIN makroelementy m 
USING(id_produktu)
JOIN spozycie s
ON m.id_produktu = s.id_produktu
WHERE s.id_uzytkownika = ${userId}
GROUP BY s.data ORDER BY s.data DESC;`, (err, res) => {
        if(res) {
            response.send({
                rows: res.rows
            });
        }
    })
});

module.exports = router;
