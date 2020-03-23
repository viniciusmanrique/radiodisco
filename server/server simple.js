const express = require("express");
const app = express();
const axios = require("axios");
/* const request = require("request"); */

// middleware
const cors = require("cors");

// add http headers
const helmet = require("helmet");

// logs http requests
const logger = require("morgan");

const PORT = process.env.PORT || 5000;

// .env file with keys/secrets
require("dotenv").config();

// parsing
app.use(express.json());

// middleware
app.use(logger("dev"));
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Albums route
const albums = require("./routes/api/albums");
app.use("/api/albums", albums);

// Listening on port:
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
