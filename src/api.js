require('express-async-errors');
const express = require('express');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const postsRouter = require('./routers/postsRouter');

// const authController = require('./controllers/authController');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/user', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postsRouter);

// app.use(authController.validateToken);

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  console.log('api-err: ', err.status, err.message);
  res.status(status).json({ message });
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
