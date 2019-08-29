const express = require('express');
const router = express.Router();

const lessonCtrl = require('../controllers/api/lessons');
const commentCtrl = require('../controllers/api/comments');
const bookmarkCtrl = require('../controllers/api/bookmarks');
const highlightCtrl = require('../controllers/api/highlights');
const menuCtrl = require('../controllers/api/menu');
const navCtrl = require('../controllers/api/nav');

//* Lessons
// click from contents/navigate.ejs
router.get('/lessons/:id', lessonCtrl.show);

//* Comments
// router.get('/comments/:id', commentCtrl.show);
// router.put('/comments/:id', commentCtrl.edit);
router.delete('/comments/:id', commentCtrl.delete);
router.post('/lessons/:id/comments/:pos', commentCtrl.create);
// router.post('/comments/:id/thread', commentCtrl.thread);

//* Bookmarks
router.post('/bookmarks', bookmarkCtrl.create);
router.put('/bookmarks/:id', bookmarkCtrl.edit);
// router.delete('/bookmarks/:id/delete', bookmarkCtrl.delete);

//* Highlights
router.post('/lessons/:id/highlights/:pos', highlightCtrl.create);
// router.delete('/highlights/:id', highlightCtrl.delete);

//* Menu
router.get('/menu', menuCtrl.show);

//* Nav
// get notification
// get tree
// get bookmark
router.get('/notifications', navCtrl.showNotifications);
router.get('/trees', navCtrl.showTrees);
router.get('/bookmarks', navCtrl.showBookmarks);

module.exports = router;
