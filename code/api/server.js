const express = require('express');

const cors = require('cors');
const app = express();
const sequelize = require('./config/database');

const todos = require('./routes/todos');
const login = require('./routes/login');
const signup = require('./routes/signup');

const auth = require('./middleware/auth');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/todo', auth.verifyToken, todos);
app.use('/login', login);
app.use('/signup', signup);

console.log('yeah22');

sequelize
  .sync()
  .then(result =>
    app.listen(process.env.PORT || 9000, () => {
      console.log(`listening on port ${process.env.PORT}`);
    })
  )
  .catch(err => {
    console.log(err);
  });
