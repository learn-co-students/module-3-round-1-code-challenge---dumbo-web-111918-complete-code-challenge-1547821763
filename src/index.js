document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
//selectors here
  let imageId = 1864 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const classCard = document.querySelector(".card col-md-4")
  const image = document.querySelector("#image")
  const name = document.querySelector("#name")
  //console.log(name)
  const likes = document.querySelector("#likes")
  const comments = document.querySelector("#comment_input")
  const ul = document.querySelector("#comments")
  const likeButton = document.querySelector("#like_button")
  const commentForm =document.querySelector("#comment_form")
  const commentInput = document.querySelector("#comment_input")


//fetches here
   fetch(imageURL)

    .then(function(response){
    	return response.json()
    })
    .then(function(data){

       console.log(data)

       renderImage(data)

         // function renderImage (data){
         //   let selectedImage = data.url;
         //   image.src = selectedImage
         //   let selectedName = data.name;
         //   console.log(selectedName)
         //    name.innerHTML = selectedName
         //   let like_count = data.like_count
         //   likes.innerHTML = like_count
         //   let selectedComments= data.comments
         //   selectedComments.forEach(renderComments)
         //   //debugger;
         //  }

    })




//listeners here

likeButton.addEventListener("click", function(event){

  let spanLikes = event.target.parentElement.querySelector("#likes")
  let num = spanLikes.innerHTML
  console.log(num);
  //debugger
  num = parseInt(num) + 1
  spanLikes.innerHTML = num;

  fetch ('https://randopic.herokuapp.com/likes/',

   {
    method: "POST",
    headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
              },
    body: JSON.stringify(
             {
            image_id: 1864,
            likes: num
             }
    )

   }//end of object

  )//end of fetch

  .then(function(response){
  	response.json()
  })
  .then(function(data){
  	//console.log(data);
  })

 })//end of listener

commentForm.addEventListener("submit",function(event){
	event.preventDefault();

   let newComment = commentInput.value
   //debugger;
   let li =document.createElement("li")
   li.innerHTML = newComment
   ul.append(li)
   console.log(event)
   //debugger;

  fetch ('https://randopic.herokuapp.com/comments',

   {
    method: "POST",
    headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
              },
    body: JSON.stringify(
             {
            image_id: 1864,
            content: newComment
             }
    )

   }//end of object

  )//end of fetch

  .then(function(response){
  	response.json()
  })
  .then(function(data){
  	//console.log(data);
  	//
  })

})

//functions here

function renderComments(comment){
             //li = createElement("li")
             let li = document.createElement("li")
             li.innerHTML = comment.content
              ul.append(li)
             }

      function renderImage (data){
           let selectedImage = data.url;
           image.src = selectedImage
           let selectedName = data.name;
           console.log(selectedName)
            name.innerHTML = selectedName
           let like_count = data.like_count
           likes.innerHTML = like_count
           let selectedComments= data.comments
           selectedComments.forEach(renderComments)
           //debugger;
          }


})//end of DOM






