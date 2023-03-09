// Update existing comment
const updateCommentForm = async (event) => {
  event.preventDefault();

  const comment_id = document.getElementById("comment-id").value;
  const opinion = document.getElementById("comment-opinion").value.trim();

  if (opinion) {
    try {
      const commentInfo = await fetch(`/api/comments/${comment_id}`, {
        method: "PUT",
        body: JSON.stringify({ opinion }),
        headers: { "Content-Type": "application/json" },
      });

      if (commentInfo.ok) {
        // alert("Comment Updated 👍");
        document.location.replace("/profile");
      } else {
        alert("🚫 Could not update Comment 🚫");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

document
  .getElementById("update-comment-form")
  .addEventListener("submit", updateCommentForm);
