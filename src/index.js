//------------------------😎----------------------//
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1865 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector("#image_card")



//----------------Fetch my Image-----------//
  fetch(imageURL)
  .then(res => res.json())
  .then(data => showImage(data))

  //----------------Slap on Dom-------------//

  function showImage(image){
// debugger
    document.querySelector("#name").innerText = image.name
    document.querySelector("#likes").innerText = image.like_count
    document.querySelector("#image").src  = image.url
    commentArray = image.comments
//--------------Iterate through comments and slap each one -------------//
    commentArray.forEach (function(comment){
      // debugger
      document.querySelector("#comments").innerHTML += `<li>${comment.content} <button id='commentDelete' data-id= ${comment.id}>Delete</button></li> `
    })
  }
  //---------------added click event to image card stable parent--------------//
  //------------------to increment likes -------------------------------//

    imageCard.addEventListener('click', function(event){
      if(event.target.id.includes("like_button")){
      likes = document.querySelector("#likes").innerText
      likes ++
      document.querySelector("#likes").innerText = likes
      // debugger
      likes = likes

      fetch('https://randopic.herokuapp.com/likes',{
        method: 'POST',
        body:JSON.stringify({image_id: 1865}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      }).then(res => res.json())
      .then(data => (data))
      // debugger
    }
//-----------------added delete button event listener to the same stable parent---//
//---Could not figure out how to make new comments delete from database ---//
//----------------without making a second delete function =( -------------------//

    else if (event.target.id.includes("commentDelete")){
       // debugger
      fetch(`https://randopic.herokuapp.com/comments/${event.target.dataset.id}`,{
        method: 'DELETE',
        body: JSON.stringify({ image_id: 1865})
      })

      event.target.parentElement.remove()
    }
//-----------------Had to make this to delete new comments--------------------//
//--------------------without having to reload the page ------------------//
    else if (event.target.className.includes("deletee")){
        // debugger
      fetch(`https://randopic.herokuapp.com/comments/${event.target.getAttribute("id").slice(7)}`,{
        method: 'DELETE',
        body: JSON.stringify({ image_id: 1865})
      })

      event.target.parentElement.remove()
    }
    })

    //-------------add Comments -----------------------------//
    //----------------could not figure out how to get the delete button---------//
    //----------on each new comment without page reload =(----------------//

    document.querySelector("#comment_form").addEventListener("submit", function(event){
      if(event.target.id.includes("comment_form")){
         // debugger
         let num = 0
         num ++
        event.preventDefault()
        commentContent = document.querySelector("#comment_input").value
        document.querySelector("#comments").innerHTML += `<li class= "newComment-${num}">${commentContent}</li>`

        fetch(commentsURL,{
          method: 'POST',
          body:JSON.stringify({image_id: 1865,
                  content: commentContent}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        //------------------Tried to add a special delete button-------------//
        .then(data => document.querySelector(`.newComment-${num}`).innerHTML += `<button class = "deletee"id='delete-${data.id}'>Delete</button>`)

    }
    })
})
