const { User } = require('../models');
const { isValidPassword } = require('../services/validations');
const {
  hashPassword,
  comparePassword,
  createJWT
} = require('../services/authorization');

async function registerController(req, res, next) {
  try {
    isValidPassword(req.body.password);
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    res.status(200).json({
      message: 'register done',
      user: user,
    });
  } catch (error) {
    console.log(error);

    if (error.message === 'invalidPasswordError') {
      return res.status(400).json({
        message: 'invalid password',
        error: error,
      });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
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
    res.status(500).json({
      message: 'register not done',
      error: error,
    });
  }
}

async function loginController(req, res, next) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) throw new Error('no user');
    const isValidPassword = await comparePassword(
      req.body.password,
      user.password,
    );
    if (!isValidPassword) throw new Error('no valid password');

    const data = {
      username: user.username,
      email: user.email,
    //   token: user.token,
      id: user.id,
    };
    user.token = await createJWT(data);
    await  user.save();
    data.token = user.token;

    res.json({
      message: 'valid login',
      user: data,
    });
  } catch (error) {
      console.error(error);

    res.status(401).json({
      message: 'login invalid',
    });
  }
}

function recoveryController(req, res, next) {
  res.send('recovery endpoint');
}

module.exports = {
  registerController,
  loginController,
  recoveryController,
};
