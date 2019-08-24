const lessonContainerElem = document.getElementById('lesson-container');
let lesson = `/api/lessons/${lessonContainerElem.getAttribute('data-lesson')}`;

// getLesson(lesson, lessonContainerElem)

export function getLesson(url = '', elem) {
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