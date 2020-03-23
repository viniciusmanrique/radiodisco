const express = require("express"); // Express web server framework
const axios = require("axios");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

// add http headers
const helmet = require("helmet");

// logs http requests
const logger = require("morgan");

// .env file with keys/secrets
require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.CALLBACK_URL;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

const app = express();
const port = process.env.PORT || 5000;

app
  .use(express.static(__dirname + "/public"))
  .use(logger("dev"))
  .use(helmet())
  .use(cors())
  .use(cookieParser());

app.get("/auth/spotify", function(req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
  } else {
    res.clearCookie(stateKey);
    // your application requests authorization
    const params = {
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type: "authorization_code"
    };
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        axios({
          method: "get",
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token }
        })
          .then(() => {
            let frontend_uri =
              process.env.FRONTEND_URI || "http://localhost:3000/";
            res.redirect(
              frontend_uri +
                querystring.stringify({ access_token, refresh_token })
            );
          })
          .catch(e => {
            res.redirect(
              "/#" + querystring.stringify({ error: e.response.data })
            );
          });
      })
      .catch(e => console.error(e.response.data));
  }
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const params = {
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token: refresh_token
  };
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {
      access_token = response.data.access_token;
      res.send({
        access_token: access_token
      });
    })
    .catch(e => {
      console.error(e.response.data);
    });
});

// Albums route
const albums = require("./routes/api/albums");
app.use("/api/albums", albums);

// Listening on port:
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
