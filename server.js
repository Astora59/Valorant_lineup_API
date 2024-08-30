const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL , {useNewUrlParsel: true})
const db = mongoose.connection;
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))


app.use(express.json());

const lineupRouter = require("./routes/lineup"); 
app.use("/lineup", lineupRouter)
"localhosrt:3000/lineup"


app.listen(3000, () => console.log("server started on port 3000"));