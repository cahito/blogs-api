const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });


  User.associate = (db) => {
    User.hasMany(db.BlogPost, { as: 'blogPost', foreignKey: 'userId' })
  }
  
  return User;
};

module.exports = User;
