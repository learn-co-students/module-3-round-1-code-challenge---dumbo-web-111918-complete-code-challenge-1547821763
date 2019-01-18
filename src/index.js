document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1861 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

    getImg()

    function getImg() {
    return fetch(imageURL)
      .then(res => res.json())
      .then(image => imageFunc(image))
      };

  function imageFunc(image) {
    let imgContent = document.getElementById("image_content")
    let imageContainer = document.querySelector('.container')
    let imageCard = document.getElementById("image_card")
    let image1 = document.getElementById("image")
    let imgName = document.getElementById("name")
    let imgLikes = document.getElementById("likes")
    // let imageContainer = document.querySelector('.container')
    // let imgComment = document.getElementById("comment_input")
    // let some = document.getElementsByClassName("")
    let imgComment = document.getElementById("comments")




    image1.src = image.url
    imgName.innerText = image.name
    imgLikes.innerText=image.like_count
    // imgComment.innerHTML = image.comments.content
  }




  const likeBtn = document.getElementById("like_button")
	  likeBtn.addEventListener('click', function(e){

	    const id = e.target.parentNode.dataset.id;
	    // console.log(id);
	    const likeCount = parseInt(e.target.previousSibling.innerText)+1
	    e.target.previousSibling.innerText = `${likeCount}`

	    fetch(likeURL, {

	      "method": "POST",
	      "headers": {
          "Accept": "application/json",
	        "Content-Type": "application/json"
	      },
	      "body": JSON.stringify({
	        likes: likeCount,
          image_id: imageId
	    })
	  }).then(getImg)
	  })

    const commentForm = document.getElementById('comment_input')
    commentForm.addEventListener('submit', function(e){
    	  e.preventDefault()

    	  const comment = e.target.getElementsByClassName("input-text")[0].value

    	  fetch(imageURL, {
    	    method: "POST",
    	    headers: {
    	      "Content-Type": "application/json",
    	      "Accept": "application/json"
    	        },

    	    body: JSON.stringify(
    	      {
    	      "content": comment

    	    })
    	  });

})
})
