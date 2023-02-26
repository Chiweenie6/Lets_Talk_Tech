// if not logged in, go to login page
const authenticate = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = authenticate;