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
  const character_picture_url = comment.character_picture_url
    ? comment.character_picture_url
    : require("../../default_avatar.jpg");
  const deleteButton =
    user.id === comment.user_id || user.admin ? (
      <button onClick={deleteComment}>Delete</button>
    ) : null;
  return (
    <div className="commentDisplay">
      <div className="commentPicBox">
        <img
          className="commentPic"
          alt="character"
          src={character_picture_url}
        />
        <label>{comment.character_name}</label>
      </div>

      <div className="commentBox">{comment.comment_text}</div>
      <div className={"deleteComment"}>{deleteButton}</div>
    </div>
  );
}

export default CommentDisplay;
