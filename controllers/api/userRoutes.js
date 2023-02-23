const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.loggedIn = true;
      res.status(202).json(userInfo);
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!userInfo) {
      res.status(404).json({ message: "Username or password is incorrect 🚫" });
      return;
    }

    const userPassword = await userInfo.checkPassword(req.body.password);

    if (!userPassword) {
      res.status(404).json({ message: "Username or password is incorrect 🚫" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: "Hurray! 🎉 You're logged in." });
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(202).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
