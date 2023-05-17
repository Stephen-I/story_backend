const express = require("express");
const {
  getMessage,
  viewCharacters,
  notFoundErr,
} = require("./controllers/characters.controller");
const app = express();

app.use(express.json());

app.get("/api", getMessage);

app.get("/api/characters", viewCharacters);

app.get("/api/story_parts");

app.get("/api/story_parts/:story_section_id");

app.get("/*", notFoundErr);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: err.message || "Bad Request" });
  } else {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
