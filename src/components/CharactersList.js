function CharactersList({ characters, onCharacterClick }) {
  const charactersLis = characters.map((character) => (
    <li key={character.id} onClick={() => onCharacterClick(character)}>
      {character.first_name + " " + character.last_name}
    </li>
  ));
  return (
    <div className="characterslist">
      <ul>{charactersLis}</ul>
    </div>
  );
}

export default CharactersList;
