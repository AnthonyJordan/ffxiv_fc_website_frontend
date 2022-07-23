function CharacterDisplay({ character }) {
  const houseLoc = character.house_location ? (
    <>
      <div className="charlabel">Peronal House Location:</div>
      <div>{character.house_location}</div>
    </>
  ) : null;
  const character_picture_url = character?.character_picture_url
    ? character.character_picture_url
    : require("../default_avatar.jpg");
  return (
    <div className="characterdisplay">
      <div>
        <img
          alt="profile"
          src={character_picture_url}
          width="200"
          height="200"
        />
      </div>
      <div className="characterInfo">
        <div className="charlabel">Name:</div>
        <div>{character.first_name + " " + character.last_name}</div>
        <div className="charlabel">FC Role:</div>
        <div>{character.role}</div>
        {houseLoc}
        <div className="charlabel">About:</div>
        <div>{character.bio}</div>
      </div>
    </div>
  );
}

export default CharacterDisplay;
