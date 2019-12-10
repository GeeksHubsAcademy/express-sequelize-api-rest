const { User } = require('../models');

async function registerController(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      message: 'register done',
      user: user,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
     return   res.status(400).json({
          message: 'register invalid',
          error: error.errors[0].message,
        });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'register invalid',
        error: error.errors[0].message,
      });
    }
       res.status(400).json({
         message: 'register invalid',
         error: error
       });

  }
}

function loginController(req, res, next) {
  res.send('login endpoint');
}

function recoveryController(req, res, next) {
  res.send('recovery endpoint');
}

module.exports = {
  registerController,
  loginController,
  recoveryController,
};