require('dotenv/config');
const jwt = require('jsonwebtoken');
const db = require('../database/models');

const getUserIdFromToken = async (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const { email } = data;
  const { dataValues } = await db.User.findOne({
    attributes: { exclude: ['displayName', 'password', 'image'] },
    where: { email },
  });
  const userId = dataValues.id;

  return userId;
};

module.exports = getUserIdFromToken;
