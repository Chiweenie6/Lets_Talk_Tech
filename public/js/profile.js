// Create new Post
const newPostOutline = async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title").value.trim();
    const content = document.getElementById("post-content").value.trim();

    if (title && content) {
        const postInfo = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({title, content}),
            headers: {"Content-Type": "application/json"}
        });

        if (postInfo.ok) {
            document.location.replace("/profile");
        } else {
            alert("Could not create Post 🚫");
        }
    }
};







// Delete an existing comment
const deleteCommentButton = async (event) => {
    if(event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const commentDelete = await fetch(`/api/comments/${id}`, {
            method: "DELETE"
        });

        if (commentDelete.ok) {
            document.location.replace("/profile");
        } else {
            alert("Could not delete Comment 🚫")
        }
    }
};





// Delete existing Post
const deletePostButton = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const postDelete = await fetch(`/api/posts/${id}`, {
            method: "DELETE"
        });

        if (postDelete.ok) {
            document.location.replace("/profile");
        } else {
            alert("Could not delete Post 🚫");
        }
    }
};

document.querySelector(".new-post-outline").addEventListener("submit", newPostOutline);
document.querySelector(".post-list").addEventListener("click", deletePostButton);


document.querySelector(".comment-list").addEventListener("click", deleteCommentButton);