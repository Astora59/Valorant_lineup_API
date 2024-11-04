const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const corsOptions = {
  origin: ['https://valorant-lineup-api.onrender.com', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const lineupRouter = require("./routes/lineup"); 
app.use("/lineup", lineupRouter)



const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const port = process.env.PORT || 3000;
  

app.listen(port, () => console.log(`server started on port ${port}`));