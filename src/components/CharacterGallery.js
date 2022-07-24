import React, { useState, useEffect } from "react";

function CharacterGallery({ character }) {
  const [screenshots, setScreenshots] = useState([]);
  useEffect(() => {
    fetch(`/characters/${character.id}/screenshots`).then((r) => {
      if (r.ok) {
        r.json().then((screenshots) => setScreenshots(screenshots));
      }
    });
  }, [character]);
  const ssCards = screenshots.map((screenshot) => (
    <div className="ssCard">
      <img
        className="screenshot"
        alt="screenshot"
        key={screenshot.id}
        src={screenshot.screenshot_image_url}
      />
    </div>
  ));
  return <div className="charactergallery">{ssCards}</div>;
}

export default CharacterGallery;
