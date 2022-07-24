import React, { useState, useEffect } from "react";
import ImageModal from "./ImageModal";

function CharacterGallery({ character }) {
  const [screenshots, setScreenshots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ssSelection, setSSSelection] = useState([]);
  useEffect(() => {
    fetch(`/characters/${character.id}/screenshots`).then((r) => {
      if (r.ok) {
        r.json().then((screenshots) => setScreenshots(screenshots));
      }
    });
  }, [character]);
  const ssCards = screenshots.map((screenshot) => (
    <div
      key={screenshot.id}
      className="ssCard"
      onClick={() => {
        setSSSelection(screenshot);
        setModalOpen(true);
      }}
    >
      <img
        className="screenshot"
        alt="screenshot"
        src={screenshot.screenshot_image_url}
      />
    </div>
  ));
  if (modalOpen) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }
  return (
    <div className="charactergallery">
      {ssCards}
      {modalOpen && (
        <ImageModal screenshot={ssSelection} closeModal={setModalOpen} />
      )}
    </div>
  );
}

export default CharacterGallery;
