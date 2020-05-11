const express = require("express");
const albumsFile = __dirname + "/../../models/albums.json";
const albums = require(albumsFile);
const router = express.Router();

//Get all Albums
router.get("/", (req, res) => {
  const albumsInfo = albums.map(album => {
    return {
      id: album.id,
      cover: album.cover,
      thumb: album.thumb
    };
  });
  res.json(albumsInfo);
});

//Get specific Album
router.get("/:id", (req, res) => {
  const albumsId = albums.some(album => album.id === req.params.id);
  if (albumsId) {
    res.json(albums.filter(album => album.id === req.params.id).shift());
  } else {
    res
      .status(404)
      .json({ errorMessage: `Album with ID:${req.params.id} not found` });
  }
});

module.exports = router;
