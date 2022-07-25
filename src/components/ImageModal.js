import React, { useEffect, useState } from "react";
import AddCommentForm from "./Forms/AddCommentForm";
import CommentDisplay from "./CommentDisplay";

function ImageModal({ screenshot, closeModal, user, onSSDelete }) {
  const [comments, setComments] = useState([]);
  function handleAddComment(newComment) {
    setComments([...comments, newComment]);
  }
  useEffect(() => {
    fetch(`/screenshots/${screenshot.id}/comments`)
      .then((r) => r.json())
      .then((comments) => setComments(comments));
  }, []);

  function handleDeleteComment(commentId) {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  }

  function deleteScreenshot() {
    fetch(`/screenshots/${screenshot.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onSSDelete(screenshot.id);
        document.getElementById("closeBtn").click();
      }
    });
  }
  const deleteButton =
    user.id === screenshot.user_id || user.admin ? (
      <button onClick={deleteScreenshot}>Delete Picture</button>
    ) : null;

  const commentForm = user ? (
    <AddCommentForm
      user={user}
      screenshot={screenshot}
      onAddComment={handleAddComment}
    />
  ) : null;
  const commentElements = comments
    ? comments.map((comment) => (
        <CommentDisplay
          key={comment.id}
          comment={comment}
          user={user}
          onCommentDelete={handleDeleteComment}
        />
      ))
    : null;
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalClose">
          <button id="closeBtn" onClick={() => closeModal(false)}>
            X
          </button>
        </div>
        <div>
          <img
            className="modalImage"
            alt="screenshot"
            src={screenshot.screenshot_image_url}
          />
        </div>
        {commentElements}
        {commentForm}
        <div>{deleteButton}</div>
      </div>
    </div>
  );
}

export default ImageModal;
