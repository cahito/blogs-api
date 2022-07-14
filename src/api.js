require('express-async-errors');
const express = require('express');

const authRouter = require('./routers/authRouter');
// const usersRouter = require('./routers/usersRouter');

const app = express();

app.use(express.json());

app.use('/login', authRouter);

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  res.status(status).json({ message });
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
