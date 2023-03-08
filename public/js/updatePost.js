// Update existing post
const updatePostOutline = async (event) => {
  event.preventDefault();

  // const post_id = document.getElementById("post-id").value;
  // const title = document.getElementById("post-title").value.trim();
  // const image = document.getElementById("post-image").value.trim();
  // const content = document.getElementById("post-content").value.trim();

  // if (post_id && title && image && content) {
  //   const response = await fetch("api/posts/" + post_id, {
  //     method: "PUT",
  //     body: JSON.stringify({ post_id, title, content }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   if (postInfo.ok) {
  //       alert("Post Updated 👍");
  //       document.location.replace("/profile");
  //     } else {
  //       alert("🚫 Could not update Post 🚫");
  //     }
  //   }
  // };

  

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const postInfo = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, image, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (postInfo.ok) {
      alert("Post Updated 👍");
      document.location.replace("/profile");
    } else {
      alert("🚫 Could not update Post 🚫");
    }
  }
};

document
  .getElementById("update-post-outline")
  .addEventListener("submit", updatePostOutline);
