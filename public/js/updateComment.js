// Update existing comment
const updateCommentForm = async (event) => {
    event.preventDefault();
  
    const comment_id = document.getElementById("comment-opinion").id;
    const opinion = document.getElementById("comment-opinion").value.trim();
  
    if (opinion) {
      const postInfo = await fetch(`/api/comments/${comment_id}`, {
        method: "PUT",
        body: JSON.stringify({ opinion }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (postInfo.ok) {
        document.location.replace("/profile");
      } else {
        alert("Could not update Comment 🚫");
      }
    }
  };
  
  document
    .querySelector(".update-comment-form")
    .addEventListener("click", updateCommentForm);