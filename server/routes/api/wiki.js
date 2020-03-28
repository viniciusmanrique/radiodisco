const express = require("express");
const axios = require("axios");
const router = express.Router();

// Gets Wikipedia data
router.get("/", async (req, res, next) => {
  const data = await axios
    .get(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Radiohead`
    )
    .then(axiosRes => {
      res.status(200).send(axiosRes.data);
    })
    .catch(error => {
      console.error(error);
    });
});

module.exports = router;
