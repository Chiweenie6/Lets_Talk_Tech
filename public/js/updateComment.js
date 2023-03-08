// Update existing comment
const updateCommentForm = async (event) => {
    event.preventDefault();
  
    // const comment_id = document.getElementById("comment-opinion").id;
    // const opinion = document.getElementById("comment-opinion").value.trim();
  
    // if (opinion) {
    //   const postInfo = await fetch("/api/comments/" + comment_id, {
    //     method: "PUT",
    //     body: JSON.stringify({ opinion }),
    //     headers: { "Content-Type": "application/json" },
    //   });



      if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const commentInfo = await fetch(`/api/comments/${id}`, {
          method: "PUT",
          body: JSON.stringify({ opinion }),
          headers: { "Content-Type": "application/json" },
        });

        console.log("🚫" + commentInfo)
  
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