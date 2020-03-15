const User = require('./user');
const Todo = require('./todo');
const Tag = require('./tag');
const TodoTag = require('./todoTags');
const TodoList = require('./todolist');

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
  // constraints: false
});
Todo.belongsToMany(Tag, {
  through: TodoTag
  //  constraints: false
});
