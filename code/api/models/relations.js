const User = require('./user');
const Todo = require('./todo');
const Tag = require('./tag');
const TodoTag = require('./todo_tags');
Todo.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(Todo);

Tag.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(Tag);

Tag.belongsToMany(Todo, {
  through: TodoTag
});
Todo.belongsToMany(Tag, { through: TodoTag });
