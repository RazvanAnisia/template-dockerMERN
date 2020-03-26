const User = require('./User');
const Todo = require('./Todo');
const Tag = require('./Tag');
const TodoTag = require('./TodoTags');
const TodoList = require('./Todolist');

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
