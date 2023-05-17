import { seeCharacters } from "../modals/character.modal";

exports.getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

exports.viewCharacters = (req, res) => {
  seeCharacters().then((characters) => {
    res.status(200).send({ characters });
  });
};
