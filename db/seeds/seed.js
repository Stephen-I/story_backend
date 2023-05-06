const db = require("../connection");
const format = require("pg-format");

const seed = ({ characterData, story_partsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS characters;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS story_parts;`);
    })
    .then(() => {
      const charactersTablePromise = db.query(`
                  CREATE TABLE characters (
                    story_section_id INT REFERENCES story_parts(story_section_id) NOT NULL
                       full_name VARCHAR,
                       species VARCHAR NOT NULL,
                       age INT DEFAULT 0 NOT NULL,
                       gender VARCHAR NOT NULL,
                       unique_skill VARCHAR NOT NULL,
                       incarnate_drive VARCHAR NOT NULL,
                       backstory VARCHAR
                  );`);
      const storyPartsTablePromise = db.query(`
                  CREATE TABLE story_parts (
                      part INT,
                      synopsis VARCHAR NOT NULL,
                      story_section_id SERIAL PRIMARY KEY,
                  );`);

      return Promise.all([charactersTablePromise, storyPartsTablePromise]);
    })
    .then(() => {
      const insertCharacterQueryStr = format(
        "INSERT INTO characters (full_name, species, age, gender, unique_skill, incarnate_drive, backstory) VALUES %L;",
        characterData.map(
          ({
            full_name,
            species,
            age,
            gender,
            unique_skill,
            incarnate_drive,
            backstory,
          }) => [
            full_name,
            species,
            age,
            gender,
            unique_skill,
            incarnate_drive,
            backstory,
          ]
        )
      );

      const characterPromise = db.query(insertCharacterQueryStr);

      const insertStory_partsQueryStr = format(
        "INSERT INTO story_parts (part, synopsis, story_section_id) VALUES %L;",
        story_partsData.map(({ part, synopsis, story_section_id }) => [
          part,
          synopsis,
          story_section_id,
        ])
      );

      const story_partsPromise = db.query(insertStory_partsQueryStr);

      return Promise.all([characterPromise, story_partsPromise]);
    });
};

module.exports = seed;
