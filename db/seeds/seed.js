const db = require("../connection");
const format = require("pg-format");

const seed = ({ categoryData, commentData, reviewData, userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS characters;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS story-parts;`);
    })
    .then(() => {
      const charactersTablePromise = db.query(`
                  CREATE TABLE characters (
                       story_section_id SERIAL PRIMARY KEY,
                       Full_name VARCHAR PRIMARY KEY,
                       species VARCHAR NOT NULL,
                       Age INT DEFAULT 0 NOT NULL
                       Gender VARCHAR NOT NULL,
                       Unique_skill VARCHAR NOT NULL,
                       Incarnate_drive VARCHAR NOT NULL,
                       backstory VARCHAR
                  );`);
      const storyPartsTablePromise = db.query(`
                  CREATE TABLE story-parts (
                      part INT,
                      synopsis VARCHAR NOT NULL,
                      story_section_id INT REFERENCES characters(story_section_id) NOT NULL,
                  );`);
    });
};
