document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const imageCard = document.querySelector('#image_card')
  const image = document.querySelector('#image')
  const likes = document.querySelector('#likes')
  const likeButton = document.querySelector('#like_button')
  const commentForm = document.querySelector('#comment_form')
  const comments = document.querySelector('#comments')


  let imageId = 1856 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


    fetch('https://randopic.herokuapp.com/images/1856')
    .then(r => r.json())
    .then(pic => showPic(pic))


    const showPic = (pic) => {
      imageCard.querySelector('img').setAttribute('data-id', `${pic.id}`)
      imageCard.querySelector('h4').innerText = `${pic.name}`
      imageCard.querySelector('span').innerText = `${pic.like_count}`
      return imageCard.querySelector('img').setAttribute('src', `${pic.url}`)
    }









// const showPic = (pic) => {
//   imageCard.innerHTML += `<div id="image_card" class="card col-md-4" data-id="${pic.id}">
//       <img src="${pic.url}" id="image-${pic.id}" data-id="${pic.id}"/>
//       <h4 id="${pic.name}">${pic.name}</h4>
//       <span>Likes:
//         <span id="likes">${pic.like_count}</span>
//       </span>
//       <button id="like_button" class="button">Like</button>`
//
// }
//
  imageCard.addEventListener('click', e => {
    if(e.target.id === "like_button") {
      const dataId = e.target.parentNode.getAttribute('data-id')
      const span = e.target.parentNode.querySelector('span')
      const spanValue = span.innerHTML
      const likes = parseInt(spanValue)


      fetch(`https://randopic.herokuapp.com/images/${imageId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          like_count: likes + 1
        }),
        headers: {
          'Content-Type': "application/json"
        }
      })
      .then(r => r.json())
      .then(image => span.innerText = image.like_count)

      }

  })

//   commentForm.addEventListener('submit', e => {
//     e.preventDefault()
//     console.log(e.target)
//
//   })





}) //DOMContentLoaded
