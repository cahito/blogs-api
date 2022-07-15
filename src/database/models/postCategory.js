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
  });

  PostCategory.associate = (db) => {
    db.Category.belongsToMany(db.BlogPost, { as: 'blogPost', through: PostCategory });
    db.BlogPost.belongsToMany(db.Category, { as: 'category', through: PostCategory });
  }

  return PostCategory;
};

module.exports = PostCategory;
