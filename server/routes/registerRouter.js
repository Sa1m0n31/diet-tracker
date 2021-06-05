const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const pool = require("../databseConnection");

/* Rejestracja */
router.post("/register",(request, response) => {
    const form = request.body;

    /* Haszujemy haslo */
    const hash = crypto.createHash('md5').update(form.password).digest('hex');

    const query = `INSERT INTO uzytkownicy VALUES (nextval('uzytkownicyAutoincrement'), NULL, NULL, NULL, NULL, NULL, $1, $2, $3, NOW())`;
    const values = [form.email, form.login, hash];

    /* Wstawienie uzytkownika do bazy */
    pool.query(query, values, (err, res) => {
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

    /* Usuwamy pozostale niepotrzebne sesje */
    pool.query(`DELETE FROM sesje WHERE data_wygasniecia_sesji < current_timestamp`);

    /* Szukamy uzytkownika o danym loginie w bazie */
    const query = `SELECT id, haslo FROM uzytkownicy WHERE login = $1`;
    const values = [form.login];
    await pool.query(query, values, (err, res) => {
        if(res.rowCount === 1) {
            /* Sprawdzamy czy uzytkownik podal poprawne haslo */
            if(res.rows[0].haslo === crypto.createHash('md5').update(form.password).digest('hex')) {
                /* Logowanie przebiegło pomyślnie - tworzymy klucz sesji */
                const sessionId = crypto.randomBytes(16).toString("hex");
                const userId = res.rows[0].id;

                /* Zapisujemy klucz w tabeli SESJE */
                pool.query(`INSERT INTO sesje VALUES (nextval('sesje_autoincrement'),
                                                                    '${sessionId}',
                                                                    current_timestamp + (30 * interval '1 minute')
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

/* Logowanie administratora */
router.post("/admin-login", async (request, response) => {
    const form = request.body;

    /* Szukamy uzytkownika o danym loginie w bazie */
    const query = `SELECT id, haslo FROM admini WHERE login = $1`;
    const values = [form.login];
    await pool.query(query, values, (err, res) => {
        if(res.rowCount === 1) {
            /* Sprawdzamy czy uzytkownik podal poprawne haslo */
            if(res.rows[0].haslo === crypto.createHash('md5').update(form.password).digest('hex')) {
                /* Logowanie przebiegło pomyślnie - tworzymy klucz sesji */
                const sessionId = crypto.randomBytes(16).toString("hex");
                const userId = res.rows[0].id;

                /* Zapisujemy klucz w tabeli SESJE_ADMINOW */
                pool.query(`INSERT INTO sesje_adminow VALUES (nextval('sesje_adminow_autoincrement'),
                                                                    '${sessionId}',
                                                                    current_timestamp + (30 * interval '1 minute')
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

/* Zadanie wywolywane przy kazdym zadaniu do chronionego zasobu uzytkownika */
router.post("/auth", (request, response) => {
    const sessionId = request.body.sessionId;
    const query = `SELECT * FROM sesje WHERE klucz_sesji = $1 AND data_wygasniecia_sesji > current_timestamp`;
    const values = [sessionId];

    pool.query(query, values, (err, res) => {
       if(res.rowCount === 1) {
           /* Przedluzamy czas sesji */
           const query = `UPDATE sesje SET data_wygasniecia_sesji = current_timestamp + (30 * interval '1 minute') WHERE klucz_sesji = $1`;
           const values = [sessionId];
           pool.query(query, values);

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

/* Zadanie wywolywane przy kazdym zadaniu do chronionego zasobu administratora */
router.post("/admin-auth", (request, response) => {
    const sessionId = request.body.sessionId;
    const query = `SELECT * FROM sesje_adminow WHERE klucz_sesji = $1 AND data_wygasniecia_sesji > current_timestamp`;
    const values = [sessionId];

    pool.query(query, values, (err, res) => {
        if(res.rowCount === 1) {
            /* Przedluzamy czas sesji */
            const query = `UPDATE sesje_adminow SET data_wygasniecia_sesji = current_timestamp + (30 * interval '1 minute') WHERE klucz_sesji = $1`;
            const values = [sessionId];
            pool.query(query, values);

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

/* Wylogowanie uzytkownika */
router.post("/logout", (request, response) => {
   const sessionId = request.body.sessionId;
   const query = `DELETE FROM sesje WHERE klucz_sesji = $1`;
   const values = [sessionId];

   pool.query(query, values, (err, res) => {
      response.send({
          loggedOut: 1
      }) ;
   });
});

/* Wylogowanie administratora */
router.post("/admin-logout", (request, response) => {
    const sessionId = request.body.sessionId;
    const query = `DELETE FROM sesje_adminow WHERE klucz_sesji = $1`;
    const values = [sessionId];

    pool.query(query, values, (err, res) => {
        response.send({
            loggedOut: 1
        }) ;
    });
});

module.exports = router;
