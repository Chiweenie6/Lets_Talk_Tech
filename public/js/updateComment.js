// Update existing comment
const updateCommentForm = async (event) => {
  event.preventDefault();

console.log("🚫🚫🚫🚫🚫🚫🚫")

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const commentInfo = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({ opinion }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("🚫" + commentInfo);

    if (commentInfo.ok) {
      document.location.replace("/profile");
    } else {
      alert("🚫 Could not update Comment 🚫");
    }
  }
};

document
  .querySelector(".update-comment-form")
  .addEventListener("click", updateCommentForm);
