//! ----- constants -----*/ 

//TODO 
// let getLesson = import('/modules/fetch-lessons').then(imported => console.log(imported))
const MENU_URL = '/api/menu';
function fetchOptions(method, body) {
  return {
    method,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'manual',
    body: JSON.stringify(body)
  }
}

//!----- app's state (variables) -----*/ 

//!----- cached element references -----*/ 
const contentElem = document.querySelector('content');
const lessonContainerElem = document.getElementById('lesson-container');
const resourceContainerElem = document.getElementById('resource-container');
const menuContainerElem = document.getElementById('menu-container');
const navigateContainerElem = document.getElementById('navigate-container');
const navMenuEl = document.getElementById('nav-menu');

//!----- event listeners -----*/ 
lessonContainerElem.addEventListener('click', handleLessonClick);
navigateContainerElem.addEventListener('click', handleNavigateClick);
menuContainerElem.addEventListener('click', handleMenuClick);
resourceContainerElem.addEventListener('click', handleResourceClick);
navMenuEl.addEventListener('click', handleNavMenuClick);

//!----- functions -----*/

getMenu();

function clearContainers() {
  navigateContainerElem.innerHTML = '';
  menuContainerElem.innerHTML = '';
  lessonContainerElem.innerHTML = '';
  resourceContainerElem.innerHTML = '';
  lessonContainerElem.removeAttribute('data-lesson');
}

//* display lesson
function getLesson(url) {
  console.log(url);
  return fetch(url, fetchOptions('GET'))
  .then(response => response.json())
  .then(results => {
    clearContainers();
    lessonContainerElem.innerHTML = results.lesson.content;
    lessonContainerElem.setAttribute('data-lesson', results.lesson._id)
    renderResources(results.resources, results.user);
  })
  .catch(err=> console.log(err))
}

// ! refactor for bar/pane
//* load menu and navigate
function getMenu() {
  return fetch(MENU_URL, fetchOptions('GET'))
  .then(response => response.json())
  .then(results => {
    clearContainers();
    // results.lessons, results.resources, results.user
    renderMenu(results.resources, results.user);
    renderNavigate(results.lessons);
  })
}

// * display menu aside
function renderMenu(resources, user) {
  let newMenu = document.createElement('div');
  let bookmarks = resources.filter(resource => resource.resource === 'Bookmark');
  let comments = resources.filter(resource => resource.resource === 'Comment');
  newMenu.id = 'menu';
  newMenu.innerHTML = `
  <div id="menu-user">
    <span>${user.name}</span><img src="${user.avatar}" >
  </div>
  <div id="menu-bookmarks">
    <span>My Bookmarks</span>
    <ul class="nested" id="menu-bookmarks-list">
      ${templateMenuBookmark(bookmarks) || 'There\'s nothing here yet'}
    </ul>
  </div>
  <div id="menu-comments">
    <span>My Comments</span>
    <ul class="nested" id="menu-comments-list">
      ${templateMenuComment(comments) || 'There\'s nothing here yet'}
    </ul>
  </div>
  `
  menuContainerElem.appendChild(newMenu);
}

// * create Menu Bookmark list from template
function templateMenuBookmark(bookmarks) {
  let list = ''
  bookmarks.forEach(bookmark => {
    // TODO api/bookmarks/id for onclick + delete
    list += `
    <li data-bookmark="${bookmark._id}"><span>${bookmark.note}</span><span>${bookmark.lesson.name}</span><span>X</span></li>
    `
  })
  return list;
}

// TODO set comment top equal to position.offsetTop
// * create Menu Comment list from template
function templateMenuComment(comments) {
  let list = '';
  comments.forEach(comment => {
    // TODO api/comments/id for onclick
    list += `
    <li data-comment="${comment._id}"><span>${comment.note}</span><span>${comment.lesson.name}</span><span>X</span></li>
    `;
  })
  return list;
}

// ! no more navigate elem
// * display lesson navigation pane
function renderNavigate(lessons) {
  // list for tree each with list for lessons
  let list = '';
  lessons.forEach(lesson => {
    // TODO api/lessons/id for onclick
    list += `
    <li data-lesson="${lesson._id}">${lesson.name}</li>
    `
  });
  let listElem = document.createElement('ul');
  listElem.innerHTML = list;
  navigateContainerElem.appendChild(listElem);
}

//* display resource menu
function handleLessonClick(evt) {
  // TODO toggle menu and styling
  evt.stopPropagation();
  if (evt.target === lessonContainerElem) return;
  evt.target.style.backgroundColor = "yellowgreen";
  let pos = evt.target.getAttribute('data-position');
  let lesson = lessonContainerElem.getAttribute('data-lesson');
  renderForm(lesson, pos);
}

// ! no more Navigate elem
function handleNavigateClick(evt) {
  evt.stopPropagation();
  let lesson = evt.target.getAttribute('data-lesson');
  let lessonUrl = `/api/lessons/${lesson}`;
  getLesson(lessonUrl);
}

function handleMenuClick(evt) {

}

function handleResourceClick(evt) {
  evt.preventDefault();
  let form = evt.target.form;
  let payload = {
    note: form[0].value,
    content: form[1].value,
    public: !!form[2].checked
  }
  if (evt.target.tagName === 'BUTTON') {
    let url = evt.target.value; 
    return fetch(url, fetchOptions('POST', payload)) //! successful POST
    .then(result => result.json())
    .then(lesson => {
      getLesson(`/api/lessons/${lesson}`)
    })
  }
}

function handleNavMenuClick(evt) {
  getMenu();
}

// * render new resource form
function renderForm(lessonId, pos) {
  let newForm = document.createElement('form');
  // TODO refactor button for fetch script
  newForm.innerHTML = `
  <input type="text" name="note" placeholder="Write a short note">
  <input type="textarea" name="content" placeholder="Text for Comments">
  <input type="checkbox" id="public-comment" name="public" checked>
  <label for="public-comment">Make Comment Public</label>
  <button value="/api/lessons/${lessonId}/bookmarks/${pos}">Bookmark</button>
  <button value="/api/lessons/${lessonId}/comments/${pos}">Comment</button>
  <button value="/api/lessons/${lessonId}/highlights/${pos}">Highlight</button>
  `;
  newForm.id = 'new-resource';
  resourceContainerElem.appendChild(newForm);
}

// * render resources in sidebar
function renderResources(resources, user) {
  console.log(resources);
  console.log(user);
  resources.forEach(resource => {
    if (resource.resource === 'Comment') {
      let newCommentElem = document.createElement('div');
      newCommentElem.classList = 'comment';
      newCommentElem.innerHTML = templateComment(resource, user);
      resourceContainerElem.appendChild(newCommentElem);
      document.querySelector(`[data-position="${resource.position}"]`).classList += "comment "
    }
    if (resource.resource === 'Bookmark') {
      document.querySelector(`[data-position="${resource.position}"]`).classList += "bookmark "
    }
    if (resource.resource === 'Highlight') {
      document.querySelector(`[data-position="${resource.position}"]`).classList += "highlight "
    }
  })
}

// * create Comment from template
function templateComment(comment, user) {
  console.log(comment);
  return `
  <div class="comment-heading">
    <div class="comment-note">${comment.note}</div>
    <div class="comment-user-name">${user.name}</div>
    <img class="comment-user-avatar" src="${user.avatar}"></img>
  </div>
  <div class="comment-body">
  ${comment.content}
  </div>
  <div class="comment-menu">
  </div>
  `
}
