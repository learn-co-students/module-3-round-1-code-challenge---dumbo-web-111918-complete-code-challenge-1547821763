document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const imageId = 1867 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/1867`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgCard = document.getElementById("image_card")
  const image = imgCard.querySelector('#image')
  const name = imgCard.querySelector('#name')
  const likesDisplay = imgCard.querySelector('#likes')
  const commentsForm = imgCard.querySelector('#comment_form')
  const commentsUl = imgCard.querySelector('#comments')
  const likesButton = imgCard.querySelector('#like_button')


  fetch(imageURL)
  .then(res => res.json())
  .then(res => {
    name.innerText = res['name']
    likesDisplay.innerText = res['like_count']
    console.log(res);
    image.src = res['url']
    console.log(likesDisplay);

    res['comments'].forEach(function(comment) {
      commentLi = document.createElement("LI");
      let deleteButton = document.createElement('BUTTON')
      deleteButton.innerText = 'Delete'
      commentLi.dataset.commentId = comment.id;
      commentLi.dataset.ImgId = comment.image_id;
      commentLi.innerText = comment.content
      deleteButton.dataset.commentId = comment.id
      commentLi.append(deleteButton)
      commentsUl.append(commentLi);
      console.log(commentLi);
    })
  });

  likesButton.addEventListener("click", function(e){
    likesDisplay.innerText = Number(likesDisplay.innerText) + 1;

    fetch('https://randopic.herokuapp.com/likes', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({image_id: 1867})
    })
    .then(res => res.json())
    .then(res => console.log(res))
  });

  commentsForm.addEventListener("submit", function(e){
    e.preventDefault();

    let commentLii = document.createElement('LI');
    let deleteBtton = document.createElement('BUTTON')
    deleteBtton.innerText = 'Delete'
    console.log(deleteBtton);
    commentLii.append(deleteBtton);
    console.log(commentLii);
    commentLii.innerText = commentsForm.comment.value;
    commentsForm.comment.value = ''
    commentsUl.append(commentLii);

    fetch('https://randopic.herokuapp.com/comments', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({image_id: 1867, content: commentLi.innerText})
    })
  })

  commentsUl.addEventListener('click', function(e) {
    fetch(`https://randopic.herokuapp.com/comments/${event.target.dataset.commentId}`,
    {
      method: 'DELETE'
    })
    .then(function() {
      e.target.parentElement.remove()
    })
  })
})
