const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// User can have many posts
User.hasMany(Comment, {
  foreignKey: "user_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// Posts can have many Comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// A single Comment can only belong to one Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// A single post can only belong to one User
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// A single Comment can only belong to one user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment };
