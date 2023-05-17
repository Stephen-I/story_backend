const db = require("../db/connection");

exports.seeCharacters = () => {
  return db.query("SELECT * FROM characters;").then(({ rows }) => rows);
};
