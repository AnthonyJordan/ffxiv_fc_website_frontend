import React, { useState, useEffect } from "react";

function Gallery({ user }) {
  const [screenshots, setScreenshots] = useState([]);
  useEffect(() => {
    fetch("/screenshots").then((r) => {
      if (r.ok) {
        r.json().then((screenshots) => setScreenshots(screenshots));
      }
    });
  }, []);
  const ssCards = screenshots.map((screenshot) => (
    <div key={screenshot.id} className="ssCard">
      <img
        className="screenshot"
        alt="screenshot"
        src={screenshot.screenshot_image_url}
      />
      <div>
        Uploaded by:
        {" " +
          screenshot.character.first_name +
          " " +
          screenshot.character.last_name}
      </div>
    </div>
  ));
  return <div className="gallery">{ssCards}</div>;
}
export default Gallery;
