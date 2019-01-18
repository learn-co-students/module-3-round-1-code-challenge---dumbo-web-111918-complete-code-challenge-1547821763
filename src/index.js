function slapCommentOnDOM(comment, ul){
  let thisComment = document.createElement('li')
  thisComment.innerText = comment.content
  ul.append(thisComment)
}




document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1869 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`



  let imageContainer = document.querySelector("#image")
  let imageName = document.querySelector("#name")
  let imageLikes = document.querySelector("#likes")
  let imageComments = document.querySelector("#comments")
  let likeBtn = document.querySelector("#like_button")
  let commentForm = document.querySelector("#comment_form")


  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    let submittedComment = e.target.comment.value
    let commentObject = {
      image_id: 1869,
      content: submittedComment
    }
    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentObject)
    })
    .then(res => res.json())
    .then(c => slapCommentOnDOM(c, imageComments))
    e.target.comment.value = ""
  })

  likeBtn.addEventListener("click", function(e){
    likeCount = parseInt(imageLikes.innerText) + 1
    imageLikes.innerText = likeCount
    likeObj = {
      image_id: 1869
    }
    fetch('https://randopic.herokuapp.com/likes', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(likeObj)
    })
  })



  fetch(imageURL)
  .then(res => res.json())
  .then(image => {
    imageName.innerText = image.name
    imageContainer.src = image.url
    imageLikes.innerText = image['like_count']
    image.comments.forEach(comment => slapCommentOnDOM(comment, imageComments))
  })


})
