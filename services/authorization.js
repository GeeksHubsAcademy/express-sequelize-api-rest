const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}


async function createJWT(data) {
  return jwt.sign(data, process.env.JWT_SECRET || 'ASDJKGASJLHGASD', {
    expiresIn: '24h',
  });
}


module.exports = {
  hashPassword,
  comparePassword,
  createJWT,
};
