function ScreenshotCard({ screenshot, handleClick }) {
  return (
    <div className="ssCard" onClick={() => handleClick(screenshot)}>
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
  );
}

export default ScreenshotCard;
