exports.formatCharacters = (characters, idLookup) => {
  return characters.map(({ belongs_to }) => {
    const story_section_id = idLookup[belongs_to];
    return {
      story_section_id,
    };
  });
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};
