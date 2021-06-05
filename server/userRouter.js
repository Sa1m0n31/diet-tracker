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

/* Pobranie informacji o uzytkowniku */
router.get("/get-user-data", (request, response) => {
    const userLogin = request.query.login;

    pool.query(`SELECT * FROM uzytkownicy WHERE login = '${userLogin}'`, (err, res) => {
        response.send({
           userData: res.rows[0]
       });
    });
});

/* Zmiana hasła użytkownika */
router.post("/change-password", (request, response) => {
   const userId = request.body.id;
   const oldPassword = request.body.oldPassword;
   const newPassword = request.body.newPassword;

   pool.query(`SELECT haslo FROM uzytkownicy WHERE id = ${userId}`, (err, res) => {
      if(res.rowCount === 1) {
          if(res.rows[0].haslo === crypto.createHash('md5').update(oldPassword).digest('hex')) {
              const newPasswordHash = crypto.createHash('md5').update(newPassword).digest('hex');
              pool.query(`UPDATE uzytkownicy SET haslo = '${newPasswordHash}' WHERE id = ${userId}`, (err, res) => {
                  if(res) {
                      response.send({
                          result: 1
                      });
                  }
                  else {
                      response.send({
                          result: -1
                      });
                  }
              })
          }
          else {
              response.send({
                  result: 0
              })
          }
      }
      else {
          response.send({
              result: -1
          })
      }
   });
});

/* Edycja danych uzytkownika */
router.post("/edit-user", (request, response) => {
    const values = request.body;
    let gender = 'k';
    if(values.gender === "Kobieta") gender = 'k';
    else if(values.gender === "Mężczyzna") gender = 'm';

    pool.query(`UPDATE uzytkownicy SET imie = '${values.firstName}',
                                                      nazwisko = '${values.lastName}',
                                                      plec = '${gender}',
                                                      login = '${values.login}',
                                                      wzrost = '${values.height}',
                                                      waga = '${values.weight}'
                               WHERE id = ${values.id}                        
    `, (err, res) => {
    });
});

module.exports = router;
