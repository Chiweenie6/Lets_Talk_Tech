// Outline for creating a new post
const newPostOutline = async (event) => {
  event.preventDefault();

  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();
  const image = document.getElementById("post-image").value.trim();

  if (title && content && image) {
    const postInfo = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, image }),
      headers: { "Content-Type": "application/json" },
    });

    if (postInfo.ok) {
      document.location.replace("/profile");
    } else {
      alert("Could not create Post 🚫");
    }
  }
};

document
  .getElementById("new-post-outline")
  .addEventListener("submit", newPostOutline);
