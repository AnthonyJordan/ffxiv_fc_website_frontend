function CommentDisplay({ comment, user, onCommentDelete }) {
  function deleteComment() {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onCommentDelete(comment.id);
      }
    });
  }
  const deleteButton =
    user.id === comment.user_id || user.admin ? (
      <button onClick={deleteComment}>Delete</button>
    ) : null;
  return (
    <div className="commentDisplay">
      <img
        className="commentPic"
        alt="character"
        src={comment.character_picture_url}
      />

      <div className="commentBox">{comment.comment_text}</div>
      <div className={"deleteComment"}>{deleteButton}</div>
    </div>
  );
}

export default CommentDisplay;
