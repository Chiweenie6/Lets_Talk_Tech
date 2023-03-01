// Update existing post
const updatePostOutline = async (event) => {
    event.preventDefault();

    const postID = document.getElementById("post-id");
    const title = document.getElementById("post-title").value.trim();
    const content = document.getElementById("post-content").value.trim();


    // fetch("/api/posts/" + postID, {
    //     method: "PUT",
    //     body: JSON.stringify({title, content}),
    //     headers: {"Content-Type": "application/json"}
    // })
    // .then(() => {
    //     alert("Post Updated");
    //     document.location.replace("/profile");
    // })
    // .catch(err => {
    //     alert(err);
    // });

    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const updatePost = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({title, content}),
            headers: {"Content-Type": "application/json"}
        });

        if (updatePost.ok) {
            document.location.replace("/profile");
        } else {
            alert("Could not update Post 🚫");
        }
    }
};

document.getElementById("update-post").addEventListener("submit", updatePostOutline);