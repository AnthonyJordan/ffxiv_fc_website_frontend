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
    <img
      className="screenshot"
      alt="screenshot"
      key={screenshot.id}
      src={screenshot.screenshot_image_url}
    />
  ));
  return <div className="gallery">{ssCards}</div>;
}
export default Gallery;
