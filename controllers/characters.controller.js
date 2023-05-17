const { seeCharacters } = require("../modals/character.modal");

exports.getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

exports.viewCharacters = (req, res) => {
  seeCharacters().then((characters) => {
    res.status(200).send({ characters });
  });
};

exports.notFoundErr = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};
