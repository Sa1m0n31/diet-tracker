const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const pool = require("../databseConnection");

/* Pobranie informacji o uzytkowniku */
router.get("/get-user-data", (request, response) => {
    const userLogin = request.query.login;
    const query = `SELECT * FROM uzytkownicy WHERE login = $1`;
    const values = [userLogin];

    pool.query(query, values, (err, res) => {
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

   const query = `SELECT haslo FROM uzytkownicy WHERE id = $1`;
   const values = [userId];

   pool.query(query, values, (err, res) => {
      if(res.rowCount === 1) {
          if(res.rows[0].haslo === crypto.createHash('md5').update(oldPassword).digest('hex')) {
              const newPasswordHash = crypto.createHash('md5').update(newPassword).digest('hex');
              const query = `UPDATE uzytkownicy SET haslo = $1 WHERE id = $2`;
              const values = [newPasswordHash, userId];
              pool.query(query, values, (err, res) => {
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
    const form = request.body;
    let gender = 'k';
    if(form.gender === "Kobieta") gender = 'k';
    else if(form.gender === "Mężczyzna") gender = 'm';

    const query = `UPDATE uzytkownicy SET imie = $1,
                                                      nazwisko = $2,
                                                      plec = $3,
                                                      login = $4,
                                                      wzrost = $5,
                                                      waga = $6
                               WHERE id = $7`;
    const values = [form.firstName, form.lastName, gender, form.login, form.height, form.weight, form.id];

    pool.query(query, values, (err, res) => {
       let result = 0;
       console.log(res);
       console.log(err);
        if(res) result = 1;
        response.send({
            result
        });
    });
});

module.exports = router;
