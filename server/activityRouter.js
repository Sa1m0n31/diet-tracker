const express = require("express");
const router = express.Router();
const { Pool, Client } = require("pg");
const postgresPort = 5432;

/* Polaczenie z baza danych PostgreSQL */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'diet-tracker',
    password: 'admin',
    port: postgresPort
});

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

const getSportIdByName = (name) => {
    return pool.query(`SELECT id FROM dyscypliny_sportu WHERE nazwa = '${name}'`);
}

/* Dodajemy aktywność fizyczną */
router.post("/add-activity", async (request, response) => {
   const time = request.body.time;
   const sportId = request.body.sport;
   let userId = request.body.id;

    pool.query(`INSERT INTO sport VALUES (nextval('sport_autoincrement'), ${sportId}, ${time}, NOW()::date) RETURNING id`, (err, res) => {
        let result = 0;
        const insertedId = res.rows[0].id;
        pool.query(`INSERT INTO aktywnosci_fizyczne VALUES (nextval('aktywnosci_fizyczne_autoincrement'), ${userId}, ${insertedId})`, (err, res) => {
            if(res) result = 1;
            response.send({
                result
            });
        });
    });
});

/* Pobieramy aktywnosci fizyczne danego uzytkownika z ostatnich siedmiu dni */
router.post("/get-last-week-activities", (request, response) => {
    const id = request.body.id;

    pool.query(`SELECT SUM(s.czas_trwania) as suma, s.data FROM sport s
JOIN aktywnosci_fizyczne af
ON s.id = af.id_sportu
WHERE af.id_uzytkownika = ${id} AND s.data > NOW()::date - 7
GROUP BY s.data ORDER BY s.data ASC`, (err, res) => {
       if(res.rows[0]) {
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

    pool.query(`SELECT s.czas_trwania, s.data, ds.nazwa FROM sport s
JOIN dyscypliny_sportu ds
ON s.id_dyscypliny = ds.id
JOIN aktywnosci_fizyczne af
ON s.id = af.id_sportu
WHERE af.id_uzytkownika = ${id} ORDER BY data DESC LIMIT 10`, (err, res) => {
        if(res.rows[0]) {
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

module.exports = router;
