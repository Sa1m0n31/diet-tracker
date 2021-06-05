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
    pool.query("SELECT p.nazwa, w.kilokalorie, w.tluszcze, w.weglowodany,\n" +
        "w.cukry, w.bialka, w.sole, w.blonnik, m.wapn, m.chlor, m.magnez, m.fosfor, m.potas\n" +
        "FROM produkty p \n" +
        "JOIN wartosci_odzywcze w ON p.id = w.id_produktu\n" +
        "JOIN makroelementy m ON p.id = m.id_produktu;", (err, res) => {
        response.send({
            products: res.rows
        });
    });
});

/* Dodajemy produkt do poczekalni, gdzie czeka na akceptacje przez administratora */
router.post("/add-product-to-waiting-room", (request, response) => {
    const form = request.body;
    let inserted = 0;
    const query = `INSERT INTO poczekalnia_produktow VALUES(nextval('poczekalnia_produktow_autoincrement'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
    const values = [form.name, form.calories, form.carbo, form.fat, form.sugar, form.salt, form.fiber,
        form.magnesium, form.potassium, form.phosphorus, form.chlorine, form.calcium, form.protein, form.kind
    ];

    pool.query(query, values, (err, res) => {
        if(res) inserted = 1;
        response.send({
            inserted
        });
    });
});

router.post("/add-meal", async (request, response) => {
    const userId = request.body.userId;
    const amount = request.body.productAmount;
    const productName = request.body.productName;
    let productId = 0;

    const query = `SELECT id FROM produkty WHERE nazwa = $1`;
    const values = [productName];

    /* Znajdujemy id produktu wedlug jego nazwy */
    await pool.query(query, values, (err, res) => {
        if(res) productId = res.rows[0].id;
        const query = `INSERT INTO spozycie VALUES (
                                            nextval('spozycie_autoincrement'),
                                            $1,
                                            $2,
                                            CURRENT_DATE,
                                            $3
    )`;
        const values = [userId, productId, amount];
        pool.query(query, values, (err, res) => {
            if(res) {
                if(res.rowCount > 0) {
                    response.send({
                        inserted: 1
                    });
                }
                else {
                    response.send({
                        inserted: -1
                    });
                }
            }
            else {
                response.send({
                    inserted: 0
                });
            }
        });
    });
});

module.exports = router;
