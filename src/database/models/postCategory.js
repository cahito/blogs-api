const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });

  PostCategory.associate = (db) => {
    db.Category.belongsToMany(db.BlogPost, { foreignKey: 'categoryId', otherKey: 'postId', as: 'blogPost', through: PostCategory });
    db.BlogPost.belongsToMany(db.Category, { foreignKey: 'postId', otherKey: 'categoryId', as: 'categories', through: PostCategory });
  }

  return PostCategory;
};

module.exports = PostCategory;
