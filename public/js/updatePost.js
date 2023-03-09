// Update existing post
const updatePostOutline = async (event) => {
  event.preventDefault();

  const post_id = document.getElementById("post-id").value;
  const title = document.getElementById("post-title").value.trim();
  const image = document.getElementById("post-image").value.trim();
  const content = document.getElementById("post-content").value.trim();

  if (title && image && content) {
    try {
      const postInfo = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ title: title, image: image, content: content }),
        headers: { "Content-Type": "application/json" },
      });

      if (postInfo.ok) {
        // alert("Post Updated 👍");
        document.location.replace("/profile");
      } else {
        alert("🚫 Could not update Post 🚫");
      }
    } catch (err) {
      console.log("🐠🐠🐠🐠", err);
    }
  }
};

document
  .getElementById("update-post-outline")
  .addEventListener("submit", updatePostOutline);
