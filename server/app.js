const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const PostgreSqlStore = require("connect-pg-simple")(session);
const { Pool, Client } = require("pg");

const app = express();

const registerRouter = require("./registerRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

const port = 5000;
const postgresPort = 5432;

/* Oprogramowanie posredniczace */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

/* Routing */
app.use("/", registerRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

/* Polaczenie z baza danych PostgreSQL */
const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'diet-tracker',
   password: 'admin',
   port: postgresPort
});

app.use(session({
   store : new PostgreSqlStore({
      conString: "postgres://szymon:lolpol@localhost:5432/diet-tracker"
   }),
   secret: "supersecretkey",
   resave: false,
   saveUninitialized: false,
   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

/* Frontend aplikacji */
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* Startujemy aplikacje */
app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});