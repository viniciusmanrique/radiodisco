const express = require("express");

// session id on server session cookie on client
const session = require("express-session");

// middleware
const cors = require("cors");

// add http headers
const helmet = require("helmet");

// logs http requests
const logger = require("morgan");

// init the express app
const app = express();
const PORT = process.env.PORT || 5000;

const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

// .env file with keys/secrets
require("dotenv").config();

// keys/secrets
const passportConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
};

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

// Passport config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SpotifyStrategy(passportConfig, (_accessToken, _refreshToken, done) => {
    User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      return done(err, user);
    });
  })
);

// Routes
app.get("/auth/spotify", passport.authenticate("spotify"), function(
  req,
  res
) {});

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/loginFailed" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CALLBACK_URL);
  }
);

app.get("/loginFailed", (req, res) => {
  res.status(401).send(`please login with a valid account`);
});

// END

// for storing in db, or storing in a cookie
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Listening on port:
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
