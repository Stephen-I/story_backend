exports.formatCharacters = (characters) => {
  return characters.map(
    ({
      full_name,
      species,
      age,
      gender,
      extra,
      unique_skill,
      incarnate_drive,
      story_section_id,
      backstory,
    }) => {
      return [
        full_name,
        species,
        age,
        gender,
        extra,
        unique_skill,
        incarnate_drive,
        story_section_id,
        backstory,
      ];
    }
  );
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};
