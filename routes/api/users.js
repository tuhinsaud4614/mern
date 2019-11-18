require("dotenv").config();
const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

router.get("/", (req, res) => res.json({ msg: "users works" }));

// Register
router.post("/register", cors(), (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Login
router.post("/login", cors(), (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.json({ email: "User not Found" });
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        /// res.json({ msg: "success" });
        //user matched
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        };
        //Sign Token
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          {
            expiresIn: 3600
          },
          (err, token) => {
              res.json({
                  success: true,
                  token: 'Bearer ' + token
              })
          }
        );
      } else {
        return res.json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
