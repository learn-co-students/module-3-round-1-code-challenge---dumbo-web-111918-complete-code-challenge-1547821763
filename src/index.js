
let imageId = 1868 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

//important html elements
const imageBox = document.getElementById("image")
const nameBox = document.getElementById("name")
const likeBox = document.getElementById("likes")
const commentUl = document.getElementById("comments")
const likeBtn = document.getElementById("like_button")
const commentForm = document.getElementById("comment_form")

function putImageOnDom() {
  fetch(imageURL)
    .then(res => res.json())
    .then(data => {
      nameBox.innerHTML = data.name
      imageBox.src = data.url
      imageBox.dataset.id = imageId
      likeBox.innerHTML = data.like_count
      data.comments.forEach( c => {
        let commentLi = document.createElement("li")
        commentLi.innerHTML = c.content
        commentLi.dataset.id = c.id
        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "delete"
        deleteBtn.className = "delete-button"
        deleteBtn.dataset.id = c.id

        commentLi.append(deleteBtn)
        commentUl.append(commentLi)
      })
    })
}

function incrementLikes(event) {
  likeBox.innerHTML++
  fetch("https://randopic.herokuapp.com/likes", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { image_id: imageId }
    )
  }).then(res => res.json())
    .then(data => {
      likes++
    })
}

function addComment(event) {
  event.preventDefault();
  let commentText = event.target.children[0].value
  event.target.children[0].value = ""
  fetch("https://randopic.herokuapp.com/comments", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: commentText
    })
  }).then(res => res.json())
    .then(data => {
      let commentLi = document.createElement("li")
      commentLi.innerHTML = data.content
      commentLi.dataset.id = data.id
      let deleteBtn = document.createElement("button")
      deleteBtn.innerText = "delete"
      deleteBtn.className = "delete-button"
      commentLi.append(deleteBtn)
      commentUl.append(commentLi)
    })
}



document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  putImageOnDom()

  likeBtn.addEventListener("click", incrementLikes)

  commentForm.addEventListener("submit", addComment)

  commentUl.addEventListener("click", e => {
    if (e.target.className === "delete-button") {
      let comment = e.target.parentElement
      e.target.parentElement.remove()
      fetch(`https://randopic.herokuapp.com/comments/${comment.dataset.id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  })
})
