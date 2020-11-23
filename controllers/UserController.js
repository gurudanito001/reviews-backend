const User = require("../services/UserService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

function UserController() {

  const registerUser = function(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.send({errors: errors});
    }

    User.findEmail(req.body.email).then( user => {
        if(user){
          return res.send({errors: {email: "Email already exists"}});
        }
        const newUser = req.body;
    
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              User.add(newUser)
              .then(user => res.json(user))
              .catch(err => console.log(err));
              /* newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err)); */
            });
          });
    });
  };

const loginUsers = function(req, res) {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.send({errors: errors});
    }else{
      User.findEmail(req.body.email).then(user => {
        // Check if user exists
        if (!user) {
          return res.send({errors: {email: "User does not exist"}})
        }

        // Check password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            let { id, firstname, lastname, admin } = user
            const payload = {
              id, firstname, lastname, admin
            };

            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.send({errors: {password: "Password is Incorrect"}})
          }
        });
      });
    }
    
};

  return {
    register: registerUser,
    login: loginUsers,
  };
}

module.exports = UserController();
