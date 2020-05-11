const express = require("express");

const axios = require("axios");
const qs = require("qs");

const querystring = require("querystring");

// middleware
const cors = require("cors");

// add http headers
const helmet = require("helmet");

// logs http requests
const logger = require("morgan");

// init the express app
const app = express();
const port = process.env.PORT || 5000;

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

let redirect_uri =
  process.env.CALLBACK_URL || "http://localhost:5000/callback/";

app.get("/auth/spotify", function(req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: "user-read-private user-read-email",
        redirect_uri
      })
  );
});

app.get("/callback", function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64")
    },
    json: true
  };

  axios.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || "http://localhost:3000/";
    res.redirect(uri + "?access_token=" + access_token);
  });
});

// Albums route
const albums = require("./routes/api/albums");
app.use("/api/albums", albums);

// Listening on port:
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
