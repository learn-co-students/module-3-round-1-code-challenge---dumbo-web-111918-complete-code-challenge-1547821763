let imageId = 1859 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  imageId = document.getElementById("image")
  imageName = document.getElementById("name")
  imageLikes = document.getElementById("likes")
  likeButton = document.getElementById("like_button")
  commentsList = document.getElementById("comments")
  commentForm = document.getElementById("comment_form")

  fetchImage(imageURL, imageId, imageName, imageLikes,commentsList)  
  commentForm.addEventListener("submit", event => makeComment(event, commentsList))
  likeButton.addEventListener("click", event => likeImage(event, imageLikes))
})

function fetchImage(imageURL,imageId, imageName,commentList){
  fetch(imageURL).then(res=>res.json()).then(image=> {
    renderImage(image,imageId, imageName, imageLikes)
    loadComments(image.comments,commentsList)
  })
}

function loadComments(comments, commentsList){
  comments.forEach(comment => renderComment(comment.content,commentsList))
}

function renderImage(image, imageId){
imageId.src = image.url
imageName.innerText = image.name
imageLikes.innerText = image.like_count
}

function makeComment(event, commentsList){
event.preventDefault()
commentBody = event.target.elements.comment.value
renderComment(commentBody, commentsList)
commitComment(commentBody)
}

function renderComment(commentBody,commentsList){
commentLI = document.createElement("li")
commentLI.innerText = commentBody
commentsList.append(commentLI)
}

function commitComment(commentBody){
  
  fetch(commentsURL, {
    method: "POST",
    body: JSON.stringify({
      image_id: 1859,
      content: commentBody
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } 

  }).then(res=> res.json()).then(thing => {
    console.log(imageId)
    console.log(thing)}
    )
}

function likeImage(event, imageLikes){
  imageLikes.innerHTML++
  newlikeValue = imageLikes
  commitLike()
}

function commitLike(){
  fetch(likeURL, {
    method: "POST",
    body: JSON.stringify({
      image_id: 1859,
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } 
  })
}