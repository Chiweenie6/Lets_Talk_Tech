// Create new Comment
const newCommentOutline = async (event) => {
    event.preventDefault();

    const postID = document.getElementById("post-id").value;
    const opinion = document.getElementById("comment-opinion").value.trim();

    if(opinion) {
        const commentInfo = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({postID, opinion}),
            headers: {"Content-Type": "application/json"}
        });


        const oldComment = await fetch(`/api/comments/${postID}`);
        const {comments} = await oldComment.json();
        const opinionArea = document.getElementById("comment-opinion");


        opinionArea.innerHTML = "";
        comments.forEach(comment => {
            const commentOpinion = document.createElement("div");
            commentOpinion.innerHTML = `<p>${comment.opinion}</p>
            <p> ${comment.User.username}, ${format_date(comment.date_created)}</p>`;
            opinionArea.appendChild(commentOpinion);
        });

        document.getElementById("comment-opinion").value = "";




        // if (commentInfo.ok) {
        //     document.location.reload();
        // } else {
        //     alert("Could not create Comment 🚫");
        // }
    }
};

// Update existing post
const updateCommentButton = async (event) => {
    event.preventDefault();

    const commentID = document.getElementById("comment-opinion").id;
    const opinion = document.getElementById("comment-opinion").value.trim();

    if (opinion) {
        const postInfo = await fetch(`/api/comments/${commentID}`, {
            method: "PUT",
            body: JSON.stringify({opinion}),
            headers: {"Content-Type": "application/json"}
        });

        if (postInfo.ok) {
            document.location.replace("/profile");
        } else {
            alert("Could not update Comment 🚫")
        }
    }
};

document.querySelector(".new-comment-outline").addEventListener("submit", newCommentOutline);
document.querySelector(".update-comment").addEventListener("click", updateCommentButton);