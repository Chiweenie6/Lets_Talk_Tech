const newPostOutline = async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title").value.trim();
    const content = document.getElementById("post-content").value.trim();
    const username = document.getElementById("post-username").value.trim();

    if (title && content && username) {
        const postInfo = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({title, content, username}),
            headers: {"Content-Type": "application/json"}
        });

        if (postInfo.ok) {
            document.location.replace("/profile");
        }else {
            alert(postInfo.statusText)
        }
    }
};

const deletePostButton = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const postDelete = await fetch("/api/posts/${id}", {
            method: "DELETE"
        });

        if (postDelete.ok) {
            document.location.replace("/profile");
        } else {
            alert(postDelete.statusText);
        }
    }
};

document.querySelector(".new-post-outline").addEventListener("submit", newPostOutline);
document.querySelector(".post-list").addEventListener("click", deletePostButton);