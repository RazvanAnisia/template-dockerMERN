const User = require('./user');
const Todo = require('./todo');
const Tag = require('./tag');

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

Tag.belongsToMany(Todo, { through: 'todo_tags' });
Todo.belongsToMany(Tag, { through: 'todo_tags' });
