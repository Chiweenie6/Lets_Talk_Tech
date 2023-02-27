const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const authenticate = require("../utils/authenticate");

// Join Posts with user info
router.get("/", async (req, res) => {
  try {
    const findPost = await Post.findAll({
      include : [{
        model: User,
        attributes: ["username"]
      }]
    });

// Serializing or makeing it simpler to read
    const posts = findPost.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Get Posts by id
router.get("/posts/:id", authenticate, async (req, res) => {
  try {
    const findPost = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ["username"]
      }]
    });

    const post = findPost.get({plain: true});

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Update post by post.id
router.get("/posts/update/:id", authenticate, async (req, res) => {
  try {
    const findPost = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ["username"]
      }]
    });
    
    const post = findPost.get({plain: true});

    res.render("updatePost", {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(505).json(err);
  }
})

// Must authenticate username to use routes
router.get("/profile", authenticate, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ["password"]},
      include: [{model: Post, Comment}]
    });
    const user = userInfo.get({plain: true});

    res.render("profile", {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(505).json(err);
  }
})

// After logging in go to profile page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
