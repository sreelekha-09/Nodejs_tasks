var express = require('express');
var router = express.Router();
const path = require('path');
const validate = require('../helpers/auth');
const generate = require('../helpers/hashtoken');
const userDetails = require('../helpers/user');
const posts = require('../helpers/posts.json');
const fs = require('fs');
const db = require('../helpers/db');

router.get('/login', function (req, res, next) {
  if (req.cookies['username'] !== undefined) {
    const username = req.cookies['username'];
    const url = `http://localhost:3000/${username}`;
    res.redirect(url);
  }
  else {
    res.sendFile(path.join(__dirname, '../', 'public', 'login.html'));
  }

});


router.get('/:username', function (req, res, next) {
  if (req.cookies['username'] === undefined) {
    res.redirect(`http://localhost:3000/login`);
  }
  else {
    res.sendFile(path.join(__dirname, '../', 'public', 'userprofile.html'));
  }


});

router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
});


module.exports = router;
