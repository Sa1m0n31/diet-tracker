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

/* Rejestracja */
router.post("/register", (request, response) => {
    const form = request.body;

    /* Sprawdzamy czy uzytkownik o podanym loginie i mailu nie znajduje sie juz w bazie */


    /* Wstawienie uzytkownika do bazy */
    pool.query(`INSERT INTO uzytkownicy VALUES (nextval('uzytkownicyAutoincrement'), NULL, NULL, NULL, NULL, NULL, '${form.email}', '${form.login}', '${form.password}', NOW())`, (err, res) => {
        if(res.rowCount === 1) {
            /* Uzytkownik zostal dodany do bazy */
            response.send({
                insert: 1
            });
        }
        else {
            /* Nie udalo sie dodac uzytkownika do bazy */
            response.send({
                insert: 0
            });
        }
    });
});

/* Logowanie */
router.post("/login", async (request, response) => {
    const form = request.body;

    /* Szukamy uzytkownika o danym loginie w bazie */
    await pool.query(`SELECT haslo FROM uzytkownicy WHERE login = '${form.login}'`, (err, res) => {
        if(res.rowCount === 1) {
            /* Sprawdzamy czy uzytkownik podal poprawne haslo */
            if(res.rows[0].haslo === form.password) {
                response.send({
                    success: 1
                });
            }
            else loginFail();
        }
        else loginFail();
    });

    const loginFail = () => {
        response.send({
            success: 0
        });
    }
});

module.exports = router;