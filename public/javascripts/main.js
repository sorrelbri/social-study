import * as getLesson from '/modules/fetch-lessons';

const contentElem = document.querySelector('content');

let lesson = `/api/lessons/${lessonContainerElem.getAttribute('data-lesson')}`;


getLesson.getLesson(lesson, contentElem);