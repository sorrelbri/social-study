const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../middleware/authenticate');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('index', { title: 'Social Study', user: req.user || null });
});

router.get('/auth/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

router.get('/oauth2callback', passport.authenticate('google', 
  { successRedirect: '/main', failureRedirect: '/' }
));

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

router.get('/main', authenticate, (req, res, ) => {
  console.log(req.user)
  res.render('main', {user: req.user})
})

module.exports = router;
