document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1870 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
          //FIRST RESPONSE/EXAMPLE FROM imageURL

          //{"id":1870,
          // "url":"http://blog.flatironschool.com/wp-content/uploads/2015/10/laptop-352x200.jpg",
          //"name":"Turing Tables",
          //"like_count":0,
          //"comments":[
            //{"id":36136,
            //"content":"first comment!",
            //"image_id":1870,
            //"created_at":"2019-01-18T14:39:38.559Z",
            //"updated_at":"2019-01-18T14:39:38.559Z"}
            //]}

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const pageContainer = document.querySelector('#container')

  getImages()

  function makeImageDiv(){
    let div = document.createElement('div')
    div.className = 'row'
    div.id = `image-${image.id}`

    div.innerHTML =
      `<div class="card col-md-4"></div>
      <div id="image_card" class="card col-md-4">
          <img src="${imageURL}" id="image-${image.id}" data-id="${image.id}"/>
          <h4 id="name">${image.name}</h4>
          <span>Likes:
            <span id="likes">${image.likes}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
               <!-- <li> for each comment goes here -->
          </ul>
        </div>
      <div class="card col-md-4"></div>`

    return div;
  }

})

function getImages(){
  fetch(imageURL)
  .then(r => r.json())
  .then(images => {
    images.forEach(image =>{
      pageContainer.append(makeImageDiv(image))
    })
  })
}



//FIRST ATTEMPT - COME BACK TO THIS

// function getImages(){
  //   return fetch(imageURL)
  //   .then(r => r.json())
  //   .then(images => images.forEach(appendToDom(image)))
  // }

  // function appendToDom(image){
    //   debugger
    //   const imageCard = document.createElement('div')
    //   imageCard.setAttribute('id', 'image_card')
    //
    //   const actualImage = document.createElement('img')
    //   actualImage.src = imageURL
    //
    //   const renderImageId = document.createElement('id')
    //   renderImageId.dataset.id = imageId
    //
    //   const imageName = document.createElement('h4')
    //   imageName.innerText = image.name
    //
    //   const imageLikes = document.createElement('span')
    //   imageLikes.innerText = image.likes
    //
    //   // debugger
    //   imageCard.append(actualImage, imageName, imageLikes)
    //   pageContainer.append(imageCard)
    // }

    //
    // function createNewImage(){
    //   return fetch(imageURL, {
    //      method: "POST",
    //      headers: {
    //        'Accept': 'application/json',
    //        'Content-Type: 'application/json'
    //      },
    //      body: JSON.stringify(
    //          { image: actualImage, name: imageName, likes: imageLikes, comments: imageComments }
    //      )
    //    }).then(res => res.json())
    //      .then(data => {
    //        pageContainer.append(appendToDom(data));
    //      })
    //  })
    // }
