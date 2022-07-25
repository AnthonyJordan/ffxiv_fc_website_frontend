function CharactersList({ characters, onCharacterClick }) {
  const charactersList = characters.map((character) => (
    <li key={character.id} onClick={() => onCharacterClick(character)}>
      {character.first_name + " " + character.last_name}
    </li>
  ));
  return (
    <div className="characterslist">
      <ul>{charactersList}</ul>
    </div>
  );
}

export default CharactersList;
