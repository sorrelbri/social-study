const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../middleware/authenticate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/auth/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

router.get('/oauth2callback', passport.authenticate('google', 
  { successRedirect: '/main', failureRedirect: '/index' }
));

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/index');
})

router.get('/main', authenticate, (req, res, ) => {
  res.render('main', {user: req.user})
})

module.exports = router;
