const router = require("express").Router();
const { Post } = require("../../models");
const authenticate = require("../../utils/authenticate")

// Create new post from signed in profile
router.post("/", authenticate, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(202).json(newPost);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Delete existing post from signed in profile
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const findPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!findPost) {
      res.status(404).json({ message: "Post ID Not Found 🚫" });
      return;
    }
    res.status(202).json(findPost);
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;