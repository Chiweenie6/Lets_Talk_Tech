const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const authenticate = require("../utils/authenticate");

// Find all Posts and add username
router.get("/", async (req, res) => {
  try {
    const findPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    // Serializing or makeing it simpler to read
    const posts = findPost.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Get single Post by id with comments
router.get("/posts/:id", authenticate, async (req, res) => {
  try {
    const findPost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      // order: [[{ model: Comment }, "date_created", DESC]],
    });

    const post = findPost.get({ plain: true });

    const postComments = findPost.comments.map((comment) =>
      comment.get({ plain: true })
    );

    res.render("post", {
      ...post,
      ...postComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Update post by post id
router.get("/posts/:id/updatePost", authenticate, async (req, res) => {
  try {
    const findPost = await Post.findByPk(req.params.id);
    const post = findPost.get({ plain: true });

    res.render("updatePost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to create post
router.get("/profile/createPost", authenticate, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userInfo.get({ plain: true });

    res.render("createPost", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to add comment
router.get("/posts/:id/addComment", authenticate, async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
    });
    const post = postInfo.get({ plain: true });

    res.render("addComment", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Update comment by comment id
router.get("/comments/:id/updateComment", authenticate, async (req, res) => {
  try {
    const findcomment = await Comment.findByPk(req.params.id);
    const comment = findcomment.get({ plain: true });

    res.render("updateComment", {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Find comment by id 
// router.get("/comments/:id", async (req, res) => {
//   try {
//     const commentInfo = await Comment.findByPk(req.params.id);
//     const comment = commentInfo.get({ plain: true });

//     res.render("profile", {
//       comment,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(505).json(err);
//   }
// });



// Must authenticate username to get to user profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
        },
        {
          model: Comment,
        },
      ],
    });
    const user = userInfo.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// After logging in go to profile page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
