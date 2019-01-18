document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1871 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const commentsUL = document.querySelector("#comments")

  const imageCard = document.querySelector("#image_card")

  fetch(imageURL)
    .then(res => res.json())
    .then(renderImageCard)

  //Step 1: Rendering Data
  function renderImageCard(data) {
    imageCard.dataset.id = data.id

    imageCard.innerHTML = `<img src="${data.url}" id="image" data-id="${data.id}"/>
    <h4 id="name">${data.name}</h4>
    <span>Likes:
      <span id="likes">${data.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit" class="submit-btn"/>
    </form>
    <ul id="comments">
         <!-- <li> for each comment goes here -->
         <li>${data.comments[0].content}</li>
    </ul>`
  }

  //Step 2: Likes -- Front End

imageCard.addEventListener("click", (e)=> {
  if(e.target.id === "like_button"){
    //alert("does the thing");
    const span = e.target.previousElementSibling.querySelector("#likes");

    const likeNum = parseInt(span.innerText) + 1
    span.innerHTML = likeNum

  //Step 3: Likes -- Back End
  const id = e.target.parentNode.dataset.id
  //debugger --
  const option = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:
      JSON.stringify({"image_id": id})
  }

  fetch('https://randopic.herokuapp.com/likes', option)
    .then(res => res.json())
  }
})

//Step 4 -- Comment Frontend
const commentForm = document.getElementById("comment_form")
debugger

commentForm.addEventListener("submit",(event) => {
  event.preventDefault();
    let commentInput = commentForm.querySelector(`input[name = "comment"]`).value

    const newCommentLi = document.createElement("li")
    newCommentLi.innerText = commentInput

    commentsUL.append(newCommentLi);
})

})
