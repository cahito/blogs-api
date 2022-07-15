require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  /* validateToken: (req, _res, next) => {
    const token = req.headers;
    try {
      if (!token) {
        const error = new Error('Token not found');
        error.status = 401;
        throw error;
      }
      const data = jwt.verify(token, process.env.JWT_SECRET);
      console.log(data);
    } catch (err) {
      const error = new Error('Expired or invalid token');
      error.status = 401;
      throw error;
    }
  
    next();
  }, */
};

module.exports = jwtService;
