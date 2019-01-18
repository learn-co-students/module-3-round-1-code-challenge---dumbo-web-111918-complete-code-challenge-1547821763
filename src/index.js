document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');
  let imageId = 1863;
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  //Event Listeners
  const likeButton = document.querySelector("#like_button");
  likeButton.addEventListener("click", addLike);
  const commentForm = document.querySelector("#comment_form");
  commentForm.addEventListener("submit", addComment);
  const comments = document.querySelector("#comments");
  comments.addEventListener("click", handleCommentClick);
  //Initial Data
  readResource(imageURL, displayImage);
});

function addLike(e) {
  const imageId = e.target.parentNode.querySelector("#image").dataset.id;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const likeSpan = e.target.parentNode.querySelector("#likes");
  let newLikes = parseInt(likeSpan.innerText) + 1;
  likeSpan.innerText = newLikes;

  let likeData = {
    image_id: parseInt(imageId)
  };
  createResource(likeURL, likeData);
}
function addComment(e) {
  e.preventDefault();
  const imageId = e.target.parentNode.querySelector("#image").dataset.id;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  const commentInput = e.target.querySelector("#comment_input");
  let comment = {
    content: commentInput.value,
    image_id: imageId
  };
  commentInput.value = ""
  createResource(commentsURL, comment, displayComment);
}


function newCommentLI(comment) {
  let com = document.createElement("li");
  let deleteButton = document.createElement("button");
  com.innerText = comment.content;
  com.dataset.commentId = comment.id;

  deleteButton.className = "delete-button";
  deleteButton.innerText = "Delete";
  deleteButton.dataset.commentId = comment.id;
  com.append(deleteButton);

  return com;
}
function addMessage(text) {
  let messageDiv = document.createElement("div");
  let messageP = document.createElement("p");
  messageP.innerText = text;
  messageDiv.append(messageP);
  messageDiv.className = "message";
  document.body.append(messageDiv);
}
function removeCommentFromDOM(id) {
  let comLI = document.querySelector(`li[data-comment-id='${id}']`);
  comLI.remove();
}
function displayImage(data) {
  let tag = document.querySelector("#image");
  let title = document.querySelector("#name");
  let likes = document.querySelector("#likes");
  let comments = document.querySelector("#comments");
  tag.src = data.url;
  tag.dataset.id = data.id;
  title.innerText = data.name;
  likes.innerText = data.like_count;
  displayComments(data.comments);
}
function displayComments(comments) {
  let commentList = document.querySelector("#comments");
  for (comment of comments) {
    let comLI = newCommentLI(comment);
    commentList.append(comLI);
  }
}
function displayComment(comment) {
  document.querySelector("#comments")
    .append(newCommentLI(comment));
}
function deleteComment(id) {

  deleteResource(`https://randopic.herokuapp.com/comments/${id}`, (data) => {
    if(data.message == 'Comment Successfully Destroyed') {
      removeCommentFromDOM(id);
    } else {
      let messages = document.querySelectorAll(".message");
      messages.forEach(message => message.remove());
      addMessage(data.message);
    }
  });
}
function handleCommentClick(e) {
  if (e.target.classList.contains("delete-button")) {
    deleteComment(e.target.dataset.commentId);
  }
}
function createResource(url, data, cb = data => data) {
  fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => cb(json));
}
function readResource(url, cb) {
  fetch(url)
    .then(res => res.json())
    .then(json => cb(json));
}
function deleteResource(url, cb) {
  fetch(url, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => cb(json));
}
