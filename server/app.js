const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const port = 5000;
const app = express();

const registerRouter = require("./routes/registerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const dataRouter = require("./routes/dataRouter");
const adminRouter = require("./routes/adminRouter");
const activityRouter = require("./routes/activityRouter");

/* Oprogramowanie posredniczace */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

/* Routing */
app.use("/", registerRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/data", dataRouter);
app.use("/admin", adminRouter);
app.use("/activity", activityRouter);

/* Frontend aplikacji */
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* Startujemy aplikacje */
app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});
