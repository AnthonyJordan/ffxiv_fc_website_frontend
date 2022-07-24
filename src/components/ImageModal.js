function ImageModal({ screenshot, closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <img
          className="modalImage"
          alt="screenshot"
          src={screenshot.screenshot_image_url}
        />
      </div>
    </div>
  );
}

export default ImageModal;
