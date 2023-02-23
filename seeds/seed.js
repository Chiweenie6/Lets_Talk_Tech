const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const commentData = require("./commentData.json");
const postData = require("./postData.json");
const userData = require("./userData.json");

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const post of postData) {
    await post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDB();
