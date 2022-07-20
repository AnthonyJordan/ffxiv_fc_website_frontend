function CharacterDisplay({ character }) {
  return (
    <div className="characterdisplay">
      <span>{character.first_name + " " + character.last_name}</span>
      <span>{character.role}</span>
      <span>Persona house loc</span>
      <span>{character.bio}</span>
    </div>
  );
}

export default CharacterDisplay;
