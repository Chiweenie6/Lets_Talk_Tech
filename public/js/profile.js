// Delete an existing comment
const deleteCommentButton = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const commentDelete = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (commentDelete.ok) {
      document.location.replace("/profile");
    } else {
      alert("Could not delete Comment 🚫");
    }
  }
};

// Delete existing Post
const deletePostButton = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const postDelete = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (postDelete.ok) {
      document.location.replace("/profile");
    } else {
      alert("Could not delete Post 🚫");
    }
  }
};

document
  .querySelector(".post-list")
  .addEventListener("click", deletePostButton);

document
  .querySelector(".comment-list")
  .addEventListener("click", deleteCommentButton);
