const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPost.associate = (db) => {
    BlogPost.belongsTo(db.User, { as: 'user' })
  }

  return BlogPost;
};

module.exports = BlogPost;
