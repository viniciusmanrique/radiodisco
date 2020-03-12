const express = require("express");
const app = express();
const cors = require("cors");
/* const albums = require("./routes/api/albums"); */

app.use(express.json());
app.use(cors());
/* app.use("/api/albums", albums); */
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
