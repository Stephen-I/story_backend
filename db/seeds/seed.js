const db = require("../connection");
const format = require("pg-format");
const { formatCharacters } = require("./utils");

const seed = ({ characterData, story_partsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS characters;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS story_parts;`);
    })
    .then(() => {
      const storyPartsTablePromise = db.query(`
                  CREATE TABLE story_parts (
                    story_section_id SERIAL PRIMARY KEY,
                      part INT,
                      synopsis VARCHAR NOT NULL
                  );`);
      const charactersTablePromise = db.query(`
                  CREATE TABLE characters (
                       full_name VARCHAR,
                       species VARCHAR NOT NULL,
                       age INT DEFAULT 0 NOT NULL,
                       gender VARCHAR NOT NULL,
                       unique_skill VARCHAR NOT NULL,
                       incarnate_drive VARCHAR NOT NULL,
                       story_section_id INT REFERENCES story_parts(story_section_id) NOT NULL,
                       backstory VARCHAR
                  );`);

      return Promise.all([charactersTablePromise, storyPartsTablePromise]);
    })
    .then(() => {
      const insertStory_partsQueryStr = format(
        "INSERT INTO story_parts (part, synopsis) VALUES %L;",
        story_partsData.map(({ part, synopsis }) => [part, synopsis])
      );

      const story_partsPromise = db.query(insertStory_partsQueryStr);

      return story_partsPromise;
    })
    .then(({ rows: story_partsRows }) => {
      const storySectionIdLookup = createRef(
        story_partsRows,
        "part",
        "story_section_id"
      );
      const formattedCharacterData = formatCharacters(
        characterData,
        storySectionIdLookup
      );
      const insertCharacterQueryStr = format(
        "INSERT INTO characters (full_name, species, age, gender, unique_skill, incarnate_drive,story_section_id, backstory) VALUES %L;",
        formattedCharacterData.map(
          ({
            full_name,
            species,
            age = 0,
            gender,
            unique_skill,
            incarnate_drive,
            story_section_id,
            backstory,
          }) => [
            full_name,
            species,
            age,
            gender,
            unique_skill,
            incarnate_drive,
            story_section_id,
            backstory,
          ]
        )
      );

      const characterPromise = db.query(insertCharacterQueryStr);

      return characterPromise;
    });
};

module.exports = seed;
