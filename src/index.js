document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1862 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageCard = document.getElementById('image_card')
  let likeCount


function fetchPicture(){
document.addEventListener("click", updateImageInfo)
// passing click events all into one method ^^^
  fetch(imageURL)
  .then(res => res.json())
  .then(image => displayImage(image))
};

// will display image to webpage
function displayImage(image){
imageCard.innerHTML =
`<img src="http://blog.flatironschool.com/
wp-content/uploads/2017/02/Campus_Normal-352x200.png"
id="${image.id}"/>
<h4 id="name">${image.name}</h4>
<span>Likes:
  <span id="${image.comments[0].image_id}">${image.like_count}</span>
</span>
<button class="like"id="like_button">Like</button>
<form id="comment_form">
  <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  <input class="submit"type="submit" value="Submit"/>
</form>
<ul id="comments">
     <li id="${image.comments[0].id}">${image.comments[0].content}</li>
</ul>`
console.log(image.comments[0].id)
};

// this method takes all clicks and filters them into the appropriate response methods
function updateImageInfo(e){
  e.preventDefault()
  if(e.target.className === 'like')
  updateLikes()
  else if(e.target.className === 'submit')
  updateComments()
};

// from updateImageInfo
function updateLikes(like){
  likeCount = 0
  console.log('got sent to the like method')
  fetch(likeURL, {
  method: 'POST',
  body: JSON.stringify(likeCount++),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
};

// from updateImageInfo
function updateComments(){
  console.log('got sent to the comment method')
//setting up to append a new comment everytime its made
  let newCommentLine = document.createElement('li')
  let newContent = document.createTextNode('')
  newCommentLine.appendChild(newContent)
  let currentLi = document.getElementById("comments");
  // document.body.insertBefore(newCommentLine, currentLi);
// attempted to add the content to the new LI but ran into errors.
  fetch(commentsURL, {
  method: 'POST',
  body: JSON.stringify(newContent),
  headers:{
    'Content-Type': 'application/json'
  }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));

};














fetchPicture()
})
