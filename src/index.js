document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1858 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let singleImageTag = document.querySelector('#image');

  let likeButton = document.getElementById('like_button');

  let commentForm = document.getElementById('comment_form')


  likeButton.addEventListener('click', handleLikeButton)
  commentForm.addEventListener('submit', handleCreateNewSubmitComment)
 
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then((res)=>{
    return res.json();
  })
  .then((data)=>{
    // console.log(data)
    putImageOnDOM(data)

  })

})

function putImageOnDOM (objJson){
    let imageCardDiv = document.getElementById('image_card');
        imageCardDiv.dataset.id = objJson.id

    let theImageToAppend = document.getElementById('image');
      theImageToAppend.src = objJson.url
      theImageToAppend.dataset.id = objJson.id


    let theTitleImage = document.getElementById('name');
      theTitleImage.innerText = objJson.name

    let likesSpan = document.getElementById('likes');
        likesSpan.dataset.id = objJson.id
        likesSpan.innerText = objJson.like_count;
    
        getComments(objJson.comments)
}


function getComments (commentsArr) {
   let ulComments = document.getElementById('comments');
    if (commentsArr.length !== 0){
      commentsArr.forEach((el)=>{
    //create 
    let liComments = document.createElement('li');
        liComments.dataset.id = el.id
        liComments.innerText = el.content
        ulComments.append(liComments)
      })
    }
}

 
function handleLikeButton (event) {
  // console.log(event.target)
  let imageId = 1858

  let likesSpan = document.getElementById('likes');
  let strNum = likesSpan.innerText

  let likeNum = Number(strNum);

  let realLikeNumIncrease = likesSpan.innerText = likeNum + 1

  let id = event.target.parentNode.dataset.id;

  fetch(`https://randopic.herokuapp.com/likes`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      like_count: realLikeNumIncrease,
      image_id: id 
    })
  })
 
}


function handleCreateNewSubmitComment (event) {
  event.preventDefault()
  let ulComments = document.getElementById('comments');
  let id = event.target.parentNode.dataset.id;
  // console.log(id)
  let commentBox = document.getElementById('comment_input').value
  // let userInput = event.target.comment.value;
  console.log(commentBox)

  fetch(`https://randopic.herokuapp.com/comments`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({
    content: commentBox,
    image_id : id
    })
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    event.target.reset();
  })

}

//delete a comment - 
//get the url with id 
//method is delete / no body 
//delete the backend and then delete the node 
