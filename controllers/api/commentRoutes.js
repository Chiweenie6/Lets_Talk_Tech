const router = require("express").Router();
const { Comment } = require("../../models");
const authenticate = require("../../utils/authenticate");

// Create a new comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(202).json(newComment);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Must be logged in to update a comment
router.put("/:id", authenticate, async (req, res) => {
  try {
    const findComment = await Comment.update(
      {
        opinion: req.body.opinion,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!findComment) {
      res.status(404).json({ message: "🚫 Comment ID Not Found 🚫" });
      return;
    }
    res.status(202).json(findComment);
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to delete a comment
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const findComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!findComment) {
      res.status(404).json({ message: "🚫 Comment ID Not Found 🚫" });
      return;
    }
    res.status(202).json(findComment);
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
