const lessonContainerElem = document.getElementById('lesson-container');
let lesson = '/api/lessons/5d60d9cfc99822652acd1f34';

getLesson(lesson)
  .then(data => JSON.stringify(data))
  .then(results => {
    lessonContainerElem.innerHTML = results;
  })
  .catch(err=> console.log(err))

function getLesson(url = '', data = {}) {
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
  .then(response => response.json());
}