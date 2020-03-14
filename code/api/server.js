const express = require('express');

const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
require('./models/relations');

const todos = require('./routes/todos');
const todolist = require('./routes/todolist');
const login = require('./routes/login');
const signup = require('./routes/signup');
const user = require('./routes/user');
const tags = require('./routes/tags');
const auth = require('./middleware/auth');
const authorization = require('./middleware/authorization');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/todo', auth.verifyToken, authorization.verifyUser, todos);
app.use('/todolist', auth.verifyToken, authorization.verifyUser, todolist);
app.use('/tag', auth.verifyToken, authorization.verifyUser, tags);
app.use('/user', auth.verifyToken, authorization.verifyUser, user);
app.use('/login', login);
app.use('/signup', signup);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() =>
    app.listen(process.env.PORT || 9000, () => {
      console.log(`listening on port ${process.env.PORT}`);
    })
  )
  .catch(err => {
    console.log(err);
  });
