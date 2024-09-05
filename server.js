const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const lineupRouter = require("./routes/lineup"); 
app.use("/lineup", lineupRouter)



app.listen(3000, () => console.log("server started on port 3000"));