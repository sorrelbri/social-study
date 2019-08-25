//! ----- constants -----*/ 

//TODO 
// import * as getLesson from '/modules/fetch-lessons';

//!----- app's state (variables) -----*/ 

//!----- cached element references -----*/ 
const contentElem = document.querySelector('content');
const lessonContainerElem = document.getElementById('lesson-container');
const resourceContainerElem = document.getElementById('resource-container');
// const 
//!----- event listeners -----*/ 
lessonContainerElem.addEventListener('click', handleLessonClick);
//!----- functions -----*/

//* display lesson
let lesson = lessonContainerElem.getAttribute('data-lesson')
let lessonUrl = `/api/lessons/${lesson}`;
getLesson(lessonUrl, lessonContainerElem);

function getLesson(url, elem) {
  console.log(url);
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'manual',
  })
  .then(response => response.json())
  .then(data => JSON.stringify(data))
  .then(results => {
    elem.innerHTML = results;
  })
  .catch(err=> console.log(err))
}

//* display resource menu
function handleLessonClick(evt) {
  evt.stopPropagation();
  if (evt.target === lessonContainerElem) return;
  evt.target.style.backgroundColor = "yellow";
  let pos = evt.target.getAttribute('data-position');
  pos = pos.replace(/\\"/g, '');
  console.log(pos);
  renderForm(lesson, pos);
}

// render new resource form
function renderForm(lessonId, pos) {
  let newForm = document.createElement('form');
  newForm.innerHTML = `
  <input type="text" name="note" placeholder="Write a short note">
  <input type="textarea" name="content" placeholder="Text for Comments">
  <button formaction="/api/lessons/${lessonId}/bookmarks/${pos}">Bookmark</button>
  <button formaction="/api/lessons/${lessonId}/comments/${pos}">Comment</button>
  <button formaction="/api/lessons/${lessonId}/highlights/${pos}">Highlight</button>
  `;
  newForm.classList = 'new-resource';
  newForm.method = 'POST';
  resourceContainerElem.appendChild(newForm);
}
