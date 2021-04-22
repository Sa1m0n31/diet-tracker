const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { Pool, Client } = require("pg");

const app = express();

const registerRouter = require("./registerRouter");

const port = 5000;
const postgresPort = 5432;

/* Oprogramowanie posredniczace */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Routing */
app.use("/", registerRouter);

/* Polaczenie z baza danych PostgreSQL */
const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'diet-tracker',
   password: 'admin',
   port: postgresPort
});

// pool.query("SELECT * FROM rodzaje_produktow", (err, res) => {
//    console.log(err, res);
//    pool.end();
// });

/* Frontend aplikacji */
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* Startujemy aplikacje */
app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});