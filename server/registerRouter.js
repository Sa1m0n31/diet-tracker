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
router.post("/register",(request, response) => {
    const form = request.body;

    /* Haszujemy haslo */
    const hash = crypto.createHash('md5').update(form.password).digest('hex');

    /* Wstawienie uzytkownika do bazy */
    pool.query(`INSERT INTO uzytkownicy VALUES (nextval('uzytkownicyAutoincrement'), NULL, NULL, NULL, NULL, NULL, '${form.email}', '${form.login}', '${hash}', NOW())`, (err, res) => {
        const addingFail = () => {
            response.send({
                insert: 0
            })
        }

        if(res) {
            if(res.rowCount === 1) {
                /* Uzytkownik zostal dodany do bazy */
                response.send({
                    insert: 1
                });
            }
            else {
                addingFail();
            }
        }
        else {
            addingFail();
        }

    });
});

/* Logowanie */
router.post("/login", async (request, response) => {
    const form = request.body;

    /* Szukamy uzytkownika o danym loginie w bazie */
    await pool.query(`SELECT id, haslo FROM uzytkownicy WHERE login = '${form.login}'`, (err, res) => {
        if(res.rowCount === 1) {
            /* Sprawdzamy czy uzytkownik podal poprawne haslo */
            if(res.rows[0].haslo === crypto.createHash('md5').update(form.password).digest('hex')) {
                /* Logowanie przebiegło pomyślnie - tworzymy klucz sesji */
                const sessionId = crypto.randomBytes(16).toString("hex");
                const userId = res.rows[0].id;

                /* Zapisujemy klucz w tabeli SESJE */
                pool.query(`INSERT INTO sesje VALUES (nextval('sesje_autoincrement'),
                                                                    '${sessionId}',
                                                                    current_timestamp + (20 * interval '1 minute')
                )`, (err, res) => {
                    /* Zwracamy informacje o zalogowaniu i klucz sesji przegladarce */
                    response.send({
                        success: 1,
                        userId,
                        sessionId: sessionId,
                        login: form.login
                    });
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

/* Zadanie wywolywane przy kazdym zadaniu do chronionego zasobu */
router.post("/auth", (request, response) => {
    const sessionId = request.body.sessionId;

    pool.query(`SELECT * FROM sesje WHERE klucz_sesji = '${sessionId}'`, (err, res) => {
       if(res.rowCount === 1) {
           /* Przedluzamy czas sesji */
           pool.query("UPDATE sesje SET data_wygasniecia_sesji = current_timestamp + (20 * interval '1 minute')", (err, res) => {
              console.log(res);
              console.log(err);
           });

           /* Zwracamy odpowiedz do przegladarki */
           response.send({
               loggedIn: 1
           });
       }
       else {
           /* Uzytkownik nie zalogowany */
           response.send({
               loggedIn: 0
           });
       }
    });
});

/* Wylogowanie */
router.post("/logout", (request, response) => {
   const sessionId = request.body.sessionId;

   pool.query(`DELETE FROM sesje WHERE klucz_sesji = '${sessionId}'`, (err, res) => {
      response.send({
          loggedOut: 1
      }) ;
   });
});

module.exports = router;
