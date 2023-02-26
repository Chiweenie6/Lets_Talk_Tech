// Create new Comment
const newCommentOutline = async (event) => {
    event.preventDefault();

    const opinion = document.getElementById("comment-opinion").value.trim();

    if(opinion) {
        const commentInfo = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({opinion}),
            headers: {"Content-Type": "application/json"}
        });

        if (commentInfo.ok) {
            document.location.replace("/profile");
        } else {
            alert("Could not create Comment 🚫");
        }
    }
};

document.querySelector(".new-comment-outline").addEventListener("submit", newCommentOutline);