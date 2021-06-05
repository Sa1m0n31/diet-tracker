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

    pool.query(`SELECT s.data::date + 1 as data, SUM(w.kilokalorie * ilosc / 100) kilokalorie, SUM(w.tluszcze * ilosc / 100) tluszcze, 
SUM(w.cukry * ilosc / 100) cukry, SUM(w.weglowodany * ilosc / 100) weglowodany, SUM(w.bialka * ilosc / 100) bialka, SUM(w.sole * ilosc / 100) sole, SUM(w.blonnik * ilosc / 100) blonnik, 
SUM(m.chlor * ilosc / 100) chlor, SUM(m.wapn * ilosc / 100) wapn, SUM(m.magnez * ilosc / 100) magnez, SUM(m.fosfor * ilosc / 100) fosfor, SUM(m.potas * ilosc / 100) potas, SUM(s.ilosc) ilosc
FROM wartosci_odzywcze w 
JOIN makroelementy m 
USING(id_produktu)
JOIN spozycie s
ON m.id_produktu = s.id_produktu
WHERE s.id_uzytkownika = ${userId} AND s.data > NOW()::date - 7
GROUP BY s.data;`, (err, res) => {
        if(res) {
            console.log(res.rows);
            response.send({
                rows: res.rows
            });
        }
    })
});

router.post("/get-meals-details", (request, response) => {
   const id = request.body.id;

   pool.query(`SELECT s.id, p.nazwa, s.data, s.ilosc FROM spozycie s
JOIN produkty p ON s.id_produktu = p.id
WHERE id_uzytkownika = ${id} ORDER BY s.data DESC LIMIT 30`, (err, res) => {
      if(res) {
          response.send({
              result: res.rows
          });
      }
      else {
          response.send({
              result: null
          });
      }
   });
});

/* Usuwanie posiłku */
router.post("/delete-meal", (request, response) => {
   const id = request.body.id;

   pool.query(`DELETE FROM spozycie WHERE id = ${id}`, (err, res) => {
      response.send({
          result: 1
      });
   });
});

module.exports = router;
