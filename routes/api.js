const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../middleware/authenticate');
const lessonCtrl = require('../controllers/api/lessons');
const commentCtrl = require('../controllers/api/comments');
const bookmarkCtrl = require('../controllers/api/bookmarks');
const highlightCtrl = require('../controllers/api/highlights');

// Lessons
router.get('/api/lessons/:id', authenticate, lessonCtrl.show);

// Comments
router.get('/api/comments/:id', authenticate, commentCtrl.show);
router.put('/api/comments/:id', authenticate, commentCtrl.edit);
router.delete('/api/comments/:id', authenticate, commentCtrl.delete);
router.post('/api/lessons/:id/comments', authenticate, commentCtrl.create);
router.post('/api/comments/:id/thread', authenticate, commentCtrl.thread);

// Bookmarks
router.post('/api/lessons/:id/bookmarks/', authenticate, bookmarkCtrl.create);
router.put('/api/bookmarks/:id', authenticate, bookmarkCtrl.edit);
router.delete('/api/bookmarks/:id/delete', authenticate, bookmarkCtrl.delete);

// Highlights
router.post('/api/lessons/:id/highlights', authenticate, highlightCtrl.create);
router.delete('/api/highlights/:id', authenticate, highlightCtrl.delete);