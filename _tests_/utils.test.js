const { formatCharacters, createRef } = require("../db/seeds/utils");

describe("utils functions", () => {
  test("Check format of data", () => {
    const data = [
      {
        full_name: "Saveron Michaelson",
        species: "Human",
        age: 33,
        gender: "male",
        unique_skill: "Air manipulation",
        incarnate_drive: "lightening beast",
        Extra:
          "Guild master and wielder of holy sword Heavenrend. Spirit partner: thunder beast Byakko",
        story_section_id: 1,
        backstory: "none",
      },
    ];
    const story_part = [1, "None"];
    const storySectionIdLookup = createRef(
      story_part,
      "part",
      "story_section_id"
    );

    const arr = [
      [
        "Saveron Michaelson",
        "Human",
        33,
        "male",
        "Air manipulation",
        "lightening beast",
        1,
        "none",
      ],
    ];

    const formattedCharacterData = formatCharacters(data, storySectionIdLookup);

    expect(formattedCharacterData).toEqual(arr);
  });
});
