var express = require('express');
var router = express.Router();
const db = require('../helpers/db');
const path = require('path');
const validate = require('../helpers/auth');
const generate = require('../helpers/hashtoken');
const userDetails = require('../helpers/user');
const posts = require('../helpers/posts.json');
const fs = require('fs');
const tokenMiddleware = require('../middleware/token');
router.get('/user', tokenMiddleware, function (req, res, next) {
  const username = req.cookies['username'];
  for (var i = 0; i < db.length; i++) {
    if (db[i].username === username) {
      return res.send(JSON.stringify(db[i]));
    }
  }

});
router.post('/auth', function (req, res, next) {
  const credentials = req.body
  const username = req.body.username;
  const url = `/${username}`;
  if (!credentials.username || !credentials.password) {
    return res.status(400).send({ status: 'not ok' });
  }
  const isValidUser = validate(credentials.username, credentials.password)
  {
    if (isValidUser) {

      const token = generate(credentials.username);
      res.cookie('username', credentials.username);
      res.cookie('token', token);
      res.redirect(url);
    }
    else {
      res.send(404);
    }
  }
});
router.get("/posts", function (req, res, next) {
  const username = req.cookies['username'];
  var userPosts = " ";
  for (var i = 0; i < posts.Postdata.length; i++) {
    if (username === posts.Postdata[i].username) {
      userPosts += "User Name:   " + posts.Postdata[i].username + "\n" + "Posts:    " + posts.Postdata[i].postContent + "\n";
    }


  }
  const postsResult = JSON.stringify({ message: userPosts });
  return res.send(postsResult);
});

router.post('/posts/new', tokenMiddleware, function (req, res, next) {
  const content = req.body.newPost;
  const user = req.cookies['username'];
  fs.readFile('./helpers/posts.json', 'utf-8', function (err, data) {
    if (err) throw err

    var posts = JSON.parse(data);
    console.log(posts.Postdata[0]);
    posts.Postdata.unshift({
      username: user,
      postContent: content
    });
    fs.writeFile("./helpers/posts.json", JSON.stringify(posts), err => {

      if (err) throw err;
    });

  })
  res.redirect(`/${user}`);
});
router.get("/signout", function (req, res, next) {
  res.clearCookie("username");
  res.clearCookie("token");
  res.redirect(`/`);
})
module.exports = router;
