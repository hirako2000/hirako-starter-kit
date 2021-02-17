const User = require("../../models/user");

const selectFields = "username name email description";

module.exports.login = (req, res) => {
  return User.findOne({ username: req.body.username })
    .select(selectFields)
    .exec()
    .then(function (user) {
      return setUsertoResponse(res, user);
    })
    .catch(function () {
      return res.status(500).json({
        error: "Something went wrong",
      });
    });
};

const setUsertoResponse = (res, user) => {
  delete user._id;
  res.status(200).json({
    user,
  });
};

module.exports.signup = (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
    }),
    req.body.password,
    function (err) {
      if (err) {
        console.log("error during user signup!", err);
        return res.status(422).json({
          message: "username already exists",
        });
      }
      setUsertoResponse(res, {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
      });
    }
  );
};

module.exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({
    message: "Logged out",
  });
};
