

const User = require('../models').User;

let userController = {
  index: async (req, res, next) => {
    try {

      const users = await User.findAll();
      if (users) {
        return res.status(201).send(users);
      }
    } catch (error) {
      console.log(error);
      req.flash('error_msg', 'something went wrong' + error);
    }
  },

  // Create a new User
  store: async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          req.flash('errors', errors.mapped());
          req.flash('inputData', req.body);
          return res.redirect('back');
        }

        if (
          
          !req.body.email ||
          !req.body.password ||
          !req.body.fullname ||
          !req.body.phone
        ) {
          res.status(400).send({
            msg: 'Please pass Role ID, email, password, phone or fullname.',
          });
        } else {
          User.create({
            email: req.body.email,
            password: req.body.password,
            fullname: req.body.fullname,
            // phone: req.body.phone,
            // role_id: req.body.role_id,
          })
            .then(user => res.status(201).send(user))
            .catch(error => {
              console.log(error);
              res.status(400).send(error);
            });
        }
      
  },


  // Get User by ID
  show: async (req, res, next) => {

        User.findByPk(req.params.id)
          .then(user => res.status(200).send(user))
          .catch(error => {
            res.status(400).send(error);
          });
      
  },

  // Update a User
  update: async (req, res, next) => {

        if (
          
          !req.body.email ||
          !req.body.password ||
          !req.body.fullname 
        //   !req.body.phone
        ) {
          res.status(400).send({
            msg: 'Please pass Role ID, email, password, phone or fullname.',
          });
        } else {
          User.findByPk(req.params.id)
            .then(user => {
              User.update(
                {
                  email: req.body.email || user.email,
                  password: req.body.password || user.password,
                  fullname: req.body.fullname || user.fullname,
                  
                 
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then(_ => {
                  res.status(200).send({
                    message: 'User updated',
                  });
                })
                .catch(err => res.status(400).send(err));
            })
            .catch(error => {
              res.status(400).send(error);
            });
        }
     
  },

  // Delete a User
  delete: async (req, res, next) => {

        if (!req.params.id) {
          res.status(400).send({
            msg: 'Please pass user ID.',
          });
        } else {
          User.findByPk(req.params.id)
            .then(user => {
              if (user) {
                User.destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                  .then(_ => {
                    res.status(200).send({
                      message: 'User deleted',
                    });
                  })
                  .catch(err => res.status(400).send(err));
              } else {
                res.status(404).send({
                  message: 'User not found',
                });
              }
            })
            .catch(error => {
              res.status(400).send(error);
            });
        }
  },
};
module.exports = userController;