import React, { useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import ScreenshotCard from "./ScreenshotCard";

function Gallery({ character, user, profile }) {
  const [screenshots, setScreenshots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ssSelection, setSSSelection] = useState([]);

  useEffect(() => {
    character
      ? fetch(`/characters/${character.id}/screenshots`).then((r) => {
          if (r.ok) {
            r.json().then((screenshots) => setScreenshots(screenshots));
          }
        })
      : fetch("/screenshots").then((r) => {
          if (r.ok) {
            r.json().then((screenshots) => setScreenshots(screenshots));
          }
        });
  }, [character]);

  useEffect(() => {
    character
      ? profile
        ? (document.title = "Usagi | Profile")
        : (document.title = "Usagi | Members")
      : (document.title = "Usagi | Gallery");
  }, []);

  function handleDeleteScreenshot(screenshotId) {
    const updatedScreenshots = screenshots.filter(
      (screenshot) => screenshot.id !== screenshotId
    );
    setScreenshots(updatedScreenshots);
  }

  function onSSClick(screenshot) {
    setSSSelection(screenshot);
    setModalOpen(true);
  }

  const ssCards = screenshots.map((screenshot) => (
    <ScreenshotCard
      key={screenshot.id}
      screenshot={screenshot}
      handleClick={onSSClick}
    />
  ));

  if (modalOpen) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  return (
    <div className="gallery">
      {ssCards}
      {modalOpen && (
        <ImageModal
          screenshot={ssSelection}
          closeModal={setModalOpen}
          user={user}
          onSSDelete={handleDeleteScreenshot}
        />
      )}
    </div>
  );
}
export default Gallery;
