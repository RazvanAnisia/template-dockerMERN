const User = require('./models/user')();
const Todo = require('./models/todo');
const Tag = require('./models/tag');
const TodoTag = require('./models/todotags');
const TodoList = require('./models/todolist');

console.log(User);
User.hasMany(TodoList);
TodoList.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

TodoList.hasMany(Todo);
Todo.belongsTo(TodoList, {
  foreignKey: {
    allowNull: false
  },
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

User.hasMany(Tag);
Tag.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Tag.belongsToMany(Todo, {
  through: TodoTag
});
Todo.belongsToMany(Tag, {
  through: TodoTag
});
