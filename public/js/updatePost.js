// Update existing post
const updatePostOutline = async (event) => {
  event.preventDefault(); 

  console.log("🚫🚫🚫🚫🚫🚫🚫")

const post_id = document.querySelector("#post-id").value;
const title = document.getElementById("post-title").value.trim();
const image = document.getElementById("post-image").value.trim();
const content = document.getElementById("post-content").value.trim();

if (title && image && content) {
  try {
  // if (event.target.hasAttribute("data-id")) {
  //   const id = event.target.getAttribute("data-id");

    console.log("🚩🚩🚩🚩" + post_id);

    const postInfo = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, image, content }),
      headers: { "Content-Type": "application/json" },
    });

console.log("✏️", ("/api/posts/" + post_id))

console.log("🍔🍔🍔🍔🍔🍔🍔" + postInfo);

    if (postInfo.ok) {
      alert("Post Updated 👍");
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
