const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const authenticate = require("../utils/authenticate");

// Join posts with user info
router.get("/", async (req, res) => {
  try {
    const postInfo = await Post.findAll({
      include : [{
        model: User,
        attributes: ["username"]
      }
      ]
    });
// Serializing or makeing it simpler to read
    const postList = postInfo.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      postList,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Get posts by id
router.get("/posts/:id", async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ["username"]
      }]
    });
    const postList = postInfo.get({plain: true});
    res.render("post", {
      ...postList,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(505).jsonn(err);
  }
});

// Must authenticate username to use routes
router.get("/profile", authenticate, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ["password"]},
      include: [{model: Post}]
    });
    const userList = userInfo.get({plain: true});

    res.render("profile", {
      ...userList,
      logged_in: true
    });
  } catch (err) {
    res.status(505).json(err);
  }
})

// already logged in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
