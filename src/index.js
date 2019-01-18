document.addEventListener('DOMContentLoaded', () => {

  let likesBtn = document.querySelector("button")
  let imageDiv = document.getElementById("image_card");
  let imageName = document.getElementById("name");
  let commentForm = document.getElementById("comment_form")
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  let imageId = 1857 //Enter the id from the fetched image here
  
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  //FUNCTIONS FOR CHANGING AND UPDATING LIKES
  likesBtn.addEventListener("click", function(){
    let numOfLikes = document.getElementById("likes");
    let newLikes = parseInt(numOfLikes.innerText)
    numOfLikes.innerText = newLikes + 1;
    //patch to backend
    fetch(`https://randopic.herokuapp.com/likes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
      })
    }).then(response => console.log(response.json()))
  })

  //COMMENT FORM FUNCTIONALITY
  commentForm.addEventListener("submit", function(event){
    event.preventDefault();
    let formValue = document.getElementById("comment_input");
    formObj = {
      image_id: imageId,
      content: formValue.value
    }
    renderNewComment(formObj);
    fetch(`https://randopic.herokuapp.com/comments/`, {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(formObj), 
    })
    .then(function(response){
      let commentInput = document.getElementById("comment_input");
      commentInput.value = ""
    })
  })
  
  function renderNewComment(obj) {
    let commentSection = document.getElementById("comments");
    commentSection.innerHTML += 
    `<li data-id="${formObj.id}"> ${formObj.content}</li>`
  }
  
  
  // FUNCTIONS FOR RENDERING IMAGE AND CHANGING IMAGE TITLE
  fetchImage();
  function fetchImage() {
    fetch(imageURL)
    .then(obj => obj.json())
    .then(function(parsedObj) {
      imageName.innerText = `${parsedObj.name}!`
      appendImage(parsedObj)
    })
  }
  
  function appendImage(obj) {
    let cardCol = document.querySelector(".card")
    cardCol.innerHTML += 
    `<img src="http://blog.flatironschool.com/wp-content/uploads/2017/06/IMAG2936-352x200.jpg"/>`
  }

  
  
})
  