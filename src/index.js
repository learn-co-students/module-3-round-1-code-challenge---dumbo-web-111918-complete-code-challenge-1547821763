document.addEventListener('DOMContentLoaded', init)

function init(){
  const cardContainer = document.querySelector("#image_content")
  cardContainer.innerHTML = ""
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  getAllImages().then(makeImageCard)

}

function makeImageCard(image){
  const cardContainer = document.querySelector("#image_content")
  const comment = image.comments.forEach(comment => {
    cardContainer.innerHTML = ""
    cardContainer.innerHTML += `<div class="card col-md-4"></div>
    <div id="image_card" class="card col-md-4">
      <img src="${image.url}" id="image" data-id="${image.id}"/>
        <h4 id="name">${image.name}</h4>
        <span>Likes:
          <span id="likes">${image.like_count}</span>
          </span>
          <button id="like_button">❤️</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>

        </form>
        <ul id="comments">
        <li data-id = ${comment.id} id="comment-li"> ${comment.content} <button id="delete_button">❌</button></li>
      </ul>
    </div>`
  })
  const likeBtn = document.querySelector("#like_button")
  likeBtn.addEventListener("click", addLikesHandler)
  const commentForm = document.querySelector("#comment_form")
  commentForm.addEventListener("submit", addCommentHandler)
  const deleteBtn = document.querySelector("#delete_button")
  deleteBtn.addEventListener("click", deleteCommentsHandler)
}

function addLikesHandler(event){
  const card = event.target.parentNode
  let likes = event.target.parentNode.childNodes[5].innerText.split(" ")[1]
  newlikes = parseInt(likes) + 1
  event.target.parentNode.childNodes[5].innerText.split(" ")[1] = newlikes
  updateLikes().then(init)
}

// comments mostly working 😇
function addCommentHandler(event){
  event.preventDefault()
  const commentForm = document.querySelector("#comment_form")
  const newComment = event.target.childNodes[2].previousElementSibling.value
  console.log(newComment);
  postComment(newComment).then(addCommentsToList)
}

function addCommentsToList(comment){
  const commentList = document.querySelector("#comments")
  const commentLi = document.querySelector("#comment-li")
  const newCommentLi = comment.content
  commentList.append(commentLi)
  commentLi.innerText = newCommentLi

}

//mostly working
function deleteCommentsHandler(event){
  const commentID = event.target.parentNode.dataset.id
  const deletedLi = event.target.parentNode
  deletedLi.remove();
  deleteComment(commentID).then(init)
}



// fetches here
let imageId = 1866 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments`


function getAllImages(){
  return fetch(imageURL)
  .then(response => response.json())
}

function postComment(newComment){
  const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",

        },
        body: JSON.stringify({
          "image_id": `1866`,
          "content": newComment,
        })
    }
    return fetch(commentsURL, options)
    .then(response => response.json())

}

function updateLikes(){
  const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",

        },
        body: JSON.stringify({

          "image_id": `1866`,
        })
    }
    return fetch(likeURL, options)
    .then(response => response.json())

}

function deleteComment(commentID){
  const options = {
        method: 'DELETE',
        message: 'comment destroyed',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",

        },
    }
    return fetch(commentsURL + `/${commentID}`, options)
    .then(response => response.json())
}
