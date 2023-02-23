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

    const postList = postInfo.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      postList,
      loggedIn: req.session.loggedIn
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
    const postList = postList.get({plain: true});
    res.render("post", {
      ...this.post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(505).jsonn(err);
  }
});

// Must authenticate username to use routes
router.get("/user", authenticate, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ["password"]},
      include: [{model: Post}]
    });
    const userList = userInfo.get({plain: true});

    res.render("user", {
      ...userInfo,
      loggedIn: true
    });
  } catch (err) {
    res.status(505).json(err);
  }
})

// already logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
