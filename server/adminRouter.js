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

/* Metoda usuwajaca produkt z poczekalni */
const deleteProduct = (id) => {
    const query = "DELETE FROM poczekalnia_produktow WHERE id = $1";
    const values = [id];
    pool.query(query, values);
}

/* Pobieramy wszystkie produkty z poczekalni */
router.get("/get-all-products-from-waiting-room", (request, response) => {
    pool.query(`SELECT * FROM poczekalnia_produktow`, (err, res) => {
        if(res) {
            response.send({
                products: res.rows
            });
        }
        else {
            response.send({
                products: null
            });
        }
    });
});

/* Dodajemy produkt do bazy produktow (PRODUKT ZAAKCEPTOWANY) */
router.post("/add-product", async (request, response) => {
    const id = request.body.id;
    let kindId = 0, idOfInsertedRow;
    let productInserted = false, nutritionInserted = false, macroInserted = false;

    /* Pobieramy informacje o produkcie z poczekalni na podstawie id */
    const query = "SELECT * FROM poczekalnia_produktow WHERE id = $1";
    const values = [id];
    pool.query(query, values, (err, res) => {
        const productData = res.rows[0];
        const kind = productData.rodzaj;

        /* Pobieramy id podanego rodzaju produktu */
        pool.query(`SELECT id FROM rodzaje_produktow WHERE nazwa = '${kind}'`, async (err, res) => {
            if(res.rowCount > 0) {
                /* Znaleziono podany rodzaj, zapisujemy id tego rodzaju */
                kindId = res.rows[0].id;

                /* Dodajemy produkt do tabeli PRODUKTY */
                pool.query(`INSERT INTO produkty VALUES (nextval('productautoincrement'), ${kindId}, '${productData.nazwa}') RETURNING id`, async (err, res) => {
                    if(res) {
                        idOfInsertedRow = res.rows[0].id;
                        productInserted = true;
                    }

                    /* Dodajemy wartosci odzywcze do tabeli WARTOSCI_ODZYWCZE */
                    await pool.query(`INSERT INTO wartosci_odzywcze VALUES (nextval('wartosci_odzywcze_autoincrement'),
                                                                                '${idOfInsertedRow}',
                                                                                '${productData.kilokalorie}',
                                                                                '${productData.tluszcze}',
                                                                                '${productData.weglowodany}',
                                                                                '${productData.cukry}',
                                                                                '${productData.bialka}',
                                                                                '${productData.sole}',
                                                                                '${productData.blonnik}'
            )`, (err, res) => {
                        if(res) nutritionInserted = true;
                    });

                    /* Dodajemy makroelementy do tabeli MAKROELEMENTY */
                    await pool.query(`INSERT INTO makroelementy VALUES (nextval('makroelementy_autoincrement'),
                                                                             ${idOfInsertedRow},
                                                                             ${productData.wapn},
                                                                             ${productData.chlor},
                                                                             ${productData.magnez},
                                                                             ${productData.fosfor},
                                                                             ${productData.fosfor}
           )`, (err, res) => {
                        if(res) macroInserted = true;

                        /* Usuwamy produkt z poczekalni */
                        deleteProduct(id);

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
                /* Usuwamy produkt z poczekalni */
                deleteProduct(id);

                response.send({
                    insert: 0
                });
            }
        });
    });
});

/* Usuwamy produkt z poczekalni (PRODUKT NIEZAAKCEPTOWANY) */
router.post("/delete-product", (request, response) => {
    const id = request.body.id;
    deleteProduct(id);
    response.send({
        deleted: 1
    });
});

module.exports = router;
