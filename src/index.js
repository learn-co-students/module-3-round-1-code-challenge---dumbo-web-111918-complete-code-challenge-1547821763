const imageURL = `https://randopic.herokuapp.com/images/1872`
const imageSpot = document.getElementById("cont1")


document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta")
  
  getImages()
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`

})


function getImages() {
  fetch(imageURL)
    .then(res => res.json())
    .then(image => {
      imageSpot.append(makeImage(image))
    })
}

function makeImage(image) {
  let div = document.createElement("div")
  console.log(image.like_count)
  div.className = "card col-md-4"
  div.innerHTML = `<div id="image_card" class="card col-md-4">
  <img src="${image.url}" id="image" data-id="" />
  <h4 id="name">${image.name}</h4>
  <span>Likes:
  <span id="likes">${image.like_count}</span>
  </span>
  <button id="like_button">Like</button>
  <form id="comment_form">
  <input id="comment_input" type="text" name="comment" placeholder="Add Comment" />
  <input type="submit" value="Submit" />
  </form>
  <ul id="comments">
  <!-- <li> for each comment goes here -->
  </ul>
  </div>`
  return div
}



// ??????????????????????????????????  WTF

let likeButton = document.getElementById("like_button")

likeButton.addEventListener("click", e => {
   console.log(e)

})




