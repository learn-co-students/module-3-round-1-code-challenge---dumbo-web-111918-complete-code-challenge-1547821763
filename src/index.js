document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const imageId = 1860 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeBtn = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  const commentSection = document.getElementById('comments')

  likeBtn.addEventListener('click', likeHandler)
  commentForm.addEventListener('submit', commentHandler)
  init(imageURL)

  commentSection.addEventListener('click', commentDelegation)

})


function init(imageURL) {
  fetch(imageURL)
  .then(res => res.json())
  .then(dat => {
    let imgTag = document.querySelector('#image_card > img')
    imgTag.src = dat.url
    let hTag = document.querySelector('#name')
    hTag.innerText = dat.name
    let likes = document.querySelector('#likes')
    likes.innerText = dat.like_count
    let comments = document.getElementById('comments')
    dat.comments.map(comment => {
      let li = document.createElement('li')
      li.innerText = comment.content
      li.dataset.id = comment.id

      let button = document.createElement('button')
      button.className = 'delete-comment-button btn-xs btn-danger'
      button.innerText = 'delete comment'

      li.append(`  `)
      li.append(button)

      comments.append(li)
    })
  })
}

function likeHandler() {
  const likeURL = `https://randopic.herokuapp.com/likes/`
  let like = document.querySelector('#likes')
  let n = Number(like.innerText)
  n++
  like.innerText = n
  let obj = {image_id: 1860}
  fetch(likeURL, {
    method : "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}

function commentHandler(e) {
  e.preventDefault()

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const commentHolder = document.getElementById('comments')
  const input = document.getElementById('comment_input')

  let li = document.createElement('li')
  li.innerText = input.value

  let button = document.createElement('button')
  button.className = 'delete-comment-button btn-xs btn-danger'
  button.innerText = 'delete comment'
  li.append(`  `)
  li.append(button)

  commentHolder.append(li)

  let obj = {content: input.value, image_id: 1860}

  fetch(commentsURL, {
    method : "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(dat => li.dataset.id = dat.id)
}

function commentDelegation(e) {
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  if (e.target.className.includes('delete-comment-button')) {
    let li = e.target.parentNode
    let id = li.dataset.id
    li.remove()

    console.log(id)
    fetch(`${commentsURL}/${id}`, {
      method : "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
