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

router.get("/get-product-kinds", (request, response) => {
    /* Wybieramy wszystkie rodzaje produktow z bazy danych */
    pool.query("SELECT nazwa FROM rodzaje_produktow", (err, res) => {
       response.send({
           kinds: res.rows
       });
    });
});

router.get("/get-all-products", (request, response) => {
    /* Pobieramy wszystkie produkty z bazy */
    pool.query("SELECT p.nazwa, w.kilokalorie, w.tluszcze, w.kwasy_tluszczowe_nasycone, w.weglowodany,\n" +
        "w.cukry, w.bialka, w.sole, w.blonnik, m.wapn, m.chlor, m.magnez, m.fosfor, m.potas\n" +
        "FROM produkty p \n" +
        "JOIN wartosci_odzywcze w ON p.id = w.id_produktu\n" +
        "JOIN makroelementy m ON p.id = m.id_produktu;", (err, res) => {
        response.send({
            products: res.rows
        });
    });
});

router.post("/add-product", async (request, response) => {
    const values = request.body;
    let kindId = 0, idOfInsertedRow;
    let productInserted = false, nutritionInserted = false, macroInserted = false;

    /* Pobieramy id podanego rodzaju produktu */
    await pool.query(`SELECT id FROM rodzaje_produktow WHERE nazwa = '${values.kind}'`, async (err, res) => {
       if(res.rowCount > 0) {
           /* Znaleziono podany rodzaj, zapisujemy id tego rodzaju */
           kindId = res.rows[0].id;

           /* Dodajemy produkt do tabeli PRODUKTY */
           pool.query(`INSERT INTO produkty VALUES (nextval('productautoincrement'), ${kindId}, '${values.name}') RETURNING id`, async (err, res) => {
               if(res) {
                   idOfInsertedRow = res.rows[0].id;
                   productInserted = true;
               }

               /* Dodajemy wartosci odzywcze do tabeli WARTOSCI_ODZYWCZE */
               await pool.query(`INSERT INTO wartosci_odzywcze VALUES (nextval('wartosci_odzywcze_autoincrement'),
                                                                                '${idOfInsertedRow}',
                                                                                '${values.calories}',
                                                                                '${values.fat}',
                                                                                '${values.saturatedFat}',
                                                                                '${values.carbo}',
                                                                                '${values.sugar}',
                                                                                '${values.protein}',
                                                                                '${values.salt}',
                                                                                '${values.fiber}'
            )`, (err, res) => {
                   if(res) nutritionInserted = true;
               });

               /* Dodajemy makroelementy do tabeli MAKROELEMENTY */
               await pool.query(`INSERT INTO makroelementy VALUES (nextval('makroelementy_autoincrement'),
                                                                             ${idOfInsertedRow},
                                                                             ${values.calcium},
                                                                             ${values.chlorine},
                                                                             ${values.magnesium},
                                                                             ${values.phosphorus},
                                                                             ${values.potassium}
           )`, (err, res) => {
                   if(res) macroInserted = true;

                   if((productInserted)&&(nutritionInserted)&&(macroInserted)) {
                       response.send({
                           insert: 1
                       });
                   }
                   else {
                       response.send({
                           insert: 0
                       });
                   }
               });
           });

       }
       else {
           response.send({
               insert: 0
           });
       }
    });
});

router.post("/add-meal", async (request, response) => {
    const userId = request.body.userId;
    const amount = request.body.productAmount;
    const productName = request.body.productName;
    let productId = 0;

    /* Znajdujemy id produktu wedlug jego nazwy */
    await pool.query(`SELECT id FROM produkty WHERE nazwa = '${productName}'`, (err, res) => {
        if(res) productId = res.rows[0].id;
        pool.query(`INSERT INTO spozycie VALUES (
                                            nextval('spozycie_autoincrement'),
                                            ${userId},
                                            ${productId},
                                            CURRENT_DATE,
                                            ${amount}
    )`, (err, res) => {
            if(res) {
                response.send({
                    inserted: true
                });
            }
            else {
                response.send({
                    inserted: false
                });
            }
        });
    });
});

module.exports = router;
