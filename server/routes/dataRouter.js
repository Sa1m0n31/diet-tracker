const express = require("express");
const router = express.Router();
const pool = require("../databseConnection");

router.post("/get-weekly-stats", (request, response) => {
    const userId = request.body.userId;
    const query = `SELECT s.data::date + 1 as data, SUM(w.kilokalorie * ilosc / 100) kilokalorie, SUM(w.tluszcze * ilosc / 100) tluszcze, 
SUM(w.cukry * ilosc / 100) cukry, SUM(w.weglowodany * ilosc / 100) weglowodany, SUM(w.bialka * ilosc / 100) bialka, SUM(w.sole * ilosc / 100) sole, SUM(w.blonnik * ilosc / 100) blonnik, 
SUM(m.chlor * ilosc / 100) chlor, SUM(m.wapn * ilosc / 100) wapn, SUM(m.magnez * ilosc / 100) magnez, SUM(m.fosfor * ilosc / 100) fosfor, SUM(m.potas * ilosc / 100) potas, SUM(s.ilosc) ilosc
FROM wartosci_odzywcze w 
JOIN makroelementy m 
USING(id_produktu)
JOIN spozycie s
ON m.id_produktu = s.id_produktu
WHERE s.id_uzytkownika = $1 AND s.data > NOW()::date - 7
GROUP BY s.data`;
    const values = [userId];

    pool.query(query, values, (err, res) => {
        if(res) {
            response.send({
                rows: res.rows
            });
        }
    })
});

router.post("/get-monthly-stats", (request, response) => {
    const userId = request.body.userId;
    const query = `SELECT s.data::date + 1 as data, SUM(w.kilokalorie * ilosc / 100) kilokalorie, SUM(w.tluszcze * ilosc / 100) tluszcze, 
SUM(w.cukry * ilosc / 100) cukry, SUM(w.weglowodany * ilosc / 100) weglowodany, SUM(w.bialka * ilosc / 100) bialka, SUM(w.sole * ilosc / 100) sole, SUM(w.blonnik * ilosc / 100) blonnik, 
SUM(m.chlor * ilosc / 100) chlor, SUM(m.wapn * ilosc / 100) wapn, SUM(m.magnez * ilosc / 100) magnez, SUM(m.fosfor * ilosc / 100) fosfor, SUM(m.potas * ilosc / 100) potas, SUM(s.ilosc) ilosc
FROM wartosci_odzywcze w 
JOIN makroelementy m 
USING(id_produktu)
JOIN spozycie s
ON m.id_produktu = s.id_produktu
WHERE s.id_uzytkownika = $1 AND s.data > NOW()::date - 30
GROUP BY s.data`;
    const values = [userId];

    pool.query(query, values, (err, res) => {
        if(res) {
            response.send({
                rows: res.rows
            });
        }
    })
});

router.post("/get-meals-details", (request, response) => {
   const id = request.body.id;
   const query = `SELECT s.id, p.nazwa, s.data, s.ilosc FROM spozycie s
JOIN produkty p ON s.id_produktu = p.id
WHERE id_uzytkownika = $1 ORDER BY s.data DESC LIMIT 30`;
    const values = [id];

   pool.query(query, values, (err, res) => {
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

/* Usuwanie posi??ku */
router.post("/delete-meal", (request, response) => {
   const id = request.body.id;
   const query = `DELETE FROM spozycie WHERE id = $1`;
   const values = [id];

   pool.query(query, values, (err, res) => {
      response.send({
          result: 1
      });
   });
});

module.exports = router;
