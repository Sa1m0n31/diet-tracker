const express = require("express");
const router = express.Router();
const moment = require("moment");
const pool = require("../databseConnection");

/* Pobieramy wszystkie dyscypliny sportu */
router.get("/get-all-sports", (request, response) => {
    pool.query(`SELECT * FROM dyscypliny_sportu`, (err, res) => {
       if(res) {
           response.send({
               sports: res.rows
           });
       }
       else {
           response.send({
               sports: null
           })
       }
    });
});

/* Dodajemy aktywność fizyczną */
router.post("/add-activity", async (request, response) => {
   const time = request.body.time;
   const sportId = request.body.sport;
   let userId = request.body.id;

   const query = "INSERT INTO sport VALUES (nextval('sport_autoincrement'), $1, $2, NOW()::date) RETURNING id";
   const values = [sportId, time];

    pool.query(query, values, (err, res) => {
        let result = 0;
        let insertedId;
        if(res) {
            if(res.rows[0]) {
                insertedId = res.rows[0].id;
                const query = "INSERT INTO aktywnosci_fizyczne VALUES (nextval('aktywnosci_fizyczne_autoincrement'), $1, $2)";
                const values = [userId, insertedId];
                pool.query(query, values, (err, res) => {
                    if(res) {
                        if(res.rowCount === 1) {
                            result = 1;
                        }
                        else {
                            result = 0;
                        }
                    }
                    else {
                        result = -1;
                    }
                    response.send({
                        result
                    });
                });
            }
            else {
                response.send({
                    result: -1
                });
            }
        }
        else {
            response.send({
                result: -1
            });
        }

    });
});

/* Pobieramy aktywnosci fizyczne danego uzytkownika z ostatnich siedmiu dni */
router.post("/get-last-week-activities", (request, response) => {
    const id = request.body.id;
    const query = "SELECT SUM(s.czas_trwania) as suma, s.data FROM sport s JOIN aktywnosci_fizyczne af ON s.id = af.id_sportu WHERE af.id_uzytkownika = $1 AND s.data > NOW()::date - 7 GROUP BY s.data ORDER BY s.data ASC";
    const values = [id];

    pool.query(query, values, (err, res) => {
       if(res.rows[0]) {
           res.rows.forEach(item => {
              item.data =  moment(item.data).format('YYYY-MM-DD')
           });
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

/* Pobieramy wszystkie aktywnosci fizyczne danego uzytkownika */
router.post("/get-all-activities", (request, response) => {
    const id = request.body.id;

    const query = "SELECT af.id as id, s.czas_trwania, s.data, ds.nazwa FROM sport s JOIN dyscypliny_sportu ds ON s.id_dyscypliny = ds.id JOIN aktywnosci_fizyczne af ON s.id = af.id_sportu WHERE af.id_uzytkownika = $1 ORDER BY data DESC LIMIT 10";
    const values = [id];

    pool.query(query, values, (err, res) => {
        if(res.rows[0]) {
            res.rows.forEach(item => {
                item.data =  moment(item.data).format('YYYY-MM-DD')
            });
            response.send({
                activities: res.rows
            });
        }
        else {
            response.send({
                activities: null
            });
        }
    });
});

/* Usuwanie aktywnosci fizycznej */
router.post("/delete-activity", (request, response) => {
   const id = request.body.id;
   const query = "DELETE FROM aktywnosci_fizyczne WHERE id = $1";
   const values = [id];

   pool.query(query, values, (err, res) => {
      let result = 0;
       if(res) result = 1;
       response.send({
           result
       });
   });
});

module.exports = router;
