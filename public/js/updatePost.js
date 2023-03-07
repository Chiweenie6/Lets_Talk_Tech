// Update existing post
const updatePostOutline = async (event) => {
  event.preventDefault();

  const post_id = document.getElementById("post-id").value;
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  if (post_id && title && content) {
    const response = await fetch("api/posts/" + post_id, {
      method: "PUT",
      body: JSON.stringify({ post_id, title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (updatePost.ok) {
        alert("Post Updated 👍");
        document.location.replace("/profile");
      } else {
        alert("🚫 Could not update Post 🚫");
      }
    }
  };

  // fetch("/api/posts/" + postID, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //         title: title.value,
  //         content: content.value
  //     }),
  //     headers: {"Content-Type": "application/json"}
  // })
  // .then(() => {
  //     alert("Post Updated");
  //     document.location.replace("/profile");
  // })
  // .catch(err => {
  //     alert(err);
  // });

//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");
//     const updatePost = await fetch(`/api/posts/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ post_id, title, content }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (updatePost.ok) {
//       alert("Post Updated 👍");
//       document.location.replace("/profile");
//     } else {
//       alert("🚫 Could not update Post 🚫");
//     }
//   }
// };

document
  .getElementById("update-post-outline")
  .addEventListener("submit", updatePostOutline);
