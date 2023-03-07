// Create new post comment
const newCommentForm = async function (event) {
  event.preventDefault();

  const post_id = document.querySelector('input[name="post_id"]').value;
  const opinion = document.getElementById("comment-opinion").value.trim();

  console.log(post_id);
  console.log(opinion);

  if (opinion && post_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ opinion, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/posts/" + post_id);
    } else {
      alert("🚫 Could not add comment 🚫");
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", newCommentForm);