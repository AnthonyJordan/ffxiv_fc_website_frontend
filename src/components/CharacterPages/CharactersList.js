import { NavLink } from "react-router-dom";
function CharactersList({ characters, onCharacterClick }) {
  const charactersList = characters.map((character) => (
    <NavLink
      key={character.id}
      className="characterULE"
      exact
      to={`/members/${character.first_name + character.last_name}`}
    >
      <li onClick={() => onCharacterClick(character)}>
        {character.first_name + " " + character.last_name}
      </li>
    </NavLink>
  ));

  return (
    <div className="charactersList">
      <ul>{charactersList}</ul>
    </div>
  );
}

export default CharactersList;
