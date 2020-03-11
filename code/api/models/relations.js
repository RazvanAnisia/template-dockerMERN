const User = require('./user');
const Todo = require('./todo');

Todo.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(Todo);
